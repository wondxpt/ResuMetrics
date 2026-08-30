// Fully local, rule-based "professional English" writing engine.
// No network calls, no API key, no model download - runs instantly on
// every keystroke if needed. It's intentionally NOT a general
// paraphraser or translator; it targets the specific patterns that
// show up in resume bullets/summaries and nudges them toward the
// tone recruiters and ATS parsers expect.
//
// Two entry points:
//   polishBulletPoint(text) - for a single responsibility/achievement line
//   polishSummary(text)     - for the free-form professional summary
//
// Both return { text, tips } where `tips` is a short list of plain
// suggestions (e.g. "add a number") the UI can show alongside the
// rewritten text, so the person understands *why* something changed
// and can keep improving it themselves.

const WEAK_STARTS = {
  "i did": "Executed",
  "i made": "Developed",
  "i helped": "Supported",
  "i worked on": "Delivered",
  "i worked": "Collaborated on",
  "i managed": "Directed",
  "i handled": "Managed",
  "i was responsible for": "Owned",
  "i fixed": "Resolved",
  "i built": "Engineered",
  "i ran": "Led",
  "i led": "Spearheaded",
  "i created": "Developed",
  "i improved": "Enhanced",
  "i increased": "Grew",
  "i reduced": "Decreased",
  "i started": "Launched",
  "i used": "Leveraged",
  "i talked to": "Communicated with",
  "i taught": "Trained",
  "i took care of": "Managed",
  "i was in charge of": "Directed",
  "did": "Executed",
  "made": "Developed",
  "helped": "Supported",
  "worked on": "Delivered",
  "worked": "Collaborated on",
  "managed": "Directed",
  "handled": "Managed",
  "responsible for": "Accountable for",
  "fixed": "Resolved",
  "built": "Engineered",
  "ran": "Led",
  "led": "Spearheaded",
  "created": "Developed",
  "improved": "Enhanced",
  "increased": "Grew",
  "reduced": "Decreased",
  "started": "Launched",
  "used": "Leveraged",
  "talked to": "Communicated with",
  "taught": "Trained",
  "got": "Obtained",
  "did work on": "Performed",
};

// Longer phrases must be checked before shorter ones that are
// substrings of them (e.g. "responsible for" before "for").
const WEAK_START_KEYS = Object.keys(WEAK_STARTS).sort(
  (a, b) => b.length - a.length
);

// Filler/weak phrases stripped out anywhere in the sentence, not just
// at the start - these add length without adding information.
const FILLER_PHRASES = [
  "just ",
  "basically ",
  "kind of ",
  "sort of ",
  "really ",
  "very much ",
  "a lot of ",
  "in order to ",
  "as needed ",
  "on a daily basis ",
  "at the end of the day ",
];

const PRONOUN_PATTERN = /\b(i|my|me)\b/gi;

function stripLeadingPronounFragment(text) {
  // "I was the one who managed..." -> "managed..." handled elsewhere;
  // here we just remove stray leading "I ", "My ", "Me " that survive
  // after the WEAK_STARTS pass (e.g. "I successfully led the team").
  return text.replace(/^(i|my)\s+/i, "");
}

function removeFillerPhrases(text) {
  let result = text;
  for (const phrase of FILLER_PHRASES) {
    const re = new RegExp(phrase.trim().replace(/\s+/g, "\\s+") + "\\s*", "gi");
    result = result.replace(re, "");
  }
  return result;
}

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function applyWeakStart(text) {
  const lower = text.toLowerCase();

  for (const weak of WEAK_START_KEYS) {
    if (lower.startsWith(weak)) {
      const rest = text.slice(weak.length);
      return capitalize(WEAK_STARTS[weak]) + rest;
    }
  }

  return text;
}

function ensureSentenceCase(text) {
  if (!text) return text;
  if (/^[a-z]/.test(text)) return capitalize(text);
  return text;
}

function ensureEndsWithPeriod(text) {
  const trimmed = text.replace(/\s+$/, "");
  if (!trimmed) return trimmed;
  if (/[.!?]$/.test(trimmed)) return trimmed;
  return trimmed + ".";
}

function hasMetric(text) {
  return /\d/.test(text) || /%/.test(text);
}

function hasStrongVerbStart(text) {
  const firstWord = (text.trim().split(/\s+/)[0] || "").toLowerCase();
  const strongVerbs = new Set(
    Object.values(WEAK_STARTS).map((v) => v.toLowerCase())
  );
  return strongVerbs.has(firstWord) || /^[A-Z][a-z]+ed\b/.test(text) || /^[A-Z][a-z]+s\b/.test(text);
}

/**
 * Polishes one bullet point / achievement line.
 * Fully synchronous, safe to call on every keystroke or on demand.
 */
export function polishBulletPoint(rawText) {
  const original = String(rawText || "").trim();

  if (!original) {
    return { text: "", tips: [] };
  }

  let text = original;
  text = removeFillerPhrases(text);
  text = applyWeakStart(text);
  text = stripLeadingPronounFragment(text);
  text = text.replace(PRONOUN_PATTERN, (match) =>
    match.toLowerCase() === "i" ? "" : match
  );
  text = text.replace(/\s{2,}/g, " ").trim();
  text = ensureSentenceCase(text);
  text = ensureEndsWithPeriod(text);

  const tips = [];

  if (!hasMetric(text)) {
    tips.push(
      "Add a number - how many people, %, $, or hours did this affect?"
    );
  }

  if (!hasStrongVerbStart(text)) {
    tips.push(
      "Start with a strong action verb (Led, Built, Increased, Reduced...)."
    );
  }

  if (text.length > 200) {
    tips.push("Consider splitting this into two shorter bullet points.");
  }

  return { text, tips };
}

/**
 * Polishes a free-form professional summary (multiple sentences).
 * Splits on sentence boundaries and runs the same cleanup on each,
 * without forcing an action-verb start (summaries are usually
 * written in third-person-omitted style, not bullet style).
 */
export function polishSummary(rawText) {
  const original = String(rawText || "").trim();

  if (!original) {
    return { text: "", tips: [] };
  }

  const sentences = original
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const cleaned = sentences.map((sentence) => {
    let s = removeFillerPhrases(sentence);
    s = s.replace(/\s{2,}/g, " ").trim();
    s = ensureSentenceCase(s);
    s = ensureEndsWithPeriod(s);
    return s;
  });

  const text = cleaned.join(" ");

  const tips = [];
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  if (wordCount < 20) {
    tips.push(
      "A summary this short may look thin - aim for 2-4 sentences."
    );
  }

  if (wordCount > 90) {
    tips.push("This is getting long - keep it to 3-4 sentences max.");
  }

  if (/\bi\b/i.test(text)) {
    tips.push(
      "Resume summaries usually drop \"I\" - e.g. \"Manages a team of 5\" instead of \"I manage a team of 5\"."
    );
  }

  return { text, tips };
}

/**
 * Generic single-line/short-field polish (job titles, certification
 * names, etc.) - just trims, fixes casing, and removes filler.
 */
export function polishGenericField(rawText) {
  const original = String(rawText || "").trim();
  if (!original) return { text: "", tips: [] };

  let text = removeFillerPhrases(original);
  text = text.replace(/\s{2,}/g, " ").trim();
  text = ensureSentenceCase(text);

  return { text, tips: [] };
}
