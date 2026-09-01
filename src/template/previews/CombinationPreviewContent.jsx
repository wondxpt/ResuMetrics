import { Box, Typography, Divider } from "@mui/material";
import { buildResumeData } from "../../templates/defaultResumeData";

const A4_WIDTH = "210mm";
const A4_HEIGHT = "297mm";

const demoData = {
  full_name: "Michael Anderson",
  target_title: "Senior Business Analyst",
  location: "Toronto, ON",
  phone: "+1 (416) 555-0188",
  email: "michael.anderson@email.com",
  linkedin: "linkedin.com/in/michaelanderson",

  summary:
    "Senior Business Analyst with 8+ years of experience in business analysis, process improvement, stakeholder management, and data analysis.",

  skills: [
    "Business Analysis",
    "Requirements Gathering",
    "Process Improvement",
    "Stakeholder Management",
    "Data Analysis",
    "SQL",
    "Microsoft Excel",
    "Project Management",
    "Agile",
    "Scrum",
  ],

  experience: [
    {
      title: "Senior Business Analyst",
      company: "ABC Consulting Inc.",
      location: "Toronto, ON",
      start_date: "2021",
      end_date: "Present",
      bullets: [
        "Led requirements gathering and business analysis initiatives.",
        "Reduced reporting effort by approximately 25%.",
      ],
    },
    {
      title: "Business Analyst",
      company: "NorthStar Solutions",
      location: "Toronto, ON",
      start_date: "2017",
      end_date: "2021",
      bullets: [
        "Improved business processes and reporting.",
        "Prepared requirements and project documentation.",
      ],
    },
    {
      title: "Junior Business Analyst",
      company: "MapleTech Solutions",
      location: "Mississauga, ON",
      start_date: "2015",
      end_date: "2017",
      bullets: [
        "Supported analysis, reporting, and testing.",
        "Assisted with stakeholder communication and issue tracking.",
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Business Administration",
      institution: "University of Toronto",
      location: "Toronto, ON",
      grad_date: "2013",
    },
  ],

  projects: [],

  certifications: [
    {
      name: "CBAP",
      issuer: "IIBA",
      issue_date: "2022",
      expiration_date: "2025",
      credential_id: "CBAP-2022-45821",
      credential_url: "https://www.iiba.org/",
    },
    {
      name: "PSM I",
      issuer: "Scrum.org",
      issue_date: "2021",
      expiration_date: "",
      credential_id: "PSM-I-784521",
      credential_url: "https://www.scrum.org/",
    },
  ],

  languages: [
    {
      name: "English",
      level: "Native",
    },
    {
      name: "French",
      level: "Professional",
    },
    {
      name: "Spanish",
      level: "Basic",
    },
  ],

  highlights: [],
};

function getPreviewData(data, demo) {
  const hasRealData =
    data &&
    typeof data === "object" &&
    Object.keys(data).length > 0 &&
    !demo;

  if (hasRealData) {
    return buildResumeData(data, false);
  }

  return {
    ...demoData,
    ...(demo ? {} : buildResumeData(data || {}, false)),
  };
}

function getSkillValue(skill) {
  if (typeof skill === "string") {
    return skill.trim();
  }

  return (
    skill?.title ||
    skill?.name ||
    skill?.skill ||
    ""
  ).trim();
}

function getLanguageValue(language) {
  if (typeof language === "string") {
    return language.trim();
  }

  const name =
    language?.name ||
    language?.language ||
    "";

  const level =
    language?.level ||
    "";

  if (!name) {
    return "";
  }

  return level
    ? `${name} (${level})`
    : name;
}

function getBullets(item = {}) {
  if (Array.isArray(item?.bullets)) {
    return item.bullets
      .map((bullet) =>
        String(bullet || "")
          .replace(/^[\s•●▪◦*-]+/, "")
          .trim()
      )
      .filter(Boolean);
  }

  if (typeof item?.description === "string") {
    return item.description
      .split(/\r?\n|\u2022|•/)
      .map((value) =>
        value
          .replace(/^[\s•●▪◦*-]+/, "")
          .trim()
      )
      .filter(Boolean);
  }

  return [];
}

function SidebarTitle({ children }) {
  return (
    <Typography
      sx={{
        fontFamily:
          "Helvetica, Arial, sans-serif",
        fontSize: "13.5px",
        lineHeight: 1.3,
        fontWeight: 700,
        letterSpacing: "0.7px",
        color: "#0f766e",
        textTransform: "uppercase",
        margin: 0,
        marginBottom: "6px",
      }}
    >
      {children}
    </Typography>
  );
}

function MainTitle({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "7px",
      }}
    >
      <Typography
        sx={{
          fontFamily:
            "Helvetica, Arial, sans-serif",
          fontSize: "13.5px",
          lineHeight: 1.3,
          fontWeight: 700,
          letterSpacing: "0.45px",
          color: "#0f766e",
          textTransform: "uppercase",
          margin: 0,
          marginBottom: "4px",
        }}
      >
        {children}
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "#0f766e",
        }}
      />
    </Box>
  );
}

function CombinationPreviewContent({
  data = {},
  demo = true,
}) {
  const resume = getPreviewData(
    data,
    demo
  );

  const contactItems = [
    resume.location,
    resume.phone,
    resume.email,
    resume.linkedin,
  ].filter(Boolean);

  const skills = Array.isArray(
    resume.skills
  )
    ? resume.skills
        .map(getSkillValue)
        .filter(Boolean)
    : [];

  const experience = Array.isArray(
    resume.experience
  )
    ? resume.experience
    : [];

  const education = Array.isArray(
    resume.education
  )
    ? resume.education
    : [];

  const projects = Array.isArray(
    resume.projects
  )
    ? resume.projects
    : [];

  const certifications = Array.isArray(
    resume.certifications
  )
    ? resume.certifications
    : [];

  const languages = Array.isArray(
    resume.languages
  )
    ? resume.languages
        .map(getLanguageValue)
        .filter(Boolean)
    : [];

  const highlights = Array.isArray(
    resume.highlights
  )
    ? resume.highlights
        .map((item) =>
          String(item || "").trim()
        )
        .filter(Boolean)
    : [];

  return (
    <Box
      className="resume-page"
      sx={{
        width: A4_WIDTH,
        height: A4_HEIGHT,

        minWidth: A4_WIDTH,
        minHeight: A4_HEIGHT,

        maxWidth: A4_WIDTH,
        maxHeight: A4_HEIGHT,

        boxSizing: "border-box",

        backgroundColor: "#ffffff",
        color: "#1a1a1a",

        fontFamily:
          "Helvetica, Arial, sans-serif",

        overflow: "visible",

        display: "flex",
        flexDirection: "column",

        margin: 0,
        padding: "44px 50px 48px 50px",

        "& *": {
          boxSizing: "border-box",
        },
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          width: "100%",
          backgroundColor: "#0f766e",
          color: "#ffffff",

          padding:
            "22px 26px 20px 26px",

          display: "flex",
          flexDirection: "column",

          alignItems: "center",
          justifyContent: "center",

          textAlign: "center",

          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Helvetica, Arial, sans-serif",
            fontSize: "27px",
            lineHeight: 1.12,
            fontWeight: 700,
            color: "#ffffff",
            margin: 0,
            marginBottom: "5px",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          {resume.full_name ||
            "Michael Anderson"}
        </Typography>

        {resume.target_title && (
          <Typography
            sx={{
              fontSize: "14.5px",
              lineHeight: 1.3,
              fontWeight: 400,
              color: "#ffffff",
              margin: 0,
              marginBottom: "7px",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {resume.target_title}
          </Typography>
        )}

        {contactItems.length > 0 && (
          <Typography
            sx={{
              fontSize: "13.5px",
              lineHeight: 1.45,
              color: "#e6fffb",
              margin: 0,
              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {contactItems.join(" | ")}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          height: "17px",
          flexShrink: 0,
        }}
      />

      {/* SUMMARY */}

      {resume.summary && (
        <CombinationSection>
          <MainTitle>
            Professional Summary
          </MainTitle>

          <Typography
            sx={{
              fontSize: "13.5px",
              lineHeight: 1.48,
              color: "#1a1a1a",
              margin: 0,
              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {resume.summary}
          </Typography>
        </CombinationSection>
      )}

      {/* KEY SKILLS */}

      {skills.length > 0 && (
        <CombinationSection>
          <MainTitle>
            Key Skills
          </MainTitle>

          <Box
            sx={{
              width: "100%",

              backgroundColor: "#f1f5f9",

              border:
                "1px solid rgba(15,118,110,0.35)",

              padding:
                "8px 12px",

              borderRadius: "2px",
            }}
          >
            <Typography
              sx={{
                fontSize: "13.5px",
                lineHeight: 1.5,
                color: "#1a1a1a",
                margin: 0,
                overflowWrap:
                  "anywhere",
                wordBreak:
                  "break-word",
              }}
            >
              {skills.join(" • ")}
            </Typography>
          </Box>
        </CombinationSection>
      )}

      {/* EXPERIENCE */}

      {experience.length > 0 && (
        <CombinationSection>
          <MainTitle>
            Work Experience
          </MainTitle>

          {experience.map(
            (job, index) => (
              <CombinationExperience
                key={index}
                job={job}
                last={
                  index ===
                  experience.length - 1
                }
              />
            )
          )}
        </CombinationSection>
      )}

      {/* EDUCATION */}

      {education.length > 0 && (
        <CombinationSection>
          <MainTitle>
            Education
          </MainTitle>

          {education.map(
            (edu, index) => (
              <CombinationEducation
                key={index}
                edu={edu}
              />
            )
          )}
        </CombinationSection>
      )}

      {/* PROJECTS */}

      {projects.length > 0 && (
        <CombinationSection>
          <MainTitle>
            Projects
          </MainTitle>

          {projects.map(
            (project, index) => (
              <CombinationProject
                key={index}
                project={project}
              />
            )
          )}
        </CombinationSection>
      )}

      {/* CERTIFICATIONS */}

      {certifications.length > 0 && (
        <CombinationSection>
          <MainTitle>
            Certifications
          </MainTitle>

          {certifications.map(
            (
              certification,
              index
            ) => (
              <CombinationCertification
                key={index}
                certification={
                  certification
                }
              />
            )
          )}
        </CombinationSection>
      )}

      {/* LANGUAGES */}

      {languages.length > 0 && (
        <CombinationSection last>
          <MainTitle>
            Languages
          </MainTitle>

          <Typography
            sx={{
              fontSize: "13.5px",
              lineHeight: 1.45,
              color: "#1a1a1a",
              margin: 0,
              overflowWrap:
                "anywhere",
              wordBreak:
                "break-word",
            }}
          >
            {languages.join(" • ")}
          </Typography>
        </CombinationSection>
      )}

      {/* HIGHLIGHTS */}

      {highlights.length > 0 && (
        <CombinationSection
          last={true}
        >
          <MainTitle>
            Highlights
          </MainTitle>

          <CombinationBullets
            items={highlights}
          />
        </CombinationSection>
      )}
    </Box>
  );
}

function CombinationSection({
  children,
  last = false,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,

        marginBottom: last
          ? 0
          : "18px",

        flexShrink: 0,

        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
}

function CombinationExperience({
  job = {},
  last = false,
}) {
  const title =
    job?.title ||
    job?.job_title ||
    job?.role ||
    "";

  const company =
    job?.company ||
    "";

  const location =
    job?.location ||
    "";

  const dates = [
    job?.start_date,
    job?.end_date,
  ]
    .filter(Boolean)
    .join(" – ");

  const bullets =
    getBullets(job);

  if (
    !title &&
    !company &&
    !location &&
    !dates &&
    bullets.length === 0
  ) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,

        marginBottom: last
          ? 0
          : "9px",

        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",

          display: "grid",

          gridTemplateColumns:
            "minmax(0, 1fr) auto",

          columnGap: "12px",

          alignItems:
            "start",

          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            minWidth: 0,

            fontSize: "13.5px",
            lineHeight: 1.35,

            fontWeight: 700,

            color: "#1a1a1a",

            margin: 0,

            overflowWrap:
              "anywhere",

            wordBreak:
              "break-word",
          }}
        >
          {title}
          {company
            ? ` — ${company}`
            : ""}
        </Typography>

        {dates && (
          <Typography
            sx={{
              flexShrink: 0,

              fontSize: "13.5px",
              lineHeight: 1.3,

              fontStyle: "italic",

              color: "#555555",

              whiteSpace:
                "nowrap",

              textAlign:
                "right",
            }}
          >
            {dates}
          </Typography>
        )}
      </Box>

      {location && (
        <Typography
          sx={{
            fontSize: "13.5px",
            lineHeight: 1.35,

            fontStyle:
              "italic",

            fontWeight: 500,

            color: "#0f766e",

            margin: 0,
            marginTop: "2px",
            marginBottom: "3px",

            overflowWrap:
              "anywhere",

            wordBreak:
              "break-word",
          }}
        >
          {location}
        </Typography>
      )}

      {bullets.length > 0 && (
        <CombinationBullets
          items={bullets}
        />
      )}
    </Box>
  );
}

function CombinationBullets({
  items = [],
}) {
  const validItems =
    Array.isArray(items)
      ? items.filter(Boolean)
      : [];

  if (
    validItems.length === 0
  ) {
    return null;
  }

  return (
    <Box
      component="ul"
      sx={{
        margin: 0,

        padding: 0,

        paddingLeft: "15px",

        width: "100%",

        "& li": {
          fontFamily:
            "Helvetica, Arial, sans-serif",

          fontSize: "13.5px",

          lineHeight: 1.4,

          color: "#1a1a1a",

          margin: 0,
          marginBottom: "1px",

          padding: 0,

          overflowWrap:
            "anywhere",

          wordBreak:
            "break-word",
        },
      }}
    >
      {validItems.map(
        (item, index) => (
          <li key={index}>
            {item}
          </li>
        )
      )}
    </Box>
  );
}

function CombinationEducation({
  edu = {},
}) {
  const degree =
    edu?.degree ||
    edu?.field ||
    "";

  const institution =
    edu?.institution ||
    edu?.school ||
    edu?.university ||
    "";

  const location =
    edu?.location ||
    "";

  const date =
    edu?.grad_date ||
    edu?.end_date ||
    edu?.date ||
    "";

  const description =
    typeof edu?.description ===
    "string"
      ? edu.description.trim()
      : "";

  const bullets =
    Array.isArray(
      edu?.bullets
    )
      ? edu.bullets
          .map((item) =>
            String(item || "")
              .replace(
                /^[\s•●▪◦*-]+/,
                ""
              )
              .trim()
          )
          .filter(Boolean)
      : [];

  if (
    !degree &&
    !institution &&
    !location &&
    !date &&
    !description &&
    bullets.length === 0
  ) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        marginBottom: "7px",
      }}
    >
      <Box
        sx={{
          width: "100%",

          display: "grid",

          gridTemplateColumns:
            "minmax(0, 1fr) auto",

          columnGap: "12px",

          alignItems:
            "start",
        }}
      >
        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: "13.5px",
              lineHeight: 1.35,

              fontWeight: 700,

              color:
                "#1a1a1a",

              overflowWrap:
                "anywhere",

              wordBreak:
                "break-word",
            }}
          >
            {degree}
            {institution
              ? ` — ${institution}`
              : ""}
          </Typography>

          {location && (
            <Typography
              sx={{
                fontSize: "13.5px",

                lineHeight: 1.35,

                color:
                  "#555555",

                marginTop:
                  "1px",

                overflowWrap:
                  "anywhere",

                wordBreak:
                  "break-word",
              }}
            >
              {location}
            </Typography>
          )}
        </Box>

        {date && (
          <Typography
            sx={{
              flexShrink: 0,

              fontSize: "13.5px",

              lineHeight:
                1.3,

              fontStyle:
                "italic",

              color:
                "#555555",

              whiteSpace:
                "nowrap",
            }}
          >
            {date}
          </Typography>
        )}
      </Box>

      {description && (
        <Typography
          sx={{
            fontSize: "13.5px",

            lineHeight:
              1.4,

            color:
              "#1a1a1a",

            marginTop:
              "2px",

            overflowWrap:
              "anywhere",

            wordBreak:
              "break-word",
          }}
        >
          {description}
        </Typography>
      )}

      {bullets.length > 0 && (
        <CombinationBullets
          items={bullets}
        />
      )}
    </Box>
  );
}

function CombinationProject({
  project = {},
}) {
  const name =
    project?.name ||
    project?.title ||
    "";

  const description =
    typeof project?.description ===
    "string"
      ? project.description.trim()
      : "";

  const bullets =
    Array.isArray(
      project?.bullets
    )
      ? project.bullets
          .map((item) =>
            String(item || "")
              .replace(
                /^[\s•●▪◦*-]+/,
                ""
              )
              .trim()
          )
          .filter(Boolean)
      : [];

  if (
    !name &&
    !description &&
    bullets.length === 0
  ) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        marginBottom: "7px",
      }}
    >
      {name && (
        <Typography
          sx={{
            fontSize: "13.5px",

            lineHeight:
              1.35,

            fontWeight: 700,

            color:
              "#1a1a1a",

            overflowWrap:
              "anywhere",

            wordBreak:
              "break-word",
          }}
        >
          {name}
        </Typography>
      )}

      {description && (
        <Typography
          sx={{
            fontSize: "13.5px",

            lineHeight:
              1.4,

            color:
              "#1a1a1a",

            marginTop:
              "2px",

            overflowWrap:
              "anywhere",

            wordBreak:
              "break-word",
          }}
        >
          {description}
        </Typography>
      )}

      {bullets.length > 0 && (
        <CombinationBullets
          items={bullets}
        />
      )}
    </Box>
  );
}

function CombinationCertification({
  certification = {},
}) {
  if (
    typeof certification ===
    "string"
  ) {
    return (
      <Box
        sx={{
          marginBottom:
            "6px",
        }}
      >
        <Typography
          sx={{
            fontSize: "13.5px",

            lineHeight:
              1.35,

            fontWeight:
              700,

            color:
              "#1a1a1a",

            overflowWrap:
              "anywhere",

            wordBreak:
              "break-word",
          }}
        >
          {certification}
        </Typography>
      </Box>
    );
  }

  const name =
    certification?.name ||
    certification?.title ||
    certification?.certification ||
    "";

  const issuer =
    certification?.issuer ||
    certification?.organization ||
    certification?.issuing_organization ||
    certification?.issuingOrganization ||
    "";

  const issueDate =
    certification?.issue_date ||
    certification?.issued_date ||
    certification?.issueDate ||
    certification?.issuedDate ||
    certification?.date ||
    "";

  const expirationDate =
    certification?.expiration_date ||
    certification?.expiry_date ||
    certification?.expirationDate ||
    certification?.expiryDate ||
    "";

  const credentialId =
    certification?.credential_id ||
    certification?.credentialId ||
    certification?.id ||
    "";

  const credentialUrl =
    certification?.credential_url ||
    certification?.credentialUrl ||
    certification?.url ||
    "";

  const description =
    typeof certification?.description ===
    "string"
      ? certification.description.trim()
      : typeof certification?.details ===
        "string"
      ? certification.details.trim()
      : "";

  const bullets =
    Array.isArray(
      certification?.bullets
    )
      ? certification.bullets
          .map((item) =>
            String(item || "")
              .replace(
                /^[\s•●▪◦*-]+/,
                ""
              )
              .trim()
          )
          .filter(Boolean)
      : [];

  const dates = [
    issueDate,
    expirationDate
      ? `Expires ${expirationDate}`
      : "",
  ]
    .filter(Boolean)
    .join(" – ");

  if (
    !name &&
    !issuer &&
    !dates &&
    !credentialId &&
    !credentialUrl &&
    !description &&
    bullets.length === 0
  ) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        marginBottom: "7px",
      }}
    >
      <Box
        sx={{
          width: "100%",

          display: "grid",

          gridTemplateColumns:
            "minmax(0, 1fr) auto",

          columnGap: "12px",

          alignItems:
            "start",
        }}
      >
        <Typography
          sx={{
            minWidth: 0,

            fontSize: "13.5px",

            lineHeight:
              1.35,

            fontWeight:
              700,

            color:
              "#1a1a1a",

            overflowWrap:
              "anywhere",

            wordBreak:
              "break-word",
          }}
        >
          {name}
          {issuer
            ? ` — ${issuer}`
            : ""}
        </Typography>

        {dates && (
          <Typography
            sx={{
              flexShrink: 0,

              fontSize: "13.5px",

              lineHeight:
                1.3,

              fontStyle:
                "italic",

              color:
                "#555555",

              whiteSpace:
                "nowrap",

              textAlign:
                "right",
            }}
          >
            {dates}
          </Typography>
        )}
      </Box>

      {description &&
        bullets.length === 0 && (
          <Typography
            sx={{
              fontSize: "13.5px",

              lineHeight:
                1.4,

              color:
                "#555555",

              marginTop:
                "2px",

              overflowWrap:
                "anywhere",

              wordBreak:
                "break-word",
            }}
          >
            {description}
          </Typography>
        )}

      {bullets.length > 0 && (
        <CombinationBullets
          items={bullets}
        />
      )}

      {credentialId && (
        <Typography
          sx={{
            fontSize: "13.5px",

            lineHeight:
              1.3,

            color:
              "#555555",

            marginTop:
              "2px",

            overflowWrap:
              "anywhere",

            wordBreak:
              "break-word",
          }}
        >
          Credential ID: {credentialId}
        </Typography>
      )}

      {credentialUrl && (
        <Typography
          sx={{
            fontSize: "13.5px",

            lineHeight:
              1.3,

            color:
              "#0f766e",

            marginTop:
              "1px",

            overflowWrap:
              "anywhere",

            wordBreak:
              "break-word",
          }}
        >
          {credentialUrl}
        </Typography>
      )}
    </Box>
  );
}

export default CombinationPreviewContent;