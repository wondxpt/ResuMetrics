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
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useResumeStore from "../store/resumeStore";
import { useLanguage } from "../i18n/LanguageContext";
import GuidancePanel from "../components/GuidancePanel";
import CompletenessChecklist from "../components/CompletenessChecklist";
import PolishButton from "../components/PolishButton";
import { checkExperienceCompleteness } from "../assistant/completenessChecker";

function Experience() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const resume = useResumeStore((state) => state);

  const setExperience = useResumeStore(
    (state) => state.setExperience
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [];

  for (let y = 2026; y >= 1980; y--) {
    years.push(y);
  }

  // =========================================================
  // EXPERIENCE LIST
  // =========================================================

  const normalizeExistingExperiences = (experience = []) => {
    if (!Array.isArray(experience)) {
      return [];
    }

    return experience.map((item) => ({
      title:
        item?.title ||
        item?.job_title ||
        item?.role ||
        "",

      job_title:
        item?.job_title ||
        item?.title ||
        item?.role ||
        "",

      company: item?.company || "",

      location: item?.location || "",

      start_date:
        item?.start_date ||
        [
          item?.start_month,
          item?.start_year,
        ]
          .filter(Boolean)
          .join(" "),

      end_date:
        item?.end_date ||
        (item?.current
          ? "Present"
          : [
              item?.end_month,
              item?.end_year,
            ]
              .filter(Boolean)
              .join(" ")),

      current: Boolean(item?.current),

      bullets: Array.isArray(item?.bullets)
        ? item.bullets
            .map((bullet) =>
              String(bullet || "").trim()
            )
            .filter(Boolean)
        : typeof item?.description === "string"
        ? item.description
            .split(/\n|\u2022|•/)
            .map((line) => line.trim())
            .filter(Boolean)
        : [],

      description:
        typeof item?.description === "string"
          ? item.description
          : "",
    }));
  };

  const [items, setItems] = useState(() =>
    normalizeExistingExperiences(
      resume.experience
    )
  );

  // =========================================================
  // CURRENT EXPERIENCE FORM
  // =========================================================

  const [form, setForm] = useState({
    job_title: "",
    company: "",
    location: "",

    start_month: "",
    start_year: "",

    end_month: "",
    end_year: "",

    current: false,

    bullets: [],
  });

  const [bulletInput, setBulletInput] =
    useState("");

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // CURRENT / PRESENT
  // =========================================================

  const handleCurrent = (e) => {
    const isPresent =
      e.target.value === "Present";

    setForm((prev) => ({
      ...prev,
      current: isPresent,
      end_month: "",
      end_year: "",
    }));
  };

  // =========================================================
  // ADD BULLET
  // =========================================================

  const addBullet = () => {
    const text = bulletInput.trim();

    if (!text) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      bullets: [
        ...(Array.isArray(prev.bullets)
          ? prev.bullets
          : []),
        text,
      ],
    }));

    setBulletInput("");
  };

  // =========================================================
  // REMOVE BULLET
  // =========================================================

  const removeBullet = (index) => {
    setForm((prev) => ({
      ...prev,
      bullets: (
        Array.isArray(prev.bullets)
          ? prev.bullets
          : []
      ).filter((_, i) => i !== index),
    }));
  };

  // =========================================================
  // ADD EXPERIENCE
  // =========================================================

  const addExperience = () => {
    if (!form.job_title.trim()) {
      return;
    }

    const startDate = [
      form.start_month,
      form.start_year,
    ]
      .filter(Boolean)
      .join(" ");

    const endDate = form.current
      ? "Present"
      : [
          form.end_month,
          form.end_year,
        ]
          .filter(Boolean)
          .join(" ");

    const cleanedBullets = (
      Array.isArray(form.bullets)
        ? form.bullets
        : []
    )
      .map((bullet) =>
        String(bullet || "").trim()
      )
      .filter(Boolean);

    const experienceItem = {
      title: form.job_title.trim(),

      job_title: form.job_title.trim(),

      company: form.company.trim(),

      location: form.location.trim(),

      start_date: startDate,

      end_date: endDate,

      current: form.current,

      bullets: cleanedBullets,

      description:
        cleanedBullets.join("\n"),
    };

    setItems((prev) => [
      ...prev,
      experienceItem,
    ]);

    setForm({
      job_title: "",
      company: "",
      location: "",

      start_month: "",
      start_year: "",

      end_month: "",
      end_year: "",

      current: false,

      bullets: [],
    });

    setBulletInput("");
  };

  // =========================================================
  // REMOVE EXPERIENCE
  // =========================================================

  const removeExperience = (index) => {
    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // =========================================================
  // SAVE + NEXT
  // =========================================================

  const handleNext = () => {
    const cleanedItems = items.map((item) => {
      const bullets = Array.isArray(
        item?.bullets
      )
        ? item.bullets
            .map((bullet) =>
              String(bullet || "").trim()
            )
            .filter(Boolean)
        : [];

      return {
        ...item,

        title: String(
          item?.title ||
            item?.job_title ||
            ""
        ).trim(),

        job_title: String(
          item?.job_title ||
            item?.title ||
            ""
        ).trim(),

        company: String(
          item?.company || ""
        ).trim(),

        location: String(
          item?.location || ""
        ).trim(),

        start_date: String(
          item?.start_date || ""
        ).trim(),

        end_date: String(
          item?.end_date || ""
        ).trim(),

        bullets,

        description:
          bullets.join("\n"),
      };
    });

    setExperience(cleanedItems);

    navigate("/education");
  };

  // =========================================================
  // UI
  // =========================================================

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
            {/* =================================================
                TITLE
            ================================================= */}

            <Typography
              variant="h5"
              sx={{
                mb: 3,
                textAlign: "center",
                color: "primary.main",
                fontWeight: 700,
              }}
            >
              {t("experiencePage.title")}
            </Typography>

            <GuidancePanel sectionKey="experience" />
            <CompletenessChecklist
              {...checkExperienceCompleteness(form)}
            />

            <Stack spacing={2}>
              {/* =================================================
                  JOB TITLE
              ================================================= */}

              <TextField
                fullWidth
                label={t("experiencePage.jobTitle")}
                name="job_title"
                value={form.job_title}
                onChange={handleChange}
                placeholder={t("experiencePage.jobTitlePlaceholder")}
              />

              {/* =================================================
                  COMPANY
              ================================================= */}

              <TextField
                fullWidth
                label={t("experiencePage.company")}
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder={t("experiencePage.companyPlaceholder")}
              />

              {/* =================================================
                  LOCATION
              ================================================= */}

              <TextField
                fullWidth
                label={t("experiencePage.location")}
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder={t("experiencePage.locationPlaceholder")}
              />

              {/* =================================================
                  START DATE
              ================================================= */}

              <Typography
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  mt: 1,
                }}
              >
                {t("experiencePage.startDate")}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
              >
                <FormControl fullWidth>
                  <InputLabel>
                    {t("experiencePage.month")}
                  </InputLabel>

                  <Select
                    name="start_month"
                    value={
                      form.start_month
                    }
                    label={t("experiencePage.month")}
                    onChange={handleChange}
                  >
                    {months.map(
                      (month) => (
                        <MenuItem
                          key={month}
                          value={month}
                        >
                          {month}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>
                    {t("experiencePage.year")}
                  </InputLabel>

                  <Select
                    name="start_year"
                    value={
                      form.start_year
                    }
                    label={t("experiencePage.year")}
                    onChange={handleChange}
                  >
                    {years.map(
                      (year) => (
                        <MenuItem
                          key={year}
                          value={year}
                        >
                          {year}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Stack>

              {/* =================================================
                  END DATE
              ================================================= */}

              <Typography
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  mt: 1,
                }}
              >
                {t("experiencePage.endDate")}
              </Typography>

              <FormControl fullWidth>
                <InputLabel>
                  {t("experiencePage.status")}
                </InputLabel>

                <Select
                  value={
                    form.current
                      ? "Present"
                      : ""
                  }
                  label={t("experiencePage.status")}
                  onChange={handleCurrent}
                >
                  <MenuItem value="">
                    {t("experiencePage.selectEndDate")}
                  </MenuItem>

                  <MenuItem value="Present">
                    {t("experiencePage.present")}
                  </MenuItem>
                </Select>
              </FormControl>

              {!form.current && (
                <Stack
                  direction="row"
                  spacing={2}
                >
                  <FormControl fullWidth>
                    <InputLabel>
                      {t("experiencePage.month")}
                    </InputLabel>

                    <Select
                      name="end_month"
                      value={
                        form.end_month
                      }
                      label={t("experiencePage.month")}
                      onChange={
                        handleChange
                      }
                    >
                      {months.map(
                        (month) => (
                          <MenuItem
                            key={month}
                            value={month}
                          >
                            {month}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>
                      {t("experiencePage.year")}
                    </InputLabel>

                    <Select
                      name="end_year"
                      value={
                        form.end_year
                      }
                      label={t("experiencePage.year")}
                      onChange={
                        handleChange
                      }
                    >
                      {years.map(
                        (year) => (
                          <MenuItem
                            key={year}
                            value={year}
                          >
                            {year}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Stack>
              )}

              <Divider sx={{ my: 1 }} />

              {/* =================================================
                  BULLET POINTS
              ================================================= */}

              <Typography
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                {t("experiencePage.responsibilities")}
              </Typography>

              <TextField
                fullWidth
                multiline
                minRows={2}
                label={t("experiencePage.bulletPoint")}
                value={bulletInput}
                onChange={(e) =>
                  setBulletInput(
                    e.target.value
                  )
                }
                placeholder={t("experiencePage.bulletPlaceholder")}
                helperText={t("experiencePage.bulletHelper")}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <PolishButton
                  value={bulletInput}
                  onApply={setBulletInput}
                  mode="bullet"
                />
              </Box>

              <Button
                variant="outlined"
                startIcon={
                  <AddIcon />
                }
                onClick={addBullet}
                disabled={
                  !bulletInput.trim()
                }
                sx={{
                  borderColor:
                    "primary.main",
                  color:
                    "primary.main",
                  fontWeight: 700,

                  "&:hover": {
                    borderColor:
                      "primary.main",
                    background:
                      "action.hover",
                  },
                }}
              >
                {t("experiencePage.addBullet")}
              </Button>

              {/* =================================================
                  BULLET LIST
              ================================================= */}

              {(
                Array.isArray(
                  form.bullets
                )
                  ? form.bullets
                  : []
              ).length > 0 && (
                <Stack spacing={1}>
                  {(
                    Array.isArray(
                      form.bullets
                    )
                      ? form.bullets
                      : []
                  ).map(
                    (
                      bullet,
                      index
                    ) => (
                      <Box
                        key={index}
                        sx={{
                          display:
                            "flex",
                          alignItems:
                            "flex-start",
                          gap: 1,

                          p: 1.5,

                          background:
                            "background.paper",

                          borderRadius: 2,

                          border:
                            "1px solid var(--app-divider)",
                        }}
                      >
                        <Typography
                          component="div"
                          sx={{
                            flex: 1,
                            fontSize:
                              "0.9rem",
                            lineHeight:
                              1.5,
                          }}
                        >
                          • {bullet}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() =>
                            removeBullet(
                              index
                            )
                          }
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )
                  )}
                </Stack>
              )}

              {/* =================================================
                  ADD EXPERIENCE
              ================================================= */}

              <Button
                variant="contained"
                onClick={
                  addExperience
                }
                disabled={
                  !form.job_title.trim()
                }
                sx={{
                  background:
                    "primary.main",
                  fontWeight: 700,

                  "&:hover": {
                    background:
                      "text.primary",
                  },
                }}
              >
                {t("experiencePage.addExperience")}
              </Button>
            </Stack>

            {/* =================================================
                ADDED EXPERIENCES
            ================================================= */}

            {items.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  {t("experiencePage.addedExperience")}
                </Typography>

                <Stack spacing={2}>
                  {items.map(
                    (
                      item,
                      index
                    ) => (
                      <Box
                        key={index}
                        sx={{
                          p: 2,
                          background:
                            "background.paper",
                          borderRadius: 2,
                          border:
                            "1px solid var(--app-divider)",
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                        >
                          <Box
                            sx={{
                              minWidth: 0,
                              flex: 1,
                            }}
                          >
                            {/* JOB TITLE */}

                            <Typography
                              sx={{
                                fontWeight:
                                  700,
                                fontSize:
                                  "1rem",
                              }}
                            >
                              {item.title ||
                                item.job_title}
                            </Typography>

                            {/* COMPANY */}

                            {item.company && (
                              <Typography
                                sx={{
                                  fontSize:
                                    "0.9rem",
                                }}
                              >
                                {
                                  item.company
                                }
                              </Typography>
                            )}

                            {/* LOCATION + DATES */}

                            {[
                              item.location,
                              item.start_date,
                              item.end_date,
                            ].filter(
                              Boolean
                            ).length > 0 && (
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    "text.secondary",
                                }}
                              >
                                {[
                                  item.location,
                                  item.start_date,
                                  item.end_date,
                                ]
                                  .filter(
                                    Boolean
                                  )
                                  .join(
                                    " | "
                                  )}
                              </Typography>
                            )}

                            {/* BULLETS */}

                            {(
                              Array.isArray(
                                item?.bullets
                              )
                                ? item.bullets
                                : []
                            ).length > 0 && (
                              <Box
                                sx={{
                                  mt: 1,
                                }}
                              >
                                {(
                                  Array.isArray(
                                    item?.bullets
                                  )
                                    ? item.bullets
                                    : []
                                ).map(
                                  (
                                    bullet,
                                    bulletIndex
                                  ) => (
                                    <Typography
                                      key={
                                        bulletIndex
                                      }
                                      variant="body2"
                                      sx={{
                                        mt:
                                          bulletIndex >
                                          0
                                            ? 0.5
                                            : 0,
                                        lineHeight:
                                          1.5,
                                      }}
                                    >
                                      •{" "}
                                      {bullet}
                                    </Typography>
                                  )
                                )}
                              </Box>
                            )}

                            {/* DESCRIPTION */}

                            {item.description &&
                              (
                                !Array.isArray(
                                  item?.bullets
                                ) ||
                                item.bullets
                                  .length ===
                                  0
                              ) && (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mt: 1,
                                    color:
                                      "text.secondary",
                                    whiteSpace:
                                      "pre-line",
                                  }}
                                >
                                  {
                                    item.description
                                  }
                                </Typography>
                              )}
                          </Box>

                          <IconButton
                            onClick={() =>
                              removeExperience(
                                index
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </Box>
                    )
                  )}
                </Stack>
              </Box>
            )}

            {/* =================================================
                NAVIGATION
            ================================================= */}

            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={() =>
                  navigate(
                    "/personal"
                  )
                }
              >
                {t("nav.back")}
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={
                  handleNext
                }
                sx={{
                  background:
                    "#D4A030",

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

export default Experience;