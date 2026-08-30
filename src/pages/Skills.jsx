import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useResumeStore from "../store/resumeStore";
import GuidancePanel from "../components/GuidancePanel";
import CompletenessChecklist from "../components/CompletenessChecklist";
import { checkSkillsCompleteness } from "../assistant/completenessChecker";
import { suggestSkillsForResume } from "../assistant/localAssistant";
import { useLanguage } from "../i18n/LanguageContext";

function cleanText(value) {
  return String(value || "")
    .replace(/^[\s•●▪◦*-]+/, "")
    .replace(/[\s•●▪◦*-]+$/, "")
    .trim();
}

function normalizeSkill(item) {
  if (typeof item === "string") {
    const title = cleanText(item);

    return {
      title,
      description: "",
      bullets: [],
    };
  }

  if (item && typeof item === "object") {
    const title = cleanText(
      item.title ||
        item.name ||
        item.skill ||
        ""
    );

    const description = String(
      item.description ||
        item.details ||
        ""
    ).trim();

    const bullets = Array.isArray(item.bullets)
      ? item.bullets
          .map((bullet) => cleanText(bullet))
          .filter(Boolean)
      : description
          .split(/\n/)
          .map((line) => cleanText(line))
          .filter(Boolean);

    return {
      ...item,
      title,
      description,
      bullets,
    };
  }

  return {
    title: "",
    description: "",
    bullets: [],
  };
}

function normalizeLanguage(item) {
  if (typeof item === "string") {
    return {
      language: cleanText(item),
      name: cleanText(item),
      level: "",
    };
  }

  if (item && typeof item === "object") {
    const language = cleanText(
      item.language ||
        item.name ||
        ""
    );

    return {
      ...item,
      language,
      name: language,
      level: cleanText(item.level || ""),
    };
  }

  return {
    language: "",
    name: "",
    level: "",
  };
}


function Skills() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const setSkills = useResumeStore(
    (state) => state.setSkills
  );

  const setLanguages = useResumeStore(
    (state) => state.setLanguages
  );

  const resume = useResumeStore(
    (state) => state
  );

  const initialSkills = Array.isArray(
    resume.skills
  )
    ? resume.skills
        .map(normalizeSkill)
        .filter((skill) => skill.title)
    : [];

  const [skills, setSkillsList] =
    useState(initialSkills);

  const [skillTitle, setSkillTitle] =
    useState("");

  const [skillDescription, setSkillDescription] =
    useState("");

  const alreadyAddedTitles = new Set(
    skills.map((s) => (s.title || "").toLowerCase())
  );

  const suggestedSkills = suggestSkillsForResume(
    resume
  ).filter(
    (skill) =>
      !alreadyAddedTitles.has(skill.toLowerCase())
  );

  const handleSuggestedSkillClick = (skillName) => {
    setSkillsList([
      ...skills,
      { title: skillName, description: "", bullets: [] },
    ]);
  };

  const [language, setLanguage] =
    useState("English");

  const [level, setLevel] =
    useState("Intermediate");

  const [languages, setLanguagesList] =
    useState(
      Array.isArray(resume.languages)
        ? resume.languages
            .map(normalizeLanguage)
            .filter(
              (item) =>
                item.language ||
                item.name
            )
        : []
    );

  const addSkill = () => {
    const title = cleanText(skillTitle);

    const description =
      String(skillDescription || "").trim();

    if (!title) {
      return;
    }

    const bullets = description
      .split(/\n/)
      .map((line) => cleanText(line))
      .filter(Boolean);

    setSkillsList([
      ...skills,
      {
        title,
        description,
        bullets,
      },
    ]);

    setSkillTitle("");
    setSkillDescription("");
  };

  const removeSkill = (index) => {
    setSkillsList(
      skills.filter((_, i) => i !== index)
    );
  };

  const addLanguage = () => {
    const normalizedLanguage =
      cleanText(language);

    const normalizedLevel =
      cleanText(level);

    if (!normalizedLanguage) {
      return;
    }

    setLanguagesList([
      ...languages,
      {
        language: normalizedLanguage,
        name: normalizedLanguage,
        level: normalizedLevel,
      },
    ]);
  };

  const removeLanguage = (index) => {
    setLanguagesList(
      languages.filter(
        (_, i) => i !== index
      )
    );
  };

  const handleNext = () => {
    const cleanedSkills = skills
      .map((skill) => {
        const title = cleanText(
          skill.title
        );

        const description = String(
          skill.description || ""
        ).trim();

        const bullets = Array.isArray(
          skill.bullets
        )
          ? skill.bullets
              .map((bullet) =>
                cleanText(bullet)
              )
              .filter(Boolean)
          : description
              .split(/\n/)
              .map((line) =>
                cleanText(line)
              )
              .filter(Boolean);

        return {
          ...skill,
          title,
          description,
          bullets,
        };
      })
      .filter(
        (skill) => skill.title
      );

    const cleanedLanguages =
      languages
        .map((item) => {
          const language = cleanText(
            item.language ||
              item.name ||
              ""
          );

          const name = language;

          const normalizedLevel =
            cleanText(
              item.level || ""
            );

          return {
            ...item,
            language,
            name,
            level:
              normalizedLevel,
          };
        })
        .filter(
          (item) =>
            item.language ||
            item.name
        );

    setSkills(cleanedSkills);
    setLanguages(cleanedLanguages);

    navigate("/certifications");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "background.default",
        py: 3,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                textAlign: "center",
                color: "primary.main",
                fontWeight: 700,
              }}
            >
              {t("skillsPage.title")}
            </Typography>

            <GuidancePanel sectionKey="skills" />
            <CompletenessChecklist {...checkSkillsCompleteness(resume)} />

            <Typography
              sx={{
                mb: 2,
                color: "primary.main",
                fontWeight: 700,
                fontSize: "1.05rem",
              }}
            >
              {t("skillsPage.professionalSkills")}
            </Typography>

            <Stack spacing={2}>
              <TextField
                fullWidth
                label={t("skillsPage.skillTitle")}
                value={skillTitle}
                onChange={(e) =>
                  setSkillTitle(
                    e.target.value
                  )
                }
                placeholder={t("skillsPage.skillTitlePlaceholder")}
              />

              {suggestedSkills.length > 0 ? (
                <Box>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <AutoAwesomeIcon
                      sx={{
                        fontSize: 15,
                        color: "primary.dark",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "primary.dark",
                        fontWeight: 700,
                      }}
                    >
                      {t("skillsPage.suggestedForRole")}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    useFlexGap
                    spacing={1}
                  >
                    {suggestedSkills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        onClick={() =>
                          handleSuggestedSkillClick(
                            skill
                          )
                        }
                        sx={{
                          bgcolor: "action.hover",
                          color: "primary.dark",
                          fontWeight: 600,
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: "action.selected",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              ) : null}

              <TextField
                fullWidth
                multiline
                minRows={3}
                label={t("skillsPage.skillDescription")}
                value={skillDescription}
                onChange={(e) =>
                  setSkillDescription(
                    e.target.value
                  )
                }
                placeholder={t("skillsPage.skillDescriptionPlaceholder")}
                helperText={t("skillsPage.skillDescriptionHelper")}
              />

              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addSkill}
                disabled={
                  !skillTitle.trim()
                }
                sx={{
                  borderColor:
                    "primary.main",
                  color: "primary.main",
                  fontWeight: 700,
                  borderRadius: 2,
                  "&:hover": {
                    borderColor:
                      "primary.main",
                    background:
                      "action.hover",
                  },
                }}
              >
                {t("skillsPage.addSkill")}
              </Button>
            </Stack>

            {skills.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    mb: 1.5,
                    color: "primary.main",
                    fontWeight: 700,
                  }}
                >
                  {t("skillsPage.addedSkills")}
                </Typography>

                <Stack spacing={1.5}>
                  {skills.map(
                    (skill, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems:
                            "flex-start",
                          justifyContent:
                            "space-between",
                          gap: 1,
                          p: 1.5,
                          background:
                            "background.paper",
                          borderRadius: 2,
                          border:
                            "1px solid var(--app-divider)",
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
                              fontWeight: 700,
                              color:
                                "primary.main",
                              fontSize:
                                "1rem",
                              lineHeight:
                                1.4,
                            }}
                          >
                            {skill.title}
                          </Typography>

                          {skill.description && (
                            <Typography
                              sx={{
                                mt: 0.4,
                                fontSize:
                                  "0.85rem",
                                lineHeight:
                                  1.5,
                                color:
                                  "text.secondary",
                                whiteSpace:
                                  "pre-line",
                              }}
                            >
                              {
                                skill.description
                              }
                            </Typography>
                          )}

                          {skill.bullets?.length >
                            0 && (
                            <Box
                              component="ul"
                              sx={{
                                mt: 0.5,
                                mb: 0,
                                pl: 2,
                              }}
                            >
                              {skill.bullets.map(
                                (
                                  bullet,
                                  bulletIndex
                                ) => (
                                  <li
                                    key={
                                      bulletIndex
                                    }
                                  >
                                    <Typography
                                      component="span"
                                      sx={{
                                        fontSize:
                                          "0.85rem",
                                        lineHeight:
                                          1.5,
                                        color:
                                          "text.secondary",
                                      }}
                                    >
                                      {
                                        bullet
                                      }
                                    </Typography>
                                  </li>
                                )
                              )}
                            </Box>
                          )}
                        </Box>

                        <IconButton
                          size="small"
                          onClick={() =>
                            removeSkill(
                              index
                            )
                          }
                          sx={{
                            flexShrink: 0,
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )
                  )}
                </Stack>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography
              sx={{
                mb: 2,
                color: "primary.main",
                fontWeight: 700,
                fontSize: "1.05rem",
              }}
            >
              {t("skillsPage.languagesSection")}
            </Typography>

            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>
                  {t("skillsPage.language")}
                </InputLabel>

                <Select
                  value={language}
                  label={t("skillsPage.language")}
                  onChange={(e) =>
                    setLanguage(
                      e.target.value
                    )
                  }
                >
                  <MenuItem value="English">
                    {t("skillsPage.languageOptions.english")}
                  </MenuItem>

                  <MenuItem value="French">
                    {t("skillsPage.languageOptions.french")}
                  </MenuItem>

                  <MenuItem value="German">
                    {t("skillsPage.languageOptions.german")}
                  </MenuItem>

                  <MenuItem value="Spanish">
                    {t("skillsPage.languageOptions.spanish")}
                  </MenuItem>

                  <MenuItem value="Persian">
                    {t("skillsPage.languageOptions.persian")}
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>
                  {t("skillsPage.level")}
                </InputLabel>

                <Select
                  value={level}
                  label={t("skillsPage.level")}
                  onChange={(e) =>
                    setLevel(
                      e.target.value
                    )
                  }
                >
                  <MenuItem value="Beginner">
                    {t("skillsPage.levels.beginner")}
                  </MenuItem>

                  <MenuItem value="Basic">
                    {t("skillsPage.levels.basic")}
                  </MenuItem>

                  <MenuItem value="Intermediate">
                    {t("skillsPage.levels.intermediate")}
                  </MenuItem>

                  <MenuItem value="Upper-Intermediate">
                    {t("skillsPage.levels.upperIntermediate")}
                  </MenuItem>

                  <MenuItem value="Advanced">
                    {t("skillsPage.levels.advanced")}
                  </MenuItem>

                  <MenuItem value="Fluent">
                    {t("skillsPage.levels.fluent")}
                  </MenuItem>

                  <MenuItem value="Native">
                    {t("skillsPage.levels.native")}
                  </MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={
                  addLanguage
                }
                sx={{
                  borderColor:
                    "primary.main",
                  color: "primary.main",
                  fontWeight: 700,
                  borderRadius: 2,
                  "&:hover": {
                    borderColor:
                      "primary.main",
                    background:
                      "action.hover",
                  },
                }}
              >
                {t("skillsPage.addLanguage")}
              </Button>
            </Stack>

            {languages.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Stack spacing={1}>
                  {languages.map(
                    (item, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                          p: 1.5,
                          background:
                            "background.paper",
                          borderRadius: 2,
                          border:
                            "1px solid var(--app-divider)",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              color:
                                "primary.main",
                            }}
                          >
                            {item.language ||
                              item.name}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize:
                                "0.85rem",
                              color:
                                "text.secondary",
                            }}
                          >
                            {
                              item.level
                            }
                          </Typography>
                        </Box>

                        <IconButton
                          onClick={() =>
                            removeLanguage(
                              index
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    )
                  )}
                </Stack>
              </Box>
            )}

            <Stack
              direction="row"
              spacing={2}
              sx={{
                mt: 4,
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={() =>
                  navigate(
                    "/education"
                  )
                }
                sx={{
                  minHeight: 44,
                }}
              >
                {t("nav.back")}
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={handleNext}
                sx={{
                  background:
                    "#D4A030",
                  minHeight: 44,
                  fontWeight: 700,
                  "&:hover": {
                    background:
                      "#b88925",
                  },
                }}
              >
                {t("nav.next")}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Skills;