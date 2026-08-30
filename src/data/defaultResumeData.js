// src/templates/defaultResumeData.js
function cleanText(value) {
  return String(value || "")
    .replace(/^[\s•●▪◦*-]+/, "")
    .replace(/[\s•●▪◦*-]+$/, "")
    .trim();
}
function normalizeBullets(value) {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => {
        if (item && typeof item === "object") {
          return [
            item.text ||
              item.description ||
              item.content ||
              "",
          ];
        }

        return [item];
      })
      .flatMap((item) =>
        String(item || "").split(/\r?\n/)
      )
      .map(cleanText)
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n/)
      .map(cleanText)
      .filter(Boolean);
  }

  return [];
}

function normalizeMonthYear(month, year) {
  if (!month && !year) {
    return "";
  }

  if (month && year) {
    return `${month} ${year}`;
  }

  return year || month || "";
}

function normalizeEndDate(item) {
  if (!item) {
    return "";
  }

  if (item.current) {
    return "Present";
  }

  if (item.end_month || item.end_year) {
    return normalizeMonthYear(
      item.end_month,
      item.end_year
    );
  }

  return item.end_date || "";
}

function normalizeStartDate(item) {
  if (!item) {
    return "";
  }

  if (item.start_month || item.start_year) {
    return normalizeMonthYear(
      item.start_month,
      item.start_year
    );
  }

  return item.start_date || "";
}

// =========================================================
// EXPERIENCE
// =========================================================

function normalizeExperienceItems(experience = []) {
  if (
    !Array.isArray(experience) ||
    !experience.length
  ) {
    return [];
  }

  return experience.map((item) => {
    const title =
      item.title ||
      item.job_title ||
      item.role ||
      "";

    const descriptionBullets =
      typeof item.description === "string"
        ? normalizeBullets(item.description)
        : [];

    const bullets =
      Array.isArray(item.bullets) &&
      item.bullets.length
        ? normalizeBullets(item.bullets)
        : descriptionBullets;

    const description = String(
      item.description || ""
    ).trim();

    return {
      ...item,

      title,

      job_title:
        item.job_title || title,

      company:
        item.company || "",

      location:
        item.location || "",

      start_date:
        normalizeStartDate(item),

      end_date:
        normalizeEndDate(item),

      description,

      bullets,
    };
  });
}

// =========================================================
// EDUCATION
// =========================================================

function normalizeEducationItems(education = []) {
  if (
    !Array.isArray(education) ||
    !education.length
  ) {
    return [];
  }

  return education.map((item) => {
    const institution =
      item.institution ||
      item.school ||
      item.university ||
      "";

    const gradDate =
      item.grad_date ||
      normalizeEndDate(item);

    const bullets =
      normalizeBullets(item.bullets);

    const description = String(
      item.description || ""
    ).trim();

    const finalBullets =
      bullets.length
        ? bullets
        : normalizeBullets(description);

    return {
      ...item,

      degree:
        item.degree ||
        item.field ||
        "",

      institution,

      school:
        institution,

      location:
        item.location || "",

      grad_date:
        gradDate,

      description,

      bullets:
        finalBullets,
    };
  });
}

// =========================================================
// SKILLS
// =========================================================

function normalizeSkills(skills = []) {
  if (
    !Array.isArray(skills) ||
    !skills.length
  ) {
    return [];
  }

  return skills
    .map((skill) => {
      if (typeof skill === "string") {
        const title = cleanText(skill);

        return {
          title,
          description: "",
          bullets: [],
        };
      }

      if (
        skill &&
        typeof skill === "object"
      ) {
        const title =
          skill.title ||
          skill.name ||
          skill.skill ||
          "";

        const description = String(
          skill.description ||
            skill.details ||
            ""
        ).trim();

        const bullets =
          Array.isArray(skill.bullets) &&
          skill.bullets.length
            ? normalizeBullets(skill.bullets)
            : normalizeBullets(description);

        return {
          ...skill,

          title:
            cleanText(title),

          description,

          bullets,
        };
      }

      return null;
    })
    .filter(
      (skill) =>
        skill &&
        skill.title
    );
}

// =========================================================
// PROJECTS
// =========================================================

function normalizeProjectItems(projects = []) {
  if (
    !Array.isArray(projects) ||
    !projects.length
  ) {
    return [];
  }

  return projects.map((item) => {
    const description = String(
      item.description || ""
    ).trim();

    const bullets =
      Array.isArray(item.bullets) &&
      item.bullets.length
        ? normalizeBullets(item.bullets)
        : normalizeBullets(description);

    return {
      ...item,

      name:
        item.name ||
        item.title ||
        "",

      title:
        item.title ||
        item.name ||
        "",

      description,

      bullets,
    };
  });
}

// =========================================================
// CERTIFICATIONS
// =========================================================

function normalizeCertificationItems(
  certifications = []
) {
  if (
    !Array.isArray(certifications) ||
    !certifications.length
  ) {
    return [];
  }

  return certifications
    .map((item) => {
      if (typeof item === "string") {
        const name = cleanText(item);

        return {
          name,
          title: name,
          certificate: name,
          certification: name,

          issuer: "",
          organization: "",
          issuing_organization: "",
          issuingOrganization: "",

          issue_date: "",
          issued_date: "",
          issueDate: "",
          issuedDate: "",
          date: "",

          expiration_date: "",
          expiry_date: "",
          expirationDate: "",
          expiryDate: "",

          credential_id: "",
          credentialId: "",

          credential_url: "",
          credentialUrl: "",
          url: "",

          description: "",
          details: "",
          bullets: [],
        };
      }

      if (
        !item ||
        typeof item !== "object"
      ) {
        return null;
      }

      const name = cleanText(
        item.name ||
          item.title ||
          item.certificate ||
          item.certification ||
          item.certification_name ||
          item.certificate_name ||
          ""
      );

      const issuer = cleanText(
        item.issuer ||
          item.organization ||
          item.issuing_organization ||
          item.issuingOrganization ||
          item.issuer_name ||
          ""
      );

      const issueDate = cleanText(
        item.issue_date ||
          item.issueDate ||
          item.issued_date ||
          item.issuedDate ||
          item.date ||
          ""
      );

      const expirationDate = cleanText(
        item.expiration_date ||
          item.expirationDate ||
          item.expiry_date ||
          item.expiryDate ||
          ""
      );

      const credentialId = cleanText(
        item.credential_id ||
          item.credentialId ||
          item.id ||
          ""
      );

      const credentialUrl = String(
        item.credential_url ||
          item.credentialUrl ||
          item.url ||
          ""
      ).trim();

      const description = String(
        item.description ||
          item.details ||
          item.content ||
          ""
      ).trim();

      const bullets =
        Array.isArray(item.bullets) &&
        item.bullets.length
          ? normalizeBullets(item.bullets)
          : normalizeBullets(description);

      return {
        ...item,

        name,

        title:
          item.title || name,

        certificate:
          item.certificate || name,

        certification:
          item.certification || name,

        issuer,

        organization:
          item.organization || issuer,

        issuing_organization:
          item.issuing_organization ||
          item.issuingOrganization ||
          issuer,

        issuingOrganization:
          item.issuingOrganization ||
          item.issuing_organization ||
          issuer,

        issue_date:
          issueDate,

        issued_date:
          item.issued_date ||
          item.issuedDate ||
          issueDate,

        issueDate:
          item.issueDate ||
          item.issue_date ||
          issueDate,

        issuedDate:
          item.issuedDate ||
          item.issued_date ||
          issueDate,

        expiration_date:
          expirationDate,

        expiry_date:
          item.expiry_date ||
          item.expiryDate ||
          expirationDate,

        expirationDate:
          item.expirationDate ||
          item.expiration_date ||
          expirationDate,

        expiryDate:
          item.expiryDate ||
          item.expiration_date ||
          expirationDate,

        credential_id:
          credentialId,

        credentialId:
          item.credentialId ||
          item.credential_id ||
          credentialId,

        credential_url:
          credentialUrl,

        credentialUrl:
          item.credentialUrl ||
          item.credential_url ||
          credentialUrl,

        url:
          item.url ||
          credentialUrl,

        description,

        details:
          item.details || description,

        bullets,
      };
    })
    .filter(
      (certification) =>
        certification &&
        certification.name
    );
}

// =========================================================
// LANGUAGES
// =========================================================

function normalizeLanguages(languages = []) {
  if (
    !Array.isArray(languages) ||
    !languages.length
  ) {
    return [];
  }

  return languages
    .map((lang) => {
      if (typeof lang === "string") {
        const name = cleanText(lang);

        return {
          name,
          language: name,
          level: "",
          bullets: [],
        };
      }

      if (
        lang &&
        typeof lang === "object"
      ) {
        const name = cleanText(
          lang.name ||
            lang.language ||
            ""
        );

        return {
          ...lang,

          name,

          language: name,

          level:
            cleanText(
              lang.level || ""
            ),

          bullets:
            normalizeBullets(
              lang.bullets
            ),
        };
      }

      return null;
    })
    .filter(
      (lang) =>
        lang &&
        lang.name
    );
}

// =========================================================
// STRING ARRAYS
// =========================================================

function normalizeStringArray(items = []) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .flatMap((item) => {
      if (
        item &&
        typeof item === "object"
      ) {
        return [
          item.text ||
            item.title ||
            item.name ||
            item.description ||
            "",
        ];
      }

      return [item];
    })
    .flatMap((item) =>
      String(item || "").split(/\r?\n/)
    )
    .map(cleanText)
    .filter(Boolean);
}

// =========================================================
// DEFAULT DATA
// =========================================================

const defaultResumeData = {
  full_name: "",

  target_title: "",

  location: "",

  phone: "",

  email: "",

  linkedin: "",

  summary: "",

  photo_path: "",

  experience: [],

  education: [],

  projects: [],

  skills: [],

  highlights: [],

  certifications: [],

  languages: [],
};

// =========================================================
// BUILD RESUME DATA
// =========================================================

function buildResumeData(
  data = {},
  demo = false
) {
  const source = data || {};

  const finalData = {
    ...defaultResumeData,

    ...source,

    full_name:
      source.full_name || "",

    target_title:
      source.target_title || "",

    location:
      source.location || "",

    phone:
      source.phone || "",

    email:
      source.email || "",

    linkedin:
      source.linkedin || "",

    summary:
      source.summary || "",

    photo_path:
      source.photo_path || "",

    experience:
      normalizeExperienceItems(
        source.experience
      ),

    education:
      normalizeEducationItems(
        source.education
      ),

    projects:
      normalizeProjectItems(
        source.projects
      ),

    skills:
      normalizeSkills(
        source.skills
      ),

    certifications:
      normalizeCertificationItems(
        source.certifications
      ),

    languages:
      normalizeLanguages(
        source.languages
      ),

    highlights:
      normalizeStringArray(
        source.highlights
      ),
  };

  return finalData;
}

export {
  defaultResumeData,
  buildResumeData,
};