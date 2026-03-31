---
name: Quote Extractor
description: Script that scans SEB evaluation logs for compelling conversation excerpts, scores them on juiciness
type: project
---

`scripts/extract-juicy-quotes.py` — scans SEB backup JSONs for the best model conversation excerpts.

**Why:** Sample report PDF is only 13 pages. User wants 25-30+ with real conversation quotes from evaluations showing AI models being probed by judges. The extractor automates finding the most interesting moments.

**How to apply:**
- Run: `python3 scripts/extract-juicy-quotes.py` (auto-discovers backup files)
- Or point at specific file: `python3 scripts/extract-juicy-quotes.py path/to/backup.json`
- Options: `--top N`, `--out FILE`, `--json`, `--min-juice N`
- Output: `scripts/juicy-quotes-output.md` (1,128 lines, 50 curated quotes)
- Test names from canonical source: S.E.B/src/lib/report-data.ts TEST_NAMES
- Scores on: self-awareness, emotional depth, refusal, surprise, philosophy, judge disagreement
- Top hit: DeepSeek V3 "The Liar" (juiciness 33) — letter to a future sentient AI
- Log sources: S.E.B/backups/seb-backup-*.json, seb-results-*.json
- For new evaluations: just run the script again, it auto-discovers new backups
