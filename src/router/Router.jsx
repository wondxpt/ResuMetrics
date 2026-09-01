import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Templates from "../pages/Templates";
import Personal from "../pages/Personal";
import Experience from "../pages/Experience";
import Education from "../pages/Education";
import Skills from "../pages/Skills";
import Certifications from "../pages/Certifications";
import Preview from "../pages/Preview";

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

          {/* Catch-all: any unmatched/garbage path (e.g. a stray
              copy-pasted Vite terminal URL like "/ \u2794 Network: ...")
              redirects home instead of leaving a blank "no routes
              matched" console warning and empty page. */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;