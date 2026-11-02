#!/usr/bin/env python3
"""Detect changes in current source relative to the pinned documentation baseline."""
from pathlib import Path
import hashlib
import json
import sys
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--repo-root", type=Path, default=Path(__file__).resolve().parents[3])
parser.add_argument("--docs-root", type=Path, default=Path(__file__).resolve().parents[1])
args = parser.parse_args()
D = args.docs_root.resolve()
R = args.repo_root.resolve()
manifest = json.loads((D / "source-manifest.json").read_text())
registry = json.loads((D / "feature-registry.json").read_text())
drift = []

for entry in manifest:
    if entry["path"].startswith("docs/system/"):
        continue
    path = R / entry["path"]
    if not path.is_file():
        drift.append({"path": entry["path"], "kind": "missing"})
    elif hashlib.sha256(path.read_bytes()).hexdigest() != entry["sha256"]:
        drift.append({"path": entry["path"], "kind": "content-changed"})

for capability in registry["capabilities"]:
    for reference in capability["source_references"]:
        path = R / reference["path"]
        lines = path.read_text().splitlines() if path.is_file() else []
        line = reference["line"]
        if not (1 <= line <= len(lines)) or reference["symbol"] not in lines[line - 1]:
            drift.append({
                "capability": capability["id"],
                "path": reference["path"],
                "line": line,
                "symbol": reference["symbol"],
                "kind": "source-reference-moved",
            })

if drift:
    print(json.dumps({"drift": drift}, indent=2))
    sys.exit(1)
print("No current-source drift detected against the pinned documentation baseline.")
