import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";

import Templates from "../../pages/Templates";
import Personal from "../../pages/Personal";
import Experience from "../../pages/Experience";
import Education from "../../pages/Education";
import Skills from "../../pages/Skills";
import Certifications from "../../pages/Certifications";
import Preview from "../../pages/Preview";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>

          <Route index element={<Templates />} />

          <Route
            path="personal"
            element={<Personal />}
          />

          <Route
            path="experience"
            element={<Experience />}
          />

          <Route
            path="education"
            element={<Education />}
          />

          <Route
            path="skills"
            element={<Skills />}
          />

          <Route
            path="certifications"
            element={<Certifications />}
          />

          <Route
            path="preview"
            element={<Preview />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;