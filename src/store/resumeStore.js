import { create } from "zustand";
import { persist } from "zustand/middleware";

const useResumeStore = create(
  persist(
    (set) => ({
      selected_template: "chronological",

      full_name: "",
      target_title: "",
      location: "",
      email: "",
      phone: "",
      linkedin: "",

      summary: "",

      photo_path: "",

      experience: [],
      education: [],
      projects: [],
      skills: [],
      highlights: [],
      certifications: [],
      languages: [],

      // =========================================================
      // TEMPLATE
      // =========================================================

      setTemplate: (template) =>
        set({
          selected_template: template,
        }),

      // =========================================================
      // GENERAL FIELD
      // =========================================================

      setField: (field, value) =>
        set({
          [field]: value,
        }),

      // =========================================================
      // PERSONAL
      // =========================================================

      updatePersonal: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      // =========================================================
      // EXPERIENCE
      // =========================================================

      setExperience: (data) =>
        set({
          experience: Array.isArray(data) ? data : [],
        }),

      // =========================================================
      // EDUCATION
      // =========================================================

      setEducation: (data) =>
        set({
          education: Array.isArray(data) ? data : [],
        }),

      // =========================================================
      // PROJECTS
      // =========================================================

      setProjects: (data) =>
        set({
          projects: Array.isArray(data) ? data : [],
        }),

      // =========================================================
      // SKILLS
      // =========================================================

      setSkills: (data) =>
        set({
          skills: Array.isArray(data) ? data : [],
        }),

      // =========================================================
      // HIGHLIGHTS
      // =========================================================

      setHighlights: (data) =>
        set({
          highlights: Array.isArray(data) ? data : [],
        }),

      // =========================================================
      // CERTIFICATIONS
      // =========================================================

      setCertifications: (data) =>
        set({
          certifications: Array.isArray(data) ? data : [],
        }),

      addCertification: () =>
        set((state) => ({
          certifications: [
            ...(Array.isArray(state.certifications)
              ? state.certifications
              : []),
            {
              name: "",
              issuer: "",
              issue_date: "",
              expiration_date: "",
              credential_id: "",
              credential_url: "",
            },
          ],
        })),

      updateCertification: (index, field, value) =>
        set((state) => {
          const certifications = Array.isArray(
            state.certifications
          )
            ? [...state.certifications]
            : [];

          if (!certifications[index]) {
            certifications[index] = {
              name: "",
              issuer: "",
              issue_date: "",
              expiration_date: "",
              credential_id: "",
              credential_url: "",
            };
          }

          certifications[index] = {
            ...certifications[index],
            [field]: value,
          };

          return {
            certifications,
          };
        }),

      removeCertification: (index) =>
        set((state) => ({
          certifications: (
            Array.isArray(state.certifications)
              ? state.certifications
              : []
          ).filter(
            (_, itemIndex) =>
              itemIndex !== index
          ),
        })),

      // =========================================================
      // LANGUAGES
      // =========================================================

      setLanguages: (data) =>
        set({
          languages: Array.isArray(data) ? data : [],
        }),
    }),
    {
      name: "resume-builder-store",
    }
  )
);

export default useResumeStore;