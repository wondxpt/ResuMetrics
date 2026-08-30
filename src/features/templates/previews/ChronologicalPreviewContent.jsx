import { Box, Typography, Divider } from "@mui/material";

const A4_WIDTH = "210mm";
const A4_HEIGHT = "297mm";

// معادل تقریبی حاشیه 1 اینچ PDF پایتون
const PAGE_MARGIN = 75;

function ChronologicalPreviewContent() {
  return (
    <Box
      sx={{
        width: A4_WIDTH,
        height: A4_HEIGHT,

        boxSizing: "border-box",

        bgcolor: "#ffffff",

        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#1a1a1a",

        overflow: "hidden",

        position: "relative",
      }}
    >
      {/* =====================================================
          REAL RESUME PAGE
          ===================================================== */}

      <Box
        sx={{
          position: "absolute",

          top: `${PAGE_MARGIN}px`,
          right: `${PAGE_MARGIN}px`,
          bottom: `${PAGE_MARGIN}px`,
          left: `${PAGE_MARGIN}px`,

          width: `calc(100% - ${PAGE_MARGIN * 2}px)`,
          height: `calc(100% - ${PAGE_MARGIN * 2}px)`,

          boxSizing: "border-box",

          overflow: "hidden",

          display: "flex",
          flexDirection: "column",

          minWidth: 0,
          minHeight: 0,

          "& *": {
            boxSizing: "border-box",
            maxWidth: "100%",
          },
        }}
      >
        {/* =====================================================
            HEADER
            ===================================================== */}

        <Box
          sx={{
            textAlign: "center",
            flexShrink: 0,

            mb: "18px",

            width: "100%",
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Arial, Helvetica, sans-serif",

              fontSize: "20px",
              fontWeight: 700,

              lineHeight: 1.2,

              color: "#1a1a1a",

              mb: "2px",

              width: "100%",
              maxWidth: "100%",

              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            Michael Anderson
          </Typography>

          <Typography
            sx={{
              fontFamily: "Arial, Helvetica, sans-serif",

              fontSize: "12px",
              fontWeight: 400,

              lineHeight: 1.3,

              color: "#2c3e50",

              mb: "6px",

              width: "100%",
              maxWidth: "100%",

              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            Senior Business Analyst
          </Typography>

          <Typography
            sx={{
              fontFamily: "Arial, Helvetica, sans-serif",

              fontSize: "12.5px",
              fontWeight: 400,

              lineHeight: 1.45,

              color: "#555555",

              width: "100%",
              maxWidth: "100%",

              overflowWrap: "break-word",
              wordBreak: "break-word",

              whiteSpace: "normal",
            }}
          >
            Toronto, ON&nbsp;&nbsp; | &nbsp;&nbsp;
            +1 (416) 555-0188&nbsp;&nbsp; | &nbsp;&nbsp;
            michael.anderson@email.com&nbsp;&nbsp; | &nbsp;&nbsp;
            linkedin.com/in/michaelanderson
          </Typography>
        </Box>

        {/* =====================================================
            HEADER DIVIDER
            ===================================================== */}

        <Divider
          sx={{
            width: "100%",

            flexShrink: 0,

            borderColor: "#2c3e50",
            borderBottomWidth: "1px",

            mb: "14px",
          }}
        />

        {/* =====================================================
            PROFESSIONAL SUMMARY
            ===================================================== */}

        <PreviewSection title="Professional Summary">
          <Typography
            sx={{
              fontSize: "12.5px",
              lineHeight: 1.45,

              color: "#1a1a1a",

              width: "100%",
              maxWidth: "100%",

              overflowWrap: "break-word",
              wordBreak: "break-word",

              whiteSpace: "normal",
            }}
          >
            Results-driven Senior Business Analyst with 8+ years of
            experience translating business requirements into practical
            technology and process improvements. Strong background in
            stakeholder management, data analysis, process optimization,
            and cross-functional project delivery.
          </Typography>
        </PreviewSection>

        {/* =====================================================
            WORK EXPERIENCE
            ===================================================== */}

        <PreviewSection title="Work Experience">
          <Job
            title="Senior Business Analyst"
            company="ABC Consulting Inc."
            location="Toronto, ON"
            startDate="2021"
            endDate="Present"
            bullets={[
              "Led requirements gathering and business analysis initiatives across multiple enterprise projects.",
              "Improved reporting workflows and reduced manual processing time by approximately 25%.",
              "Collaborated with product, engineering, finance, and operations teams to deliver business solutions.",
            ]}
          />

          <Job
            title="Business Analyst"
            company="NorthStar Solutions"
            location="Toronto, ON"
            startDate="2017"
            endDate="2021"
            bullets={[
              "Analyzed operational processes and identified opportunities for efficiency and cost reduction.",
              "Prepared business requirements, process documentation, and functional specifications.",
              "Supported project teams throughout implementation and testing.",
            ]}
          />

          <Job
            title="Junior Business Analyst"
            company="MapleTech Solutions"
            location="Mississauga, ON"
            startDate="2015"
            endDate="2017"
            bullets={[
              "Supported senior analysts with requirements gathering, documentation, and data analysis.",
              "Created reports and dashboards using Microsoft Excel and SQL.",
              "Assisted project teams with testing, issue tracking, and stakeholder communication.",
            ]}
          />
        </PreviewSection>

        {/* =====================================================
            EDUCATION
            ===================================================== */}

        <PreviewSection title="Education">
          <Box
            sx={{
              width: "100%",
              minWidth: 0,

              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",

              gap: "20px",
            }}
          >
            <Box
              sx={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 700,
                  lineHeight: 1.35,

                  color: "#1a1a1a",

                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                Bachelor of Business Administration
              </Typography>

              <Typography
                sx={{
                  fontSize: "12.5px",
                  lineHeight: 1.4,

                  color: "#555555",

                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                University of Toronto — Toronto, ON
              </Typography>
            </Box>

            <Typography
              sx={{
                flexShrink: 0,

                fontSize: "12.5px",
                lineHeight: 1.4,

                color: "#555555",

                fontStyle: "italic",
                whiteSpace: "nowrap",
              }}
            >
              2013
            </Typography>
          </Box>
        </PreviewSection>

        {/* =====================================================
            CERTIFICATIONS
            ===================================================== */}

        <PreviewSection title="Certifications">
          <Certification
            name="Certified Business Analysis Professional (CBAP)"
            issuer="IIBA"
            issueDate="2022"
            expirationDate="2025"
            credentialId="CBAP-2022-45821"
            credentialUrl="https://www.iiba.org/"
            bullets={[
              "Advanced business analysis practices",
              "Requirements analysis and stakeholder management",
            ]}
          />

          <Certification
            name="Professional Scrum Master I (PSM I)"
            issuer="Scrum.org"
            issueDate="2021"
            bullets={[
              "Scrum framework and Agile principles",
              "Facilitation and Scrum team practices",
            ]}
          />

          <Certification
            name="Microsoft Certified: Power BI Data Analyst Associate"
            issuer="Microsoft"
            issueDate="2023"
            expirationDate="2025"
            credentialId="PL-300-923817"
            credentialUrl="https://learn.microsoft.com/"
            bullets={[
              "Data modeling and visualization",
              "Business intelligence and reporting",
            ]}
          />
        </PreviewSection>

        {/* =====================================================
            SKILLS
            ===================================================== */}

        <PreviewSection title="Skills">
          <Typography
            sx={{
              fontSize: "12.5px",
              lineHeight: 1.5,

              color: "#1a1a1a",

              width: "100%",
              maxWidth: "100%",

              overflowWrap: "break-word",
              wordBreak: "break-word",

              whiteSpace: "normal",
            }}
          >
            Business Analysis • Requirements Gathering • Process Improvement •
            Stakeholder Management • Data Analysis • SQL • Microsoft Excel •
            Project Management • Agile • Scrum • Documentation
          </Typography>
        </PreviewSection>

        {/* =====================================================
            LANGUAGES
            ===================================================== */}

        <PreviewSection title="Languages">
          <Typography
            sx={{
              fontSize: "12.5px",
              lineHeight: 1.5,

              color: "#1a1a1a",

              width: "100%",
              maxWidth: "100%",

              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            English — Native • French — Professional • Spanish — Basic
          </Typography>
        </PreviewSection>
      </Box>
    </Box>
  );
}

/* =============================================================
SECTION
============================================================= */

function PreviewSection({ title, children }) {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,

        flexShrink: 0,

        mb: "17px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Arial, Helvetica, sans-serif",

          fontSize: "13.5px",
          fontWeight: 700,

          lineHeight: 1.3,

          color: "#2c3e50",

          textTransform: "uppercase",
          letterSpacing: "0.35px",

          borderBottom: "1px solid #2c3e50",

          pb: "4px",
          mb: "7px",

          width: "100%",
          maxWidth: "100%",

          overflowWrap: "break-word",
        }}
      >
        {title}
      </Typography>

      {children}
    </Box>
  );
}

/* =============================================================
JOB
============================================================= */

function Job({
  title,
  company,
  location,
  startDate,
  endDate,
  bullets = [],
}) {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,

        mb: "13px",

        "&:last-child": {
          mb: 0,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          minWidth: 0,

          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",

          gap: "15px",

          mb: "2px",
        }}
      >
        <Typography
          sx={{
            minWidth: 0,
            flex: 1,

            fontSize: "13px",
            fontWeight: 700,

            lineHeight: 1.35,

            color: "#1a1a1a",

            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            flexShrink: 0,

            fontSize: "12.5px",
            lineHeight: 1.35,

            color: "#555555",

            fontStyle: "italic",

            whiteSpace: "nowrap",
          }}
        >
          {startDate} – {endDate}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: "12.5px",
          fontWeight: 600,

          lineHeight: 1.4,

          color: "#2c3e50",

          mb: "4px",

          width: "100%",
          maxWidth: "100%",

          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        {company} — {location}
      </Typography>

      <Box
        component="ul"
        sx={{
          m: 0,

          pl: "16px",

          width: "100%",
          maxWidth: "100%",

          "& li": {
            fontSize: "12.5px",
            lineHeight: 1.42,

            mb: "2px",

            pl: "1px",

            overflowWrap: "break-word",
            wordBreak: "break-word",
          },

          "& li:last-child": {
            mb: 0,
          },
        }}
      >
        {bullets.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </Box>
    </Box>
  );
}

/* =============================================================
CERTIFICATION
============================================================= */

function Certification({
  name,
  issuer,
  issueDate,
  expirationDate = "",
  credentialId = "",
  credentialUrl = "",
  bullets = [],
}) {
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,

        mb: "10px",

        "&:last-child": {
          mb: 0,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          minWidth: 0,

          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",

          gap: "15px",

          mb: "2px",
        }}
      >
        <Typography
          sx={{
            minWidth: 0,
            flex: 1,

            fontSize: "13px",
            fontWeight: 700,

            lineHeight: 1.35,

            color: "#1a1a1a",

            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {name}
        </Typography>

        {(issueDate ||
          expirationDate) && (
          <Typography
            sx={{
              flexShrink: 0,

              fontSize: "12.5px",
              lineHeight: 1.35,

              color: "#555555",

              fontStyle: "italic",

              whiteSpace: "nowrap",

              textAlign: "right",
            }}
          >
            {issueDate}
            {expirationDate
              ? ` – ${expirationDate}`
              : ""}
          </Typography>
        )}
      </Box>

      {issuer && (
        <Typography
          sx={{
            fontSize: "12.5px",
            fontWeight: 600,

            lineHeight: 1.4,

            color: "#2c3e50",

            mb:
              bullets.length > 0 ||
              credentialId ||
              credentialUrl
                ? "3px"
                : 0,

            width: "100%",
            maxWidth: "100%",

            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {issuer}
        </Typography>
      )}

      {credentialId && (
        <Typography
          sx={{
            fontSize: "12.5px",
            lineHeight: 1.35,

            color: "#555555",

            mb:
              credentialUrl ||
              bullets.length > 0
                ? "2px"
                : 0,

            width: "100%",
            maxWidth: "100%",

            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          Credential ID: {credentialId}
        </Typography>
      )}

      {credentialUrl && (
        <Typography
          sx={{
            fontSize: "12.5px",
            lineHeight: 1.35,

            color: "#2c3e50",

            mb:
              bullets.length > 0
                ? "3px"
                : 0,

            width: "100%",
            maxWidth: "100%",

            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {credentialUrl}
        </Typography>
      )}

      {bullets.length > 0 && (
        <Box
          component="ul"
          sx={{
            m: 0,

            pl: "16px",

            width: "100%",
            maxWidth: "100%",

            "& li": {
              fontSize: "12.5px",
              lineHeight: 1.42,

              mb: "2px",

              pl: "1px",

              overflowWrap: "break-word",
              wordBreak: "break-word",
            },

            "& li:last-child": {
              mb: 0,
            },
          }}
        >
          {bullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ChronologicalPreviewContent;