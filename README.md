# PRINTSCII

PRINTSCII turns PNG and JPG images into ASCII art in the browser. Every step runs on the visitor's machine with the Canvas API and a Web Worker. Nothing is uploaded.

## Showcase

Drop an image into the app, tune the character grid and tone controls, then export the result as text or PNG. The preview updates locally as you adjust the settings.

Watch the [10-second video showcase](docs/showcase.mp4) to see the sample image conversion, original/side-by-side preview, resolution tuning, and detail controls in action.

## Run it

Requires Node 22 or newer.

```
npm install
npm run dev
```

Open the address Vite prints, usually http://localhost:5173.

## Highlights

- Private by default: source images stay in the browser.
- Web Worker conversion keeps the interface responsive.
- Character, color, grayscale and dithering controls.
- Copy text or download a PNG from the same preview.
- Responsive layout with drag-and-drop image loading.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm test` | Run the unit tests with the built-in Node test runner |
| `npm run build` | Create a static site in `dist/` |
| `npm run preview` | Serve the production build locally |

The build uses relative paths, so the contents of `dist/` can be hosted from any folder or static host.

## How a picture becomes text

1. `lib/loadImage` decodes the file, applies the EXIF rotation and downscales anything above 2000 px.
2. `lib/resizeToGrid` shrinks the picture to the character grid, correcting for the shape of a monospace cell. Transparent pixels are flattened onto the paper color.
3. `worker/convert.worker` runs `core/pipeline` off the main thread: grayscale, unsharp mask, tone curve, Sobel edges, then mapping to characters with optional Floyd-Steinberg dithering.
4. `components/preview` shows the text in a `<pre>`, or paints it on a canvas for the color and grayscale modes. The same canvas code produces the PNG export.

If workers are unavailable, `worker/client` runs the same pipeline on the main thread.

## Project layout

```
src/
  core/        Pure functions with unit tests. No DOM, no React.
  lib/         Browser helpers: decoding, canvas drawing, export, clipboard, storage.
  worker/      Web Worker, its promise based client and the inline fallback.
  state/       Settings reducer, settings context, toast context.
  hooks/       Image loading, conversion, debouncing, window drag and drop.
  components/  React UI: fields, control panels, preview.
  styles/      Plain CSS split by concern.
```

## Adding a character set

1. Add its name to `CHARSETS` in `src/core/settings.js`.
2. Handle it in `getRamp` in `src/core/ramps.js` and add a test in `src/core/ramps.test.js`.
3. Add an option to `CHARSET_OPTIONS` in `src/components/panels/DetailSection.jsx`.

## Settings

Settings are saved in `localStorage` and validated on load by `normalizeSettings`, so a damaged or outdated entry falls back to defaults instead of breaking the page. Only settings that change the text trigger a new conversion. Changing ink color or color mode repaints without reconverting.
