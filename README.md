# BUNKR108 — AI-Powered Study Interface

**Live demo:** https://tkwmo.github.io/BUNKR108/New_Comp_Test.html

## Overview
BUNKR108 is a fully client-side study and quiz-generation interface. It can ingest your own materials, generate MCQs, build flashcards, run spaced-repetition sessions, and optionally use AI (Gemini) for extraction, formatting, analysis, and question generation. All data and API keys remain local to the user’s browser.

---

## Features

### MCQ Builder
- Paste MCQs or upload a `.txt` file using the required format (`Q1.` → `-` options → `ANSWER KEY` block).
- **Reformat & Assign Answers (AI):** cleans messy or inconsistent text into the standard format.
- **Generate MCQs from .docx / .pdf / .pptx (AI):** extracts content and produces formatted questions.
- Shuffle questions/answers, enable instant feedback, and preview before starting a quiz.
- Export as PDF and optionally highlight correct answers.

### Flashcards & SRS
- Convert parsed MCQs directly into flashcards.
- Run sessions using Again / Hard / Good / Easy controls.
- Export decks to CSV or APKG-shim format for external tools.

### Content Library
- Upload PDFs, detect table-of-contents sections, and store extracted chapter text locally.
- Saved content is kept entirely in the user’s browser (localStorage/IndexedDB).

### Random Quiz Generator
- Create a random daily quiz, optionally scoped by a Wikipedia search.
- Select a search result to narrow the quiz domain.

### Radio Module
- “HF Skywave” panel for ambient study audio.
- Allows adding custom HTTPS MP3/AAC streams (CORS-compatible only).
- No accounts or external tracking.

### Interface Controls
- Toggle animations, invert display, adjust animation timing.
- Focus mode (temporary or persistent).
- Disable news ticker (PubMed/arXiv presets shown in interface).

### AI Analysis
- Summarize performance after quizzes.
- Validate answer keys via AI.
- Generate new variations of existing questions.

---

## How It Works (Privacy & Local-Only)
- **No servers, no uploads:** all operations occur in the browser.
- **API keys never leave the device:** Gemini keys are stored locally and used directly by the browser.
- **User materials stay local:** parsed text, quizzes, saved content, and settings remain client-side.

---

## Quick Start
1. Open the demo and accept Terms of Use.
2. (Optional) Add a Gemini API key to enable AI-supported features.
3. Load or paste MCQs, parse, preview, and start a quiz.

---

## Usage Guide

### Importing Text MCQs
1. Paste questions in the required format.
2. Click **Parse & Preview** and then **Start Quiz**.
3. Use toggles for shuffling and instant feedback.

### Using Document-to-MCQ (AI)
1. Upload a `.pdf`, `.docx`, or `.pptx`.
2. Review the AI preview.
3. Insert output directly into the editor.

### Flashcards
- Load parsed content into the flashcard module.
- Review using spaced-repetition buttons.
- Export to CSV or APKG-shim.

### Content Library
- Load PDFs, scan TOC, and save extracted chapters.
- Access saved content from the library panel.

### Radio
- Add custom stream name + URL.
- Stream starts instantly if CORS-compliant.

---

## Exports
- PDF quizzes.
- CSV or APKG-shim flashcard decks.

---

## Tech Notes
- Uses pdf.js, Mammoth, JSZip, Tesseract.js, and other browser-side libraries via CDN.
- AI features rely on the Gemini SDK loaded client-side.
- Some streaming URLs may require HTTPS + correct CORS settings.

---

## License
- MIT License (see repository).

---

## Credits
Created by **Ethan Shaw**.
