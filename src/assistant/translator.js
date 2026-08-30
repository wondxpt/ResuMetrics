// Offline, client-side machine translation to English, powered by
// @huggingface/transformers (transformers.js) running MarianMT/
// opus-mt models entirely in the browser via WebAssembly - no
// backend server, no API key, and no per-request network call once
// the model has been downloaded once and cached by the browser.
//
// IMPORTANT - one-time model download: the FIRST time a person uses
// this for a given language, the browser needs an internet
// connection to download that language's translation model (roughly
// 40-100MB, depending on the language). The browser's own HTTP/Cache
// Storage caches it after that, so every translation after the first
// one works completely offline, even in airplane mode. This mirrors
// how e.g. Google Translate's offline packs work - "offline" means
// "no server round-trip per request", not "zero bytes ever
// downloaded, ever."
//
// You must add the dependency in your own project before this file
// will work:
//   npm install @huggingface/transformers
//
// (This repository, as provided to the assistant, has no
// package.json / build tooling included, so that install step has to
// happen on your own machine.)

// One MarianMT model per source language, all translating into
// English. These are the standard Helsinki-NLP OPUS-MT models,
// pre-converted to the ONNX format transformers.js needs. If any of
// these exact model ids has moved/been renamed on Hugging Face by the
// time you try this, swap in the current id for that language pair -
// the rest of this file doesn't need to change.
const TRANSLATION_MODELS = {
  fa: "Xenova/opus-mt-fa-en",
  ar: "Xenova/opus-mt-ar-en",
  es: "Xenova/opus-mt-es-en",
  fr: "Xenova/opus-mt-fr-en",
  zh: "Xenova/opus-mt-zh-en",
};

// Cache one loaded pipeline per language for the lifetime of the tab,
// so switching between fields (summary, bullet 1, bullet 2, ...)
// doesn't reload the model every time.
const pipelineCache = new Map();

// Lazily import the library itself, so the (fairly large) transformers.js
// runtime is only pulled into the bundle/loaded at all if someone
// actually uses translation - it costs nothing for people who only
// ever type in English.
async function loadTransformersLibrary() {
  try {
    return await import("@huggingface/transformers");
  } catch (error) {
    throw new Error(
      "Offline translation isn't available - the @huggingface/transformers " +
        "package isn't installed in this build. Run " +
        "`npm install @huggingface/transformers` and rebuild the app."
    );
  }
}

/**
 * Returns a ready-to-use translation function for the given source
 * language, downloading/loading the model on first use. `onProgress`
 * (optional) receives transformers.js's own progress events so the UI
 * can show a "Downloading language model... 42%" indicator on first
 * use.
 */
async function getTranslator(sourceLang, onProgress) {
  const modelId = TRANSLATION_MODELS[sourceLang];

  if (!modelId) {
    throw new Error(`No offline translation model configured for "${sourceLang}".`);
  }

  if (pipelineCache.has(sourceLang)) {
    return pipelineCache.get(sourceLang);
  }

  const { pipeline } = await loadTransformersLibrary();

  const translator = await pipeline("translation", modelId, {
    // 8-bit quantized weights - smaller download, negligible quality
    // loss for short resume-style sentences, and noticeably faster on
    // low-end phone CPUs (everything runs on WASM, there's no GPU
    // requirement).
    dtype: "q8",
    progress_callback: onProgress,
  });

  pipelineCache.set(sourceLang, translator);
  return translator;
}

/**
 * Translates `text` from `sourceLang` (one of the keys in
 * TRANSLATION_MODELS) into English. Returns the input unchanged if
 * `sourceLang` is "en" or unsupported, so callers can always call
 * this without checking first.
 *
 * `onProgress` is optional and only fires meaningfully on the first
 * call for a given language (subsequent calls reuse the cached
 * model and resolve near-instantly).
 */
export async function translateToEnglish(text, sourceLang, onProgress) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return "";

  if (!sourceLang || sourceLang === "en" || !TRANSLATION_MODELS[sourceLang]) {
    return trimmed;
  }

  const translator = await getTranslator(sourceLang, onProgress);
  const output = await translator(trimmed);

  // transformers.js translation pipelines resolve with either a
  // single object or an array of them, each shaped like
  // { translation_text: "..." } - normalize both shapes.
  const first = Array.isArray(output) ? output[0] : output;
  return first?.translation_text || trimmed;
}

/**
 * True if the given language has an offline translation model
 * configured at all (i.e. isn't English and isn't an unsupported
 * language). Used to decide whether to show a "Translate & Polish"
 * vs. plain "Polish" button.
 */
export function isTranslationSupported(sourceLang) {
  return Boolean(sourceLang && sourceLang !== "en" && TRANSLATION_MODELS[sourceLang]);
}

export { TRANSLATION_MODELS };
