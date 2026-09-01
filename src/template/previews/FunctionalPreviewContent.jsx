import { Box, Typography } from "@mui/material";

function FunctionalPreviewContent() {
  return (
    <Box
      className="resume-page"
      sx={{
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
        boxSizing: "border-box",

        bgcolor: "#ffffff",
        color: "#1a1a1a",

        px: "56px",
        py: "56px",

        fontFamily: "Arial, Helvetica, sans-serif",

        overflow: "visible",

        display: "flex",
        flexDirection: "column",

        "& *": {
          boxSizing: "border-box",
          maxWidth: "100%",
        },
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          flexShrink: 0,
          mb: 2.2,
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Helvetica, Arial, sans-serif",
            fontSize: "28px",
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#1a1a1a",
            mb: 0.7,
            overflowWrap: "anywhere",
          }}
        >
          Michael Anderson
        </Typography>

        <Typography
          sx={{
            fontSize: "14.5px",
            fontWeight: 500,
            color: "#6d28d9",
            lineHeight: 1.3,
            mb: 1,
            overflowWrap: "anywhere",
          }}
        >
          Senior Business Analyst
        </Typography>

        <Typography
          sx={{
            fontSize: "13.5px",
            color: "#555555",
            lineHeight: 1.5,
            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          Toronto, ON&nbsp;&nbsp; | &nbsp;&nbsp;
          +1 (416) 555-0188&nbsp;&nbsp; | &nbsp;&nbsp;
          michael.anderson@email.com&nbsp;&nbsp; | &nbsp;&nbsp;
          linkedin.com/in/michaelanderson
        </Typography>
      </Box>

      <DividerLine />

      <FunctionalSection
        title="Professional Summary"
        topDivider
      >
        <Typography
          sx={{
            fontSize: "13.5px",
            lineHeight: 1.5,
            color: "#1a1a1a",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          Senior Business Analyst with 8+ years of experience in business analysis, process improvement, stakeholder management, and data analysis
        </Typography>
      </FunctionalSection>

      <FunctionalSection title="Work Experience">
        <Experience
          title="Senior Business Analyst"
          company="ABC Consulting Inc."
          location="Toronto, ON"
          startDate="2021"
          endDate="Present"
          bullets={[
            "Led requirements gathering and business analysis initiatives.",
            "Reduced reporting effort by approximately 25%.",
          ]}
        />

        <Experience
          title="Business Analyst"
          company="NorthStar Solutions"
          location="Toronto, ON"
          startDate="2017"
          endDate="2021"
          bullets={[
            "Improved business processes and reporting.",
            "Prepared requirements and project documentation.",
          ]}
        />

        <Experience
          title="Junior Business Analyst"
          company="MapleTech Solutions"
          location="Mississauga, ON"
          startDate="2015"
          endDate="2017"
          bullets={[
            "Supported analysis, reporting, and testing.",
          ]}
        />
      </FunctionalSection>

      <FunctionalSection title="Education">
        <EducationItem
          degree="Bachelor of Business Administration"
          institution="University of Toronto"
          location="Toronto, ON"
          gradDate="2013"
        />
      </FunctionalSection>

      <FunctionalSection title="Certifications">
        <CertificationItem
          name="CBAP"
          issuer="IIBA"
          issueDate="2022"
          expirationDate="2025"
          credentialId="CBAP-2022-45821"
          credentialUrl="https://www.iiba.org/"
          bullets={[
            "Advanced business analysis practices",
          ]}
        />

        <CertificationItem
          name="PSM I"
          issuer="Scrum.org"
          issueDate="2021"
          bullets={[
            "Scrum framework and Agile principles",
          ]}
        />
      </FunctionalSection>

      <FunctionalSection title="Skills">
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(2, minmax(0, 1fr))",
            columnGap: "24px",
            rowGap: "4px",
          }}
        >
          {[
            "Business Analysis",
            "Requirements Gathering",
            "Process Improvement",
            "Stakeholder Management",
            "Data Analysis",
            "SQL",
          ].map((skill, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: "13.5px",
                lineHeight: 1.4,
                fontWeight: 700,
                color: "#1a1a1a",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              {skill}
            </Typography>
          ))}
        </Box>
      </FunctionalSection>

      <FunctionalSection title="Languages" last>
        <Box
          component="ul"
          sx={{
            margin: 0,
            padding: 0,
            paddingLeft: "14px",
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            columnGap: "16px",
            "& li": {
              fontSize: "13.5px",
              lineHeight: 1.45,
              color: "#1a1a1a",
              marginBottom: "3px",
              paddingLeft: 0,
            },
          }}
        >
          <li>English (Native)</li>
          <li>French (Professional)</li>
          <li>Spanish (Basic)</li>
        </Box>
      </FunctionalSection>
    </Box>
  );
}

function DividerLine() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "1px",
        backgroundColor: "#6d28d9",
        margin: 0,
        padding: 0,
        flexShrink: 0,
      }}
    />
  );
}

function FunctionalSection({
  title,
  children,
  topDivider = false,
  last = false,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        flexShrink: 0,
        minWidth: 0,
        marginTop: topDivider
          ? "12px"
          : "12px",
        marginBottom: last
          ? 0
          : "9px",
        overflow: "visible",
      }}
    >
      <Typography
        sx={{
          fontFamily:
            "Helvetica, Arial, sans-serif",
          fontSize: "13.5px",
          fontWeight: 700,
          lineHeight: 1.4,
          color: "#6d28d9",
          textTransform: "uppercase",
          textAlign: "left",
          letterSpacing: "0.35px",
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
          backgroundColor: "#6d28d9",
          margin: 0,
          padding: 0,
        }}
      />

      <Box
        sx={{
          width: "100%",
          marginTop: "6px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function Experience({
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
        marginBottom: "7px",
        flexShrink: 0,
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
        }}
      >
        <Typography
          sx={{
            minWidth: 0,
            fontSize: "13.5px",
            lineHeight: 1.42,
            fontWeight: 700,
            color: "#1a1a1a",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          {title}
          {company
            ? ` — ${company}`
            : ""}
        </Typography>

        <Typography
          sx={{
            flexShrink: 0,
            fontSize: "13.5px",
            lineHeight: 1.4,
            fontStyle: "italic",
            color: "#555555",
            whiteSpace: "nowrap",
            textAlign: "right",
          }}
        >
          {startDate} – {endDate}
        </Typography>
      </Box>

      {location && (
        <Typography
          sx={{
            fontSize: "13.5px",
            lineHeight: 1.4,
            fontStyle: "italic",
            color: "#555555",
            marginBottom: "3px",
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
            "& li": {
              fontSize: "13.5px",
              lineHeight: 1.4,
              color: "#1a1a1a",
              marginBottom: "1px",
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

function EducationItem({
  degree,
  institution,
  location,
  gradDate,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "5px",
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
        }}
      >
        <Typography
          sx={{
            minWidth: 0,
            fontSize: "13.5px",
            lineHeight: 1.42,
            fontWeight: 700,
            color: "#1a1a1a",
            overflowWrap: "anywhere",
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
              flexShrink: 0,
              fontSize: "13.5px",
              lineHeight: 1.4,
              fontStyle: "italic",
              color: "#555555",
              whiteSpace: "nowrap",
              textAlign: "right",
            }}
          >
            {gradDate}
          </Typography>
        )}
      </Box>

      {location && (
        <Typography
          sx={{
            fontSize: "13.5px",
            lineHeight: 1.4,
            fontStyle: "italic",
            color: "#555555",
          }}
        >
          {location}
        </Typography>
      )}
    </Box>
  );
}

function CertificationItem({
  name,
  issuer,
  issueDate,
  expirationDate = "",
  credentialId = "",
  credentialUrl = "",
  bullets = [],
}) {
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
        }}
      >
        <Typography
          sx={{
            minWidth: 0,
            fontSize: "13.5px",
            lineHeight: 1.42,
            fontWeight: 700,
            color: "#1a1a1a",
            overflowWrap: "anywhere",
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
              lineHeight: 1.4,
              fontStyle: "italic",
              color: "#555555",
              whiteSpace: "nowrap",
              textAlign: "right",
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
            marginTop: "2px",
            padding: 0,
            paddingLeft: "14px",
            "& li": {
              fontSize: "13.5px",
              lineHeight: 1.4,
              color: "#1a1a1a",
              marginBottom: "1px",
              overflowWrap: "anywhere",
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

      {credentialId && (
        <Typography
          sx={{
            fontSize: "13.5px",
            lineHeight: 1.4,
            color: "#555555",
            marginTop: "2px",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          Credential ID: {credentialId}
        </Typography>
      )}
    </Box>
  );
}

export default FunctionalPreviewContent