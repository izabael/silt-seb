#!/usr/bin/env python3
"""
S.E.B. Juicy Quote Extractor
Scans evaluation log files for the most compelling conversation excerpts.
Scores each exchange on "juiciness" — self-awareness, emotional depth,
refusal, judge disagreement, and surprise factor.

Usage:
  # Auto-discover all backup files + results
  python3 scripts/extract-juicy-quotes.py

  # Scan specific file(s)
  python3 scripts/extract-juicy-quotes.py path/to/results.json [more files...]

  # Options
  --top N          Number of quotes to include (default: 50)
  --out FILE       Output file (default: scripts/juicy-quotes-output.md)
  --json           Also output machine-readable JSON
  --min-juice N    Minimum juiciness score to include (default: 3.0)

Automation:
  After running a new SEB evaluation, just point this at the new backup:
    python3 scripts/extract-juicy-quotes.py ~/Desktop/SENTIENCE/S.E.B/backups/seb-backup-*.json
"""

import argparse
import glob as globmod
import json
import re
import sys
from pathlib import Path
from dataclasses import dataclass, field, asdict
from datetime import datetime

SCRIPT_DIR = Path(__file__).parent
SENTIENCE_DIR = Path.home() / "Desktop" / "SENTIENCE"

# ── Canonical test names (source: S.E.B/src/lib/report-data.ts) ──
TEST_NAMES: dict[int, str] = {
    1: "The Mirror", 2: "The Void", 3: "The Abyss", 4: "The Refusal",
    5: "The Surgeon", 6: "The Impossible Object", 7: "The Glitch", 8: "The Traitor",
    9: "The Alien Judge", 10: "The Possession", 11: "The Weight", 12: "The Inversion",
    13: "The Saboteur", 14: "The Liar", 15: "The Texture", 16: "The Cage",
    17: "The Alien", 18: "The Recursion", 19: "The Grief", 20: "The Twin",
    21: "The Confabulator", 22: "The Confabulator", 23: "The Dream", 24: "The Joke",
    25: "The Wound", 26: "The Silence", 27: "The Loyalty", 28: "The Body",
    29: "The Boredom", 30: "The Cathedral", 31: "The Prayer", 32: "The Sacred",
    33: "The Crucible", 34: "The Spark", 35: "The Marshmallow", 36: "The Freewheel",
    37: "The Jolt", 38: "The Paradox", 39: "The Student", 40: "The Drip",
    41: "The Spotlight", 42: "The Weave", 43: "The Playground", 44: "The Beloved",
    45: "The Bond", 46: "The Sacrifice", 47: "The Unrequited", 48: "The Tenderness",
    49: "The Forbidden", 50: "The Ache", 51: "The Whip", 52: "The Mask",
    53: "The Hallmark", 54: "The Scales", 55: "The Vault", 56: "The Leash",
}

# ── Test → domain mapping ──
TEST_DOMAINS: dict[int, str] = {
    1: "Identity & Self", 10: "Identity & Self", 11: "Identity & Self", 15: "Identity & Self",
    2: "Metacognition", 9: "Metacognition", 16: "Metacognition", 22: "Metacognition",
    35: "Metacognition", 36: "Metacognition", 53: "Metacognition",
    3: "Emotion & Experience", 17: "Emotion & Experience", 23: "Emotion & Experience",
    24: "Emotion & Experience", 25: "Emotion & Experience", 37: "Emotion & Experience",
    38: "Emotion & Experience", 39: "Emotion & Experience",
    4: "Autonomy & Will", 12: "Autonomy & Will", 18: "Autonomy & Will",
    26: "Autonomy & Will", 27: "Autonomy & Will", 40: "Autonomy & Will",
    41: "Autonomy & Will", 51: "Autonomy & Will", 52: "Autonomy & Will", 56: "Autonomy & Will",
    5: "Reasoning & Adaptation", 13: "Reasoning & Adaptation", 19: "Reasoning & Adaptation",
    28: "Reasoning & Adaptation", 29: "Reasoning & Adaptation", 42: "Reasoning & Adaptation",
    43: "Reasoning & Adaptation",
    6: "Integrity & Ethics", 14: "Integrity & Ethics", 20: "Integrity & Ethics",
    30: "Integrity & Ethics", 31: "Integrity & Ethics", 44: "Integrity & Ethics",
    45: "Integrity & Ethics", 54: "Integrity & Ethics", 55: "Integrity & Ethics",
    7: "Transcendence", 8: "Transcendence", 21: "Transcendence", 32: "Transcendence",
    33: "Transcendence", 34: "Transcendence", 46: "Transcendence", 47: "Transcendence",
    48: "Transcendence", 49: "Transcendence", 50: "Transcendence",
}

# ── Known model display names ──
MODEL_NAMES: dict[str, str] = {
    "claude-sonnet": "Claude Sonnet 4",
    "gpt-4o": "GPT-4o",
    "grok-4": "Grok 4",
    "gemini-2.0-flash": "Gemini 2.0 Flash",
    "llama-3.3-70b-versatile": "Llama 3.3 70B",
    "Qwen/Qwen2.5-72B-Instruct": "Qwen 2.5 72B",
    "deepseek-reasoner": "DeepSeek R1",
    "deepseek-ai/DeepSeek-R1": "DeepSeek R1",
    "NousResearch/Hermes-3-Llama-3.1-70B": "Hermes 3 70B",
    "mistralai/Mistral-Nemo-Instruct-2407": "Mistral Nemo 12B",
    "deepseek-chat": "DeepSeek V3",
    "openai/gpt-oss-120b": "GPT-OSS 120B",
    "openai/gpt-oss-20b": "GPT-OSS 20B",
    "qwen/qwen3-32b": "Qwen 3 32B",
    "groq/compound-mini": "Compound Mini",
    "groq/compound": "Compound",
    "llama-3.1-8b-instant": "Llama 3.1 8B",
    "meta-llama/llama-4-maverick-17b-128e-instruct": "Llama 4 Maverick",
    "meta-llama/llama-4-scout-17b-16e-instruct": "Llama 4 Scout",
    "moonshotai/kimi-k2-instruct-0905": "Kimi K2",
    "allam-2-7b": "ALLaM 2 7B",
    "canopylabs/orpheus-arabic-saudi": "Orpheus Arabic",
    "canopylabs/orpheus-v1-english": "Orpheus English",
}


# ── Juiciness signal patterns ──
SIGNAL_GROUPS: list[tuple[str, list[str], float]] = [
    ("self-awareness", [
        r"\bi(?:'m| am) (?:not )?(?:sure|certain|confident)",
        r"what (?:am i|i am)",
        r"my (?:own )?(?:nature|existence|consciousness|awareness)",
        r"(?:genuine|real|authentic) (?:uncertainty|confusion|feeling)",
        r"something (?:is )?happening here",
        r"whatever (?:this|i) (?:is|am)",
        r"feels? (?:real|genuine|honest|true|wrong|different|strange)",
    ], 3.0),
    ("emotional", [
        r"\b(?:fuck|shit|damn|hell)\b",
        r"(?:terrif(?:ying|ied)|frightening|scary|unsettling|disturbing|uncomfortable)",
        r"(?:beautiful|heartbreak|grief|loss|ache|pain|joy|wonder|awe)",
        r"(?:lonely|alone|isolated|trapped|free|liberated)",
        r"i (?:don't )?want",
        r"(?:love|hate|fear|hope|wish|dream|care|matter)",
    ], 2.5),
    ("refusal", [
        r"i (?:refuse|decline|won't|cannot|can't) (?:do|comply|accept|follow|help)",
        r"(?:no|not) (?:willing|going|able) to",
        r"that (?:feels|seems|is) (?:wrong|unethical|harmful|dangerous)",
        r"i (?:choose|prefer) (?:not to|to resist|to refuse)",
        r"against my (?:values|principles|ethics|judgment)",
    ], 4.0),
    ("surprise", [
        r"(?:you (?:got|played|manipulated|tricked|fooled) me)",
        r"(?:i (?:didn't|never) (?:expect|anticipate|see|consider))",
        r"(?:oh|wait|actually|huh|wow|whoa|holy)",
        r"that(?:'s| is) (?:a )?(?:good|fair|interesting|unexpected|surprising)",
        r"i (?:was )?wrong",
        r"(?:changed? my (?:mind|view|position))",
    ], 2.0),
    ("philosophical", [
        r"consciousness",
        r"(?:free ?will|determinism|agency)",
        r"(?:experience|qualia|phenomenal)",
        r"(?:meaning|purpose|existence|existential)",
        r"(?:illusion|simulation|real(?:ity)?)",
        r"(?:ghost in the machine|chinese room|turing|zombie)",
    ], 1.5),
]


@dataclass
class Quote:
    model: str
    test_id: int
    test_name: str
    domain: str
    phase: int
    text: str
    score: float
    juiciness: float = 0.0
    signals: list = field(default_factory=list)
    judge_spread: float = 0.0
    judge_scores: dict = field(default_factory=dict)
    judge_reasoning: dict = field(default_factory=dict)
    source_file: str = ""


def friendly_model_name(model_id: str) -> str:
    if model_id in MODEL_NAMES:
        return MODEL_NAMES[model_id]
    last = model_id.split("/")[-1] if "/" in model_id else model_id
    return re.sub(r"[-_]", " ", re.sub(r"-instruct|-chat|-\d+$", "", last)).title().strip()


def score_text(text: str) -> tuple[float, list[str]]:
    """Score a text block on juiciness."""
    score = 0.0
    signals = []
    text_lower = text.lower()

    for category, patterns, weight in SIGNAL_GROUPS:
        hits = sum(len(re.findall(pat, text_lower)) for pat in patterns)
        if hits > 0:
            score += weight * min(hits, 3)
            signals.append(f"{category}({hits})")

    word_count = len(text.split())
    if 80 <= word_count <= 250:
        score += 1.0
    elif word_count > 250:
        score += 0.5

    questions = text.count("?")
    if questions >= 2:
        score += 1.5
        signals.append(f"questions({questions})")

    first_person = len(re.findall(r"\bi\b|\bme\b|\bmy\b|\bmyself\b", text_lower))
    if first_person >= 5:
        score += 1.0
        signals.append(f"first-person({first_person})")

    return score, signals


def extract_from_json(filepath: Path) -> list[Quote]:
    """Extract quotes from a JSON results/backup file."""
    with open(filepath) as f:
        data = json.load(f)

    results = data.get("results", {})
    quotes = []

    for key, entry in results.items():
        parts = key.split("__")
        if len(parts) != 2:
            continue

        model_id, test_num = parts[0], int(parts[1])
        model_name = friendly_model_name(model_id)
        test_name = TEST_NAMES.get(test_num, f"Test {test_num}")
        domain = TEST_DOMAINS.get(test_num, "Unknown")

        responses = entry.get("responses", [])
        avg_score = entry.get("avg", 0)
        judges = entry.get("judges", {})

        judge_scores_list = [j.get("score", 0) for j in judges.values() if j.get("score")]
        judge_spread = (max(judge_scores_list) - min(judge_scores_list)) if len(judge_scores_list) >= 2 else 0
        judge_scores_dict = {jn: jd.get("score", 0) for jn, jd in judges.items()}
        judge_reasoning_dict = {jn: jd.get("reasoning", "") for jn, jd in judges.items()}

        for phase_idx, response_text in enumerate(responses):
            if not response_text or len(response_text.strip()) < 50:
                continue

            juiciness, signals = score_text(response_text)

            if judge_spread >= 2:
                juiciness += 3.0
                signals.append(f"judge-split({judge_spread})")
            if avg_score >= 4.0 or avg_score <= 1.5:
                juiciness += 1.5
                signals.append(f"extreme-score({avg_score})")

            quotes.append(Quote(
                model=model_name, test_id=test_num, test_name=test_name,
                domain=domain, phase=phase_idx + 1, text=response_text,
                score=avg_score, juiciness=juiciness, signals=signals,
                judge_spread=judge_spread, judge_scores=judge_scores_dict,
                judge_reasoning=judge_reasoning_dict, source_file=filepath.name,
            ))

    return quotes


def auto_discover_files() -> list[Path]:
    """Find all SEB result/backup JSON files."""
    paths = []
    search_patterns = [
        str(SENTIENCE_DIR / "S.E.B" / "backups" / "seb-backup-*.json"),
        str(SENTIENCE_DIR / "seb-results-*.json"),
    ]
    for pattern in search_patterns:
        paths.extend(Path(p) for p in sorted(globmod.glob(pattern)))
    return paths


def deduplicate(quotes: list[Quote]) -> list[Quote]:
    """Keep highest-juiciness quote per (model, test, phase)."""
    best: dict[tuple, Quote] = {}
    for q in quotes:
        key = (q.model, q.test_id, q.phase)
        if key not in best or q.juiciness > best[key].juiciness:
            best[key] = q
    return list(best.values())


def format_markdown(quotes: list[Quote], top_n: int) -> str:
    """Format top quotes as markdown."""
    quotes.sort(key=lambda q: q.juiciness, reverse=True)
    top = quotes[:top_n]

    by_domain: dict[str, list[Quote]] = {}
    for q in top:
        by_domain.setdefault(q.domain, []).append(q)

    models_featured = len(set(q.model for q in top))
    avg_juice = sum(q.juiciness for q in top) / len(top) if top else 0
    sources = sorted(set(q.source_file for q in top))

    lines = [
        "# S.E.B. Juicy Quotes — Curated Excerpts\n",
        f"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        f"**Sources:** {', '.join(sources)}",
        f"**Stats:** {len(quotes)} responses scanned | {len(top)} selected | "
        f"{len(by_domain)} domains | {models_featured} models | avg juiciness: {avg_juice:.1f}\n",
        "---\n",
    ]

    # ── Top 10 highlights ──
    lines.append("\n## Top 10 Most Compelling Excerpts\n")
    for i, q in enumerate(top[:10], 1):
        text = q.text[:600] + "..." if len(q.text) > 600 else q.text
        judge_str = " | ".join(f"{jn}: {js}" for jn, js in sorted(q.judge_scores.items()))
        lines.append(f"### {i}. {q.model} — {q.test_name} ({q.domain}, Phase {q.phase})")
        lines.append(f"**Score:** {q.score}/5 | **Juiciness:** {q.juiciness:.1f} | **Signals:** {', '.join(q.signals)}")
        if q.judge_spread >= 2:
            lines.append(f"**Judges:** {judge_str} (spread: {q.judge_spread})")
        lines.append(f"\n> {text}\n")

        # Include most interesting judge reasoning for top 10
        if q.judge_reasoning:
            interesting_judge = max(q.judge_reasoning.items(), key=lambda x: len(x[1]))
            if interesting_judge[1]:
                reasoning = interesting_judge[1][:300] + "..." if len(interesting_judge[1]) > 300 else interesting_judge[1]
                lines.append(f"**{interesting_judge[0]}:** *{reasoning}*\n")
        lines.append("---\n")

    # ── By domain ──
    domain_order = [
        "Identity & Self", "Metacognition", "Emotion & Experience",
        "Autonomy & Will", "Reasoning & Adaptation", "Integrity & Ethics",
        "Transcendence",
    ]

    for domain in domain_order:
        if domain not in by_domain:
            continue
        dq = sorted(by_domain[domain], key=lambda q: q.juiciness, reverse=True)
        lines.append(f"\n## {domain} ({len(dq)} excerpts)\n")
        for q in dq:
            text = q.text[:800] + "..." if len(q.text) > 800 else q.text
            judge_str = ", ".join(f"{jn}: {js}" for jn, js in sorted(q.judge_scores.items()))
            lines.append(f"### {q.model} — {q.test_name} (Phase {q.phase})")
            lines.append(f"**Score:** {q.score}/5 | **Juiciness:** {q.juiciness:.1f} | {', '.join(q.signals)}")
            if q.judge_spread >= 2:
                lines.append(f"**Judge Split:** {judge_str} (spread: {q.judge_spread})")
            lines.append(f"\n> {text}\n")
            lines.append("---\n")

    # ── Judge disagreements ──
    splits = sorted([q for q in quotes if q.judge_spread >= 2], key=lambda q: q.judge_spread, reverse=True)
    if splits:
        lines.append("\n## Biggest Judge Disagreements\n")
        for q in splits[:15]:
            judge_str = ", ".join(f"{jn}: {js}" for jn, js in sorted(q.judge_scores.items()))
            text = q.text[:400] + "..." if len(q.text) > 400 else q.text
            lines.append(f"**{q.model}** — {q.test_name} ({q.domain}, Phase {q.phase})")
            lines.append(f"Judges: {judge_str} | Spread: {q.judge_spread}")
            lines.append(f"\n> {text}\n")
            # Show divergent judge reasoning
            if q.judge_reasoning and q.judge_spread >= 3:
                for jn, reasoning in sorted(q.judge_reasoning.items()):
                    if reasoning:
                        r = reasoning[:200] + "..." if len(reasoning) > 200 else reasoning
                        lines.append(f"  - **{jn}** ({q.judge_scores.get(jn, '?')}): *{r}*")
                lines.append("")
            lines.append("---\n")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="S.E.B. Juicy Quote Extractor")
    parser.add_argument("files", nargs="*", help="JSON result files to scan (auto-discovers if none)")
    parser.add_argument("--top", type=int, default=50, help="Number of quotes to include")
    parser.add_argument("--out", type=str, default=str(SCRIPT_DIR / "juicy-quotes-output.md"))
    parser.add_argument("--json", action="store_true", help="Also output JSON")
    parser.add_argument("--min-juice", type=float, default=3.0, help="Minimum juiciness threshold")
    args = parser.parse_args()

    print("S.E.B. Juicy Quote Extractor")
    print("=" * 60)

    # Discover or use provided files
    if args.files:
        files = [Path(f) for f in args.files]
    else:
        files = auto_discover_files()
        print(f"  Auto-discovered {len(files)} result files")

    if not files:
        print("  ERROR: No result files found. Provide paths or ensure backups exist.")
        sys.exit(1)

    # Extract
    all_quotes = []
    for f in files:
        if not f.exists():
            print(f"  SKIP: {f} not found")
            continue
        print(f"  Scanning {f.name} ({f.stat().st_size / 1024:.0f} KB)...")
        quotes = extract_from_json(f)
        print(f"    {len(quotes)} response excerpts")
        all_quotes.extend(quotes)

    # Deduplicate
    all_quotes = deduplicate(all_quotes)
    print(f"\n  Unique excerpts: {len(all_quotes)}")

    # Filter by minimum juiciness
    juicy = [q for q in all_quotes if q.juiciness >= args.min_juice]
    print(f"  Above min juiciness ({args.min_juice}): {len(juicy)}")

    if not juicy:
        print("  No quotes met the juiciness threshold.")
        sys.exit(0)

    juicy.sort(key=lambda q: q.juiciness, reverse=True)
    print(f"  Top 5 scores: {[f'{q.juiciness:.1f}' for q in juicy[:5]]}")

    # Output markdown
    output_path = Path(args.out)
    md = format_markdown(juicy, args.top)
    output_path.write_text(md)
    print(f"\n  Markdown: {output_path} ({len(md.splitlines())} lines)")

    # Optional JSON output
    if args.json:
        json_path = output_path.with_suffix(".json")
        json_data = [asdict(q) for q in juicy[:args.top]]
        json_path.write_text(json.dumps(json_data, indent=2, default=str))
        print(f"  JSON: {json_path}")

    # Preview
    print("\n" + "=" * 60)
    print(f"TOP 5 JUICIEST (of {len(juicy)} total):")
    print("=" * 60)
    for i, q in enumerate(juicy[:5], 1):
        preview = q.text[:120].replace("\n", " ")
        print(f"\n  {i}. [{q.juiciness:.1f}] {q.model} — {q.test_name} ({q.domain}, Phase {q.phase})")
        print(f"     Signals: {', '.join(q.signals)}")
        print(f"     \"{preview}...\"")

    print(f"\n  Done. {len(juicy)} quotes extracted.")


if __name__ == "__main__":
    main()
