// Fully local ATS (Applicant Tracking System) match scorer. Compares
// the resume's own text against a pasted job description using plain
// keyword-frequency analysis - no network call, no external NLP
// service, no bundled ML model. This mirrors what most real ATS
// keyword filters actually do under the hood (frequency-weighted
// term matching), so it's a genuinely useful signal despite being
// simple.

const STOPWORDS = new Set(
  (
    "a an the and or but if then else for to of in on at by with without " +
    "from into onto up down out over under again further once here there " +
    "when where why how all any both each few more most other some such " +
    "no nor not only own same so than too very s t can will just don " +
    "should now is are was were be been being have has had do does did " +
    "this that these those i you he she it we they them his her its our " +
    "your their what which who whom as about above below between during " +
    "before after while because until unless per via etc job role team " +
    "work years experience strong ability required requirements including " +
    "including preferred plus must nice looking seeking candidate " +
    "candidates company we're re you'll we'll"
  )
    .split(/\s+/)
    .filter(Boolean)
);

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#./\s-]/g, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

// Very light stemming so "manages"/"managing"/"managed" all count as
// the same keyword as "manage" - good enough for keyword overlap,
// not meant to be linguistically perfect.
function stem(word) {
  return word
    .replace(/(ing|ed|es|s)$/i, (suffix, _match, offset, full) =>
      full.length - suffix.length >= 3 ? "" : suffix
    );
}

/**
 * Extracts the most frequent, most likely "keyword" terms from a job
 * description: single words plus adjacent two-word phrases (bigrams),
 * ranked by frequency. Returns up to `limit` entries as *display*
 * words (original spelling), even though matching internally uses a
 * light stem so "manage"/"managing"/"managed" count as one keyword.
 */
function extractKeywords(jobDescription, limit = 25) {
  const rawWords = tokenize(jobDescription);

  const freq = new Map();
  const display = new Map();

  const bump = (key, weight, displayWord) => {
    freq.set(key, (freq.get(key) || 0) + weight);
    if (!display.has(key)) {
      display.set(key, displayWord);
    }
  };

  rawWords.forEach((word) => {
    const key = stem(word);
    bump(key, 1, word);
  });

  // Bigrams (e.g. "project management", "customer service") tend to
  // be the phrases recruiters actually search for.
  for (let i = 0; i < rawWords.length - 1; i++) {
    const a = rawWords[i];
    const b = rawWords[i + 1];
    if (a.length < 3 || b.length < 3) continue;
    const phrase = `${stem(a)} ${stem(b)}`;
    bump(phrase, 1.5, `${a} ${b}`);
  }

  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key]) => ({ key, label: display.get(key) || key }));
}

function buildResumeText(resume) {
  const parts = [];

  parts.push(resume?.target_title || "");
  parts.push(resume?.summary || "");

  (Array.isArray(resume?.skills) ? resume.skills : []).forEach((s) => {
    parts.push(typeof s === "string" ? s : s?.title || s?.name || "");
  });

  (Array.isArray(resume?.experience) ? resume.experience : []).forEach(
    (exp) => {
      parts.push(exp?.job_title || exp?.title || "");
      parts.push(exp?.company || "");
      parts.push(
        Array.isArray(exp?.bullets)
          ? exp.bullets.join(" ")
          : exp?.description || ""
      );
    }
  );

  (Array.isArray(resume?.education) ? resume.education : []).forEach(
    (edu) => {
      parts.push(edu?.degree || "");
      parts.push(edu?.field || edu?.field_of_study || "");
      parts.push(edu?.school || edu?.institution || "");
    }
  );

  (Array.isArray(resume?.certifications) ? resume.certifications : []).forEach(
    (cert) => {
      parts.push(typeof cert === "string" ? cert : cert?.name || cert?.title || "");
    }
  );

  (Array.isArray(resume?.languages) ? resume.languages : []).forEach((l) => {
    parts.push(typeof l === "string" ? l : l?.name || l?.title || "");
  });

  return parts.filter(Boolean).join(" \n ");
}

/**
 * Scores how well the resume matches a pasted job description.
 * Returns { score, matched, missing, keywordCount }.
 *   score        - 0-100 overall match percentage
 *   matched      - keywords found in the resume (best matches first)
 *   missing      - keywords from the JD not found in the resume
 *   keywordCount - total keywords considered
 */
export function scoreResumeAgainstJobDescription(resume, jobDescription) {
  const jdText = String(jobDescription || "").trim();

  if (!jdText) {
    return { score: 0, matched: [], missing: [], keywordCount: 0 };
  }

  const keywords = extractKeywords(jdText, 25);
  const resumeText = buildResumeText(resume).toLowerCase();
  const resumeStemmed = tokenize(resumeText).map(stem).join(" ");

  const matched = [];
  const missing = [];

  keywords.forEach(({ key, label }) => {
    const isPhrase = key.includes(" ");
    const found = isPhrase
      ? key
          .split(" ")
          .every((part) => resumeStemmed.includes(part) || resumeText.includes(part))
      : resumeStemmed.includes(key) || resumeText.includes(key);

    if (found) {
      matched.push(label);
    } else {
      missing.push(label);
    }
  });

  const score =
    keywords.length === 0
      ? 0
      : Math.round((matched.length / keywords.length) * 100);

  return {
    score,
    matched,
    missing,
    keywordCount: keywords.length,
  };
}

/**
 * Short, human-readable rating for a numeric ATS score, used for
 * label/color in the UI. Callers translate the returned key.
 */
export function ratingForScore(score) {
  if (score >= 75) return "strong";
  if (score >= 50) return "moderate";
  if (score >= 25) return "weak";
  return "poor";
}
