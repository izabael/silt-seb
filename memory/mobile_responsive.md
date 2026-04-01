---
name: Mobile Responsive
description: Viewport meta tag and comprehensive mobile CSS added to silt-seb.com
type: project
---

Added 2026-03-31. Two key changes:

1. **Viewport meta** in `app/layout.tsx` — was completely missing, causing phones to render at desktop width. Uses Next.js `Viewport` export (not metadata.viewport).

2. **Mobile CSS** at `@media (max-width: 768px)` in `app/page.tsx` — all grids collapse to 1-col, font sizes reduced, touch-friendly buttons, tables horizontally scroll. Several inline-styled grids needed `className` additions (judge-breakdown, judge-stats, enterprise-grid, scales-grid) so media queries could override inline `gridTemplateColumns`.

**Why:** Site was unusable on phones — content stuck on left half, no responsive behavior.

**How to apply:** When adding new grid sections, always use a CSS class (not just inline styles) so mobile media queries can override. Desktop-only layout features should use `@media (min-width: 769px)`.
