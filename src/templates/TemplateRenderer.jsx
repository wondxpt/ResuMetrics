import useResumeStore from "../store/resumeStore";
import { detectResumeDirection } from "./rtl";

import Canadian from "./Canadian";
import Combination from "./combination";
import Corporate from "./Corporate";
import Executive from "./Executive";
import Functional from "./Functional";
import Minimal from "./Minimal";
import Creative from "./Creative";
import ModernTwoColumn from "./ModernTwoColumn";

function TemplateRenderer({ data = null, demo = false }) {
  const storeData = useResumeStore();

  const resumeData = data || storeData;

  const selectedTemplate =
    resumeData.selected_template || "chronological";

  // Direction is derived from what the user actually typed into
  // their resume, not from the app's UI language - this is what
  // keeps the preview and the exported PDF correctly right-to-left
  // for Persian/Arabic content regardless of which language the
  // app's menus are currently showing.
  const rtl = detectResumeDirection(resumeData) === "rtl";

  switch (selectedTemplate) {
    case "canadian":
    case "chronological":
      return (
        <Canadian
          data={resumeData}
          demo={demo}
          rtl={rtl}
        />
      );

    case "combination":
      return (
        <Combination
          data={resumeData}
          demo={demo}
          rtl={rtl}
        />
      );

    case "corporate":
      return (
        <Corporate
          data={resumeData}
          demo={demo}
          rtl={rtl}
        />
      );

    case "executive":
      return (
        <Executive
          data={resumeData}
          demo={demo}
          rtl={rtl}
        />
      );

    case "functional":
      return (
        <Functional
          data={resumeData}
          demo={demo}
          rtl={rtl}
        />
      );

    case "minimal":
    case "classic":
      return (
        <Minimal
          data={resumeData}
          demo={demo}
          rtl={rtl}
        />
      );

    case "creative":
    case "creative_photo":
      return (
        <Creative
          data={resumeData}
          demo={demo}
          rtl={rtl}
        />
      );

    case "modern":
    case "modern_two_column":
    case "two_column":
      return (
        <ModernTwoColumn
          data={resumeData}
          demo={demo}
          rtl={rtl}
        />
      );

    default:
      return (
        <Canadian
          data={resumeData}
          demo={demo}
          rtl={rtl}
        />
      );
  }
}

export default TemplateRenderer;