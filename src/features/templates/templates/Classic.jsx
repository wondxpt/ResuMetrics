import { Typography, Box, Divider } from "@mui/material";
import useResumeStore from "../../../store/resumeStore";
import { buildResumeData } from "../../../data/defaultResumeData";
import ResumePage from "../core/ResumePage";

function Classic({ data, demo = false }) {
  const storeData = useResumeStore((state) => state);
  const resume = buildResumeData(demo ? {} : (data || storeData), demo);

  return (
    <ResumePage sx={{ padding: 5, background: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", gap: 1.2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#111" }}>{resume.full_name || "Your Name"}</Typography>
          <Typography variant="h6" sx={{ mt: 1, color: "#333" }}>{resume.target_title || "Professional Title"}</Typography>
          <Typography sx={{ mt: 1, color: "#555" }}>{resume.email} {"|"} {resume.phone}</Typography>
          <Typography>{resume.location}</Typography>
          <Typography>{resume.linkedin}</Typography>
          <Divider sx={{ my: 2 }} />
        </Box>

        <SectionTitle title="Professional Summary" />
        <Typography sx={{ lineHeight: 1.6 }}>{resume.summary || "Professional summary will appear here."}</Typography>

        <SectionTitle title="Professional Experience" />
        {resume.experience?.length > 0 ? resume.experience.map((item, index) => (
          <Box key={index} sx={{ mb: 1.4 }}>
            <Typography fontWeight="bold">{item.job_title || item.title}</Typography>
            <Typography>{item.company}</Typography>
            <Typography>{item.location}</Typography>
            <Typography>{item.start_date} {" - "} {item.end_date}</Typography>
            <Typography sx={{ lineHeight: 1.55 }}>{item.description || item.bullets}</Typography>
          </Box>
        )) : <Typography>No experience added.</Typography>}

        <SectionTitle title="Projects" />
        {resume.projects?.map((project, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Typography fontWeight="bold">{project.name}</Typography>
            <Typography sx={{ lineHeight: 1.55 }}>{project.description}</Typography>
          </Box>
        ))}

        <SectionTitle title="Education" />
        {resume.education?.length > 0 ? resume.education.map((item, index) => (
          <Box key={index} sx={{ mb: 1.2 }}>
            <Typography fontWeight="bold">{item.degree}</Typography>
            <Typography>{item.institution || item.school}</Typography>
            <Typography>{item.location}</Typography>
            <Typography>{item.grad_date}</Typography>
          </Box>
        )) : <Typography>No education added.</Typography>}

        <SectionTitle title="Certifications & Skills" />
        <Typography sx={{ lineHeight: 1.6 }}>{resume.certifications?.join(" • ")}</Typography>
        <Typography sx={{ lineHeight: 1.6 }}>{resume.skills?.join(" • ") || "Skills will appear here."}</Typography>
        <Typography sx={{ lineHeight: 1.6 }}>{resume.languages?.map((lang) => lang.name || lang.language).join(" • ")}</Typography>
      </Box>
    </ResumePage>
  );
}

function SectionTitle({ title }) {
  return <Typography variant="h6" sx={{ mt: 2.2, mb: 0.7, fontWeight: 700, borderBottom: "1px solid #222", paddingBottom: 0.5 }}>{title}</Typography>;
}

export default Classic;
