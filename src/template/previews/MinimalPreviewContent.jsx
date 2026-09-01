import { Box, Typography } from "@mui/material";

const demoResumeData = {
  full_name: "Michael Anderson",
  target_title: "Senior Business Analyst",
  location: "Toronto, ON",
  email: "michael.anderson@email.com",
  phone: "+1 (416) 555-0188",
  linkedin: "linkedin.com/in/michaelanderson",

  summary:
    "Senior Business Analyst with 8+ years of experience in business analysis, process improvement, stakeholder management, and data analysis.",

  experience: [
    {
      title: "Senior Business Analyst",
      company: "ABC Consulting Inc.",
      location: "Toronto, ON",
      start_date: "2021",
      end_date: "Present",
      bullets: [
        "Led business analysis and requirements gathering.",
        "Reduced reporting effort by 25%.",
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

  certifications: [
    {
      name: "Certified Business Analysis Professional (CBAP)",
      issuer: "IIBA",
      issue_date: "2022",
      expiration_date: "2025",
      credential_id: "CBAP-2022-45821",
      credential_url: "https://www.iiba.org/",
      description: "",
      bullets: [],
    },
    {
      name: "Professional Scrum Master I (PSM I)",
      issuer: "Scrum.org",
      issue_date: "2021",
      expiration_date: "",
      credential_id: "PSM-I-784521",
      credential_url: "https://www.scrum.org/",
      description: "",
      bullets: [],
    },
    {
      name: "Microsoft Power BI Data Analyst Associate",
      issuer: "Microsoft",
      issue_date: "2023",
      expiration_date: "2025",
      credential_id: "PL-300-923817",
      credential_url: "https://learn.microsoft.com/",
      description: "",
      bullets: [],
    },
  ],

  skills: [
    "Business Analysis",
    "Process Improvement",
    "Stakeholder Management",
    "Data Analysis",
    "SQL",
    "Excel",
    "Agile",
    "Scrum",
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
  ],
};

function SectionTitle({ children }) {
  return (
    <Box
      sx={{
        mt: "30px",
        mb: "10px",
      }}
    >
      <Typography
        sx={{
          fontFamily:
            "Helvetica, Arial, sans-serif",
          fontSize: "15px",
          lineHeight: 1.25,
          fontWeight: 700,
          color: "#3a3a3a",
          letterSpacing: "0.2px",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

function CertificationItem({
  certification,
}) {
  const dates = [
    certification.issue_date,
    certification.expiration_date
      ? `Expires ${certification.expiration_date}`
      : "",
  ]
    .filter(Boolean)
    .join(" – ");

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "7px",
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "flex-start",
          gap: "12px",
          width: "100%",
          minWidth: 0,
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
              fontFamily:
                "Helvetica, Arial, sans-serif",
              fontSize: "13.5px",
              lineHeight: 1.3,
              fontWeight: 700,
              color: "#1a1a1a",
              overflowWrap:
                "anywhere",
              wordBreak:
                "break-word",
            }}
          >
            {certification.name}
          </Typography>

          <Typography
            sx={{
              fontFamily:
                "Helvetica, Arial, sans-serif",
              fontSize: "13.5px",
              lineHeight: 1.3,
              color: "#555555",
            }}
          >
            {certification.issuer}
          </Typography>
        </Box>

        {dates && (
          <Typography
            sx={{
              flexShrink: 0,
              fontFamily:
                "Helvetica, Arial, sans-serif",
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

      {certification.credential_id && (
        <Typography
          sx={{
            fontFamily:
              "Helvetica, Arial, sans-serif",
            fontSize: "13.5px",
            lineHeight: 1.25,
            color: "#666666",
            marginTop: "2px",
            overflowWrap:
              "anywhere",
            wordBreak:
              "break-word",
          }}
        >
          Credential ID:{" "}
          {certification.credential_id}
        </Typography>
      )}
    </Box>
  );
}

function MinimalPreviewContent() {
  const data = demoResumeData;

  return (
    <Box
      className="resume-page"
      sx={{
        width: "210mm",
        minWidth: "210mm",
        maxWidth: "210mm",

        height: "297mm",
        minHeight: "297mm",
        maxHeight: "297mm",

        backgroundColor: "#ffffff",
        color: "#1a1a1a",

        boxSizing: "border-box",

        padding: "56px",

        overflow: "visible",

        fontFamily:
          "Helvetica, Arial, sans-serif",
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          overflow: "visible",
        }}
      >
        <Typography
          sx={{
            fontFamily:
              "Helvetica, Arial, sans-serif",
            fontSize: "27px",
            lineHeight: 1.15,
            fontWeight: 700,
            color: "#1a1a1a",
            mb: "4px",
          }}
        >
          {data.full_name}
        </Typography>

        <Typography
          sx={{
            fontFamily:
              "Helvetica, Arial, sans-serif",
            fontSize: "16px",
            lineHeight: 1.3,
            color: "#3a3a3a",
            mb: "8px",
          }}
        >
          {data.target_title}
        </Typography>

        <Typography
          sx={{
            fontFamily:
              "Helvetica, Arial, sans-serif",
            fontSize: "14px",
            lineHeight: 1.5,
            color: "#555555",
            overflowWrap:
              "anywhere",
            wordBreak:
              "break-word",
          }}
        >
          {data.location} &nbsp;|&nbsp;
          {data.phone} &nbsp;|&nbsp;
          {data.email} &nbsp;|&nbsp;
          {data.linkedin}
        </Typography>
      </Box>

      {/* SUMMARY */}

      <SectionTitle>
        PROFESSIONAL SUMMARY
      </SectionTitle>

      <Typography
        sx={{
          fontFamily:
            "Helvetica, Arial, sans-serif",
          fontSize: "14px",
          lineHeight: 1.4,
          color: "#1a1a1a",
          overflowWrap:
            "anywhere",
          wordBreak:
            "break-word",
        }}
      >
        {data.summary}
      </Typography>

      {/* EXPERIENCE */}

      <SectionTitle>
        WORK EXPERIENCE
      </SectionTitle>

      {data.experience.map(
        (job, index) => (
          <Box
            key={index}
            sx={{
              mb: "12px",
              width: "100%",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "flex-start",
                gap: "15px",
                width: "100%",
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  minWidth: 0,
                  flex: 1,
                  fontFamily:
                    "Helvetica, Arial, sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.3,
                  fontWeight: 700,
                  color: "#1a1a1a",
                  overflowWrap:
                    "anywhere",
                  wordBreak:
                    "break-word",
                }}
              >
                {job.title} —{" "}
                {job.company}
              </Typography>

              <Typography
                sx={{
                  flexShrink: 0,
                  fontFamily:
                    "Helvetica, Arial, sans-serif",
                  fontSize: "13.5px",
                  lineHeight: 1.3,
                  fontStyle:
                    "italic",
                  color: "#555555",
                  whiteSpace:
                    "nowrap",
                }}
              >
                {job.start_date} –{" "}
                {job.end_date}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontFamily:
                  "Helvetica, Arial, sans-serif",
                fontSize: "13.5px",
                lineHeight: 1.3,
                fontStyle:
                  "italic",
                color: "#555555",
                mb: "4px",
              }}
            >
              {job.location}
            </Typography>

            {job.bullets.map(
              (
                bullet,
                bulletIndex
              ) => (
                <Box
                  key={
                    bulletIndex
                  }
                  sx={{
                    display:
                      "flex",
                    alignItems:
                      "flex-start",
                    width:
                      "100%",
                    mb: "2px",
                  }}
                >
                  <Typography
                    sx={{
                      flex:
                        "0 0 14px",
                      fontFamily:
                        "Helvetica, Arial, sans-serif",
                      fontSize: "13.5px",
                      lineHeight:
                        1.35,
                      color:
                        "#1a1a1a",
                    }}
                  >
                    •
                  </Typography>

                  <Typography
                    sx={{
                      flex:
                        "1 1 auto",
                      minWidth: 0,
                      fontFamily:
                        "Helvetica, Arial, sans-serif",
                      fontSize: "13.5px",
                      lineHeight:
                        1.35,
                      color:
                        "#1a1a1a",
                      overflowWrap:
                        "anywhere",
                      wordBreak:
                        "break-word",
                    }}
                  >
                    {bullet}
                  </Typography>
                </Box>
              )
            )}
          </Box>
        )
      )}

      {/* EDUCATION */}

      <SectionTitle>
        EDUCATION
      </SectionTitle>

      {data.education.map(
        (edu, index) => (
          <Box
            key={index}
            sx={{
              mb: "8px",
            }}
          >
            <Box
              sx={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "flex-start",
                gap: "15px",
                width:
                  "100%",
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  minWidth: 0,
                  flex: 1,
                  fontFamily:
                    "Helvetica, Arial, sans-serif",
                  fontSize: "14px",
                  lineHeight:
                    1.3,
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
                {edu.degree} —{" "}
                {edu.institution}
              </Typography>

              <Typography
                sx={{
                  flexShrink: 0,
                  fontFamily:
                    "Helvetica, Arial, sans-serif",
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
                {edu.grad_date}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontFamily:
                  "Helvetica, Arial, sans-serif",
                fontSize: "13.5px",
                lineHeight:
                  1.3,
                fontStyle:
                  "italic",
                color:
                  "#555555",
              }}
            >
              {edu.location}
            </Typography>
          </Box>
        )
      )}

      {/* CERTIFICATIONS */}

      <SectionTitle>
        CERTIFICATIONS
      </SectionTitle>

      {data.certifications.map(
        (
          certification,
          index
        ) => (
          <CertificationItem
            key={index}
            certification={
              certification
            }
          />
        )
      )}

      {/* SKILLS */}

      <SectionTitle>
        SKILLS
      </SectionTitle>

      <Typography
        sx={{
          fontFamily:
            "Helvetica, Arial, sans-serif",
          fontSize: "13.5px",
          lineHeight: 1.4,
          color: "#1a1a1a",
          overflowWrap:
            "anywhere",
          wordBreak:
            "break-word",
        }}
      >
        {data.skills.join(
          " • "
        )}
      </Typography>

      {/* LANGUAGES */}

      <SectionTitle>
        LANGUAGES
      </SectionTitle>

      <Typography
        sx={{
          fontFamily:
            "Helvetica, Arial, sans-serif",
          fontSize: "13.5px",
          lineHeight: 1.4,
          color: "#1a1a1a",
          overflowWrap:
            "anywhere",
          wordBreak:
            "break-word",
        }}
      >
        {data.languages
          .map(
            (language) =>
              `${language.name} (${language.level})`
          )
          .join(
            " • "
          )}
      </Typography>
    </Box>
  );
}

export default MinimalPreviewContent;