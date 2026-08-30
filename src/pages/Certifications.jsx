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
  Divider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

import useResumeStore from "../store/resumeStore";
import GuidancePanel from "../components/GuidancePanel";
import CompletenessChecklist from "../components/CompletenessChecklist";
import { checkCertificationsCompleteness } from "../assistant/completenessChecker";
import { useLanguage } from "../i18n/LanguageContext";

function Certifications() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const {
    certifications = [],
    addCertification,
    updateCertification,
    removeCertification,
    setCertifications,
  } = useResumeStore();

  const items = Array.isArray(certifications)
    ? certifications
    : [];

  const createEmptyCertification = () => ({
    name: "",
    title: "",
    certificate: "",
    certification: "",

    issuer: "",
    organization: "",
    issuing_organization: "",
    issuingOrganization: "",

    issue_date: "",
    issued_date: "",
    issueDate: "",
    issuedDate: "",
    date: "",

    expiration_date: "",
    expiry_date: "",
    expirationDate: "",
    expiryDate: "",

    credential_id: "",
    credentialId: "",

    credential_url: "",
    credentialUrl: "",
    url: "",

    description: "",
    details: "",

    bullets: [],
  });

  const handleAdd = () => {
    if (typeof addCertification === "function") {
      addCertification();
      return;
    }

    if (typeof setCertifications === "function") {
      setCertifications([
        ...items,
        createEmptyCertification(),
      ]);
    }
  };

  const handleChange = (
    index,
    field,
    value
  ) => {
    if (
      typeof updateCertification ===
      "function"
    ) {
      updateCertification(
        index,
        field,
        value
      );
      return;
    }

    if (
      typeof setCertifications ===
      "function"
    ) {
      const updated = [...items];

      const current =
        updated[index] &&
        typeof updated[index] ===
          "object"
          ? updated[index]
          : createEmptyCertification();

      updated[index] = {
        ...current,
        [field]: value,
      };

      setCertifications(updated);
    }
  };

  const handleRemove = (index) => {
    if (
      typeof removeCertification ===
      "function"
    ) {
      removeCertification(index);
      return;
    }

    if (
      typeof setCertifications ===
      "function"
    ) {
      setCertifications(
        items.filter(
          (_, itemIndex) =>
            itemIndex !== index
        )
      );
    }
  };

  const getValue = (
    certification,
    fields
  ) => {
    if (
      !certification ||
      typeof certification !== "object"
    ) {
      return "";
    }

    for (const field of fields) {
      const value =
        certification[field];

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        return String(value);
      }
    }

    return "";
  };

  const handleBack = () => {
    navigate("/education");
  };

  const handleNext = () => {
    navigate("/preview");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "background.default",
        py: 3,
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            width: "100%",
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
              Certifications
            </Typography>

            <GuidancePanel sectionKey="certifications" />
            <CompletenessChecklist
              {...checkCertificationsCompleteness(items)}
            />

            <Typography
              sx={{
                mb: 3,
                textAlign: "center",
                fontSize: "0.9rem",
                lineHeight: 1.5,
                color: "text.secondary",
              }}
            >
              Add your professional certifications,
              licenses, and credentials.
            </Typography>

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {items.length === 0 && (
              <Box
                sx={{
                  p: 2,
                  mb: 2,
                  background: "background.paper",
                  borderRadius: 2,
                  border:
                    "1px dashed var(--app-divider)",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "text.secondary",
                  }}
                >
                  No certifications added yet.
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: "0.8rem",
                    color: "text.disabled",
                  }}
                >
                  Add your first certification
                  below.
                </Typography>
              </Box>
            )}

            <Stack spacing={2}>
              {/* =================================================
                  CERTIFICATIONS
              ================================================= */}

              {items.map(
                (
                  certification,
                  index
                ) => {
                  const certificationName =
                    typeof certification ===
                    "string"
                      ? certification
                      : getValue(
                          certification,
                          [
                            "name",
                            "title",
                            "certificate",
                            "certification",
                          ]
                        );

                  const issuer =
                    getValue(
                      certification,
                      [
                        "issuer",
                        "organization",
                        "issuing_organization",
                        "issuingOrganization",
                      ]
                    );

                  const issueDate =
                    getValue(
                      certification,
                      [
                        "issue_date",
                        "issued_date",
                        "issueDate",
                        "issuedDate",
                        "date",
                      ]
                    );

                  const expirationDate =
                    getValue(
                      certification,
                      [
                        "expiration_date",
                        "expiry_date",
                        "expirationDate",
                        "expiryDate",
                      ]
                    );

                  const credentialId =
                    getValue(
                      certification,
                      [
                        "credential_id",
                        "credentialId",
                        "id",
                      ]
                    );

                  const credentialUrl =
                    getValue(
                      certification,
                      [
                        "credential_url",
                        "credentialUrl",
                        "url",
                      ]
                    );

                  return (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        boxSizing:
                          "border-box",
                        p: 2,
                        background: "background.paper",
                        borderRadius: 2,
                        border:
                          "1px solid var(--app-divider)",
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: "primary.main",
                            fontSize: "1rem",
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          Certification{" "}
                          {index + 1}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() =>
                            handleRemove(
                              index
                            )
                          }
                          aria-label="Delete certification"
                          sx={{
                            flexShrink: 0,
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>

                      <Divider
                        sx={{
                          my: 2,
                        }}
                      />

                      {/* =================================================
                          CERTIFICATION NAME
                      ================================================= */}

                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          label="Certification"
                          placeholder="PMP, AWS Certified Solutions Architect"
                          value={
                            certificationName
                          }
                          onChange={(event) =>
                            handleChange(
                              index,
                              "name",
                              event.target.value
                            )
                          }
                        />

                        {/* =================================================
                            ISSUER
                        ================================================= */}

                        <TextField
                          fullWidth
                          label="Issuer"
                          placeholder="PMI, Amazon Web Services"
                          value={issuer}
                          onChange={(event) =>
                            handleChange(
                              index,
                              "issuer",
                              event.target.value
                            )
                          }
                        />

                        {/* =================================================
                            ISSUE DATE
                        ================================================= */}

                        <TextField
                          fullWidth
                          label="Issue Date"
                          placeholder="January 2025"
                          value={issueDate}
                          onChange={(event) =>
                            handleChange(
                              index,
                              "issue_date",
                              event.target.value
                            )
                          }
                        />

                        {/* =================================================
                            EXPIRATION DATE
                        ================================================= */}

                        <TextField
                          fullWidth
                          label="Expiration Date"
                          placeholder="January 2028"
                          value={
                            expirationDate
                          }
                          onChange={(event) =>
                            handleChange(
                              index,
                              "expiration_date",
                              event.target.value
                            )
                          }
                        />

                        {/* =================================================
                            CREDENTIAL ID
                        ================================================= */}

                        <TextField
                          fullWidth
                          label="Credential ID"
                          placeholder="Optional"
                          value={
                            credentialId
                          }
                          onChange={(event) =>
                            handleChange(
                              index,
                              "credential_id",
                              event.target.value
                            )
                          }
                        />

                        {/* =================================================
                            CREDENTIAL URL
                        ================================================= */}

                        <TextField
                          fullWidth
                          label="Credential URL"
                          placeholder="https://..."
                          value={
                            credentialUrl
                          }
                          onChange={(event) =>
                            handleChange(
                              index,
                              "credential_url",
                              event.target.value
                            )
                          }
                        />
                      </Stack>
                    </Box>
                  );
                }
              )}

              {/* =================================================
                  ADD CERTIFICATION
              ================================================= */}

              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  fontWeight: 700,

                  "&:hover": {
                    borderColor: "primary.main",
                    background:
                      "action.hover",
                  },
                }}
              >
                + Add Certification
              </Button>
            </Stack>

            {/* =================================================
                NAVIGATION
            ================================================= */}

            <Stack
              direction="row"
              spacing={2}
              sx={{
                mt: 3,
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={handleBack}
              >
                {t("nav.back")}
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={handleNext}
                sx={{
                  background: "#D4A030",

                  "&:hover": {
                    background: "#b88925",
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

export default Certifications;

