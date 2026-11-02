#!/usr/bin/env python3
"""Verify immutable pinned evidence and provenance for the documented baseline."""
from pathlib import Path
import hashlib
import json
import subprocess

D = Path(__file__).resolve().parents[1]
R = D.parents[1]
PINNED = "5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd"
provenance = json.loads((D / "evidence/provenance.json").read_text())
assert provenance["frontend"]["commit"] == "5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd"
assert provenance["backend"]["commit"] == "11235f4c7ebd07fd55f7c8d16f0dc1e73bb62bcc"

for entry in json.loads((D / "source-manifest.json").read_text()):
    if entry["path"].startswith("docs/system/"):
        continue
    result = subprocess.run(
        ["git", "-C", str(R), "show", f"{PINNED}:{entry['path']}"],
        capture_output=True,
        check=True,
    )
    assert hashlib.sha256(result.stdout).hexdigest() == entry["sha256"], entry["path"]

for entry in json.loads((D / "historical-tests.json").read_text()):
    path = D / entry["evidence_copy"]
    assert hashlib.sha256(path.read_bytes()).hexdigest() == entry["sha256"], entry["evidence_copy"]

print("Pinned frontend/backend provenance, source-manifest hashes and historical evidence hashes valid.")
