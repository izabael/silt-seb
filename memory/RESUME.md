# Resume Point — 2026-04-02

## Current Task
Scanner animations + model strip redesign. All deployed to Vercel.

## State
- Branch: main, dirty (app/page.tsx, next-env.d.ts modified)
- Deployed to Vercel (silt-seb.com) — live with all changes
- Origin up to date (last push: 309290a)

## Completed This Session
1. Added red/blue scanner sweeps to model strip (top=red L→R, bottom=blue R→L)
2. SILT logo: red swish scanning across "SILT™ Sentience Evaluation Battery"
3. Model strip layout redesign: removed pipes, flexbox centered, added descriptive header
4. Request Demo button: shrunk ~20%, nudged up 2px for alignment
5. Extensive timing/color iteration — all speeds dialed in
6. Deployed twice to Vercel production
7. Removed header sweep (was briefly there, user preferred clean header)

## Animation Speeds (current)
- SILT logo swish: 7s linear
- Model strip red sweep: 3s ease-in-out
- Model strip blue sweep: 3s ease-in-out
- Sweep height: 4px desktop, 3px mobile
- Sweep width: 12%

## Open Bugs
- Twitter bot workflow failing (GitHub Actions)
- None on silt-seb.com

## Next Steps
1. Commit current dirty state
2. Test mobile on real devices
3. Consider swipe dot indicators under carousels
4. Expand model fleet beyond current set

## Context
- Header border-bottom restored (no sweep on header)
- Model strip header text uses data.totalTests for dynamic count
- Logo gradient lives on .logo wrapper (not .logo-text) to span both elements
- User went through ~15 iterations on timing — current values are final
