import { Box, Typography } from "@mui/material";
import creativeDemoPhoto from "../../../assets/images/creative-demo-photo.jpg";

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
    {
      name: "English",
      level: "Native",
    },
    {
      name: "French",
      level: "Professional",
    },
    {
      name: "Spanish",
      level: "Basic",
    },
  ],
};

function SidebarHeading({ children }) {
  return (
    <Typography
      sx={{
        fontSize: "12px",
        lineHeight: 1.4,
        fontWeight: 700,
        letterSpacing: "0.8px",
        color: "#ffffff",
        marginBottom: "8px",
      }}
    >
      {children}
    </Typography>
  );
}

function MainHeading({ children }) {
  return (
    <Typography
      sx={{
        fontSize: "13.5px",
        lineHeight: "15px",
        fontWeight: 700,
        letterSpacing: "0.5px",
        color: "#9d174d",
        textTransform: "uppercase",
        margin: 0,
        marginBottom: "4px",
        padding: 0,
      }}
    >
      {children}
    </Typography>
  );
}

function SectionDivider() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "1px",
        backgroundColor: "#9d174d",
        marginBottom: "6px",
      }}
    />
  );
}

function CreativePhotoPreviewContent() {
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

        overflow: "hidden",

        backgroundColor: "#ffffff",

        fontFamily:
          "Arial, Helvetica, sans-serif",

        boxSizing: "border-box",

        "& *": {
          boxSizing: "border-box",
        },
      }}
    >
      {/* =====================================================
          LEFT SIDEBAR
      ====================================================== */}

      <Box
        sx={{
          width: "32%",
          minWidth: 0,
          height: "100%",

          flexShrink: 0,

          backgroundColor: "#9d174d",
          color: "#ffffff",

          padding: "28px 22px",

          overflow: "hidden",

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

            borderRadius: "50%",

            margin:
              "0 auto 25px",

            flexShrink: 0,

            backgroundColor: "#ffffff",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            overflow: "hidden",

            border:
              "4px solid rgba(255,255,255,0.85)",
          }}
        >
          <Box
            component="img"
            src={creativeDemoPhoto}
            alt={demoData.full_name}
            sx={{
              width: "100%",
              height: "100%",

              display: "block",

              objectFit: "cover",

              objectPosition:
                "50% 35%",

              transform: "scale(1.02)",
              transformOrigin:
                "center center",
            }}
          />
        </Box>

        {/* CONTACT */}

        <SidebarHeading>
          CONTACT
        </SidebarHeading>

        <Box
          sx={{
            width: "100%",
            minWidth: 0,
            marginBottom: "22px",
          }}
        >
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
              overflowWrap:
                "anywhere",
              wordBreak:
                "break-word",
            }}
          >
            {demoData.linkedin}
          </Typography>
        </Box>

        {/* SKILLS */}

        <SidebarHeading>
          SKILLS
        </SidebarHeading>

        <Box
          sx={{
            width: "100%",
            minWidth: 0,
            marginBottom: "22px",
          }}
        >
          {demoData.skills.map(
            (skill, index) => (
              <Typography
                key={index}
                sx={{
                  ...sidebarTextStyle,
                  marginBottom:
                    "5px",
                }}
              >
                • {skill}
              </Typography>
            )
          )}
        </Box>

        {/* LANGUAGES */}

        <SidebarHeading>
          LANGUAGES
        </SidebarHeading>

        <Box
          sx={{
            width: "100%",
            minWidth: 0,
          }}
        >
          {demoData.languages.map(
            (language, index) => (
              <Typography
                key={index}
                sx={{
                  ...sidebarTextStyle,
                  marginBottom:
                    "5px",
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

      {/* =====================================================
          RIGHT MAIN CONTENT
      ====================================================== */}

      <Box
        sx={{
          width: "68%",
          minWidth: 0,
          minHeight: 0,

          flex: 1,

          height: "100%",

          padding:
            "34px 30px",

          overflow: "hidden",

          boxSizing:
            "border-box",

          backgroundColor:
            "#ffffff",

          color: "#1a1a1a",
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
            sx={{
              fontSize: "22px",
              lineHeight: 1.15,
              fontWeight: 700,
              color: "#1a1a1a",
              marginBottom:
                "5px",
              overflowWrap:
                "anywhere",
              wordBreak:
                "break-word",
            }}
          >
            {demoData.full_name}
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              lineHeight: 1.35,
              fontWeight: 400,
              color: "#9d174d",
              marginBottom:
                "8px",
              overflowWrap:
                "anywhere",
              wordBreak:
                "break-word",
            }}
          >
            {demoData.target_title}
          </Typography>

          <Typography
            sx={{
              fontSize: "12.5px",
              lineHeight: 1.5,
              color: "#555555",
              overflowWrap:
                "anywhere",
              wordBreak:
                "break-word",
            }}
          >
            {[
              demoData.location,
              demoData.phone,
              demoData.email,
              demoData.linkedin,
            ]
              .filter(Boolean)
              .join(" | ")}
          </Typography>
        </Box>

        {/* PROFESSIONAL SUMMARY */}

        <Box
          sx={{
            width: "100%",
            minWidth: 0,
            marginBottom: "12px",
          }}
        >
          <MainHeading>
            PROFESSIONAL SUMMARY
          </MainHeading>

          <SectionDivider />

          <Typography
            sx={bodyStyle}
          >
            {demoData.summary}
          </Typography>
        </Box>

        {/* WORK EXPERIENCE */}

        <Box
          sx={{
            width: "100%",
            minWidth: 0,
            marginTop: "12px",
            marginBottom: "0px",
          }}
        >
          <MainHeading>
            WORK EXPERIENCE
          </MainHeading>

          <SectionDivider />

          {demoData.experience.map(
            (job, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  minWidth: 0,
                  marginBottom:
                    "10px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    minWidth: 0,
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(0, 1fr) auto",
                    columnGap:
                      "12px",
                    alignItems:
                      "start",
                  }}
                >
                  <Typography
                    sx={{
                      ...jobTitleStyle,
                      minWidth: 0,
                    }}
                  >
                    {job.title}
                    {job.company
                      ? ` — ${job.company}`
                      : ""}
                  </Typography>

                  <Typography
                    sx={{
                      ...dateStyle,
                    }}
                  >
                    {job.start_date} –{" "}
                    {job.end_date}
                  </Typography>
                </Box>

                {job.location && (
                  <Typography
                    sx={{
                      ...metaStyle,
                      marginTop:
                        "2px",
                      marginBottom:
                        "4px",
                    }}
                  >
                    {job.location}
                  </Typography>
                )}

                {job.bullets.map(
                  (
                    bullet,
                    bulletIndex
                  ) => (
                    <Box
                      key={bulletIndex}
                      component="ul"
                      sx={{
                        margin: 0,
                        padding: 0,
                        paddingLeft:
                          "14px",
                        "& li": {
                          fontSize:
                            "9.2px",
                          lineHeight:
                            "12px",
                          color:
                            "#1a1a1a",
                          marginBottom:
                            "2px",
                          padding: 0,
                          overflowWrap:
                            "anywhere",
                          wordBreak:
                            "break-word",
                        },
                      }}
                    >
                      <li>{bullet}</li>
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
            minWidth: 0,
            marginTop: "12px",
          }}
        >
          <MainHeading>
            EDUCATION
          </MainHeading>

          <SectionDivider />

          {demoData.education.map(
            (
              education,
              index
            ) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  minWidth: 0,
                  marginBottom:
                    "8px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    minWidth: 0,
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(0, 1fr) auto",
                    columnGap:
                      "12px",
                    alignItems:
                      "start",
                  }}
                >
                  <Typography
                    sx={{
                      ...jobTitleStyle,
                      minWidth: 0,
                    }}
                  >
                    {education.degree}
                    {education.institution
                      ? ` — ${education.institution}`
                      : ""}
                  </Typography>

                  <Typography
                    sx={{
                      ...dateStyle,
                    }}
                  >
                    {education.grad_date}
                  </Typography>
                </Box>

                {education.location && (
                  <Typography
                    sx={{
                      ...metaStyle,
                      marginTop:
                        "2px",
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

        <Box
          sx={{
            width: "100%",
            minWidth: 0,
            marginTop: "12px",
          }}
        >
          <MainHeading>
            CERTIFICATIONS
          </MainHeading>

          <SectionDivider />

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
                    width:
                      "100%",
                    minWidth: 0,
                    marginBottom:
                      "8px",
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
                        minWidth:
                          0,
                        flex: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          ...jobTitleStyle,
                          minWidth:
                            0,
                        }}
                      >
                        {
                          certification.name
                        }
                        {certification.issuer
                          ? ` — ${certification.issuer}`
                          : ""}
                      </Typography>

                      {certification.credential_id && (
                        <Typography
                          sx={{
                            fontSize:
                              "8.8px",
                            lineHeight:
                              "12px",
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
                          ...dateStyle,
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
                        marginTop:
                          "2px",
                        padding: 0,
                        paddingLeft:
                          "14px",
                        "& li": {
                          fontSize:
                            "9.2px",
                          lineHeight:
                            "12px",
                          color:
                            "#1a1a1a",
                          marginBottom:
                            "2px",
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
                            {
                              bullet
                            }
                          </li>
                        )
                      )}
                    </Box>
                  )}

                  {certification.description &&
                    !certification.bullets?.length && (
                      <Typography
                        sx={{
                          fontSize:
                            "9.2px",
                          lineHeight:
                            "12px",
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
                        {
                          certification.description
                        }
                      </Typography>
                    )}

                  {certification.credential_url && (
                    <Typography
                      sx={{
                        fontSize:
                          "8.8px",
                        lineHeight:
                          "12px",
                        color:
                          "#9d174d",
                        marginTop:
                          "2px",
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
      </Box>
    </Box>
  );
}

const sidebarTextStyle = {
  fontSize: "12.5px",
  lineHeight: 1.45,
  color: "#fce7f3",
  margin: 0,
  marginBottom: "5px",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
  fontFamily:
    "Arial, Helvetica, sans-serif",
};

const jobTitleStyle = {
  fontSize: "13px",
  lineHeight: "14px",
  fontWeight: 700,
  color: "#1a1a1a",
  margin: 0,
  padding: 0,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const metaStyle = {
  fontSize: "12.5px",
  lineHeight: "13px",
  fontWeight: 400,
  fontStyle: "italic",
  color: "#555555",
  margin: 0,
  padding: 0,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const dateStyle = {
  fontSize: "12.5px",
  lineHeight: "13px",
  fontWeight: 400,
  fontStyle: "italic",
  color: "#555555",
  whiteSpace: "nowrap",
  textAlign: "right",
  margin: 0,
  padding: 0,
  flexShrink: 0,
};

const bodyStyle = {
  fontSize: "12.5px",
  lineHeight: "13px",
  fontWeight: 400,
  color: "#1a1a1a",
  margin: 0,
  padding: 0,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

export default CreativePhotoPreviewContent;