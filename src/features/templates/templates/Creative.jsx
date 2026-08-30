
import React from "react";
import { Box, Typography } from "@mui/material";

import { buildResumeData } from "../../../data/defaultResumeData";
import { resumeTheme } from "../core/templateStyles";
import ResumePage from "../core/ResumePage";

const COLORS = {
  accent: "#9d174d",
  dark: "#1a1a1a",
  gray: "#555555",
  white: "#ffffff",
  sidebarText: "#fce7f3",
};

function Creative({ data, demo = false }) {
  const resume = buildResumeData(data || {}, demo);

  const {
    full_name = "",
    target_title = "",
    location = "",
    email = "",
    phone = "",
    linkedin = "",
    summary = "",
    photo_path = "",
    experience = [],
    education = [],
    certifications = [],
    skills = [],
    languages = [],
  } = resume;

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

        display: "flex !important",
        flexDirection: "row !important",
        flexWrap: "nowrap !important",

        alignItems: "stretch",
        justifyContent: "flex-start",

        padding: 0,

        overflow: "visible",

        boxSizing: "border-box",

        backgroundColor: COLORS.white,
        color: COLORS.dark,

        fontFamily: "Arial, Helvetica, sans-serif",

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
      {/* LEFT SIDEBAR */}

      <Box
        sx={{
          width: "32%",
          minWidth: "32%",
          maxWidth: "32%",

          flex: "0 0 32%",

          backgroundColor: COLORS.accent,
          color: COLORS.white,

          padding: "28px 22px",

          overflow: "visible",

          display: "flex",
          flexDirection: "column",

          boxSizing: "border-box",
        }}
      >
        {/* PHOTO */}

        <Box
          sx={{
            width: 110,
            height: 110,
            minWidth: 110,
            minHeight: 110,
            flexShrink: 0,
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 25px",
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "3px solid rgba(255,255,255,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          {photo_path ? (
            <Box
              component="img"
              src={photo_path}
              alt={full_name || "Profile"}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <Typography
              sx={{
                color: COLORS.white,
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              PHOTO
            </Typography>
          )}
        </Box>

        {/* CONTACT */}

        <CreativeSidebarSection title="CONTACT">
          {email && (
            <Typography sx={sidebarTextStyle}>
              {email}
            </Typography>
          )}

          {phone && (
            <Typography sx={sidebarTextStyle}>
              {phone}
            </Typography>
          )}

          {location && (
            <Typography sx={sidebarTextStyle}>
              {location}
            </Typography>
          )}

          {linkedin && (
            <Typography
              sx={{
                ...sidebarTextStyle,
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              {linkedin}
            </Typography>
          )}
        </CreativeSidebarSection>

        {/* SKILLS */}

        {skills.length > 0 && (
          <CreativeSidebarSection title="SKILLS">
            {skills.map((skill, index) => {
              const value =
                typeof skill === "string"
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
                  sx={{
                    ...sidebarTextStyle,
                    marginBottom: "5px",
                  }}
                >
                  • {value}
                </Typography>
              );
            })}
          </CreativeSidebarSection>
        )}

        {/* LANGUAGES */}

        {languages.length > 0 && (
          <CreativeSidebarSection title="LANGUAGES">
            {languages.map((language, index) => {
              const name =
                typeof language === "string"
                  ? language
                  : language?.name ||
                    language?.language ||
                    "";

              const level =
                typeof language === "string"
                  ? ""
                  : language?.level || "";

              if (!name) {
                return null;
              }

              return (
                <Typography
                  key={index}
                  sx={{
                    ...sidebarTextStyle,
                    marginBottom: "5px",
                  }}
                >
                  {name}
                  {level ? ` — ${level}` : ""}
                </Typography>
              );
            })}
          </CreativeSidebarSection>
        )}
      </Box>

      {/* RIGHT MAIN CONTENT */}

      <Box
        sx={{
          width: "68%",
          minWidth: 0,
          maxWidth: "68%",

          flex: "0 0 68%",

          padding: "34px 30px",

          overflow: "visible",

          boxSizing: "border-box",

          backgroundColor: COLORS.white,
          color: COLORS.dark,
        }}
      >
        {/* HEADER */}

        <Box
          sx={{
            width: "100%",
            minWidth: 0,

            marginBottom: "18px",
          }}
        >
          <Typography
            component="div"
            sx={{
              fontFamily: "Arial, Helvetica, sans-serif",

              fontSize: "22px",
              lineHeight: 1.15,
              fontWeight: 700,

              color: COLORS.dark,

              margin: 0,
              marginBottom: "5px",

              padding: 0,

              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {full_name || "FULL NAME"}
          </Typography>

          {target_title && (
            <Typography
              component="div"
              sx={{
                fontFamily: "Arial, Helvetica, sans-serif",

                fontSize: "14px",
                lineHeight: 1.35,
                fontWeight: 400,

                color: COLORS.accent,

                margin: 0,
                padding: 0,

                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              {target_title}
            </Typography>
          )}
        </Box>

        {/* PROFESSIONAL SUMMARY */}

        {summary && (
          <CreativeMainSection title="PROFESSIONAL SUMMARY">
            <Typography sx={bodyStyle}>
              {summary}
            </Typography>
          </CreativeMainSection>
        )}

        {/* WORK EXPERIENCE */}

        {experience.length > 0 && (
          <CreativeMainSection title="WORK EXPERIENCE">
            {experience.map((job, index) => (
              <CreativeExperience
                key={index}
                job={job}
              />
            ))}
          </CreativeMainSection>
        )}

        {/* EDUCATION */}

        {education.length > 0 && (
          <CreativeMainSection title="EDUCATION">
            {education.map(
              (educationItem, index) => (
                <CreativeEducation
                  key={index}
                  education={educationItem}
                />
              )
            )}
          </CreativeMainSection>
        )}

        {/* CERTIFICATIONS */}

        {certifications.length > 0 && (
          <CreativeMainSection title="CERTIFICATIONS">
            {certifications.map(
              (certification, index) => (
                <CreativeCertification
                  key={index}
                  certification={certification}
                />
              )
            )}
          </CreativeMainSection>
        )}
      </Box>
    </ResumePage>
  );
}

function CreativeSidebarSection({
  title,
  children,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,

        marginBottom: "22px",

        flexShrink: 0,

        boxSizing: "border-box",
      }}
    >
      <Typography
        component="div"
        sx={{
          fontFamily: "Arial, Helvetica, sans-serif",

          fontSize: "12px",
          lineHeight: 1.4,
          fontWeight: 700,

          letterSpacing: "0.8px",

          color: COLORS.white,

          margin: 0,
          marginBottom: "8px",

          padding: 0,
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          width: "100%",
          minWidth: 0,

          display: "flex",
          flexDirection: "column",

          gap: "3px",

          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function CreativeMainSection({
  title,
  children,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,

        marginTop: "12px",
        marginBottom: "0px",

        boxSizing: "border-box",

        flexShrink: 0,
      }}
    >
      <Typography
        component="div"
        sx={{
          fontFamily: "Arial, Helvetica, sans-serif",

          fontSize: "13.5px",
          lineHeight: "15px",
          fontWeight: 700,

          color: COLORS.accent,

          textTransform: "uppercase",
          textAlign: "left",

          letterSpacing: "0.4px",

          margin: 0,
          marginBottom: "4px",

          padding: 0,
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "1px",

          backgroundColor: COLORS.accent,

          margin: 0,
          marginBottom: "6px",

          boxSizing: "border-box",

          flexShrink: 0,
        }}
      />

      <Box
        sx={{
          width: "100%",
          minWidth: 0,

          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function CreativeExperience({ job }) {
  const title =
    job?.title ||
    job?.job_title ||
    job?.role ||
    "Job Title";

  const company = job?.company || "";
  const location = job?.location || "";

  const dates = [
    job?.start_date,
    job?.end_date,
  ]
    .filter(Boolean)
    .join(" – ");

  const bullets =
    Array.isArray(job?.bullets)
      ? job.bullets
          .map((bullet) =>
            String(bullet || "")
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
          .split(/\n|\u2022|•/)
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
        width: "100%",
        minWidth: 0,

        marginBottom: "10px",

        boxSizing: "border-box",

        flexShrink: 0,
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

          alignItems: "start",

          boxSizing: "border-box",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13px",
            lineHeight: "14px",
            fontWeight: 700,

            color: COLORS.dark,

            margin: 0,
            padding: 0,

            minWidth: 0,

            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          {title}
          {company ? ` — ${company}` : ""}
        </Typography>

        {dates && (
          <Typography
            component="div"
            sx={{
              fontFamily:
                "Arial, Helvetica, sans-serif",

              fontSize: "13px",
              lineHeight: "13px",
              fontWeight: 400,
              fontStyle: "italic",

              color: COLORS.gray,

              textAlign: "right",
              whiteSpace: "nowrap",

              margin: 0,
              padding: 0,

              flexShrink: 0,
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
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13px",
            lineHeight: "13px",
            fontWeight: 400,
            fontStyle: "italic",

            color: COLORS.gray,

            margin: 0,
            marginTop: "2px",
            marginBottom: "4px",

            padding: 0,

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
            width: "100%",

            margin: 0,
            padding: 0,
            paddingLeft: "14px",

            boxSizing: "border-box",

            "& li": {
              fontFamily:
                "Arial, Helvetica, sans-serif",

              fontSize: "13px",
              lineHeight: "12px",
              fontWeight: 400,

              color: COLORS.dark,

              margin: 0,
              marginBottom: "2px",

              padding: 0,

              overflowWrap: "anywhere",
              wordBreak: "break-word",
            },
          }}
        >
          {bullets.map(
            (bullet, bulletIndex) => (
              <li key={bulletIndex}>
                {bullet}
              </li>
            )
          )}
        </Box>
      )}
    </Box>
  );
}

function CreativeEducation({
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
    education?.location ||
    "";

  const gradDate =
    education?.grad_date ||
    education?.end_date ||
    education?.date ||
    "";

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,

        marginBottom: "8px",

        boxSizing: "border-box",

        flexShrink: 0,
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

          alignItems: "start",

          boxSizing: "border-box",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13px",
            lineHeight: "14px",
            fontWeight: 700,

            color: COLORS.dark,

            margin: 0,
            padding: 0,

            minWidth: 0,

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
            component="div"
            sx={{
              fontFamily:
                "Arial, Helvetica, sans-serif",

              fontSize: "13px",
              lineHeight: "13px",
              fontWeight: 400,
              fontStyle: "italic",

              color: COLORS.gray,

              textAlign: "right",
              whiteSpace: "nowrap",

              margin: 0,
              padding: 0,

              flexShrink: 0,
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
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13px",
            lineHeight: "13px",
            fontWeight: 400,
            fontStyle: "italic",

            color: COLORS.gray,

            margin: 0,
            marginTop: "2px",

            padding: 0,

            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          {location}
        </Typography>
      )}
    </Box>
  );
}

function CreativeCertification({
  certification,
}) {
  if (typeof certification === "string") {
    return (
      <Box
        sx={{
          width: "100%",
          minWidth: 0,

          marginBottom: "6px",

          boxSizing: "border-box",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13px",
            lineHeight: "14px",
            fontWeight: 700,

            color: COLORS.dark,

            margin: 0,
            padding: 0,

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

        marginBottom: "8px",

        boxSizing: "border-box",

        flexShrink: 0,
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

          alignItems: "start",

          boxSizing: "border-box",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13px",
            lineHeight: "14px",
            fontWeight: 700,

            color: COLORS.dark,

            margin: 0,
            padding: 0,

            minWidth: 0,

            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          {name}
          {issuer ? ` — ${issuer}` : ""}
        </Typography>

        {dates && (
          <Typography
            component="div"
            sx={{
              fontFamily:
                "Arial, Helvetica, sans-serif",

              fontSize: "13px",
              lineHeight: "13px",
              fontWeight: 400,
              fontStyle: "italic",

              color: COLORS.gray,

              textAlign: "right",
              whiteSpace: "nowrap",

              margin: 0,
              padding: 0,

              flexShrink: 0,
            }}
          >
            {dates}
          </Typography>
        )}
      </Box>

      {bullets.length > 0 && (
        <Box
          component="ul"
          sx={{
            width: "100%",

            margin: 0,
            marginTop: "2px",

            padding: 0,
            paddingLeft: "14px",

            boxSizing: "border-box",

            "& li": {
              fontFamily:
                "Arial, Helvetica, sans-serif",

              fontSize: "13px",
              lineHeight: "12px",
              fontWeight: 400,

              color: COLORS.dark,

              margin: 0,
              marginBottom: "2px",

              padding: 0,

              overflowWrap: "anywhere",
              wordBreak: "break-word",
            },
          }}
        >
          {bullets.map(
            (bullet, bulletIndex) => (
              <li key={bulletIndex}>
                {bullet}
              </li>
            )
          )}
        </Box>
      )}

      {description &&
        bullets.length === 0 && (
          <Typography
            component="div"
            sx={{
              fontFamily:
                "Arial, Helvetica, sans-serif",

              fontSize: "13px",
              lineHeight: "12px",
              fontWeight: 400,

              color: COLORS.gray,

              margin: 0,
              marginTop: "2px",

              padding: 0,

              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {description}
          </Typography>
        )}

      {(credentialId ||
        credentialUrl) && (
        <Typography
          component="div"
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",

            fontSize: "13px",
            lineHeight: "12px",
            fontWeight: 400,

            color: COLORS.gray,

            margin: 0,
            marginTop: "2px",

            padding: 0,

            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          {credentialId
            ? `Credential ID: ${credentialId}`
            : ""}

          {credentialId &&
          credentialUrl
            ? " | "
            : ""}

          {credentialUrl || ""}
        </Typography>
      )}
    </Box>
  );
}

const sidebarTextStyle = {
  fontFamily:
    "Arial, Helvetica, sans-serif",

  fontSize: "13px",
  lineHeight: 1.45,
  fontWeight: 400,

  color: COLORS.sidebarText,

  margin: 0,
  padding: 0,

  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const bodyStyle = {
  fontFamily:
    "Arial, Helvetica, sans-serif",

  fontSize: "13px",
  lineHeight: "13px",
  fontWeight: 400,

  color: COLORS.dark,

  margin: 0,
  padding: 0,

  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

export default Creative;

