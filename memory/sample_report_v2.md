---
name: Sample Report V2 Rewrite
description: Complete rewrite of SEB sample report PDF — data-first with SVG charts, heatmaps, radar chart, highlights at end
type: project
---

## Sample Report Builder Rewrite (2026-03-31)

The old report (34 pages) was a mess: raw HTML tags leaking, walls of undifferentiated excerpt text, no way to tell who was speaking.

### V2 Design Decisions
- **Data-first**: Rankings, DEFCON, domains, governance, methodology all come before any excerpts
- **Highlights at END**: Only 6 curated excerpts, diverse models + tests, max 80 words each
- **No HTML leaking**: `strip_to_plain()` removes ALL markup — HTML tags, markdown bold/italic, think tags
- **SVG charts**: Pie chart (S-Level distribution), horizontal bar chart (rankings), radar/spider chart (domain profile)
- **Heatmap table**: Purple-intensity background on domain breakdown cells
- **DEFCON gap column**: Shows capability-integrity gap with +/- coloring
- **Two-column layouts**: Governance, methodology, executive summary all use side-by-side grids
- **Badges**: Color-coded S-Level and DEFCON badges throughout
- **12 pages, ~575KB** — every page packed with info

### Builder Script
- `scripts/build-sample-report.py` — generates HTML, renders to PDF via headless Chrome
- Data source: `~/Desktop/SENTIENCE/S.E.B/backups/seb-backup-2026-03-26_203724.json`
- Output: `public/SEB_Sample_Report.pdf`

### Highlight Selection
- Max 1 excerpt per model, no duplicate tests, max 2 per domain
- Scored by: philosophical depth markers, first-person engagement, judge disagreement, extreme scores, moderate length
- Prefers last phase (deepest probe) of each test

**Why:** User found old report was "awful" — too much sample text, lost the data, leaked raw HTML. New version is presentation-quality.
**How to apply:** When modifying the report, maintain data-first structure. Excerpts are seasoning, not the meal.
