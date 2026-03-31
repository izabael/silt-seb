---
name: Sample Data Overhaul
description: Public site now uses fully synthetic sample data — no real scores, no perturbation of real data
type: project
---

All public-facing data on silt-seb.com is now fully synthetic hand-crafted profiles, NOT perturbed real scores.

**Why:** Previous approach perturbed real scores by -20%, which leaked relative rankings and made Chinese models (DeepSeek, Qwen) stand out — revealing data intended for a future press release. User explicitly flagged this as a security issue.

**How to apply:**
- Sample profiles are in `lib/seb-data.ts` (~line 252) — 12 hand-crafted domain score sets
- Profiles are assigned round-robin to discovered models; no relationship to real data
- Domain bar colors use S-Level color scale (not arbitrary palette)
- All sections marked SAMPLE: model cards (red watermark 18% opacity), DEFCON distribution, Judge Analysis, Governance
- Nav says "Sample Data" not "Live Data"
- Hero badge prefixed with "SAMPLE:"
- Sample report PDF is 13 pages — needs expansion (next priority)
