# BUNKR108

This repository contains a single-page interactive web app shipped as `New_Comp_Test.html` and supporting files to serve it as a GitHub Pages site (see `index.html` and the `.github/workflows` workflow).

## About `New_Comp_Test.html`

`New_Comp_Test.html` is a richly styled, self-contained frontend that provides a portable MCQ (multiple-choice question) quiz experience plus a set of ambient and productivity features. It is designed to run entirely in the browser (static HTML/CSS/JS) and is suitable for local preview or publishing to GitHub Pages.

Key pieces inside the file:
- A themeable, mobile-friendly (landscape) MCQ quiz UI with question cards, skip/review controls and saved-question management.
- Integration points for AI-assisted generation/validation/export (UI panels for file generation and AI preview are present; external API keys are not included in the repo).
- An ambient "HF Skywave" radio player (select curated streams or custom HTTPS stream URLs).
- A blocky ASCII clock, boot/loading overlay, sticky notes/rail UI and other small widgets for a polished single-page app feel.
- Resilient playback handling: playback recovery, alternate stream fallbacks, and Media Session API support for hardware media keys.

## BUNKR108 — Functionality summary

- Static single-file web app: everything required to run the UI is bundled into `New_Comp_Test.html` with some optional external assets (scripts/styles) loaded when present.
- Quiz workflow: import or paste MCQs, take quizzes, skip & mark for review, save sets and re-load saved items.
- AI helpers: panels for generating question content, validating answers, and creating downloadable files (.docx/.pdf) — these require an external AI/key to be functional.
- Audio player: curated public streams + custom station support; Twilight mode uses a YouTube playlist for audio-only playback.
- Accessibility & usability: keyboard/media-key controls, responsive layout, reduced-motion support and focus-visible outlines for interactive controls.

## How to view

- Locally (quick):

	python3 -m http.server 8000

	Then open: http://localhost:8000/New_Comp_Test.html

- In VS Code: open this repository and use the Markdown Preview to see this README; open `New_Comp_Test.html` in the editor and use the Live Server extension or the command above.
- Published on GitHub Pages: the project includes `index.html` and a workflow that deploys the repository to GitHub Pages on pushes to `main`. The expected site URL is:

	https://eshaw0322-design.github.io/BUNKR108/

	(If the workflow doesn't run, check repository Actions settings and re-run the workflow.)

## Notes & limitations

- Streams and some external services require HTTPS, permissive CORS, and may be blocked by the browser if not configured correctly.
- AI features are UI-only in the repo; you must supply API keys or backend integration for them to work.
- The README iframe preview is only supported in editors that allow raw HTML rendering (VS Code). GitHub's README rendering strips iframes.

If you'd like, I can:
- Swap the meta-redirect in `index.html` for an embedded iframe preview.
- Add a short demo GIF or screenshot to the README.
- Help enable or debug the GitHub Actions Pages deployment logs.

Enjoy — open `New_Comp_Test.html` to see the app.