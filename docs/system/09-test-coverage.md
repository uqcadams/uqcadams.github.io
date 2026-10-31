# Test inventory and regression baseline

Audit execution used **v21.7.2**, Python 3.12.7. Existing tests were not modified. Full [current results](test-results.json), [historical results/provenance](historical-tests.json), [logs](evidence/test-results/) and [capability matrix](traceability-matrix.csv) are versioned. Assertion counts are not branch coverage or test-case counts.

## Current pinned suites

- **13 frontend scripts:** 12 passed, 1 failed.
- **7 backend scripts inspected:** six offline scripts passed; paid live script skipped.
- **New characterisation:** one script, **7 cases passed**. Separate documentation validator checks consistency.
- **17 additional historical workspace scripts inspected:** 15 feasible scripts run against current pinned HTML in a disposable `work/index.html`; 9 passed,6 failed; two fixture/provider-dependent scripts not run. These are supplementary, not original baseline suite.

| Existing script | Scope inspected | Actual result |
|---|---|---|
| [alliance-focus-roster-drag.cjs](../../tests/alliance-focus-roster-drag.cjs) | Focus centre/matching mud/grass counts, holes, rename, pool drag/drop, collisions/exclusions, role/archive guards. (21 literal assertion references) | passed — [log](evidence/test-results/frontend-alliance-focus-roster-drag.txt) |
| [alliance-roster-filter.cjs](../../tests/alliance-roster-filter.cjs) | Normalized alliance grouping, deployed/waiting counts, unassigned and combined filters. (18 literal assertion references) | passed — [log](evidence/test-results/frontend-alliance-roster-filter.txt) |
| [alliance-tag-matching.cjs](../../tests/alliance-tag-matching.cjs) | Recover blank tags, assign without overwriting foreign tags, undo/redo, import/focus permissions. (11 literal assertion references) | passed — [log](evidence/test-results/frontend-alliance-tag-matching.txt) |
| [deployment-packing.cjs](../../tests/deployment-packing.cjs) | Standard/compact capacity, min distances, safe apply/recall, retained identities/regions and permissions. (21 literal assertion references) | passed — [log](evidence/test-results/frontend-deployment-packing.txt) |
| [deployment-publisher.cjs](../../tests/deployment-publisher.cjs) | Explicit matching-room authority, stable source IDs, versions, unchanged suppression, move/recall/pause; mocked service. (13 literal assertion references) | passed — [log](evidence/test-results/frontend-deployment-publisher.txt) |
| [preview-territory.cjs](../../tests/preview-territory.cjs) | Centre-only allocation with footprint spill; blocked footprint/collision rejection and rendered name/HQ labels. (14 literal assertion references) | passed — [log](evidence/test-results/frontend-preview-territory.txt) |
| [quick-deployment.cjs](../../tests/quick-deployment.cjs) | Determinism, standard mud priority, stale previews/apply/history/permissions/holes intended; currently stops early at capacity assertion. (27 literal assertion references) | failed — [log](evidence/test-results/frontend-quick-deployment.txt) |
| [quick-registration.cjs](../../tests/quick-registration.cjs) | Quick availability/body preservation, custom windows/notes, autosave/conflict/read-only DOM mocks. (29 literal assertion references) | passed — [log](evidence/test-results/frontend-quick-registration.txt) |
| [recovered-alliance-workflows.cjs](../../tests/recovered-alliance-workflows.cjs) | Region doubleclick/mode guards, navigation, minor tiers, reorder map drop, shares and grass/manual reservations. (28 literal assertion references) | passed — [log](evidence/test-results/frontend-recovered-alliance-workflows.txt) |
| [registration-deployment.cjs](../../tests/registration-deployment.cjs) | Full-window approved available eligibility and mud/grass centre constraints, registration toggle off. (12 literal assertion references) | passed — [log](evidence/test-results/frontend-registration-deployment.txt) |
| [registration-inspector.cjs](../../tests/registration-inspector.cjs) | Pure anchored zoom,1–20/clamp/Fit; no real wheel/pointer/pinch or live refresh events. (13 literal assertion references) | passed — [log](evidence/test-results/frontend-registration-inspector.txt) |
| [roster-drop-preview.cjs](../../tests/roster-drop-preview.cjs) | Pointer-to-cell drop target, identity/level/coords, valid/blocked preview, leave/end cleanup and lock. (15 literal assertion references) | passed — [log](evidence/test-results/frontend-roster-drop-preview.txt) |
| [roster-sync.cjs](../../tests/roster-sync.cjs) | Read-only join/source identity merge, retain positions/layout, persistence/removed/week/filter/disconnect. (42 literal assertion references) | passed — [log](evidence/test-results/frontend-roster-sync.txt) |
| [test-ai-budget.mjs](evidence/shared-service/scripts/test-ai-budget.mjs) | SQLite permanent ledger initialization/reserve/settle/concurrent stop/unknown outcomes/fail closed. (21 literal assertion references) | passed — [log](evidence/test-results/backend-test-ai-budget.txt) |
| [test-ai-import.mjs](evidence/shared-service/scripts/test-ai-import.mjs) | Mock provider payload/multi-image/model settings/prompt/Unicode/usage/legacy input/passcode/errors. (26 literal assertion references) | passed — [log](evidence/test-results/backend-test-ai-import.txt) |
| [test-ai-live.mjs](evidence/shared-service/scripts/test-ai-live.mjs) | Actual provider request with local secret/image; no regression assertions; intentionally skipped. (0 literal assertion references) | skipped — Paid external provider call; reads local credentials and a user-specific image. No production/paid requests authorised by this audit. |
| [test-live-deployment.mjs](evidence/shared-service/scripts/test-live-deployment.mjs) | SQLite scoped member reads/authorized assignment writes, first/moved/recall/version/week/closed and response preservation. (26 literal assertion references) | passed — [log](evidence/test-results/backend-test-live-deployment.txt) |
| [test-member-registration.mjs](evidence/shared-service/scripts/test-member-registration.mjs) | Scoped roster, self-enrollment duplicate/pending/review/merge/response history. (29 literal assertion references) | passed — [log](evidence/test-results/backend-test-member-registration.txt) |
| [test-room-admin.mjs](evidence/shared-service/scripts/test-room-admin.mjs) | Separate global key, redaction/reveal, close/reopen/revoke/replace/label conflicts/duplicate and persisted data. (63 literal assertion references) | passed — [log](evidence/test-results/backend-test-room-admin.txt) |
| [test-server.mjs](evidence/shared-service/scripts/test-server.mjs) | SQLite rooms/codes/roles/CORS, conflicts/unrelated merge, response history, reconcile/restore and weekly archives. (45 literal assertion references) | passed — [log](evidence/test-results/backend-test-server.txt) |

## Existing failure is part of the baseline

`quick-deployment.cjs:7` asserts `positions.length < 99`; execution packed **99** eligible players. The test aborts at that point, so subsequent geometry/determinism/stale/apply/history/hole assertions in that script are **not executed**. `preview-territory`, `deployment-packing` and `registration-deployment` independently pass their assertions. This audit does not decide whether the capacity expectation or implementation should change. Its final “full-boundary containment” log text is stale compared with later centre-only tests. [Failure evidence](evidence/test-results/frontend-quick-deployment.txt).

## New preservation cases

[preservation.cjs](tests/preservation.cjs) evaluates unmodified production source in an isolated VM and imports only pure backend schedule code. It characterises:

1. Local-save suppression during shared session and local source-link persistence.
2. Exactly seven plan snapshot fields, excluding response/link/display state.
3. JSON import source-mapping loss, rebuilt waiting IDs and null-level→0 quirk.
4. Ordered balanced max-ten AI batching for1–123 inputs (11→6+5).
5. Legacy and current app sharing the storage key.
6. Reset disconnecting roster source while retaining independent terrain preference.
7. APOC week/event/scoring schedule offsets.

[Characterisation TAP log](evidence/test-results/new-preservation.txt). A passing quirk test records current behaviour; it is not an endorsement of that behaviour forever. Future intentional changes should update the contract explicitly. The detailed coverage and discrepancy assessment is in [QA coverage assessment](qa/coverage-gap-assessment.md).

## Historical workspace tests

These were outside both pinned Git repositories. Exact copied source/hash/fixture references are in [historical-tests.json](historical-tests.json), so discovery is not mistaken for committed baseline coverage. Execution used unmodified script with only a disposable copy of current HTML at its expected path. No production localStorage or real room was touched.

| Script | Result on current source | Evidence |
|---|---|---|
| test-ai-batches.cjs | passed-current-source | [log](evidence/test-results/historical-test-ai-batches.txt) |
| test-capital.cjs | passed-current-source | [log](evidence/test-results/historical-test-capital.txt) |
| test-card-reader.cjs | inspected-not-run | Requires original local OCR dependencies/crops or sample-ocr fixture not in pinned repository; no network/paid OCR attempted. |
| test-import-review.cjs | passed-current-source | [log](evidence/test-results/historical-test-import-review.txt) |
| test-layouts.cjs | failed-current-source | [log](evidence/test-results/historical-test-layouts.txt) |
| test-local-double.cjs | passed-current-source | [log](evidence/test-results/historical-test-local-double.txt) |
| test-menu.cjs | passed-current-source | [log](evidence/test-results/historical-test-menu.txt) |
| test-pool.cjs | inspected-not-run | Requires original local OCR dependencies/crops or sample-ocr fixture not in pinned repository; no network/paid OCR attempted. |
| test-quick-add.cjs | failed-current-source | [log](evidence/test-results/historical-test-quick-add.txt) |
| test-region-panel.cjs | failed-current-source | [log](evidence/test-results/historical-test-region-panel.txt) |
| test-rooms.cjs | passed-current-source | [log](evidence/test-results/historical-test-rooms.txt) |
| test-shield.cjs | passed-current-source | [log](evidence/test-results/historical-test-shield.txt) |
| test-strategic.cjs | failed-current-source | [log](evidence/test-results/historical-test-strategic.txt) |
| test-topbar-alliance.cjs | failed-current-source | [log](evidence/test-results/historical-test-topbar-alliance.txt) |
| test-turrets.cjs | passed-current-source | [log](evidence/test-results/historical-test-turrets.txt) |
| test-ui.cjs | failed-current-source | [log](evidence/test-results/historical-test-ui.txt) |
| test-welcome.cjs | passed-current-source | [log](evidence/test-results/historical-test-welcome.txt) |

Five failing historical scripts stop at the same old Export-menu button aria-label assertion at line 21; `test-topbar-alliance` proceeds further then stops at a missing inline Minor checkbox assertion at line 44. Their later assertions are not exercised. Exact evidence remains in logs; several scripts duplicate earlier test sections, so script totals are not independent test-case totals. They are **not silently adapted** or counted as established current defects without investigation. The inventory is 9 passing-current-source, 6 failing-current-source and 2 inspected-not-run. `test-card-reader` needs OCR dependencies/crops; `test-pool` needs local sample text. `prepare-card-test.cjs` is a historical fixture-preparation script, not an assertion test, and was not run.

## Coverage interpretation

Frontend scripts extract the fourth inline `<script>` with string splitting, stub React and often native DOM/canvas. They test useful functions and guarded state transitions; they do not exercise a real render lifecycle, touch device, browser clipboard/download, accessibility tree, image decode/CDN or actual multi-tab network ordering. Backend tests use disposable Python SQLite through the D1 adapter and mock provider calls; they do not certify deployed D1/platform transactions, scheduler or billing. Passing scripts establish only reached assertions.

High-risk gaps: full local/shared reset recovery, comprehensive schema migration, actual OCR accuracy, complex clipping degeneracy, simultaneous cross-room publisher refresh, long offline drafts across rollover, code revocation in-flight, multi-alliance partial publishing, native gestures and live inspector refresh interaction. See [risk register](10-refactoring-risk-register.md).

## Reproduction

From repository root run `python3 docs/system/tests/run-baseline.py`; it exits nonzero for the known current failure. `--record` deliberately overwrites run evidence only. Run `node docs/system/tests/preservation.cjs` and `python3 docs/system/tests/validate-docs.py` separately. Node and Python3 are required; no frontend npm install or paid provider call is required. Never execute the live AI script as part of routine regression.
