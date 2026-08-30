// Shared pagination logic used by both the live Preview (to draw page-break
// guides) and pdfGenerator.js (to slice the exported PDF). Kept framework
// agnostic (plain DOM + CSSOM) so both callers stay in sync.

// Height of one printed A4 page in CSS px, at the browser's standard
// 96px-per-inch reference (matches the 210mm x 297mm page used
// throughout the app).
export const A4_PAGE_HEIGHT_PX = 1122.5197;

// `.resume-page` sets `minHeight: 297mm` (see ResumePage.jsx) so that a
// short, genuinely one-page resume still fills a full printed page. But
// `element.scrollHeight` is an integer - browsers round it up - while
// A4_PAGE_HEIGHT_PX above is fractional (1122.5197). That mismatch alone
// (scrollHeight reporting 1123 for content whose real height is
// 1122.5197) was enough to make computeSafePageBreaks() think a purely
// single-page resume overflowed by a fraction of a pixel, inserting one
// extra, essentially blank page. This tolerance absorbs that sub-pixel/
// integer-rounding overshoot; it's intentionally larger than the ~0.5px
// worst case to also cover minor cross-browser rounding differences,
// while still being far too small to ever hide a real extra line of
// content.
const PAGE_HEIGHT_TOLERANCE_PX = 2;

const MAX_PAGES = 40;

/**
 * Finds Y offsets (CSS px, relative to `element`'s own top edge) where the
 * resume can safely be cut into printed pages:
 *   - never through the middle of a text-bearing leaf element, and
 *   - always leaving room for a top/bottom margin on every page, not just
 *     the first and last.
 *
 * Returns an array of break Y-offsets, in the *original, unbroken*
 * coordinate space of `element` (i.e. as it is naturally laid out before
 * any page-break spacing is inserted). Empty array means the content fits
 * on a single page.
 */
export function computeSafePageBreaks(element) {
  if (!element) return [];

  const computed = window.getComputedStyle(element);
  const paddingTop = parseFloat(computed.paddingTop) || 0;
  const paddingBottom = parseFloat(computed.paddingBottom) || 0;

  const totalHeight = element.scrollHeight;

  if (totalHeight <= A4_PAGE_HEIGHT_PX + PAGE_HEIGHT_TOLERANCE_PX) {
    return [];
  }

  const elementRect = element.getBoundingClientRect();

  const leafNodes = Array.from(
    element.querySelectorAll("*")
  ).filter((node) => node.children.length === 0);

  const intervals = leafNodes
    .map((node) => {
      const r = node.getBoundingClientRect();
      if (r.height <= 0) return null;
      return {
        top: r.top - elementRect.top,
        bottom: r.bottom - elementRect.top,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.top - b.top);

  function nearestSafeCut(targetY, floor) {
    // Repeats the "does this land inside a leaf?" check against the
    // NEW cut position, not just the original targetY - a single pass
    // only guarantees the cut clears whichever element(s) originally
    // straddled targetY. Moving the cut earlier to dodge one element
    // can land it inside a DIFFERENT, earlier element that didn't
    // straddle targetY at all (e.g. an email line inside a
    // certification block) - that unchecked second collision was
    // exactly what produced cuts through the middle of text like
    // "saaedxpt@outlook.com" in exported PDFs.
    //
    // Each iteration can only move `cut` strictly earlier (to some
    // iv.top < cut), so this is monotonically decreasing and bounded
    // below by 0 - it always terminates on its own. `guard` is just a
    // defensive cap in case of unexpected input, not something normal
    // runs are expected to hit.
    let cut = targetY;
    let guard = intervals.length + 1;

    while (guard > 0) {
      guard -= 1;

      let collided = false;
      for (const iv of intervals) {
        if (iv.top < cut && iv.bottom > cut) {
          cut = Math.min(cut, iv.top);
          collided = true;
        }
      }

      if (!collided) break;
    }

    return Math.max(cut, floor + 1);
  }

  const breaks = [];
  let cursor = 0;
  let isFirst = true;

  while (breaks.length < MAX_PAGES) {
    // Pages after the first reserve extra room at the top of the
    // *budget* (a blank top margin gets inserted there in the output),
    // and every page reserves room at the bottom for its own margin
    // (checked via targetWithMargin below).
    const topInsetBudget = isFirst ? 0 : paddingTop;
    const pageBudget = A4_PAGE_HEIGHT_PX - topInsetBudget;

    if (totalHeight - cursor <= pageBudget + PAGE_HEIGHT_TOLERANCE_PX) {
      // Remaining content fits on this (the last) page.
      break;
    }

    const idealCut = cursor + pageBudget;
    const targetWithMargin = idealCut - paddingBottom;

    let cut = nearestSafeCut(targetWithMargin, cursor);
    if (cut <= cursor) {
      // Fallback: a single element taller than one page - don't get
      // stuck, fall back to the ideal cut so we still make progress.
      cut = idealCut;
    }

    breaks.push(cut);
    cursor = cut;
    isFirst = false;
  }

  return breaks;
}

/**
 * Convenience helper: total page count implied by a set of break points.
 */
export function pageCountFromBreaks(breaks) {
  return breaks.length + 1;
}
