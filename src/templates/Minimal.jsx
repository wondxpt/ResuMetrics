import { Box, Typography } from "@mui/material";

import { buildResumeData } from "./defaultResumeData";
import { resumeTheme } from "./templateStyles";
import ResumePage from "./ResumePage";

function Minimal({ data, demo = false }) {
  const resume = buildResumeData(data || {}, demo);

  const contactLine = [
    resume.location,
    resume.phone,
    resume.email,
    resume.linkedin,
  ]
    .filter(Boolean)
    .join(" | ");

  return (
    <ResumePage
      sx={{
        ...resumeTheme.page,

        padding: `${resumeTheme.spacing.pageY} ${resumeTheme.spacing.pageX}`,

        background: resumeTheme.colors.white,

        color: resumeTheme.colors.text,

        fontFamily: resumeTheme.fonts.primary,

        boxSizing: "border-box",

        overflow: "visible",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minHeight: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, Helvetica, sans-serif",
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            flexShrink: 0,
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
          }}
        >
          <Typography
            component="div"
            sx={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "22px",
              lineHeight: "24px",
              fontWeight: 700,
              color: resumeTheme.colors.text,
              textAlign: "center",
              margin: 0,
              padding: 0,
              wordBreak: "normal",
              overflowWrap: "normal",
            }}
          >
            {resume.full_name || "FULL NAME"}
          </Typography>

          {resume.target_title && (
            <Typography
              component="div"
              sx={{
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: "14px",
                lineHeight: 1.45,
                fontWeight: 400,
                color: resumeTheme.colors.muted,
                textAlign: "center",
                margin: 0,
                padding: 0,
              }}
            >
              {resume.target_title}
            </Typography>
          )}

          <Typography
            component="div"
            sx={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "13.5px",
              lineHeight: 1.42,
              fontWeight: 400,
              color: resumeTheme.colors.muted,
              textAlign: "center",
              margin: 0,
              marginTop: "0px",
              marginBottom: "10px",
              padding: 0,
              overflowWrap: "anywhere",
              wordBreak: "normal",
            }}
          >
            {contactLine || "Location | Phone | Email | LinkedIn"}
          </Typography>

          <DividerLine />
        </Box>

        {resume.summary && (
          <MinimalSection title="PROFESSIONAL SUMMARY">
            <Typography sx={bodyStyle}>
              {resume.summary}
            </Typography>
          </MinimalSection>
        )}

        {resume.experience?.length > 0 && (
          <MinimalSection title="WORK EXPERIENCE">
            {resume.experience.map((job, index) => (
              <ExperienceItem
                key={index}
                job={job}
              />
            ))}
          </MinimalSection>
        )}

        {resume.education?.length > 0 && (
          <MinimalSection title="EDUCATION">
            {resume.education.map((edu, index) => (
              <EducationItem
                key={index}
                edu={edu}
              />
            ))}
          </MinimalSection>
        )}

        {resume.certifications?.length > 0 && (
          <MinimalSection title="CERTIFICATIONS">
            {resume.certifications.map(
              (certification, index) => (
                <CertificationItem
                  key={index}
                  certification={certification}
                />
              )
            )}
          </MinimalSection>
        )}

        {resume.skills?.length > 0 && (
          <MinimalSection title="SKILLS">
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                boxSizing: "border-box",
              }}
            >
              {resume.skills.map((skill, index) => {
                if (typeof skill === "string") {
                  return (
                    <Typography
                      key={index}
                      component="div"
                      sx={{
                        fontFamily:
                          "Arial, Helvetica, sans-serif",
                        fontSize: "13.5px",
                        lineHeight: 1.40,
                        fontWeight: 700,
                        color: resumeTheme.colors.text,
                        margin: 0,
                        padding: 0,
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                      }}
                    >
                      {skill}
                    </Typography>
                  );
                }

                const title =
                  skill?.title ||
                  skill?.name ||
                  skill?.skill ||
                  "";

                const description =
                  typeof skill?.description === "string"
                    ? skill.description.trim()
                    : typeof skill?.details === "string"
                    ? skill.details.trim()
                    : "";

                const bullets = Array.isArray(
                  skill?.bullets
                )
                  ? skill.bullets
                      .map((bullet) =>
                        String(bullet || "")
                          .replace(
                            /^[\s•●▪◦*-]+/,
                            ""
                          )
                          .trim()
                      )
                      .filter(Boolean)
                  : description
                      .split(/\n/)
                      .map((line) =>
                        String(line || "")
                          .replace(
                            /^[\s•●▪◦*-]+/,
                            ""
                          )
                          .trim()
                      )
                      .filter(Boolean);

                if (!title) {
                  return null;
                }

                return (
                  <Box
                    key={index}
                    sx={{
                      width: "100%",
                      margin: 0,
                      padding: 0,
                      flexShrink: 0,
                      boxSizing: "border-box",
                    }}
                  >
                    <Typography
                      component="div"
                      sx={{
                        fontFamily:
                          "Arial, Helvetica, sans-serif",
                        fontSize: "13.5px",
                        lineHeight: 1.40,
                        fontWeight: 700,
                        color: resumeTheme.colors.text,
                        margin: 0,
                        padding: 0,
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                      }}
                    >
                      {title}
                    </Typography>

                    {bullets.length > 0 ? (
                      <Box
                        component="ul"
                        sx={{
                          margin: 0,
                          marginTop: "4px",
                          padding: 0,
                          paddingLeft: "14px",
                          listStylePosition: "outside",
                          boxSizing: "border-box",
                          "& li": {
                            fontFamily:
                              "Arial, Helvetica, sans-serif",
                            fontSize: "13.5px",
                            lineHeight: 1.38,
                            fontWeight: 400,
                            color: resumeTheme.colors.text,
                            margin: 0,
                            marginBottom: "7px",
                            padding: 0,
                            paddingLeft: "0px",
                            overflowWrap: "anywhere",
                            wordBreak: "break-word",
                          },
                        }}
                      >
                        {bullets.map(
                          (
                            bullet,
                            bulletIndex
                          ) => (
                            <li
                              key={
                                bulletIndex
                              }
                            >
                              {bullet}
                            </li>
                          )
                        )}
                      </Box>
                    ) : (
                      description && (
                        <Typography
                          component="div"
                          sx={{
                            fontFamily:
                              "Arial, Helvetica, sans-serif",
                            fontSize: "13.5px",
                            lineHeight: 1.38,
                            fontWeight: 400,
                            color:
                              resumeTheme.colors.muted,
                            margin: 0,
                            padding: 0,
                            overflowWrap: "anywhere",
                            wordBreak: "break-word",
                          }}
                        >
                          {description}
                        </Typography>
                      )
                    )}
                  </Box>
                );
              })}
            </Box>
          </MinimalSection>
        )}

        {resume.languages?.length > 0 && (
          <MinimalSection title="LANGUAGES">
            <Box
              component="ul"
              sx={{
                margin: 0,
                padding: 0,
                paddingLeft: "14px",
                listStylePosition: "outside",
                boxSizing: "border-box",
                "& li": {
                  fontFamily:
                    "Arial, Helvetica, sans-serif",
                  fontSize: "13.5px",
                  lineHeight: 1.40,
                  fontWeight: 400,
                  color: resumeTheme.colors.text,
                  margin: 0,
                  marginBottom: "6px",
                  padding: 0,
                  paddingLeft: "0px",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                },
              }}
            >
              {resume.languages.map((lang, index) => {
                if (typeof lang === "string") {
                  return (
                    <li key={index}>
                      {lang}
                    </li>
                  );
                }

                const name =
                  lang?.name ||
                  lang?.language ||
                  "";

                const level =
                  lang?.level ||
                  "";

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
              })}
            </Box>
          </MinimalSection>
        )}
      </Box>
    </ResumePage>
  );
}

function DividerLine() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "1.5px", // bumped from 0.8px - sub-pixel bars can vanish/anti-alias
        // away when html2canvas rasterizes at scale 1, especially in
        // a Capacitor Android WebView.
        backgroundColor: resumeTheme.colors.border,
        margin: 0,
        padding: 0,
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    />
  );
}

function MinimalSection({
  title,
  children,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        flexShrink: 0,
        marginTop: "12px",
        marginBottom: "0px",
        boxSizing: "border-box",
      }}
    >
      <Typography
        component="div"
        sx={{
          fontFamily:
            "Arial, Helvetica, sans-serif",
          fontSize: "13.5px",
          lineHeight: 1.45,
          fontWeight: 700,
          color: resumeTheme.colors.text,
          textTransform: "uppercase",
          textAlign: "left",
          letterSpacing: "0.08em",
          margin: 0,
          marginBottom: "6px",
          padding: 0,
        }}
      >
        {title}
      </Typography>

      <DividerLine />

      <Box
        sx={{
          width: "100%",
          marginTop: "6px",
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function ExperienceItem({ job }) {
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

  const bullets = Array.isArray(
    job?.bullets
  )
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
    : typeof job?.description === "string"
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
        marginBottom: "6px",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
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
            fontSize: "13.5px",
            lineHeight: 1.42,
            fontWeight: 700,
            color: resumeTheme.colors.text,
            margin: 0,
            marginBottom: "1px",
            padding: 0,
            overflowWrap: "anywhere",
            minWidth: 0,
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
              fontFamily:
                "Arial, Helvetica, sans-serif",
              fontSize: "13.5px",
              lineHeight: 1.40,
              fontWeight: 400,
              fontStyle: "italic",
              color: resumeTheme.colors.muted,
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
            fontSize: "13.5px",
            lineHeight: 1.40,
            fontWeight: 400,
            fontStyle: "italic",
            color: resumeTheme.colors.muted,
            margin: 0,
            marginBottom: "6px",
            padding: 0,
            overflowWrap: "anywhere",
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
            padding: 0,
            paddingLeft: "14px",
            listStylePosition: "outside",
            boxSizing: "border-box",
            "& li": {
              fontFamily:
                "Arial, Helvetica, sans-serif",
              fontSize: "13.5px",
              lineHeight: 1.40,
              fontWeight: 400,
              color: resumeTheme.colors.text,
              margin: 0,
              marginBottom: "6px",
              padding: 0,
              paddingLeft: "0px",
              overflowWrap: "anywhere",
              wordBreak: "normal",
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

function EducationItem({ edu }) {
  const degree =
    edu?.degree ||
    "Degree";

  const institution =
    edu?.institution ||
    edu?.school ||
    edu?.university ||
    "";

  const location =
    edu?.location ||
    "";

  const gradDate =
    edu?.grad_date ||
    edu?.end_date ||
    edu?.date ||
    "";

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "6px",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
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
            fontSize: "13.5px",
            lineHeight: 1.42,
            fontWeight: 700,
            color: resumeTheme.colors.text,
            margin: 0,
            padding: 0,
            overflowWrap: "anywhere",
            minWidth: 0,
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
              fontSize: "13.5px",
              lineHeight: 1.40,
              fontWeight: 400,
              fontStyle: "italic",
              color: resumeTheme.colors.muted,
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
            fontSize: "13.5px",
            lineHeight: 1.40,
            fontWeight: 400,
            fontStyle: "italic",
            color: resumeTheme.colors.muted,
            margin: 0,
            padding: 0,
            overflowWrap: "anywhere",
          }}
        >
          {location}
        </Typography>
      )}
    </Box>
  );
}

function CertificationItem({ certification }) {
  if (typeof certification === "string") {
    return (
      <Box
        sx={{
          width: "100%",
          marginBottom: "7px",
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontFamily:
              "Arial, Helvetica, sans-serif",
            fontSize: "13.5px",
            lineHeight: 1.42,
            fontWeight: 700,
            color: resumeTheme.colors.text,
            margin: 0,
            padding: 0,
            overflowWrap: "anywhere",
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
    certification?.issuing_organization ||
    certification?.issuingOrganization ||
    certification?.organization ||
    "";

  const issueDate =
    certification?.issue_date ||
    certification?.issueDate ||
    certification?.issued_date ||
    certification?.issuedDate ||
    certification?.date ||
    "";

  const expirationDate =
    certification?.expiration_date ||
    certification?.expirationDate ||
    certification?.expiry_date ||
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
    typeof certification?.description === "string"
      ? certification.description.trim()
      : typeof certification?.details === "string"
      ? certification.details.trim()
      : "";

  const bullets = Array.isArray(
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
    : description
        .split(/\n/)
        .map((line) =>
          String(line || "")
            .replace(
              /^[\s•●▪◦*-]+/,
              ""
            )
            .trim()
        )
        .filter(Boolean);

  if (
    !name &&
    !issuer &&
    !issueDate &&
    !expirationDate &&
    !credentialId &&
    !credentialUrl &&
    !description &&
    bullets.length === 0
  ) {
    return null;
  }

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
        width: "100%",
        marginBottom: "6px",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
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
            fontSize: "13.5px",
            lineHeight: 1.42,
            fontWeight: 700,
            color: resumeTheme.colors.text,
            margin: 0,
            padding: 0,
            overflowWrap: "anywhere",
            minWidth: 0,
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
              fontFamily:
                "Arial, Helvetica, sans-serif",
              fontSize: "13.5px",
              lineHeight: 1.40,
              fontWeight: 400,
              fontStyle: "italic",
              color: resumeTheme.colors.muted,
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
            margin: 0,
            marginTop: "4px",
            padding: 0,
            paddingLeft: "14px",
            listStylePosition: "outside",
            boxSizing: "border-box",
            "& li": {
              fontFamily:
                "Arial, Helvetica, sans-serif",
              fontSize: "13.5px",
              lineHeight: 1.38,
              fontWeight: 400,
              color: resumeTheme.colors.text,
              margin: 0,
              marginBottom: "7px",
              padding: 0,
              paddingLeft: "0px",
              overflowWrap: "anywhere",
              wordBreak: "normal",
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
              fontSize: "13.5px",
              lineHeight: 1.38,
              fontWeight: 400,
              color: resumeTheme.colors.muted,
              margin: 0,
              marginTop: "4px",
              padding: 0,
              overflowWrap: "anywhere",
              wordBreak: "normal",
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
            fontSize: "13.5px",
            lineHeight: 1.38,
            fontWeight: 400,
            color: resumeTheme.colors.muted,
            margin: 0,
            marginTop: "4px",
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

const bodyStyle = {
  fontFamily:
    "Arial, Helvetica, sans-serif",
  fontSize: "13.5px",
  lineHeight: 1.40,
  fontWeight: 400,
  color: "#1a1a1a",
  margin: 0,
  padding: 0,
  overflowWrap: "anywhere",
  wordBreak: "normal",
};

export default Minimal;