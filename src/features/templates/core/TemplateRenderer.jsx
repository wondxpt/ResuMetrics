import useResumeStore from "../../../store/resumeStore";

import Canadian from "../templates/Canadian";
import Combination from "../templates/Combination";
import Corporate from "../templates/Corporate";
import Executive from "../templates/Executive";
import Functional from "../templates/Functional";
import Minimal from "../templates/Minimal";
import Creative from "../templates/Creative";
import ModernTwoColumn from "../templates/ModernTwoColumn";

function TemplateRenderer({ data = null, demo = false }) {
  const storeData = useResumeStore();

  const resumeData = data || storeData;

  const selectedTemplate =
    resumeData.selected_template || "chronological";

  switch (selectedTemplate) {
    case "canadian":
    case "chronological":
      return (
        <Canadian
          data={resumeData}
          demo={demo}
        />
      );

    case "combination":
      return (
        <Combination
          data={resumeData}
          demo={demo}
        />
      );

    case "corporate":
      return (
        <Corporate
          data={resumeData}
          demo={demo}
        />
      );

    case "executive":
      return (
        <Executive
          data={resumeData}
          demo={demo}
        />
      );

    case "functional":
      return (
        <Functional
          data={resumeData}
          demo={demo}
        />
      );

    case "minimal":
    case "classic":
      return (
        <Minimal
          data={resumeData}
          demo={demo}
        />
      );

    case "creative":
    case "creative_photo":
      return (
        <Creative
          data={resumeData}
          demo={demo}
        />
      );

    case "modern":
    case "modern_two_column":
    case "two_column":
      return (
        <ModernTwoColumn
          data={resumeData}
          demo={demo}
        />
      );

    default:
      return (
        <Canadian
          data={resumeData}
          demo={demo}
        />
      );
  }
}

export default TemplateRenderer;