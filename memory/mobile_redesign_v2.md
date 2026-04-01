---
name: Mobile Redesign v2
description: Full mobile UX overhaul with carousels, collapsible sections, sticky nav — replaces basic 1fr stacking
type: project
---

Added 2026-03-31. Comprehensive mobile redesign replacing "stack everything in one column" with modern patterns.

**Key patterns used:**
- CSS scroll-snap horizontal carousels for: models-grid, domains-grid, why-grid, gov-grid, proj-grid, bundles-grid, judge-breakdown
- `<details class="m-collapse">` collapsible sections for Governance and Judge Analysis
- Sticky `.mobile-nav` pill bar (hidden on desktop via `display: none`)
- `.scroll-hint` indicators after carousels (hidden on desktop)
- 48px min touch targets on all interactive elements

**Why:** Previous mobile was just `grid-template-columns: 1fr !important` on everything — created endless scroll of stacked cards. User specifically asked for modern mobile design.

**How to apply:** When adding new card grid sections, give them the carousel treatment on mobile. Use `!important` to override inline `gridTemplateColumns`. The `m-collapse` pattern works by using `display: contents` on desktop (hides summary, shows content) and normal `<details>` behavior on mobile.
