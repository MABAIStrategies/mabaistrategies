<!--
Guidance for AI coding agents working on this repository.
Keep this file concise and actionable. Update when major structural changes occur.
-->
# Copilot Instructions — MAB AI Strategies (static marketing site)

Short summary
- This repository is a static marketing site with interactive client-side features. The site lives under `OKComputer_网站设计反馈与修订/` and is built with plain HTML/CSS and a single `main.js` file that implements interactive behavior (calculator, tool demos, quiz, modals).

What to edit and where
- UI / pages: edit the HTML files in `OKComputer_网站设计反馈与修订/` (e.g., `index.html`, `about.html`, `services.html`, `contact.html`).
- Client logic: `OKComputer_网站设计反馈与修订/main.js` — all interactive JS lives here. Add new features as named functions and hook them into the DOMContentLoaded initializer.
- Assets: `OKComputer_网站设计反馈与修订/resources/` — add images and media here; reference via relative paths (examples: `resources/company-logo.png`, `resources/ai-abstract-bg.png`).
- Design documentation: `design.md` and `outline.md` describe visual/system patterns and interactive elements. Use them as authoritative style/convention sources.

Key patterns and examples
- Single-entry DOM initializer: main.js registers `DOMContentLoaded` and calls functions like `initializeCalculator()`, `initializeToolShowcase()`, `initializeAssessmentQuiz()`. To add functionality, follow this pattern.
- ROI calculator: targets `#roi-calculator` and uses inputs with ids `#industry`, `#current-hours`, `#team-size`, `#hourly-rate`, `#automation-percentage`. The industry multipliers live inside `initializeCalculator()` — update there for business-rule changes.
- Tool demos & modals: `openToolDemo(toolType)` creates modal HTML dynamically. Modify demo data in `initializeToolShowcase()` or `openToolDemo()` for new demos.
- Animations: elements use `.animate-on-scroll` and an IntersectionObserver in `initializeAnimations()`; adding the class to an element is the standard way to opt it into the reveal animation.

Build / run / debug
- No build step. It's a CDN-backed static site. To preview locally, change into the project folder and run a simple static server:
  - `cd OKComputer_网站设计反馈与修订` 
  - `python3 -m http.server 8000` (open `http://localhost:8000`)
  - Alternatively, use `live-server` or your editor's Live Preview if available.
- Debugging tips:
  - Open browser devtools Console to see runtime errors from `main.js`.
  - Verify external libraries are loaded (CDN scripts in `index.html`): animejs, echarts, typed.js, splide, Tailwind via CDN.
  - Charts require `echarts` to be available before `initializeCalculator()` runs — check network tab if charts don't render.

Conventions & expectations
- Files are UTF-8; the repo includes non-ASCII folder names — keep UTF-8 when adding files.
- The project uses CDN-hosted libs and Tailwind via `https://cdn.tailwindcss.com`; there is no bundler or Node toolchain present.
- Progressive enhancement: core content should work without JS where practical; interactive parts are explicitly client-side.
- Forms are currently simulated client-side (no backend). Do not attempt to wire server-side posting without coordinating with the maintainer — change will require deployment and privacy considerations.

When changing JS
- Keep changes minimal and add small, focused functions. Respect existing global helpers (`openToolDemo`, `animateCounters`, etc.).
- If adding new DOM IDs/classes, follow existing naming (kebab-case IDs like `#roi-calculator`) to stay consistent with `main.js` selectors.

Testing & verification
- Manual verification is expected: start the local server, exercise the ROI calculator, tool demos, and forms. There are no automated tests in this repo.

Deployment notes
- This is a static site — deployable to Netlify, Vercel, GitHub Pages, or S3. Ensure externals (Calendly links, CDNs) remain reachable.

If you need clarification
- Reference `design.md` and `outline.md` for UX and content rules before making design/structure changes.
- Ask the maintainer for any server-side or analytics changes — current code simulates form submission and schedules via Calendly links.

-- End of file
