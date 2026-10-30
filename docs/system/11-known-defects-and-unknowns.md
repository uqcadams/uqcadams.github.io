# Known discrepancies, limitations and unknowns

Classification is deliberate: failing assertion is observed automated evidence; a suspicious code path is a source finding or inference, not a proven live incident. Production behaviour has not been repaired.

| Finding | Classification / evidence | Practical implication |
|---|---|---|
| quick-deployment fixture expects fewer than 99; baseline packs 99 | **Executed failure**: [log](evidence/test-results/frontend-quick-deployment.txt), test line 7 | Later assertions in this script did not execute. Newer centre-only containment test passes; deciding expected capacity is separate work |
| Same test's final message says full-boundary containment | Source-inspected stale description | Actual implementation permits footprint spill across alliance allocation, consistent with later tests |
| JSON import regenerates pool IDs/drops source metadata and null level becomes zero | Source plus new preservation test | Plan backup is not a lossless shared-roster/registration restore |
| Generic title still hardcodes server 759 in coordinate exports | Source confirmed | Naming generalisation did not introduce server configuration |
| Legacy anchor-test shares local-plan key | Source + preservation test | Direct legacy access can replace newer saved fields |
| Reset promise exceeds plan-undo scope | Source + preservation test | Link/settings lost by reset are not all recovered via plan undo |
| `limitOuter`/`blockInner` fields survive in state while `geomStatus` unconditionally blocks capital | Source confirmed | Do not infer validation behaviour from field names or old UI |
| Publisher initialization repeated after roster refresh | Source confirmed; concurrency outcome inferred | Can reset conflict baseline/signature. Needs multi-client characterisation before alteration |
| Direct-plan snapshot write follows plan commit | Source confirmed | Partial persistence possible on downstream failure; no all-record atomicity guarantee |
| Server cleanPlan validates structure, not overlap or full optional parts | Source confirmed | UI-validity rules are not server security/game invariants |
| GET member deployment path may initialize derived map records/table | Source confirmed | Inspector is read-only for user editing, not necessarily a storage-pure GET |
| Backend source outside frontend repo; runtime deployment schema absent initial migration | Source confirmed | Evidence snapshot records revision but is not a production recovery runbook |
| Historical local scripts are not original versioned suite | Provenance limitation | Their source exists in evidence but passing at an older work/index.html cannot establish current behaviour |
| Current baseline has no full browser/e2e suite or OCR benchmark | Test inventory | Touch/focus/clipboard/files/real provider accuracy remain unknown |

## Historical documentation reconciliation

[Recovered workflows](../RECOVERED-WORKFLOWS.md) explains the recovery of locally developed interaction paths. Preserve it as history. Its descriptions and test console text do not supersede newer centre-only allocation behaviour or test outcomes. [Backend README](evidence/shared-service/README.md) and [operations](evidence/shared-service/ACM1-OPERATIONS.md) describe separate deployment assumptions; scheduler/secret/backup statements have not been independently runtime-certified. The root repository README describes a portfolio and is not current planner documentation.

## Unknowns requiring external or future verification

- Whether live game coordinate interpretation and inferred polygons match all game cells.
- Production database backup policy, disaster recovery, actual scheduler configuration and platform transaction behaviour under load.
- OpenAI billed cost/pricing reconciliation and current provider/model availability. This audit only documents pinned constants and mocked-provider tests.
- Every phone/browser input, accessibility path, screen-reader outcome and canvas export/clipboard permission combination.
- Multi-tab role revocation while writes are in flight, cross-room source refresh/publishing races, and rare complex polygon clipping degeneracies.
- Remaining unreachable/vestigial render paths: source existence alone does not establish an accessible current UI path.

No live roster contents, actual room access codes, global admin secret or API key are included. There is no claim of exhaustive branch coverage or a defect-free system.
