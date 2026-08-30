import { Box, Typography, Divider } from "@mui/material";

import { buildResumeData } from "./defaultResumeData";
import { resumeTheme } from "./templateStyles";
import ResumePage from "./ResumePage";
import modernDemoPhoto from "../photos/modern-demo-photo.jpg";

function ModernTwoColumn({ data, demo = false }) {
  const resume = buildResumeData(data || {}, demo);

  const profilePhoto = demo
    ? modernDemoPhoto
    : resume.photo_path || "";

  return (
    <ResumePage
      sx={{
        ...resumeTheme.page,

        width: "100% !important",

        minWidth: "0 !important",
        minHeight: "297mm !important",

        maxWidth: "100% !important",
        // No fixed/max height here on purpose: this two-column layout
        // must be able to grow past one A4 page when content is long,
        // instead of silently clipping it.

        padding: "0 !important",

        display: "flex !important",
        flexDirection: "row !important",
        flexWrap: "nowrap !important",

        alignItems: "stretch",
        justifyContent: "flex-start",

        overflow: "visible",

        boxSizing: "border-box",

        fontFamily:
          "Arial, Helvetica, sans-serif",

        backgroundColor:
          resumeTheme.colors.white,

        color:
          resumeTheme.colors.heading,

        "& > *": {
          boxSizing: "border-box",
          minWidth: 0,
          minHeight: 0,
        },

        "& *": {
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          width: "32%",
          minWidth: "32%",
          maxWidth: "32%",
          flex: "0 0 32%",
          backgroundColor:
            resumeTheme.colors.dark,
          color:
            resumeTheme.colors.white,
          padding: "28px 24px",
          boxSizing: "border-box",
          overflow: "visible",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: "110px",
            height: "110px",
            minWidth: "110px",
            minHeight: "110px",
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 25px",
            backgroundColor: "#64748b",
            border:
              "3px solid rgba(255,255,255,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxSizing: "border-box",
          }}
        >
          {profilePhoto ? (
            <Box
              component="img"
              src={profilePhoto}
              alt={
                resume.full_name ||
                "Profile"
              }
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          ) : (
            <Typography
              sx={{
                color:
                  resumeTheme.colors.white,
                fontSize: "14px",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              PHOTO
            </Typography>
          )}
        </Box>

        <SidebarSection title="CONTACT">
          {resume.email && (
            <Typography
              component="div"
              sx={{
                ...resumeTheme.typography
                  .sidebarText,
                color:
                  resumeTheme.colors.white,
                overflowWrap:
                  "anywhere",
                wordBreak:
                  "break-word",
              }}
            >
              {resume.email}
            </Typography>
          )}

          {resume.phone && (
            <Typography
              component="div"
              sx={{
                ...resumeTheme.typography
                  .sidebarText,
                color:
                  resumeTheme.colors.white,
              }}
            >
              {resume.phone}
            </Typography>
          )}

          {resume.location && (
            <Typography
              component="div"
              sx={{
                ...resumeTheme.typography
                  .sidebarText,
                color:
                  resumeTheme.colors.white,
              }}
            >
              {resume.location}
            </Typography>
          )}

          {resume.linkedin && (
            <Typography
              component="div"
              sx={{
                ...resumeTheme.typography
                  .sidebarText,
                color:
                  resumeTheme.colors.white,
                overflowWrap:
                  "anywhere",
                wordBreak:
                  "break-word",
              }}
            >
              {resume.linkedin}
            </Typography>
          )}
        </SidebarSection>

        {resume.skills?.length > 0 && (
          <SidebarSection title="SKILLS">
            {resume.skills.map(
              (skill, index) => {
                const value =
                  typeof skill ===
                  "string"
                    ? skill
                    : skill?.title ||
                      skill?.name ||
                      skill?.skill ||
                      "";

                if (!value) {
                  return null;
                }

                return (
                  <Typography
                    key={index}
                    component="div"
                    sx={{
                      ...resumeTheme
                        .typography
                        .sidebarText,
                      color:
                        resumeTheme
                          .colors
                          .white,
                      lineHeight:
                        1.35,
                      overflowWrap:
                        "anywhere",
                      wordBreak:
                        "break-word",
                    }}
                  >
                    • {value}
                  </Typography>
                );
              }
            )}
          </SidebarSection>
        )}

        {resume.languages?.length > 0 && (
          <SidebarSection title="LANGUAGES">
            {resume.languages.map(
              (language, index) => {
                if (
                  typeof language ===
                  "string"
                ) {
                  return (
                    <Typography
                      key={index}
                      component="div"
                      sx={{
                        ...resumeTheme
                          .typography
                          .sidebarText,
                        color:
                          resumeTheme
                            .colors
                            .white,
                        lineHeight:
                          1.35,
                      }}
                    >
                      • {language}
                    </Typography>
                  );
                }

                const name =
                  language?.name ||
                  language?.language ||
                  "";

                const level =
                  language?.level ||
                  "";

                if (!name) {
                  return null;
                }

                return (
                  <Typography
                    key={index}
                    component="div"
                    sx={{
                      ...resumeTheme
                        .typography
                        .sidebarText,
                      color:
                        resumeTheme
                          .colors
                          .white,
                      lineHeight:
                        1.35,
                      overflowWrap:
                        "anywhere",
                      wordBreak:
                        "break-word",
                    }}
                  >
                    • {name}
                    {level
                      ? ` — ${level}`
                      : ""}
                  </Typography>
                );
              }
            )}
          </SidebarSection>
        )}
      </Box>

      <Box
        sx={{
          width: "68%",
          minWidth: 0,
          maxWidth: "68%",
          flex: "0 0 68%",
          padding: "34px 30px",
          boxSizing: "border-box",
          overflow: "visible",
          backgroundColor:
            resumeTheme.colors.white,
          color:
            resumeTheme.colors.heading,
        }}
      >
        <Box
          sx={{
            width: "100%",
            minWidth: 0,
            margin: 0,
            padding: 0,
            flexShrink: 0,
          }}
        >
          <Typography
            component="div"
            sx={{
              ...resumeTheme.typography
                .name,
              color:
                resumeTheme.colors
                  .heading,
              fontSize: "22px",
              margin: 0,
              overflowWrap:
                "anywhere",
              wordBreak:
                "break-word",
            }}
          >
            {resume.full_name ||
              "Your Name"}
          </Typography>

          <Typography
            component="div"
            sx={{
              ...resumeTheme.typography
                .title,
              color:
                resumeTheme.colors
                  .accent,
              marginBottom:
                "18px",
              overflowWrap:
                "anywhere",
              wordBreak:
                "break-word",
            }}
          >
            {resume.target_title ||
              "Professional Title"}
          </Typography>
        </Box>

        {resume.summary && (
          <MainSection
            title="PROFESSIONAL SUMMARY"
          >
            <Typography
              component="div"
              sx={{
                ...resumeTheme
                  .typography
                  .body,
                overflowWrap:
                  "anywhere",
                wordBreak:
                  "break-word",
              }}
            >
              {resume.summary}
            </Typography>
          </MainSection>
        )}

        <MainSection
          title="WORK EXPERIENCE"
        >
          {resume.experience?.length >
          0 ? (
            resume.experience.map(
              (job, index) => (
                <ModernExperience
                  key={index}
                  job={job}
                />
              )
            )
          ) : (
            <Typography
              component="div"
              sx={{
                ...resumeTheme
                  .typography
                  .body,
              }}
            >
              No experience added.
            </Typography>
          )}
        </MainSection>

        <MainSection title="EDUCATION">
          {resume.education?.length >
          0 ? (
            resume.education.map(
              (
                education,
                index
              ) => (
                <ModernEducation
                  key={index}
                  education={
                    education
                  }
                />
              )
            )
          ) : (
            <Typography
              component="div"
              sx={{
                ...resumeTheme
                  .typography
                  .body,
              }}
            >
              No education added.
            </Typography>
          )}
        </MainSection>

        {resume.certifications
          ?.length > 0 && (
          <MainSection
            title="CERTIFICATIONS"
          >
            {resume.certifications.map(
              (
                certification,
                index
              ) => (
                <ModernCertification
                  key={index}
                  certification={
                    certification
                  }
                />
              )
            )}
          </MainSection>
        )}
      </Box>
    </ResumePage>
  );
}

function SidebarSection({
  title,
  children,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        marginTop: "22px",
        flexShrink: 0,
        boxSizing:
          "border-box",
      }}
    >
      <Typography
        component="div"
        sx={{
          ...resumeTheme.typography
            .sectionTitle,
          color:
            resumeTheme.colors
              .white,
          fontSize: "14px",
          margin: 0,
        }}
      >
        {title}
      </Typography>

      <Divider
        sx={{
          backgroundColor:
            resumeTheme.colors
              .white,
          opacity: 0.8,
          margin:
            "6px 0 8px",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection:
            "column",
          gap: "3px",
          width: "100%",
          minWidth: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function MainSection({
  title,
  children,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        marginTop:
          resumeTheme.spacing.section,
        flexShrink: 0,
      }}
    >
      <Typography
        component="div"
        sx={{
          ...resumeTheme.typography
            .sectionTitle,
          color:
            resumeTheme.colors
              .heading,
          borderBottom:
            `2px solid ${resumeTheme.colors.heading}`,
          paddingBottom: "5px",
          marginBottom: "10px",
          overflowWrap:
            "anywhere",
          wordBreak:
            "break-word",
        }}
      >
        {title}
      </Typography>

      {children}
    </Box>
  );
}

function ModernExperience({
  job,
}) {
  const title =
    job?.title ||
    job?.job_title ||
    job?.role ||
    "Job Title";

  const company =
    job?.company || "";

  const location =
    job?.location || "";

  const dates = [
    job?.start_date,
    job?.end_date,
  ]
    .filter(Boolean)
    .join(" – ");

  const bullets =
    Array.isArray(
      job?.bullets
    )
      ? job.bullets
          .map((bullet) =>
            String(
              bullet || ""
            )
              .replace(
                /^[\s•●▪◦*-]+/,
                ""
              )
              .trim()
          )
          .filter(Boolean)
      : typeof job?.description ===
        "string"
      ? job.description
          .split(
            /\n|\u2022|•/
          )
          .map((item) =>
            item
              .replace(
                /^[\s•●▪◦*-]+/,
                ""
              )
              .trim()
          )
          .filter(Boolean)
      : [];

  return (
    <Box
      sx={{
        ...resumeTheme.elements
          .item,
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
        boxSizing:
          "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1fr) auto",
          columnGap: "12px",
          alignItems:
            "start",
        }}
      >
        <Typography
          component="div"
          sx={{
            ...resumeTheme
              .typography
              .jobTitle,
            minWidth: 0,
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
            component="div"
            sx={{
              ...resumeTheme
                .typography
                .meta,
              flexShrink: 0,
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
          component="div"
          sx={{
            ...resumeTheme.typography
              .meta,
            marginTop: "4px",
            overflowWrap:
              "anywhere",
            wordBreak:
              "break-word",
          }}
        >
          {location}
        </Typography>
      )}

      {bullets.map(
        (
          bullet,
          bulletIndex
        ) => (
          <Typography
            component="div"
            key={bulletIndex}
            sx={{
              ...resumeTheme
                .typography
                .bullet,
              overflowWrap:
                "anywhere",
              wordBreak:
                "break-word",
            }}
          >
            • {bullet}
          </Typography>
        )
      )}
    </Box>
  );
}

function ModernEducation({
  education,
}) {
  const degree =
    education?.degree ||
    "Degree";

  const institution =
    education?.institution ||
    education?.school ||
    "";

  const location =
    education?.location || "";

  const gradDate =
    education?.grad_date ||
    education?.end_date ||
    education?.date ||
    "";

  return (
    <Box
      sx={{
        ...resumeTheme.elements
          .item,
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
        boxSizing:
          "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1fr) auto",
          columnGap: "12px",
          alignItems:
            "start",
        }}
      >
        <Typography
          component="div"
          sx={{
            ...resumeTheme
              .typography
              .jobTitle,
            minWidth: 0,
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

        {gradDate && (
          <Typography
            component="div"
            sx={{
              ...resumeTheme
                .typography
                .meta,
              flexShrink: 0,
              whiteSpace:
                "nowrap",
              textAlign:
                "right",
            }}
          >
            {gradDate}
          </Typography>
        )}
      </Box>

      {location && (
        <Typography
          component="div"
          sx={{
            ...resumeTheme.typography
              .meta,
            marginTop: "4px",
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
  );
}

function ModernCertification({
  certification,
}) {
  if (
    typeof certification ===
    "string"
  ) {
    return (
      <Box
        sx={{
          ...resumeTheme.elements
            .item,
        }}
      >
        <Typography
          component="div"
          sx={{
            ...resumeTheme.typography
              .jobTitle,
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
    certification?.certificate ||
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

  const dates = [
    issueDate,
    expirationDate
      ? `Expires ${expirationDate}`
      : "",
  ]
    .filter(Boolean)
    .join(" – ");

  return (
    <Box
      sx={{
        ...resumeTheme.elements
          .item,
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
        boxSizing:
          "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1fr) auto",
          columnGap: "12px",
          alignItems:
            "start",
        }}
      >
        <Typography
          component="div"
          sx={{
            ...resumeTheme.typography
              .jobTitle,
            minWidth: 0,
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
            component="div"
            sx={{
              ...resumeTheme
                .typography
                .meta,
              flexShrink: 0,
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
    </Box>
  );
}

export default ModernTwoColumn;