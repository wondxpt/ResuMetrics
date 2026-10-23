import test from "node:test";
import assert from "node:assert/strict";

import {
  ratingForScore,
  scoreResumeAgainstJobDescription,
} from "../src/assistant/atsScorer.js";
import {
  checkCertificationsCompleteness,
  checkEducationCompleteness,
  checkExperienceCompleteness,
  checkPersonalCompleteness,
  checkSkillsCompleteness,
} from "../src/assistant/completenessChecker.js";

test("ATS scorer returns an empty, stable result for a blank job description", () => {
  assert.deepEqual(scoreResumeAgainstJobDescription({}, "  "), {
    score: 0,
    matched: [],
    missing: [],
    keywordCount: 0,
  });
});

test("ATS score is bounded and accounts for every extracted keyword", () => {
  const resume = {
    target_title: "Frontend Developer",
    summary:
      "Experienced developer building accessible web applications with React and JavaScript.",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    experience: [
      {
        job_title: "Web Developer",
        company: "Example Studio",
        bullets: ["Built React interfaces", "Improved page load time by 30%"],
      },
    ],
  };
  const result = scoreResumeAgainstJobDescription(
    resume,
    "React JavaScript HTML CSS frontend development and responsive web applications",
  );

  assert.ok(Number.isInteger(result.score));
  assert.ok(result.score >= 0 && result.score <= 100);
  assert.ok(result.keywordCount > 0 && result.keywordCount <= 25);
  assert.equal(
    result.matched.length + result.missing.length,
    result.keywordCount,
  );
  assert.ok(result.matched.some((keyword) => /react/i.test(keyword)));
  assert.equal(
    result.score,
    Math.round((result.matched.length / result.keywordCount) * 100),
  );
});

test("ATS rating thresholds stay stable at their boundary values", () => {
  assert.equal(ratingForScore(24), "poor");
  assert.equal(ratingForScore(25), "weak");
  assert.equal(ratingForScore(49), "weak");
  assert.equal(ratingForScore(50), "moderate");
  assert.equal(ratingForScore(74), "moderate");
  assert.equal(ratingForScore(75), "strong");
  assert.equal(ratingForScore(100), "strong");
});

test("personal completeness handles an empty resume without throwing", () => {
  const result = checkPersonalCompleteness({});
  assert.equal(result.percent, 0);
  assert.equal(result.missing.length, 6);
  assert.ok(result.missing.includes("completeness.personal.fullName"));
});

test("personal completeness accepts a complete profile with a substantial summary", () => {
  const result = checkPersonalCompleteness({
    full_name: "Alex Example",
    target_title: "Product Designer",
    email: "alex@example.com",
    phone: "+1 555 0100",
    location: "Toronto, Canada",
    summary:
      "Product designer with several years of experience creating accessible digital products and collaborating with cross-functional teams to deliver measurable improvements.",
  });

  assert.equal(result.percent, 100);
  assert.deepEqual(result.missing, []);
});

test("personal completeness flags a summary that is too short", () => {
  const result = checkPersonalCompleteness({
    full_name: "Alex Example",
    target_title: "Designer",
    email: "alex@example.com",
    phone: "+1 555 0100",
    location: "Toronto",
    summary: "Creative designer.",
  });

  assert.ok(result.percent < 100);
  assert.ok(
    result.missing.includes("completeness.personal.summaryTooShort"),
  );
});

test("experience completeness rewards two bullets with a measurable result", () => {
  const result = checkExperienceCompleteness({
    job_title: "Software Engineer",
    company: "Example Co.",
    bullets: [
      "Built internal tools for operations",
      "Reduced report generation time by 30%",
    ],
  });

  assert.equal(result.percent, 100);
  assert.deepEqual(result.missing, []);
});

test("experience completeness flags missing content and measurable outcomes", () => {
  const result = checkExperienceCompleteness({
    job_title: "Assistant",
    company: "Example Co.",
    bullets: ["Helped the team with daily work"],
  });

  assert.ok(result.missing.includes("completeness.experience.fewBullets"));
  assert.ok(result.missing.includes("completeness.experience.noMetrics"));
});

test("education completeness accepts the institution legacy field", () => {
  const result = checkEducationCompleteness({
    degree: "Bachelor of Arts",
    institution: "Example University",
  });

  assert.equal(result.percent, 100);
  assert.deepEqual(result.missing, []);
});

test("skills completeness accepts five skills and at least one language", () => {
  const result = checkSkillsCompleteness({
    skills: ["Research", "Writing", "Design", "Testing", "Planning"],
    languages: ["English"],
  });

  assert.equal(result.percent, 100);
  assert.deepEqual(result.missing, []);
});

test("certifications are optional but incomplete entries are flagged", () => {
  assert.deepEqual(checkCertificationsCompleteness([]), {
    percent: 100,
    missing: [],
  });

  const result = checkCertificationsCompleteness([{ title: "" }]);
  assert.ok(result.percent < 100);
  assert.ok(
    result.missing.includes("completeness.certifications.missingName"),
  );
});
