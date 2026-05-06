# Changelog

All notable changes to this project will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

---

## [1.1.0] - 2026-05-06

### Added
- `questions.js` — standalone question bank file, separated from UI logic
- Full export of `questionBank` array with all 5 domains and 40+ questions
- Header comments in `questions.js` explaining structure and how to add questions

### Changed
- `App.jsx` refactored to import `questionBank` from `./questions`
- Removed unused `useEffect` import from `App.jsx`
- Reduced `App.jsx` from 1,091 lines to 284 lines (74% reduction)

---

## [1.0.0] - 2026-05-06

### Added
- Initial release of AZ-104 Practice Exam app
- 5 domains matching official Microsoft AZ-104 exam structure and weights
- 40+ questions total across all domains (8–10 per domain pool)
- Random selection of 5 questions per domain on each attempt (25 total per exam)
- Two answer modes — Immediate Feedback and Score at End
- Per-question explanations shown regardless of mode
- Domain performance tracking with color-coded weakness indicators
- Progress dot navigation bar during exam
- Pass/fail threshold indicator (70% / 700 score)
- Full answer review screen in Score at End mode
- Shuffle and restart functionality
- Dark navy UI consistent with companion AZ-104 Lab Tracker app
- IBM Plex Mono / Space Grotesk typography
- Responsive layout with mobile-friendly padding

### Tech Stack
- React 18
- Vite
- CSS-in-JS (no external UI libraries)

---

## Roadmap (Planned)

- [ ] Expand question pool to 15–20 per domain
- [ ] Deploy to Azure App Service (Free F1 tier)
- [ ] Add timer mode (optional countdown)
- [ ] Persist score history with localStorage
- [ ] Weakest domain drill mode (pull only from lowest scoring domain)
- [ ] Add AZ-500 domain support
