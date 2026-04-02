---
name: Scanner Animations
description: Red/blue sweep animations on model strip, red swish on SILT logo text, timing decisions
type: project
---

Scanner sweep animations added to silt-seb.com (2026-04-01).

**Model Strip Sweeps:**
- Red sweep (left→right) on top edge, blue sweep (right→left) on bottom edge
- 4px height on desktop, 3px on mobile
- 3s timing, 12% width, glow effect (box-shadow)
- Dark background (#0f0a1a) matching model strip

**SILT Logo Swish:**
- Black text (#1a1a2e) with red (#dc2626) scanner beam sweeping left→right
- Flows across both "SILT™" and "Sentience Evaluation Battery" (gradient on .logo wrapper)
- 7s timing, linear, one-directional (no reverse)
- Tight beam (46%→54% gradient stops)

**Model Strip Layout:**
- Removed "Models evaluated:" label and pipe separators
- Flexbox centered with 24px gap, wraps evenly
- Added header: "MODELS SUBJECTED TO FULL BATTERY OF {n} BEHAVIORAL TESTS • 7 DOMAINS • 4 BLIND JUDGES"

**Why:** Inspired by red swoosh in S.E.B. admin portal (seb_current.html). User iterated heavily on timing, thickness, and colors.

**How to apply:** These animations are pure CSS — no JS needed. User is particular about speed (went through many iterations). Current speeds are dialed in.
