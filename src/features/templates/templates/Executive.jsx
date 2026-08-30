import { Typography, Box } from "@mui/material";

import useResumeStore from "../../../store/resumeStore";
import { buildResumeData } from "../../../data/defaultResumeData";
import { resumeTheme } from "../core/templateStyles";
import ResumePage from "../core/ResumePage";

function Executive({ data, demo = false }) {
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

        fontFamily: resumeTheme.fonts.secondary,

        fontSize: resumeTheme.typography.body.fontSize,

        lineHeight: 1.36,

        overflow: "visible",
      }}
    >
      {/* =====================================================
          EXECUTIVE HEADER
         ===================================================== */}

      <Box
        sx={{
          textAlign: "center",

          marginBottom: "24px",

          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            ...resumeTheme.typography.name,

            color: resumeTheme.colors.heading,

            fontSize: "24px",

            lineHeight: 1.14,

            fontWeight: 800,
          }}
        >
          {resume.full_name || "Your Name"}
        </Typography>

        <Typography
          sx={{
            ...resumeTheme.typography.title,

            color: resumeTheme.colors.accent,

            marginTop: "6px",

            fontWeight: 600,

            fontSize: "12px",

            lineHeight: 1.34,
          }}
        >
          {resume.target_title ||
            "Executive Professional"}
        </Typography>

        {contactLine && (
          <Typography
            sx={{
              ...resumeTheme.typography.contact,

              marginTop: "12px",

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
          HEADER DIVIDER
         ===================================================== */}

      <Box
        sx={{
          width: "100%",

          borderBottom: `1px solid ${resumeTheme.colors.border}`,

          marginBottom: "8px",

          flexShrink: 0,
        }}
      />

      {/* =====================================================
          EXECUTIVE SUMMARY
         ===================================================== */}

      <ExecutiveSection title="Executive Summary">
        <Typography
          sx={{
            ...resumeTheme.typography.body,

            margin: 0,

            overflowWrap: "anywhere",
          }}
        >
          {resume.summary ||
            "Executive professional summary."}
        </Typography>
      </ExecutiveSection>

      {/* =====================================================
          PROFESSIONAL EXPERIENCE
         ===================================================== */}

      <ExecutiveSection title="Professional Experience">
        {resume.experience?.length ? (
          resume.experience.map((item, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: "18px",
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

                    marginTop: "5px",

                    whiteSpace: "pre-line",

                    overflowWrap: "anywhere",
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
      </ExecutiveSection>

      {/* =====================================================
          EDUCATION
         ===================================================== */}

      <ExecutiveSection title="Education">
        {resume.education?.length ? (
          resume.education.map((item, index) => (
            <Box
              key={index}
              sx={{
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
      </ExecutiveSection>

      {/* =====================================================
          CORE SKILLS
         ===================================================== */}

      <ExecutiveSection title="Core Skills">
        <Typography
          sx={{
            ...resumeTheme.typography.body,

            margin: 0,

            overflowWrap: "anywhere",
          }}
        >
          {resume.skills?.length
            ? resume.skills.join(" • ")
            : "Leadership • Management • Communication"}
        </Typography>
      </ExecutiveSection>

      {/* =====================================================
          LANGUAGES
         ===================================================== */}

      <ExecutiveSection title="Languages">
        {resume.languages?.length ? (
          resume.languages.map((lang, index) => (
            <Typography
              key={index}
              sx={{
                ...resumeTheme.typography.body,

                marginBottom: "3px",
              }}
            >
              {lang.name ||
                lang.language ||
                ""}

              {lang.level
                ? ` - ${lang.level}`
                : ""}
            </Typography>
          ))
        ) : null}
      </ExecutiveSection>
    </ResumePage>
  );
}

/* =========================================================
   EXECUTIVE SECTION
   ========================================================= */

function ExecutiveSection({ title, children }) {
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

          borderBottom: `2px solid ${resumeTheme.colors.accent}`,

          paddingBottom: "4px",

          marginBottom: "8px",

          fontSize: "13px",

          lineHeight: 1.24,

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

export default Executive;

