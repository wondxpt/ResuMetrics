import { Box, Typography, Divider } from "@mui/material";
import modernDemoPhoto from "../../photos/modern-demo-photo.jpg";

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
    "Results-driven Senior Business Analyst with 8+ years of experience translating business requirements into practical technology and process improvements. Strong background in stakeholder management, data analysis, process optimization, and cross-functional project delivery.",

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
    "Documentation",
  ],

  languages: [
    { name: "English", level: "Native" },
    { name: "French", level: "Professional" },
    { name: "Spanish", level: "Basic" },
  ],

  education: [
    {
      degree: "Bachelor of Business Administration",
      institution: "University of Toronto",
      location: "Toronto, ON",
      grad_date: "2013",
    },
  ],

  experience: [
    {
      title: "Senior Business Analyst",
      company: "ABC Consulting Inc.",
      location: "Toronto, ON",
      start_date: "2021",
      end_date: "Present",
      bullets: [
        "Led requirements gathering and business analysis initiatives across multiple enterprise projects.",
        "Improved reporting workflows and reduced manual processing time by approximately 25%.",
        "Collaborated with product, engineering, finance, and operations teams to deliver business solutions.",
      ],
    },
    {
      title: "Business Analyst",
      company: "NorthStar Solutions",
      location: "Toronto, ON",
      start_date: "2017",
      end_date: "2021",
      bullets: [
        "Analyzed operational processes and identified opportunities for efficiency and cost reduction.",
        "Prepared business requirements, process documentation, and functional specifications.",
        "Supported project teams throughout implementation and testing.",
      ],
    },
    {
      title: "Junior Business Analyst",
      company: "MapleTech Solutions",
      location: "Mississauga, ON",
      start_date: "2015",
      end_date: "2017",
      bullets: [
        "Supported senior analysts with requirements gathering, documentation, and data analysis.",
        "Created reports and dashboards using Microsoft Excel and SQL.",
        "Assisted project teams with testing, issue tracking, and stakeholder communication.",
      ],
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
      description:
        "Professional certification demonstrating advanced business analysis knowledge and experience.",
      bullets: [
        "Advanced business analysis practices",
        "Requirements analysis and stakeholder management",
      ],
    },
    {
      name: "Professional Scrum Master I (PSM I)",
      issuer: "Scrum.org",
      issue_date: "2021",
      expiration_date: "",
      credential_id: "PSM-I-784521",
      credential_url: "https://www.scrum.org/",
      description:
        "Certification covering Scrum framework, Agile principles, and Scrum team practices.",
      bullets: [
        "Scrum framework and Agile principles",
        "Facilitation and Scrum team practices",
      ],
    },
    {
      name: "Microsoft Certified: Power BI Data Analyst Associate",
      issuer: "Microsoft",
      issue_date: "2023",
      expiration_date: "2025",
      credential_id: "PL-300-923817",
      credential_url: "https://learn.microsoft.com/",
      description:
        "Certification focused on data preparation, modeling, visualization, and analysis using Microsoft Power BI.",
      bullets: [
        "Data modeling and visualization",
        "Business intelligence and reporting",
      ],
    },
  ],
};

function SidebarHeading({ children }) {
  return (
    <Typography
      sx={{
        fontSize: "14px",
        lineHeight: 1.4,
        fontWeight: 700,
        letterSpacing: "0.8px",
        color: "#ffffff",
        marginBottom: "8px",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      {children}
    </Typography>
  );
}

function MainHeading({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "8px",
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          lineHeight: 1.4,
          fontWeight: 700,
          color: "#1e293b",
          letterSpacing: "0.4px",
          marginBottom: "5px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        {children}
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "#1e293b",
        }}
      />
    </Box>
  );
}

function TwoColumnPreviewContent() {
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

        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",

        overflow: "hidden",

        backgroundColor: "#ffffff",

        fontFamily: "Helvetica, Arial, sans-serif",

        boxSizing: "border-box",

        "& *": {
          boxSizing: "border-box",
        },
      }}
    >
      {/* LEFT SIDEBAR */}

      <Box
        sx={{
          width: "250px",
          minWidth: "250px",
          maxWidth: "250px",

          height: A4_HEIGHT,

          flex: "0 0 250px",

          backgroundColor: "#1e293b",
          color: "#ffffff",

          padding: "30px 20px",

          overflow: "hidden",

          boxSizing: "border-box",

          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* PHOTO */}

        <Box
          sx={{
            width: "110px",
            height: "110px",

            minWidth: "110px",
            minHeight: "110px",

            flexShrink: 0,

            borderRadius: "50%",

            margin: "0 auto 25px",

            backgroundColor: "#ffffff",

            border: "4px solid rgba(255,255,255,0.9)",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            overflow: "hidden",

            boxSizing: "border-box",

            boxShadow:
              "0 2px 8px rgba(0,0,0,0.18)",
          }}
        >
          <Box
            component="img"
            src={modernDemoPhoto}
            alt={demoData.full_name}
            sx={{
              width: "100%",
              height: "100%",
              minWidth: "100%",
              minHeight: "100%",

              display: "block",

              objectFit: "cover",

              objectPosition: "50% 35%",

              transform: "scale(1.02)",
              transformOrigin: "center center",
            }}
          />
        </Box>

        {/* CONTACT */}

        <Box
          sx={{
            width: "100%",
            marginBottom: "24px",
          }}
        >
          <SidebarHeading>
            CONTACT
          </SidebarHeading>

          <Typography sx={sidebarTextStyle}>
            {demoData.email}
          </Typography>

          <Typography sx={sidebarTextStyle}>
            {demoData.phone}
          </Typography>

          <Typography sx={sidebarTextStyle}>
            {demoData.location}
          </Typography>

          <Typography
            sx={{
              ...sidebarTextStyle,
              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {demoData.linkedin}
          </Typography>
        </Box>

        {/* SKILLS */}

        <Box
          sx={{
            width: "100%",
            marginBottom: "24px",
          }}
        >
          <SidebarHeading>
            SKILLS
          </SidebarHeading>

          {demoData.skills.map(
            (skill, index) => (
              <Typography
                key={index}
                sx={{
                  ...sidebarTextStyle,
                  marginBottom: "5px",
                }}
              >
                • {skill}
              </Typography>
            )
          )}
        </Box>

        {/* LANGUAGES */}

        <Box
          sx={{
            width: "100%",
          }}
        >
          <SidebarHeading>
            LANGUAGES
          </SidebarHeading>

          {demoData.languages.map(
            (language, index) => (
              <Typography
                key={index}
                sx={{
                  ...sidebarTextStyle,
                  marginBottom: "5px",
                }}
              >
                {language.name}
                {language.level
                  ? ` — ${language.level}`
                  : ""}
              </Typography>
            )
          )}
        </Box>
      </Box>

      {/* RIGHT MAIN COLUMN */}

      <Box
        sx={{
          width: "544px",
          minWidth: "544px",
          maxWidth: "544px",

          height: A4_HEIGHT,

          flex: "0 0 544px",

          padding: "34px 30px 30px 28px",

          overflow: "hidden",

          backgroundColor: "#ffffff",
          color: "#1a1a1a",

          boxSizing: "border-box",
        }}
      >
        {/* HEADER */}

        <Box
          sx={{
            width: "100%",
            marginBottom: "18px",
          }}
        >
          <Typography
            sx={{
              fontSize: "27px",
              lineHeight: 1.15,
              fontWeight: 700,

              color: "#1a1a1a",

              marginBottom: "5px",

              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {demoData.full_name}
          </Typography>

          <Typography
            sx={{
              fontSize: "15px",
              lineHeight: 1.35,
              color: "#1e293b",

              marginBottom: "8px",

              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {demoData.target_title}
          </Typography>
        </Box>

        {/* PROFESSIONAL SUMMARY */}

        <Box
          sx={{
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <MainHeading>
            PROFESSIONAL SUMMARY
          </MainHeading>

          <Typography sx={bodyStyle}>
            {demoData.summary}
          </Typography>
        </Box>

        {/* WORK EXPERIENCE */}

        <Box
          sx={{
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <MainHeading>
            WORK EXPERIENCE
          </MainHeading>

          {demoData.experience.map(
            (job, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  minWidth: 0,

                  marginBottom: "16px",

                  overflow: "hidden",
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
                  }}
                >
                  <Typography
                    sx={{
                      minWidth: 0,

                      fontSize: "13.5px",
                      lineHeight: 1.4,
                      fontWeight: 700,

                      color: "#1a1a1a",

                      overflowWrap:
                        "anywhere",

                      wordBreak:
                        "break-word",
                    }}
                  >
                    {job.title}
                    {job.company
                      ? ` — ${job.company}`
                      : ""}
                  </Typography>

                  <Typography
                    sx={{
                      flexShrink: 0,

                      fontSize: "13.5px",
                      lineHeight: 1.4,

                      fontStyle: "italic",

                      color: "#555555",

                      whiteSpace:
                        "nowrap",

                      textAlign:
                        "right",
                    }}
                  >
                    {job.start_date} –{" "}
                    {job.end_date}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: "13.5px",
                    lineHeight: 1.4,

                    fontStyle: "italic",

                    color: "#555555",

                    marginBottom: "5px",

                    overflowWrap:
                      "anywhere",

                    wordBreak:
                      "break-word",
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
                      key={bulletIndex}
                      sx={{
                        display: "flex",

                        width:
                          "100%",

                        marginBottom:
                          "4px",

                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          width: "15px",
                          minWidth:
                            "15px",

                          fontSize: "13.5px",
                          lineHeight:
                            1.5,

                          color:
                            "#1e293b",

                          flexShrink: 0,
                        }}
                      >
                        •
                      </Typography>

                      <Typography
                        sx={{
                          flex: 1,
                          minWidth: 0,

                          fontSize: "13.5px",

                          lineHeight:
                            1.5,

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
        </Box>

        {/* EDUCATION */}

        <Box
          sx={{
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <MainHeading>
            EDUCATION
          </MainHeading>

          {demoData.education.map(
            (education, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  minWidth: 0,

                  marginBottom:
                    "12px",
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
                    sx={{
                      minWidth: 0,

                      fontSize: "13.5px",

                      lineHeight:
                        1.45,

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
                    {education.degree}
                    {education.institution
                      ? ` — ${education.institution}`
                      : ""}
                  </Typography>

                  <Typography
                    sx={{
                      flexShrink: 0,

                      fontSize: "13.5px",

                      lineHeight:
                        1.4,

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
                    {education.grad_date}
                  </Typography>
                </Box>

                {education.location && (
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
                    {education.location}
                  </Typography>
                )}
              </Box>
            )
          )}
        </Box>

        {/* CERTIFICATIONS */}

        {demoData.certifications?.length >
          0 && (
          <Box
            sx={{
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <MainHeading>
              CERTIFICATIONS
            </MainHeading>

            {demoData.certifications.map(
              (
                certification,
                index
              ) => {
                const dates = [
                  certification.issue_date,
                  certification.expiration_date
                    ? `Expires ${certification.expiration_date}`
                    : "",
                ]
                  .filter(Boolean)
                  .join(
                    " – "
                  );

                return (
                  <Box
                    key={index}
                    sx={{
                      width: "100%",
                      minWidth: 0,
                      marginBottom:
                        "12px",
                    }}
                  >
                    <Box
                      sx={{
                        width:
                          "100%",
                        minWidth: 0,

                        display:
                          "grid",

                        gridTemplateColumns:
                          "minmax(0, 1fr) auto",

                        columnGap:
                          "12px",

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

                            lineHeight:
                              1.4,

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
                          {certification.name}
                          {certification.issuer
                            ? ` — ${certification.issuer}`
                            : ""}
                        </Typography>

                        {certification.credential_id && (
                          <Typography
                            sx={{
                              fontSize: "13.5px",

                              lineHeight:
                                1.35,

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
                            Credential ID:{" "}
                            {
                              certification.credential_id
                            }
                          </Typography>
                        )}
                      </Box>

                      {dates && (
                        <Typography
                          sx={{
                            flexShrink:
                              0,

                            fontSize: "13.5px",

                            lineHeight:
                              1.4,

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

                    {certification.bullets?.length >
                      0 && (
                      <Box
                        component="ul"
                        sx={{
                          margin: 0,
                          marginTop: "3px",
                          paddingLeft: "15px",

                          "& li": {
                            fontSize: "13.5px",

                            lineHeight:
                              1.45,

                            marginBottom:
                              "2px",

                            color:
                              "#1a1a1a",

                            overflowWrap:
                              "anywhere",

                            wordBreak:
                              "break-word",
                          },
                        }}
                      >
                        {certification.bullets.map(
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
                    )}

                    {certification.credential_url && (
                      <Typography
                        sx={{
                          fontSize: "13.5px",

                          lineHeight:
                            1.35,

                          color:
                            "#1e293b",

                          marginTop:
                            "3px",

                          overflowWrap:
                            "anywhere",

                          wordBreak:
                            "break-word",
                        }}
                      >
                        {
                          certification.credential_url
                        }
                      </Typography>
                    )}
                  </Box>
                );
              }
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

const sidebarTextStyle = {
  fontFamily:
    "Helvetica, Arial, sans-serif",

  fontSize: "13.5px",

  lineHeight: 1.45,

  color: "#e2e8f0",

  marginBottom: "5px",

  overflowWrap: "anywhere",

  wordBreak: "break-word",
};

const bodyStyle = {
  fontFamily:
    "Helvetica, Arial, sans-serif",

  fontSize: "13.5px",

  lineHeight: 1.55,

  color: "#1a1a1a",

  overflowWrap: "anywhere",

  wordBreak: "break-word",
};

export default TwoColumnPreviewContent;