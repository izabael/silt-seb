# Resume Point — 2026-04-22 (late-night S.E.B. cleanup)

## Current Task
**PARKED.** S.E.B. unstuck itself on first retry, then a cascade of Basic Auth popup bugs got chased down to the real culprit: a client-side fetch race, not a middleware allowlist gap. Full `/client` and `/seb-projections` UX is clean now. Entitlement enforcement verified intact for Standard-tier users.

## State
- silt-seb: branch `main`, working tree clean at park time (this RESUME update + auto-memory index are the pending commit)
- S.E.B.: branch `main`, working tree clean, fully deployed live at https://www.sentienceevaluationbattery.com
- Both repos: no open PRs
- Four S.E.B. commits tonight, three clean deploys

## What Shipped Tonight (S.E.B.)

### 1. Unstick (`756be96` + `90f445d` landed together)
- `vercel --prod` went clean in 44s on the first retry. Zero code change from the 16+ rejections last session. Vercel status page confirmed the underlying flake ("Elevated errors on Vercel Dashboard" — 2026-04-21).
- `90f445d` middleware allowlist fix (PR #10, previously queued) landed with this same build.

### 2. Newsletter banner hide (`756be96`)
- `/newsletter` is a public signup page; the "SECURE ENVIRONMENT · AUTHORIZED ACCESS ONLY" strip doesn't apply.
- New `src/components/secure-banner.tsx` — client component, reads `usePathname()`, returns null on `/newsletter`, otherwise renders byte-identical markup.
- `src/app/layout.tsx` — replaced the inline strip div with `<SecureBanner />`.

### 3. Standard web-platform probe allowlist (`e7e352b` + `7788dde`)
- DevTools-style probe sweep found 13 paths that returned `401 WWW-Authenticate: Basic` when browsers/crawlers auto-probed them.
- Patched explicitly in middleware (`src/middleware.ts`) — kept surgical/fail-closed rather than inverting the default (saved as feedback memory).
- Final allowlist categories: SEO/crawler, PWA/service-worker, ad-networks (IAB ads.txt/app-ads.txt), browser search (opensearch.xml), legacy (crossdomain.xml, clientaccesspolicy.xml, trace.axd), conventions (humans.txt, security.txt).
- Re-probe after deploy: 0 leaks remaining on all 13 paths.

### 4. `/client` fetch race (`52e0737`) — the real culprit
- After the 13 allowlist fixes, user reported the popup STILL appearing on `/client`. DevTools Network tab revealed: `/api/results → 401`.
- Root cause: `src/app/client/page.tsx` line 222 — `const endpoint = user?.role === "client" ? "/api/client/results" : "/api/results";` — and the `useEffect` on line 241 fires immediately on mount. On first render, `user` is null (async auth load), so endpoint falls back to the admin-only `/api/results`, which correctly returns 401 + Basic Auth, which pops before `/api/auth/me` can resolve and re-fire the fetch.
- Fix: `if (!user) return;` guard at top of the polling `useEffect`; added `user` to deps. Fetch now waits for auth resolution.
- Zero server-side auth changed — verified post-deploy: `/client` still 307s, `/api/client/results` still 401 JSON, `/api/results` still 401 Basic Auth (admin-gated, correctly).

## Entitlement enforcement verified (post-user-question)
- Eddie's actual Redis state: tier=`Standard`, entitlements=`{defcon:false, slevel:false, projections:false}`.
- Login route: default `role="client"`; admin only via `SEB_SITE_PASSPHRASE` env + username in `["SILT","silt"]`. Eddie cannot get admin via normal login.
- `/seb-projections/layout.tsx` correctly rejects: admin bypass (no) → Premium/Executive bypass (no, tier=Standard) → hash lookup → `projections: false` → `redirect("/client?denied=projections")`.
- Earlier glimpse of Eddie appearing to "get in" was stale client-state, not a security bug.

## Also tonight: newsletter blog post & memory hygiene
- Two new feedback memories saved to silt-seb auto-memory:
  - `feedback_vercel_debug_mixing.md` — "vercel errors and debugging do NOT mix" (user's explicit rule; don't touch code during a Vercel flake retry loop — you'll bisect non-issues for hours)
  - `feedback_security_whack_a_mole.md` — for auth middleware, stick with surgical fail-closed allowlist additions; don't propose inverting defaults

## Deploy ledger (S.E.B. — 4 deploys tonight, all clean)
- `756be96` — unstick + newsletter (44s)
- `e7e352b` — webmanifest + browserconfig (44s)
- `7788dde` — full 13-path allowlist sweep (39s)
- `52e0737` — client fetch race fix (39s)

## Next Steps
1. **Welcome email with temp password** — silt-seb webhook still only stores temp pw in Redis, no email fired. Wire via `~/.config/silt-mail/gmail.py`.
2. **Username case normalization** — lowercase at login to avoid Eddie/eddie collisions. Becomes relevant if session.username gets used for Redis hash lookups — currently the hash key matches whatever was stored (case-preserved), which works but is fragile.
3. **Stripe LIVE mode flip** — still deliberately waiting; playbook in `stripe_test_to_live_flip.md`.
4. **Product-level data filtering inside `/client`** — DEFCON-only customer still sees S-Level sections and vice versa (v2 work, deferred).
5. **Reconnect Vercel GitHub integration to `silt-tech/SEB`** — optional; would restore webhook-triggered auto-deploy. Repo rename broke the old webhook. Not urgent.
6. **Remove admin fallback in `/client/page.tsx` line 222?** — the `user?.role === "client" ? client-endpoint : admin-endpoint` ternary was written assuming admins might view the client portal. No audit trail that this is actually used. Consider always using `/api/client/results` and dropping the admin branch (or doing it server-side).

## Reflections
- The **real** bug lived four layers away from where the symptom surfaced. The first three allowlist fixes were correct-but-not-sufficient; the 13 patched probe paths weren't the root cause. The user's DevTools screenshot cut through the whack-a-mole in seconds: `/api/results → 401` told us exactly which fetch was racing. **Next time popup-chasing, ask for DevTools Network view first, not after three rounds of allowlist additions.**
- Middleware default of "Basic Auth the unknown" is backward-facing for any site with a user-facing UX surface. But inverting the default is NOT safe on a legacy auth codebase without a full route audit — the user was right to push back. The fail-closed allowlist stays; the real bugs were upstream client code, not the middleware default.
- Vercel's orchestration flake is deterministic by its own internal state, not by commit content — the *same* commit that failed 16 times landed clean 6 minutes later. The status page + `vercel ls` recent history is the signal; code-change reactions during a flake are noise. (Saved as memory rule.)

## Memory files (current)
- [MEMORY.md index](MEMORY.md)
- [Populate before enforce](populate_before_enforce.md)
- [Keep Edge middleware slim](vercel_middleware_redis.md)
- [Vercel 0ms diagnosis](vercel_0ms_diagnosis.md)
- [Stripe test→live flip](stripe_test_to_live_flip.md)
- [Stripe config](stripe_config.md)
- [Education links](education_links.md)
