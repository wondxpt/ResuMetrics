import { Typography, Box } from "@mui/material";

import useResumeStore from "../../../store/resumeStore";
import { buildResumeData } from "../../../data/defaultResumeData";
import { resumeTheme } from "../core/templateStyles";
import ResumePage from "../core/ResumePage";

function Corporate({ data, demo = false }) {
  const storeData = useResumeStore((state) => state);

  const resume = buildResumeData(
    demo ? {} : data || storeData,
    demo
  );

  const contactLine = [
    resume.email,
    resume.phone,
    resume.location,
    resume.linkedin,
  ]
    .filter(Boolean)
    .join(" | ");

  return (
    <ResumePage
      sx={{
        ...resumeTheme.page,

        padding: "30px 38px",

        background: resumeTheme.colors.white,

        fontFamily: resumeTheme.fonts.primary,

        fontSize: resumeTheme.typography.body.fontSize,

        lineHeight: 1.36,

        overflow: "visible",
      }}
    >
      {/* =====================================================
          HEADER
         ===================================================== */}

      <Box
        sx={{
          borderBottom: `2px solid ${resumeTheme.colors.heading}`,

          pb: 1.2,

          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            ...resumeTheme.typography.name,

            color: resumeTheme.colors.heading,

            fontSize: "24px",

            lineHeight: 1.14,

            margin: 0,
          }}
        >
          {resume.full_name || "Your Name"}
        </Typography>

        <Typography
          sx={{
            ...resumeTheme.typography.title,

            color: resumeTheme.colors.grey,

            marginTop: "6px",

            fontSize: "12px",

            lineHeight: 1.36,
          }}
        >
          {resume.target_title || "Professional Title"}
        </Typography>

        {contactLine && (
          <Typography
            sx={{
              ...resumeTheme.typography.contact,

              marginTop: "10px",

              color: resumeTheme.colors.muted,

              lineHeight: 1.5,

              overflowWrap: "anywhere",
            }}
          >
            {contactLine}
          </Typography>
        )}
      </Box>

      {/* =====================================================
          PROFESSIONAL SUMMARY
         ===================================================== */}

      <Section title="Professional Summary">
        <Typography
          sx={{
            ...resumeTheme.typography.body,

            margin: 0,

            overflowWrap: "anywhere",
          }}
        >
          {resume.summary ||
            "Professional summary will appear here."}
        </Typography>
      </Section>

      {/* =====================================================
          PROFESSIONAL EXPERIENCE
         ===================================================== */}

      <Section title="Professional Experience">
        {resume.experience?.length > 0 ? (
          resume.experience.map((item, index) => (
            <Box
              key={index}
              sx={{
                ...resumeTheme.elements.item,

                marginBottom: "16px",
              }}
            >
              <Typography
                sx={{
                  ...resumeTheme.typography.jobTitle,

                  color: resumeTheme.colors.heading,

                  margin: 0,
                }}
              >
                {item.job_title ||
                  item.title ||
                  "Job Title"}
              </Typography>

              {item.company && (
                <Typography
                  sx={{
                    ...resumeTheme.typography.body,

                    fontWeight: 600,

                    marginTop: "2px",
                  }}
                >
                  {item.company}
                </Typography>
              )}

              {(item.location ||
                item.start_date ||
                item.end_date) && (
                <Typography
                  sx={{
                    ...resumeTheme.typography.meta,

                    marginTop: "3px",

                    marginBottom: "5px",
                  }}
                >
                  {[
                    item.location,
                    item.start_date,
                    item.end_date,
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </Typography>
              )}

              {item.bullets?.length ? (
                item.bullets.map(
                  (bullet, bulletIndex) => (
                    <Typography
                      key={bulletIndex}
                      component="div"
                      sx={{
                        ...resumeTheme.typography.bullet,

                        ...resumeTheme.elements.bullet,

                        lineHeight: 1.45,
                      }}
                    >
                      • {bullet}
                    </Typography>
                  )
                )
              ) : item.description ? (
                <Typography
                  sx={{
                    ...resumeTheme.typography.body,

                    whiteSpace: "pre-line",

                    marginTop: "4px",
                  }}
                >
                  {item.description}
                </Typography>
              ) : null}
            </Box>
          ))
        ) : (
          <Typography
            sx={{
              ...resumeTheme.typography.body,
            }}
          >
            No experience added.
          </Typography>
        )}
      </Section>

      {/* =====================================================
          EDUCATION
         ===================================================== */}

      <Section title="Education">
        {resume.education?.length ? (
          resume.education.map((item, index) => (
            <Box
              key={index}
              sx={{
                ...resumeTheme.elements.item,

                marginBottom: "12px",
              }}
            >
              <Typography
                sx={{
                  ...resumeTheme.typography.jobTitle,

                  margin: 0,
                }}
              >
                {item.degree || "Degree"}
              </Typography>

              <Typography
                sx={{
                  ...resumeTheme.typography.body,

                  marginTop: "2px",
                }}
              >
                {item.institution ||
                  item.school ||
                  "Institution"}
              </Typography>

              {(item.location ||
                item.grad_date) && (
                <Typography
                  sx={{
                    ...resumeTheme.typography.meta,

                    marginTop: "3px",
                  }}
                >
                  {[
                    item.location,
                    item.grad_date,
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </Typography>
              )}
            </Box>
          ))
        ) : null}
      </Section>

      {/* =====================================================
          SKILLS
         ===================================================== */}

      <Section title="Skills">
        <Typography
          sx={{
            ...resumeTheme.typography.body,

            margin: 0,

            overflowWrap: "anywhere",
          }}
        >
          {resume.skills?.length
            ? resume.skills.join(", ")
            : "Skills will appear here."}
        </Typography>
      </Section>

      {/* =====================================================
          LANGUAGES
         ===================================================== */}

      <Section title="Languages">
        {resume.languages?.length ? (
          resume.languages.map((lang, index) => (
            <Typography
              key={index}
              sx={{
                ...resumeTheme.typography.body,

                marginBottom: "3px",
              }}
            >
              {lang.name || lang.language || ""}

              {lang.level
                ? ` - ${lang.level}`
                : ""}
            </Typography>
          ))
        ) : null}
      </Section>
    </ResumePage>
  );
}

/* =========================================================
   SECTION
   ========================================================= */

function Section({ title, children }) {
  return (
    <Box
      sx={{
        marginTop: resumeTheme.spacing.section,

        marginBottom: "8px",
      }}
    >
      <Typography
        sx={{
          ...resumeTheme.typography.sectionTitle,

          color: resumeTheme.colors.heading,

          borderBottom: `1px solid ${resumeTheme.colors.heading}`,

          paddingBottom: "4px",

          marginBottom: "8px",

          textTransform: "uppercase",

          letterSpacing: "0.12em",
        }}
      >
        {title}
      </Typography>

      {children}
    </Box>
  );
}

export default Corporate;

