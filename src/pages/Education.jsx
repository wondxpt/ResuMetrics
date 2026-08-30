import {
Box,
Container,
Card,
CardContent,
Typography,
TextField,
Button,
Stack,
IconButton,
Select,
MenuItem,
FormControl,
InputLabel,
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
import { checkEducationCompleteness } from "../assistant/completenessChecker";

function Education() {
const navigate = useNavigate();
const { t } = useLanguage();

const resume = useResumeStore((state) => state);
const setEducation = useResumeStore(
(state) => state.setEducation
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

const normalizeBullets = (item) => {
if (Array.isArray(item?.bullets)) {
return item.bullets
.map((bullet) => String(bullet || "").trim())
.filter(Boolean);
}


if (typeof item?.description === "string") {
  return item.description
    .split(/\n|\u2022|•/)
    .map((line) => line.trim())
    .filter(Boolean);
}

return [];


};

const normalizeEducation = (education = []) => {
if (!Array.isArray(education)) {
return [];
}


return education.map((item) => {
  const bullets = normalizeBullets(item);

  return {
    ...item,
    degree: item?.degree || item?.field || "",
    institution:
      item?.institution ||
      item?.school ||
      item?.university ||
      "",
    school:
      item?.school ||
      item?.institution ||
      item?.university ||
      "",
    location: item?.location || "",
    start_month: item?.start_month || "",
    start_year: item?.start_year || "",
    end_month: item?.end_month || "",
    end_year: item?.end_year || "",
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
    bullets,
    description:
      item?.description ||
      bullets.join("\n"),
  };
});


};

const initialEducation = normalizeEducation(
resume.education
);

const [items, setItems] = useState(initialEducation);

const [form, setForm] = useState({
degree: "",
institution: "",
location: "",
start_month: "",
start_year: "",
end_month: "",
end_year: "",
current: false,
});

const [bulletText, setBulletText] = useState("");
const [formBullets, setFormBullets] = useState([]);

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const handleCurrent = (e) => {
const isCurrent =
e.target.value === "Present";


setForm({
  ...form,
  current: isCurrent,
  end_month: "",
  end_year: "",
});


};

const addBullet = () => {
const value = bulletText.trim();


if (!value) {
  return;
}

setFormBullets([
  ...formBullets,
  value,
]);

setBulletText("");


};

const removeBullet = (index) => {
setFormBullets(
formBullets.filter(
(_, i) => i !== index
)
);
};

const addEducation = () => {
if (!form.degree.trim()) {
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

const educationItem = {
  degree: form.degree.trim(),
  institution:
    form.institution.trim(),
  school:
    form.institution.trim(),
  location:
    form.location.trim(),
  start_date: startDate,
  end_date: endDate,
  start_month: form.start_month,
  start_year: form.start_year,
  end_month: form.end_month,
  end_year: form.end_year,
  current: form.current,
  bullets: formBullets
    .map((bullet) =>
      String(bullet || "").trim()
    )
    .filter(Boolean),
  description: formBullets
    .map((bullet) =>
      String(bullet || "").trim()
    )
    .filter(Boolean)
    .join("\n"),
};

setItems([
  ...items,
  educationItem,
]);

setForm({
  degree: "",
  institution: "",
  location: "",
  start_month: "",
  start_year: "",
  end_month: "",
  end_year: "",
  current: false,
});

setFormBullets([]);
setBulletText("");


};

const removeEducation = (index) => {
setItems(
items.filter(
(_, i) => i !== index
)
);
};

const nextPage = () => {
const cleanedEducation = items.map(
(item) => {
const bullets = Array.isArray(
item.bullets
)
? item.bullets
.map((bullet) =>
String(
bullet || ""
).trim()
)
.filter(Boolean)
: typeof item.description ===
"string"
? item.description
.split(
/\n|\u2022|•/
)
.map((line) =>
line.trim()
)
.filter(Boolean)
: [];


    return {
      ...item,
      degree: String(
        item.degree || ""
      ).trim(),
      institution: String(
        item.institution ||
          item.school ||
          ""
      ).trim(),
      school: String(
        item.school ||
          item.institution ||
          ""
      ).trim(),
      location: String(
        item.location || ""
      ).trim(),
      bullets,
      description:
        bullets.join("\n"),
    };
  }
);

setEducation(cleanedEducation);

navigate("/skills");


};

return (
<Box
sx={{
minHeight: "100vh",
background: "background.default",
py: 3,
}}
> <Container maxWidth="sm">
<Card
sx={{
borderRadius: 4,
}}
> <CardContent>
<Typography
variant="h5"
sx={{
mb: 3,
textAlign: "center",
color: "primary.main",
fontWeight: 700,
}}
>
{t("educationPage.title")} </Typography>

<GuidancePanel sectionKey="education" />
<CompletenessChecklist {...checkEducationCompleteness(form)} />


        <Stack spacing={2}>
          <TextField
            fullWidth
            label={t("educationPage.degree")}
            name="degree"
            value={form.degree}
            onChange={handleChange}
            placeholder={t("educationPage.degreePlaceholder")}
          />

          <TextField
            fullWidth
            label={t("educationPage.institution")}
            name="institution"
            value={form.institution}
            onChange={handleChange}
            placeholder={t("educationPage.institutionPlaceholder")}
          />

          <TextField
            fullWidth
            label={t("educationPage.location")}
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder={t("educationPage.locationPlaceholder")}
          />

          <Typography
            sx={{
              mt: 1,
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            {t("educationPage.startDate")}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
          >
            <FormControl fullWidth>
              <InputLabel>
                {t("educationPage.month")}
              </InputLabel>

              <Select
                name="start_month"
                value={
                  form.start_month
                }
                label={t("educationPage.month")}
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
                {t("educationPage.year")}
              </InputLabel>

              <Select
                name="start_year"
                value={
                  form.start_year
                }
                label={t("educationPage.year")}
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

          <Typography
            sx={{
              mt: 1,
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            {t("educationPage.graduationDate")}
          </Typography>

          <FormControl fullWidth>
            <InputLabel>
              {t("educationPage.status")}
            </InputLabel>

            <Select
              value={
                form.current
                  ? "Present"
                  : ""
              }
              label={t("educationPage.status")}
              onChange={
                handleCurrent
              }
            >
              <MenuItem value="">
                {t("educationPage.selectGraduationDate")}
              </MenuItem>

              <MenuItem value="Present">
                {t("educationPage.currentlyStudying")}
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
                  {t("educationPage.month")}
                </InputLabel>

                <Select
                  name="end_month"
                  value={
                    form.end_month
                  }
                  label={t("educationPage.month")}
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
                  {t("educationPage.year")}
                </InputLabel>

                <Select
                  name="end_year"
                  value={
                    form.end_year
                  }
                  label={t("educationPage.year")}
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

          <Typography
            sx={{
              mt: 1,
              fontWeight: 700,
              color: "primary.main",
            }}
          >
            {t("educationPage.educationDetails")}
          </Typography>

          <TextField
            fullWidth
            multiline
            minRows={3}
            label={t("educationPage.educationBullet")}
            value={bulletText}
            onChange={(e) =>
              setBulletText(
                e.target.value
              )
            }
            placeholder={t("educationPage.educationBulletPlaceholder")}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <PolishButton
              value={bulletText}
              onApply={setBulletText}
              mode="bullet"
            />
          </Box>

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addBullet}
            disabled={
              !bulletText.trim()
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
            {t("educationPage.addBullet")}
          </Button>

          {formBullets.length >
            0 && (
            <Stack spacing={1}>
              {formBullets.map(
                (
                  bullet,
                  index
                ) => (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={1}
                    alignItems="flex-start"
                    sx={{
                      p: 1.25,
                      background:
                        "background.paper",
                      borderRadius: 2,
                      border:
                        "1px solid var(--app-divider)",
                    }}
                  >
                    <Typography
                      sx={{
                        flex: 1,
                        fontSize:
                          "0.9rem",
                        lineHeight:
                          1.5,
                        color:
                          "text.primary",
                      }}
                    >
                      {bullet}
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
                  </Stack>
                )
              )}
            </Stack>
          )}

          <Button
            variant="outlined"
            onClick={
              addEducation
            }
            disabled={
              !form.degree.trim()
            }
            sx={{
              borderColor:
                "primary.main",
              color: "primary.main",
              fontWeight: 700,
              "&:hover": {
                borderColor:
                  "primary.main",
                background:
                  "action.hover",
              },
            }}
          >
            {t("educationPage.addEducation")}
          </Button>
        </Stack>

        {items.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography
              sx={{
                mb: 1.5,
                color: "primary.main",
                fontWeight: 700,
              }}
            >
              {t("educationPage.addedEducation")}
            </Typography>

            <Stack spacing={2}>
              {items.map(
                (
                  item,
                  index
                ) => {
                  const dates = [
                    item.start_date,
                    item.end_date,
                  ]
                    .filter(Boolean)
                    .join(" – ");

                  const bullets =
                    Array.isArray(
                      item.bullets
                    )
                      ? item.bullets
                      : [];

                  return (
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
                        spacing={2}
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
                              fontSize:
                                "1rem",
                              color:
                                "text.primary",
                            }}
                          >
                            {
                              item.degree
                            }
                          </Typography>

                          {item.institution && (
                            <Typography
                              sx={{
                                fontSize:
                                  "0.95rem",
                                fontWeight:
                                  500,
                              }}
                            >
                              {
                                item.institution
                              }
                            </Typography>
                          )}

                          {(item.location ||
                            dates) && (
                            <Typography
                              variant="body2"
                              sx={{
                                mt: 0.5,
                                color:
                                  "text.secondary",
                                fontStyle:
                                  "italic",
                              }}
                            >
                              {[
                                item.location,
                                dates,
                              ]
                                .filter(
                                  Boolean
                                )
                                .join(
                                  " | "
                                )}
                            </Typography>
                          )}

                          {bullets.length >
                            0 && (
                            <Box
                              component="ul"
                              sx={{
                                mt: 1,
                                mb: 0,
                                pl: 2.5,
                                color:
                                  "text.primary",
                                "& li":
                                  {
                                    mb: 0.5,
                                    fontSize:
                                      "0.9rem",
                                    lineHeight:
                                      1.5,
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
                                    {
                                      bullet
                                    }
                                  </li>
                                )
                              )}
                            </Box>
                          )}
                        </Box>

                        <IconButton
                          onClick={() =>
                            removeEducation(
                              index
                            )
                          }
                          sx={{
                            flexShrink: 0,
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Box>
                  );
                }
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
                "/experience"
              )
            }
            sx={{
              borderColor:
                "primary.main",
              color: "primary.main",
              fontWeight: 600,
              "&:hover": {
                borderColor:
                  "primary.main",
                background:
                  "action.hover",
              },
            }}
          >
            {t("nav.back")}
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={nextPage}
            sx={{
              background:
                "#D4A030",
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

export default Education;
