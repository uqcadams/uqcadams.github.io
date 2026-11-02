#!/usr/bin/env python3
"""Self-test that historical validation is independent from current-source drift."""
from pathlib import Path
import json
import shutil
import subprocess
import tempfile

D = Path(__file__).resolve().parents[1]
R = D.parents[1]
baseline = D / "tests/validate-baseline.py"
drift = D / "tests/detect-source-drift.py"
target = R / "acm1-planner/index.html"
original = target.read_bytes()

try:
    target.write_bytes(original + b"\n<!-- legitimate current-source fixture -->\n")
    result = subprocess.run(["python3", str(baseline)], cwd=R, capture_output=True, text=True)
    assert result.returncode == 0, result.stderr
finally:
    target.write_bytes(original)

with tempfile.TemporaryDirectory() as temp:
    root = Path(temp)
    manifest = json.loads((D / "source-manifest.json").read_text())
    for entry in manifest:
        if entry["path"].startswith("docs/system/"):
            continue
        source = R / entry["path"]
        destination = root / entry["path"]
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, destination)
    changed = root / "acm1-planner/index.html"
    changed.write_bytes(changed.read_bytes() + b"\n<!-- drift fixture -->\n")
    result = subprocess.run(
        ["python3", str(drift), "--repo-root", str(root), "--docs-root", str(D)],
        capture_output=True,
        text=True,
    )
    assert result.returncode == 1, result.stdout
    assert '"kind": "content-changed"' in result.stdout, result.stdout

print("Historical baseline remains valid after a current-source change; drift detection reports the change.")
