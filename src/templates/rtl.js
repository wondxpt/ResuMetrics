// Detects whether the resume CONTENT itself (as typed by the user)
// is Persian/Arabic, so templates can render right-to-left. This is
// intentionally independent of the app's UI language (see
// src/i18n) - a user could have the interface in English while
// writing their resume in Persian, or vice versa, and the resume
// preview/PDF should always follow what was actually typed.

// Covers Arabic, Arabic Supplement, Arabic Extended-A and the
// Persian-specific extensions in Arabic Presentation Forms, plus
// Hebrew, so the same detection also works for RTL Hebrew content.
const RTL_CHAR_RE =
  /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

export function isRtlText(value) {
  return RTL_CHAR_RE.test(String(value || ""));
}

// Looks at the fields most likely to reflect the resume's actual
// written language (name, title, summary, and the first few
// experience/education entries) and returns true if the majority of
// that text is RTL script.
export function detectResumeDirection(data = {}) {
  const samples = [];

  samples.push(data.full_name, data.target_title, data.summary);

  (Array.isArray(data.experience) ? data.experience : [])
    .slice(0, 3)
    .forEach((job) => {
      samples.push(job?.job_title, job?.company, job?.description);
    });

  (Array.isArray(data.education) ? data.education : [])
    .slice(0, 3)
    .forEach((edu) => {
      samples.push(edu?.degree, edu?.institution, edu?.description);
    });

  (Array.isArray(data.skills) ? data.skills : [])
    .slice(0, 5)
    .forEach((skill) => {
      samples.push(
        typeof skill === "string" ? skill : skill?.name
      );
    });

  const text = samples.filter(Boolean).join(" ");

  if (!text.trim()) return "ltr";

  const rtlChars = (text.match(RTL_CHAR_RE) || []).length;
  const letterChars = (text.match(/[^\s\d.,;:!?()/@#-]/g) || []).length;

  if (letterChars === 0) return "ltr";

  // If a meaningful share of the actual letters are RTL script,
  // treat the whole resume as RTL. A low threshold is used on
  // purpose: a resume is "Persian/Arabic" even if it contains a
  // handful of English proper nouns (company names, tool names).
  return rtlChars / letterChars > 0.3 ? "rtl" : "ltr";
}

// Small helper so templates don't have to repeat the same ternary
// everywhere: given a direction, returns the correct value for a
// property that has distinct "physical-left" and "physical-right"
// meanings (e.g. textAlign, paddingLeft/paddingRight pairs).
export function dirValue(rtl, ltrValue, rtlValue) {
  return rtl ? rtlValue : ltrValue;
}
