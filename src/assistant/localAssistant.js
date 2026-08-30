// A fully local "smart assistant" for the resume builder: no network
// calls, no external site, no API key - everything runs as plain
// JavaScript inside the app, so it works identically offline, on
// Android, iOS, or desktop.
//
// It covers two jobs:
//   1) Resume-writing help (summary, bullet points, skill ideas).
//   2) A how-to copilot for every screen/feature in the app itself
//      (photo editor, templates, certifications, PDF export,
//      fullscreen, page breaks, etc.), including being able to jump
//      the person straight to the right screen.
//
// It isn't a general-purpose LLM; it's a focused rule/template engine
// tuned specifically for this app, which is what lets it work with
// zero external dependency.

const ACTION_VERB_UPGRADES = {
  did: "executed",
  made: "developed",
  helped: "supported",
  worked: "collaborated",
  managed: "directed",
  handled: "managed",
  responsible: "accountable",
  "did work": "performed",
  fixed: "resolved",
  built: "engineered",
  ran: "led",
  led: "spearheaded",
  created: "developed",
  improved: "enhanced",
  increased: "grew",
  reduced: "decreased",
  started: "launched",
  used: "leveraged",
  talked: "communicated",
  taught: "trained",
};

const SKILLS_BY_KEYWORD = [
  {
    match: ["developer", "software", "engineer", "programmer", "code", "python", "javascript"],
    skills: [
      "Python",
      "JavaScript",
      "Git & Version Control",
      "Problem Solving",
      "REST APIs",
      "SQL",
      "Debugging",
      "Agile/Scrum",
    ],
  },
  {
    match: ["sales", "account", "business development"],
    skills: [
      "Client Relationship Management",
      "Negotiation",
      "CRM Software",
      "Lead Generation",
      "Sales Forecasting",
      "Cold Outreach",
      "Closing Deals",
    ],
  },
  {
    match: ["design", "ui", "ux", "graphic", "creative"],
    skills: [
      "Figma",
      "Adobe Creative Suite",
      "Wireframing",
      "User Research",
      "Visual Design",
      "Prototyping",
    ],
  },
  {
    match: ["hair", "barber", "stylist", "salon", "beauty"],
    skills: [
      "Client Consultation",
      "Precision Cutting Techniques",
      "Color Theory",
      "Time Management",
      "Customer Retention",
      "Product Knowledge",
    ],
  },
  {
    match: ["teacher", "instructor", "education", "tutor"],
    skills: [
      "Curriculum Development",
      "Classroom Management",
      "Lesson Planning",
      "Student Assessment",
      "Public Speaking",
      "Mentoring",
    ],
  },
  {
    match: ["admin", "office", "assistant", "coordinator", "clerical"],
    skills: [
      "Microsoft Office Suite",
      "Calendar Management",
      "Data Entry",
      "Multi-tasking",
      "Written Communication",
      "Organization",
    ],
  },
  {
    match: ["nurse", "healthcare", "medical", "clinical"],
    skills: [
      "Patient Care",
      "Electronic Health Records (EHR)",
      "Clinical Documentation",
      "HIPAA Compliance",
      "Vital Signs Monitoring",
      "Team Collaboration",
    ],
  },
  {
    match: ["marketing", "content", "social media", "seo"],
    skills: [
      "Content Strategy",
      "SEO",
      "Social Media Management",
      "Google Analytics",
      "Email Marketing",
      "Copywriting",
    ],
  },
];

const DEFAULT_SKILLS = [
  "Communication",
  "Problem Solving",
  "Time Management",
  "Teamwork",
  "Adaptability",
  "Attention to Detail",
];

// ============================================================
// APP KNOWLEDGE BASE - how-to answers for every screen/feature,
// each tagged with the page it belongs to so the assistant can offer
// a "Go there" quick action.
// ============================================================

const APP_PAGES = {
  templates: { path: "/", label: "Templates" },
  personal: { path: "/personal", label: "Personal Info" },
  experience: { path: "/experience", label: "Experience" },
  education: { path: "/education", label: "Education" },
  skills: { path: "/skills", label: "Skills" },
  certifications: {
    path: "/certifications",
    label: "Certifications",
  },
  preview: { path: "/preview", label: "Preview" },
};

const APP_FAQ = [
  {
    id: "choose_template",
    match: ["template", "design", "which template", "change template", "switch template"],
    reply:
      "You can pick a template on the very first screen. Tap the fullscreen icon on any template's thumbnail to see it up close before choosing - tapping \"Use This Template\" applies it and takes you to Personal Info. You can always go back and change it later.",
    page: "templates",
  },
  {
    id: "photo_upload",
    match: ["photo", "picture", "avatar", "headshot", "profile pic"],
    reply:
      "Profile photos only show up on the \"Two Column\" and \"Creative Photo\" templates. On the Personal Info screen, tap \"Upload Photo\" - this opens a built-in editor where you can drag to reposition, zoom with the slider, and rotate. Tap \"Apply\" to save the crop. \"Edit Photo\" reopens that same editor later if you want to adjust it again.",
    page: "personal",
  },
  {
    id: "add_experience",
    match: ["add job", "add experience", "work history", "job entry"],
    reply:
      "On the Experience screen, fill in the job title, company, dates and description, then tap \"Add Experience\" to add it to the list. You can add as many roles as you need, and remove one with the trash icon next to it.",
    page: "experience",
  },
  {
    id: "add_education",
    match: ["add education", "degree", "school", "university"],
    reply:
      "The Education screen works the same way as Experience - fill in the school, degree and dates, then add it. You can list multiple degrees/certifications there.",
    page: "education",
  },
  {
    id: "add_certification",
    match: ["certification", "certificate", "license"],
    reply:
      "Certifications have their own screen (after Skills). Add the certification name, issuing organization, and dates there. It'll show up in the Certifications section of your resume automatically - as long as the template you picked supports it (Canadian, Combination, Modern Two-Column, Minimal, Functional and Creative all do).",
    page: "certifications",
  },
  {
    id: "skills_languages",
    match: ["add skill", "language", "skill level"],
    reply:
      "The Skills screen lets you add both skills and languages (with proficiency levels). Tap \"Next: Certifications\" when you're done to move on.",
    page: "skills",
  },
  {
    id: "pdf_download",
    match: ["download", "pdf", "export", "save resume", "print"],
    reply:
      "On the Preview screen, tap the \"PDF\" button. It captures your resume, splits it across multiple pages automatically if it's long, and saves it as a file on your device. While it's working the button shows \"Generating…\" - if anything goes wrong you'll see a red message explaining what happened, instead of nothing happening.",
    page: "preview",
  },
  {
    id: "page_breaks",
    match: ["page break", "second page", "cut off", "multiple pages", "too long"],
    reply:
      "If your resume is longer than one A4 page, the Preview screen shows a dashed red line with \"Page 2 starts here\" exactly where it'll split - and there's a small pill near the top showing the total page count. The split always happens between items, never through the middle of a line, and margins are kept on every page.",
    page: "preview",
  },
  {
    id: "fullscreen",
    match: ["fullscreen", "full screen", "bigger view", "zoom in preview"],
    reply:
      "There's a fullscreen button both on the template thumbnails (Templates screen) and on the Preview screen, so you can look closely at the design on a small phone screen before committing to it.",
    page: null,
  },
  {
    id: "navigation_help",
    match: ["stuck", "how do i navigate", "menu", "steps", "where am i"],
    reply:
      "The bottom bar shows all 7 steps: Templates → Personal → Experience → Education → Skills → Certifications → Preview. It's scrollable if it doesn't all fit, and the highlighted one is where you are now.",
    page: null,
  },
  {
    id: "not_working",
    match: ["not working", "bug", "broken", "error", "crash", "white screen"],
    reply:
      "Sorry about that! A few quick things to try: make sure you're on the latest version of the app, close and reopen it, and if a specific button isn't responding, tell me exactly which screen and button - I can walk you through a workaround or you can report it for a fix.",
    page: null,
  },
];

function findFaqMatch(text) {
  const lower = text.toLowerCase();
  return APP_FAQ.find((entry) =>
    entry.match.some((kw) => lower.includes(kw))
  );
}

function findNavigationRequest(text) {
  const lower = text.toLowerCase();

  const wantsToGo =
    /\b(go to|open|take me to|navigate to|show me)\b/.test(
      lower
    );

  if (!wantsToGo) return null;

  for (const [key, page] of Object.entries(APP_PAGES)) {
    if (lower.includes(key) || lower.includes(page.label.toLowerCase())) {
      return page;
    }
  }

  return null;
}

export function guessSkillsForTitle(title) {
  const lower = (title || "").toLowerCase();

  for (const group of SKILLS_BY_KEYWORD) {
    if (group.match.some((kw) => lower.includes(kw))) {
      return group.skills;
    }
  }

  return DEFAULT_SKILLS;
}

/**
 * Suggests skills for the resume as it currently stands, excluding
 * ones already added. Fully local/synchronous - safe to call on
 * every keystroke.
 */
export function suggestSkillsForResume(resume) {
  const title =
    firstNonEmpty(
      resume?.target_title,
      resume?.experience?.[0]?.job_title,
      resume?.experience?.[0]?.title
    ) || "";

  const already = new Set(
    (Array.isArray(resume?.skills) ? resume.skills : [])
      .map((s) => (s.title || s.name || s || "").toLowerCase())
      .filter(Boolean)
  );

  return guessSkillsForTitle(title).filter(
    (skill) => !already.has(skill.toLowerCase())
  );
}

function firstNonEmpty(...values) {
  return values.find((v) => v && String(v).trim()) || "";
}

function summarizeExperienceYears(experience) {
  if (!Array.isArray(experience) || experience.length === 0) {
    return null;
  }

  const count = experience.length;
  return `${count}+`;
}

function detectIntent(text) {
  const t = text.toLowerCase();

  if (/summary|objective|about me|profile\b/.test(t)) {
    return "summary";
  }

  if (/bullet|rewrite|rephrase/.test(t)) {
    return "bullet";
  }

  if (/\bskill\b/.test(t) && !/add skill/.test(t)) {
    return "skills";
  }

  if (/how long|length|one page|two pages/.test(t)) {
    return "faq_length";
  }

  if (/^(hi|hello|hey|salam|سلام)\b/.test(t)) {
    return "greeting";
  }

  if (/what can you do|help me|capabilities|features/.test(t)) {
    return "capabilities";
  }

  return null;
}

function buildSummary(resume, userText) {
  const title = firstNonEmpty(
    resume.target_title,
    resume.experience?.[0]?.job_title,
    resume.experience?.[0]?.title,
    "professional"
  );

  const years = summarizeExperienceYears(resume.experience);

  const topSkills = (
    Array.isArray(resume.skills) && resume.skills.length
      ? resume.skills
      : guessSkillsForTitle(title).map((s) => ({ title: s }))
  )
    .slice(0, 3)
    .map((s) => s.title || s.name || s)
    .filter(Boolean);

  const skillsPhrase =
    topSkills.length > 0
      ? `Skilled in ${topSkills.join(", ")}.`
      : "";

  const yearsPhrase = years
    ? `${years} years of experience`
    : "a strong background";

  const focusKeyword = extractKeyword(userText);
  const focusPhrase = focusKeyword
    ? ` with a focus on ${focusKeyword}`
    : "";

  return [
    `${capitalize(
      title
    )} with ${yearsPhrase}${focusPhrase}. ${skillsPhrase}`.trim(),
    `Proven track record of delivering results and collaborating effectively across teams. Seeking to bring hands-on expertise and a strong work ethic to a new ${title} role where I can contribute immediately and continue growing.`,
  ]
    .filter(Boolean)
    .join(" ");
}

function extractKeyword(text) {
  if (!text) return "";
  const cleaned = text
    .replace(/write|summary|for me|please|a|an|the|my/gi, "")
    .trim();
  return cleaned.length > 2 && cleaned.length < 60 ? cleaned : "";
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function upgradeBullet(text) {
  let result = text.trim();

  if (!result) {
    return "Paste the task or responsibility you'd like turned into a bullet point, and I'll rewrite it for you.";
  }

  const lower = result.toLowerCase();
  for (const [weak, strong] of Object.entries(
    ACTION_VERB_UPGRADES
  )) {
    if (lower.startsWith(weak)) {
      result = capitalize(strong) + result.slice(weak.length);
      break;
    }
  }

  if (!/^[A-Z]/.test(result)) {
    result = capitalize(result);
  }

  const hasNumber = /\d/.test(result);

  result = result.replace(/\.?\s*$/, "");
  if (!result.endsWith(".")) {
    result += ".";
  }

  if (!hasNumber) {
    return `${result}\n\nTip: bullets land harder with a number - how many people, %, $, or hours did this affect? Try adding one, e.g. "...resulting in a 20% increase in X."`;
  }

  return result;
}

function buildSkillsSuggestion(resume) {
  const title = firstNonEmpty(
    resume.target_title,
    resume.experience?.[0]?.job_title,
    resume.experience?.[0]?.title
  );

  const suggestions = guessSkillsForTitle(title);

  return `Based on ${
    title ? `"${title}"` : "your resume"
  }, here are some skills worth considering:\n\n${suggestions
    .map((s) => `• ${s}`)
    .join(
      "\n"
    )}\n\nPick the ones that genuinely match your experience - only list skills you can speak to in an interview.`;
}

const FAQ = {
  faq_length:
    "For most people, one page is ideal - especially with under ~10 years of experience. Two pages is fine if you have extensive, directly relevant experience, but never go to three.",
};

const GREETING_REPLY =
  "Hi! I can help write your resume content (summary, bullet points, skills) and I also know this app inside and out - ask me how to upload a photo, download your PDF, add certifications, or anything else. What do you need?";

const CAPABILITIES_REPLY =
  "Here's what I can do:\n\n• Write or improve your professional summary\n• Rewrite a bullet point to sound stronger\n• Suggest skills for your target role\n• Explain any screen or feature (photo editor, templates, PDF export, certifications, fullscreen, page breaks...)\n• Jump you straight to a screen - just say \"go to Certifications\" (or Templates, Personal, Experience, Education, Skills, Preview)";

const GENERAL_FALLBACK =
  "I'm not sure I caught that. Try asking about writing your summary, improving a bullet point, suggesting skills, or how to use any part of the app (photo upload, PDF export, certifications, templates...). You can also say \"what can you do?\" for a full list.";

/**
 * Fully synchronous, fully local. Returns { text, action } where
 * action is either null or { type: "navigate", path, label } so the
 * UI can render a "Go there" button.
 */
export function getLocalAssistantReply(userText, resume) {
  const navTarget = findNavigationRequest(userText);
  if (navTarget) {
    return {
      text: `Sure - heading to ${navTarget.label}.`,
      action: {
        type: "navigate",
        path: navTarget.path,
        label: navTarget.label,
      },
    };
  }

  const intent = detectIntent(userText);

  if (intent === "summary") {
    return { text: buildSummary(resume, userText), action: null };
  }

  if (intent === "bullet") {
    return {
      text: upgradeBullet(
        userText
          .replace(/improve|rewrite|bullet point?s?:?/gi, "")
          .trim()
      ),
      action: null,
    };
  }

  if (intent === "skills") {
    return { text: buildSkillsSuggestion(resume), action: null };
  }

  if (intent === "faq_length") {
    return { text: FAQ.faq_length, action: null };
  }

  if (intent === "greeting") {
    return { text: GREETING_REPLY, action: null };
  }

  if (intent === "capabilities") {
    return { text: CAPABILITIES_REPLY, action: null };
  }

  const faqMatch = findFaqMatch(userText);
  if (faqMatch) {
    const page = faqMatch.page ? APP_PAGES[faqMatch.page] : null;

    return {
      text: faqMatch.reply,
      action: page
        ? { type: "navigate", path: page.path, label: page.label }
        : null,
    };
  }

  return { text: GENERAL_FALLBACK, action: null };
}
