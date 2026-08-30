// Fully local completeness/standardization checks for each resume
// section. Each function returns { percent, missing } where `missing`
// is a list of translation-key suggestions the UI resolves via t().
// Nothing here calls out to a network or a model - it's plain field
// presence/shape validation tuned to what a standard, ATS-friendly,
// Canadian-style resume expects.

function pct(filled, total) {
  if (total === 0) return 100;
  return Math.round((filled / total) * 100);
}

export function checkPersonalCompleteness(data) {
  const checks = [
    { key: "full_name", labelKey: "completeness.personal.fullName" },
    { key: "target_title", labelKey: "completeness.personal.targetTitle" },
    { key: "email", labelKey: "completeness.personal.email" },
    { key: "phone", labelKey: "completeness.personal.phone" },
    { key: "location", labelKey: "completeness.personal.location" },
    { key: "summary", labelKey: "completeness.personal.summary" },
  ];

  const missing = checks
    .filter((c) => !String(data?.[c.key] || "").trim())
    .map((c) => c.labelKey);

  const summaryWordCount = String(data?.summary || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (
    String(data?.summary || "").trim() &&
    summaryWordCount < 15 &&
    !missing.includes("completeness.personal.summary")
  ) {
    missing.push("completeness.personal.summaryTooShort");
  }

  return { percent: pct(checks.length - missing.length, checks.length), missing };
}

export function checkExperienceCompleteness(item) {
  const checks = [
    { key: "job_title", labelKey: "completeness.experience.jobTitle" },
    { key: "company", labelKey: "completeness.experience.company" },
  ];

  const missing = checks
    .filter((c) => !String(item?.[c.key] || "").trim())
    .map((c) => c.labelKey);

  const bullets = Array.isArray(item?.bullets) ? item.bullets : [];

  if (bullets.length === 0 && !String(item?.description || "").trim()) {
    missing.push("completeness.experience.noBullets");
  } else if (bullets.length > 0 && bullets.length < 2) {
    missing.push("completeness.experience.fewBullets");
  }

  const hasMetric = bullets.some((b) => /\d/.test(String(b)));
  if (bullets.length > 0 && !hasMetric) {
    missing.push("completeness.experience.noMetrics");
  }

  const total = checks.length + 2;
  return { percent: pct(total - missing.length, total), missing };
}

export function checkEducationCompleteness(item) {
  const checks = [
    { key: "degree", labelKey: "completeness.education.degree" },
    {
      key: "school",
      altKey: "institution",
      labelKey: "completeness.education.school",
    },
  ];

  const missing = checks
    .filter(
      (c) =>
        !String(item?.[c.key] || "").trim() &&
        !(c.altKey && String(item?.[c.altKey] || "").trim())
    )
    .map((c) => c.labelKey);

  return { percent: pct(checks.length - missing.length, checks.length), missing };
}

export function checkSkillsCompleteness(resume) {
  const skills = Array.isArray(resume?.skills) ? resume.skills : [];
  const languages = Array.isArray(resume?.languages) ? resume.languages : [];

  const missing = [];

  if (skills.length === 0) {
    missing.push("completeness.skills.none");
  } else if (skills.length < 5) {
    missing.push("completeness.skills.tooFew");
  }

  if (languages.length === 0) {
    missing.push("completeness.skills.noLanguages");
  }

  const total = 2;
  const filled = total - missing.length > 0 ? total - missing.length : 0;
  return { percent: pct(filled, total), missing };
}

export function checkCertificationsCompleteness(list) {
  const items = Array.isArray(list) ? list : [];

  if (items.length === 0) {
    // Certifications are optional, so an empty list isn't a
    // completeness problem on its own - just informational.
    return { percent: 100, missing: [] };
  }

  const missing = [];
  const incomplete = items.some(
    (c) => !String(c?.name || c?.title || "").trim()
  );

  if (incomplete) {
    missing.push("completeness.certifications.missingName");
  }

  return { percent: incomplete ? 50 : 100, missing };
}
