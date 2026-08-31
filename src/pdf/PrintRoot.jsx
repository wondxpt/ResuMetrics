import { createPortal } from "react-dom";

import TemplateRenderer from "../templates/TemplateRenderer";
import ResumePage from "../templates/ResumePage";

/**
 * Always-mounted, off-screen twin of the resume that exists for exactly
 * one purpose: being the thing the browser/WebView's native Print
 * pipeline (window.print() on the web, PrintManager + WebView print
 * adapter on Android) actually prints.
 *
 * WHY A SEPARATE PORTAL INSTEAD OF PRINTING THE LIVE PREVIEW TREE:
 * The interactive Preview page wraps `.resume-page` in a zoom
 * `transform: scale(...)`, an absolutely-positioned sizing box, a
 * `height: 100vh` scrolling viewer shell, and MUI Paper/Container
 * chrome - all of which exist purely for on-screen viewing. An earlier
 * attempt in this project tried to print that live tree directly
 * (see the history comment at the top of
 * android/.../NativePdfPrintPlugin.java) and it was fragile: any one
 * of those on-screen-only styles surviving into the print layout pass
 * could push content onto a spurious extra page or off the printable
 * area.

 * Rendering a second, completely unscaled, non-absolutely-positioned
 * copy of the SAME <ResumePage><TemplateRenderer /></ResumePage> tree
 * used by Preview - subscribed to the same zustand store, so it is
 * always in sync - sidesteps that whole class of bug. This portal is
 * `display: none` on screen (see print.css) and only becomes visible
 * (and the rest of the app hidden) inside `@media print`, so it never
 * affects normal app usage.
 */
function PrintRoot() {
  if (typeof document === "undefined") return null;

  let mountNode = document.getElementById("pdf-print-root");

  if (!mountNode) {
    mountNode = document.createElement("div");
    mountNode.id = "pdf-print-root";
    document.body.appendChild(mountNode);
  }

  return createPortal(
    <ResumePage>
      <TemplateRenderer />
    </ResumePage>,
    mountNode
  );
}

export default PrintRoot;
