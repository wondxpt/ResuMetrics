import { Box, Typography } from "@mui/material";
import { buildResumeData } from "../templates/defaultResumeData";

function CombinationPreviewContent({ data = {}, demo = false }) {
  const resume = buildResumeData(data, demo);

  const contactLine = [
    resume.location,
    resume.phone,
    resume.email,
    resume.linkedin,
  ]
    .filter(Boolean)
    .join(" | ");

  const hasSkills =
    Array.isArray(resume.skills) && resume.skills.length > 0;

  const hasCertifications =
    Array.isArray(resume.certifications) &&
    resume.certifications.length > 0;

  return (
    <Box
      className="resume-page"
      dir="ltr"
      sx={{
        width: "794px",
        minWidth: "794px",
        minHeight: "1123px",
        maxWidth: "794px",
        // No fixed/max height here on purpose: content longer than one
        // A4 page must be able to grow past 1123px instead of being
        // clipped, so it can flow onto a second PDF page.

        bgcolor: "#ffffff",
        boxSizing: "border-box",
        overflow: "visible",

        px: "75px",
        py: "75px",

        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#1a1a1a",

        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* =====================================================
          HEADER
         ===================================================== */}

      <Box
        sx={{
          width: "100%",
          bgcolor: "#0f766e",

          boxSizing: "border-box",

          px: "18px",
          py: "20px",

          textAlign: "center",

          flexShrink: 0,

          mb: "14px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "26px",
            lineHeight: 1.15,
            fontWeight: 700,
            color: "#ffffff",
            mb: "3px",
            overflowWrap: "anywhere",
          }}
        >
          {resume.full_name || "Michael Anderson"}
        </Typography>

        {resume.target_title && (
          <Typography
            sx={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "16px",
              lineHeight: 1.3,
              fontWeight: 400,
              color: "#ffffff",
              mb: "7px",
              overflowWrap: "anywhere",
            }}
          >
            {resume.target_title}
          </Typography>
        )}

        <Typography
          sx={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "14px",
            lineHeight: 1.4,
            color: "#e2e8f0",
            overflowWrap: "anywhere",
          }}
        >
          {contactLine ||
            "Toronto, Canada | +1 416 555 0188 | michael.anderson@email.com"}
        </Typography>
      </Box>

      {/* =====================================================
          PROFESSIONAL SUMMARY
         ===================================================== */}

      {resume.summary && (
        <ResumeSection title="PROFESSIONAL SUMMARY">
          <Typography
            className="resume-body"
            sx={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "13.5px",
              lineHeight: 1.5,
              color: "#1a1a1a",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              margin: 0,
            }}
          >
            {resume.summary}
          </Typography>
        </ResumeSection>
      )}

      {/* =====================================================
          KEY SKILLS
         ===================================================== */}

      {hasSkills && (
        <ResumeSection title="KEY SKILLS">
          <Box
            sx={{
              width: "100%",

              bgcolor: "#f1f5f9",

              border: "1px solid #0f766e",

              boxSizing: "border-box",

              px: "12px",
              py: "10px",

              borderRadius: "0px",

              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Arial, Helvetica, sans-serif",

                fontSize: "14px",

                lineHeight: 1.55,

                color: "#1a1a1a",

                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              {resume.skills
                .map((skill) => {
                  if (typeof skill === "string") {
                    return skill;
                  }

                  return (
                    skill?.title ||
                    skill?.name ||
                    skill?.skill ||
                    ""
                  );
                })
                .filter(Boolean)
                .join(" • ")}
            </Typography>
          </Box>
        </ResumeSection>
      )}

      {/* =====================================================
          WORK EXPERIENCE
         ===================================================== */}

      {Array.isArray(resume.experience) &&
        resume.experience.length > 0 && (
          <ResumeSection title="WORK EXPERIENCE">
            {resume.experience.map((job, index) => (
              <Experience
                key={index}
                job={job}
              />
            ))}
          </ResumeSection>
        )}

      {/* =====================================================
          EDUCATION
         ===================================================== */}

      {Array.isArray(resume.education) &&
        resume.education.length > 0 && (
          <ResumeSection title="EDUCATION">
            {resume.education.map((edu, index) => (
              <EducationItem
                key={index}
                edu={edu}
              />
            ))}
          </ResumeSection>
        )}

      {/* =====================================================
          PROJECTS
         ===================================================== */}

      {Array.isArray(resume.projects) &&
        resume.projects.length > 0 && (
          <ResumeSection title="PROJECTS">
            {resume.projects.map((project, index) => (
              <ProjectItem
                key={index}
                project={project}
              />
            ))}
          </ResumeSection>
        )}

      {/* =====================================================
          CERTIFICATIONS
         ===================================================== */}

      {hasCertifications && (
        <ResumeSection title="CERTIFICATIONS">
          {resume.certifications.map(
            (certification, index) => (
              <CertificationItem
                key={index}
                certification={certification}
              />
            )
          )}
        </ResumeSection>
      )}

      {/* =====================================================
          LANGUAGES
         ===================================================== */}

      {Array.isArray(resume.languages) &&
        resume.languages.length > 0 && (
          <ResumeSection title="LANGUAGES">
            <Box
              component="ul"
              sx={{
                margin: 0,
                paddingLeft: "18px",

                "& li": {
                  fontFamily:
                    "Arial, Helvetica, sans-serif",

                  fontSize: "13.5px",

                  lineHeight: 1.42,

                  color: "#1a1a1a",

                  marginBottom: "7px",

                  paddingLeft: "2px",

                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                },
              }}
            >
              {resume.languages.map(
                (language, index) => {
                  if (typeof language === "string") {
                    return (
                      <li key={index}>
                        {language}
                      </li>
                    );
                  }

                  const name =
                    language?.name ||
                    language?.language ||
                    "";

                  const level =
                    language?.level || "";

                  if (!name) {
                    return null;
                  }

                  return (
                    <li key={index}>
                      {level
                        ? `${name} (${level})`
                        : name}
                    </li>
                  );
                }
              )}
            </Box>
          </ResumeSection>
        )}

      {/* =====================================================
          HIGHLIGHTS
         ===================================================== */}

      {Array.isArray(resume.highlights) &&
        resume.highlights.length > 0 && (
          <ResumeSection title="HIGHLIGHTS">
            <Box
              component="ul"
              sx={{
                margin: 0,
                paddingLeft: "18px",

                "& li": {
                  fontFamily:
                    "Arial, Helvetica, sans-serif",

                  fontSize: "13.5px",

                  lineHeight: 1.42,

                  color: "#1a1a1a",

                  marginBottom: "7px",

                  paddingLeft: "2px",

                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                },
              }}
            >
              {resume.highlights.map(
                (highlight, index) => (
                  <li key={index}>
                    {highlight}
                  </li>
                )
              )}
            </Box>
          </ResumeSection>
        )}
    </Box>
  );
}

/* =========================================================
   SECTION
   Python:
   SectionHeader + section_divider
   ========================================================= */

function ResumeSection({ title, children }) {
  return (
    <Box
      sx={{
        flexShrink: 0,

        mb: "18px",

        minWidth: 0,
      }}
    >
      <Typography
        sx={{
          fontFamily:
            "Arial, Helvetica, sans-serif",

          fontSize: "15px",

          lineHeight: "19px",

          fontWeight: 700,

          color: "#0f766e",

          mb: "5px",

          textTransform: "uppercase",

          letterSpacing: "0.2px",

          overflowWrap: "anywhere",
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          width: "100%",

          height: "1px",

          bgcolor: "#0f766e",

          mb: "7px",

          flexShrink: 0,
        }}
      />

      {children}
    </Box>
  );
}

/* =========================================================
   EXPERIENCE
   ========================================================= */

function Experience({ job = {} }) {
  const title =
    job.title ||
    job.job_title ||
    job.role ||
    "";

  const company =
    job.company || "";

  const location =
    job.location || "";

  const dates = [
    job.start_date,
    job.end_date,
  ]
    .filter(Boolean)
    .join(" – ");

  let bullets = [];

  if (Array.isArray(job.bullets)) {
    bullets = job.bullets
      .map((bullet) =>
        String(bullet || "")
          .replace(/^[\s•●▪◦*-]+/, "")
          .trim()
      )
      .filter(Boolean);
  } else if (
    typeof job.description === "string"
  ) {
    bullets = job.description
      .split(/\r?\n|\u2022|•/)
      .map((item) =>
        item
          .replace(/^[\s•●▪◦*-]+/, "")
          .trim()
      )
      .filter(Boolean);
  }

  if (
    !title &&
    !company &&
    !location
  ) {
    return null;
  }

  return (
    <Box
      sx={{
        mb: "14px",

        flexShrink: 0,

        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: "baseline",

          gap: "12px",

          mb: "2px",

          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "14px",

            lineHeight: 1.3,

            fontWeight: 700,

            color: "#1a1a1a",

            minWidth: 0,

            flex: 1,

            overflowWrap: "anywhere",

            wordBreak: "break-word",
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
              fontFamily:
                "Arial, Helvetica, sans-serif",

              fontSize: "13.5px",

              lineHeight: 1.3,

              color: "#555555",

              fontStyle: "italic",

              whiteSpace: "nowrap",

              flexShrink: 0,
            }}
          >
            {dates}
          </Typography>
        )}
      </Box>

      {company && (
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13.5px",

            lineHeight: 1.4,

            fontWeight: 600,

            color: "#0f766e",

            mb: "4px",

            overflowWrap: "anywhere",

            wordBreak: "break-word",
          }}
        >
          {company}
          {location
            ? ` — ${location}`
            : ""}
        </Typography>
      )}

      {!company && location && (
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13.5px",

            lineHeight: 1.4,

            fontWeight: 600,

            color: "#0f766e",

            mb: "4px",

            overflowWrap: "anywhere",

            wordBreak: "break-word",
          }}
        >
          {location}
        </Typography>
      )}

      {bullets.length > 0 && (
        <Box
          component="ul"
          sx={{
            margin: 0,

            paddingLeft: "18px",

            "& li": {
              fontFamily:
                "Arial, Helvetica, sans-serif",

              fontSize: "13.5px",

              lineHeight: 1.42,

              color: "#1a1a1a",

              marginBottom: "7px",

              paddingLeft: "2px",

              overflowWrap: "anywhere",

              wordBreak: "break-word",
            },
          }}
        >
          {bullets.map(
            (bullet, index) => (
              <li key={index}>
                {bullet}
              </li>
            )
          )}
        </Box>
      )}
    </Box>
  );
}

/* =========================================================
   EDUCATION
   ========================================================= */

function EducationItem({ edu = {} }) {
  const degree =
    edu.degree ||
    edu.field ||
    "";

  const institution =
    edu.institution ||
    edu.school ||
    edu.university ||
    "";

  const location =
    edu.location || "";

  const gradDate =
    edu.grad_date ||
    edu.end_date ||
    edu.date ||
    "";

  const description =
    typeof edu.description === "string"
      ? edu.description.trim()
      : "";

  const bullets =
    Array.isArray(edu.bullets)
      ? edu.bullets
          .map((bullet) =>
            String(bullet || "")
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
    !gradDate &&
    !description &&
    !bullets.length
  ) {
    return null;
  }

  return (
    <Box
      sx={{
        mb: "10px",

        flexShrink: 0,

        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "baseline",

          gap: "12px",

          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "14px",

            lineHeight: 1.35,

            fontWeight: 700,

            color: "#1a1a1a",

            minWidth: 0,

            flex: 1,

            overflowWrap: "anywhere",

            wordBreak: "break-word",
          }}
        >
          {degree}

          {institution
            ? ` — ${institution}`
            : ""}
        </Typography>

        {gradDate && (
          <Typography
            sx={{
              fontFamily:
                "Arial, Helvetica, sans-serif",

              fontSize: "13.5px",

              lineHeight: 1.4,

              color: "#555555",

              fontStyle: "italic",

              whiteSpace: "nowrap",

              flexShrink: 0,
            }}
          >
            {gradDate}
          </Typography>
        )}
      </Box>

      {location && (
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13.5px",

            lineHeight: 1.4,

            color: "#555555",

            overflowWrap: "anywhere",

            wordBreak: "break-word",
          }}
        >
          {location}
        </Typography>
      )}

      {description && (
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13.5px",

            lineHeight: 1.42,

            color: "#1a1a1a",

            mt: "3px",

            overflowWrap: "anywhere",

            wordBreak: "break-word",
          }}
        >
          {description}
        </Typography>
      )}

      {bullets.length > 0 && (
        <Box
          component="ul"
          sx={{
            margin: 0,

            marginTop: "5px",

            paddingLeft: "18px",

            "& li": {
              fontFamily:
                "Arial, Helvetica, sans-serif",

              fontSize: "13.5px",

              lineHeight: 1.42,

              color: "#1a1a1a",

              marginBottom: "7px",

              paddingLeft: "2px",

              overflowWrap: "anywhere",

              wordBreak: "break-word",
            },
          }}
        >
          {bullets.map(
            (bullet, index) => (
              <li key={index}>
                {bullet}
              </li>
            )
          )}
        </Box>
      )}
    </Box>
  );
}

/* =========================================================
   PROJECTS
   ========================================================= */

function ProjectItem({ project = {} }) {
  const name =
    project.name ||
    project.title ||
    "";

  const description =
    typeof project.description === "string"
      ? project.description.trim()
      : "";

  const bullets =
    Array.isArray(project.bullets)
      ? project.bullets
          .map((bullet) =>
            String(bullet || "")
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
    !bullets.length
  ) {
    return null;
  }

  return (
    <Box
      sx={{
        mb: "10px",

        flexShrink: 0,

        minWidth: 0,
      }}
    >
      {name && (
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "14px",

            lineHeight: 1.35,

            fontWeight: 700,

            color: "#1a1a1a",

            overflowWrap: "anywhere",

            wordBreak: "break-word",
          }}
        >
          {name}
        </Typography>
      )}

      {description && (
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13.5px",

            lineHeight: 1.42,

            color: "#1a1a1a",

            mt: "3px",

            overflowWrap: "anywhere",

            wordBreak: "break-word",
          }}
        >
          {description}
        </Typography>
      )}

      {bullets.length > 0 && (
        <Box
          component="ul"
          sx={{
            margin: 0,

            marginTop: "5px",

            paddingLeft: "18px",

            "& li": {
              fontFamily:
                "Arial, Helvetica, sans-serif",

              fontSize: "13.5px",

              lineHeight: 1.42,

              color: "#1a1a1a",

              marginBottom: "7px",

              paddingLeft: "2px",

              overflowWrap: "anywhere",

              wordBreak: "break-word",
            },
          }}
        >
          {bullets.map(
            (bullet, index) => (
              <li key={index}>
                {bullet}
              </li>
            )
          )}
        </Box>
      )}
    </Box>
  );
}

/* =========================================================
   CERTIFICATIONS
   ========================================================= */

function CertificationItem({
  certification = {},
}) {
  if (
    typeof certification === "string"
  ) {
    return (
      <Box
        sx={{
          mb: "9px",

          flexShrink: 0,

          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "14px",

            lineHeight: 1.4,

            fontWeight: 700,

            color: "#1a1a1a",

            overflowWrap: "anywhere",

            wordBreak: "break-word",
          }}
        >
          {certification}
        </Typography>
      </Box>
    );
  }

  const name =
    certification.name ||
    certification.title ||
    certification.certification ||
    "";

  const issuer =
    certification.issuer ||
    certification.organization ||
    certification.issuing_organization ||
    "";

  const issueDate =
    certification.issue_date ||
    certification.issued_date ||
    "";

  const expirationDate =
    certification.expiration_date ||
    certification.expiry_date ||
    "";

  const credentialId =
    certification.credential_id ||
    certification.id ||
    "";

  const credentialUrl =
    certification.credential_url ||
    certification.url ||
    "";

  if (
    !name &&
    !issuer &&
    !issueDate &&
    !expirationDate &&
    !credentialId &&
    !credentialUrl
  ) {
    return null;
  }

  return (
    <Box
      sx={{
        mb: "10px",

        flexShrink: 0,

        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "baseline",

          gap: "12px",

          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "14px",

            lineHeight: 1.4,

            fontWeight: 700,

            color: "#1a1a1a",

            minWidth: 0,

            flex: 1,

            overflowWrap: "anywhere",

            wordBreak: "break-word",
          }}
        >
          {name || "Certification"}

          {issuer
            ? ` — ${issuer}`
            : ""}
        </Typography>

        {issueDate && (
          <Typography
            sx={{
              fontFamily:
                "Arial, Helvetica, sans-serif",

              fontSize: "13.5px",

              lineHeight: 1.35,

              color: "#555555",

              fontStyle: "italic",

              whiteSpace: "nowrap",

              flexShrink: 0,
            }}
          >
            {issueDate}
          </Typography>
        )}
      </Box>

      {expirationDate && (
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13.5px",

            lineHeight: 1.35,

            color: "#555555",

            overflowWrap: "anywhere",

            wordBreak: "break-word",
          }}
        >
          Expires: {expirationDate}
        </Typography>
      )}

      {credentialId && (
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13.5px",

            lineHeight: 1.35,

            color: "#555555",

            overflowWrap: "anywhere",

            wordBreak: "break-word",
          }}
        >
          Credential ID: {credentialId}
        </Typography>
      )}

      {credentialUrl && (
        <Typography
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13.5px",

            lineHeight: 1.35,

            color: "#0f766e",

            overflowWrap: "anywhere",

            wordBreak: "break-word",
          }}
        >
          {credentialUrl}
        </Typography>
      )}
    </Box>
  );
}

export default CombinationPreviewContent;