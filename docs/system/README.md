# Last Z SVS Planner — system preservation baseline

Audit: **31 October 2026**. This is a technical specification of the inspected implementation, not a redesigned workflow or a promise of complete runtime coverage.

| Source | Pinned revision | Evidence |
|---|---|---|
| GitHub Pages frontend | `5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd` | [Source manifest](source-manifest.json), immutable links in catalogue |
| Separate shared-service repository | `11235f4c7ebd07fd55f7c8d16f0dc1e73bb62bcc` | [Provenance](evidence/provenance.json), [worker snapshot](evidence/shared-service/worker/index.js) |
| Published backend | Sites version **9** | Read-only version metadata matched backend commit; not a live-data audit |

## Read in this order

1. [Scope, entry points and terminology](01-system-overview.md)
2. [Architecture and event paths](02-architecture.md)
3. [100-capability catalogue](03-feature-catalogue.md) / [machine registry](feature-registry.json)
4. [API contracts](04-api-contracts.md) / [OpenAPI](openapi.yaml)
5. [Data models](05-data-models.md) and [persistence](06-state-and-persistence.md)
6. [Behavioural workflows and mode transitions](07-behavioural-specifications.md)
7. [Dependencies and deployment assumptions](08-integration-dependencies.md)
8. [Test inventory and results](09-test-coverage.md) / [traceability matrix](traceability-matrix.csv)
9. [Refactoring risks](10-refactoring-risk-register.md) and [defects/unknowns](11-known-defects-and-unknowns.md)

[Calibration review](qa/calibration.md) records ten evidence-backed registry examples and is the approval gate before correcting the remaining capability records.
[Coverage gaps and discrepancy assessment](qa/coverage-gap-assessment.md), [backend evidence publication assessment](qa/backend-evidence-publication.md), and [refactoring readiness](qa/refactoring-readiness.md) record the follow-on QA decisions.

[Source symbol inventory](source-symbol-index.json) is a lexical navigation aid, including embedded dependencies; it is not a proven call graph. [Backend evidence](evidence/shared-service/) is an immutable audit copy, **not a second production source tree**. [Existing recovered-workflow documentation](../RECOVERED-WORKFLOWS.md) remains unchanged; its historical claims require the qualifications below.

## Evidence language

- **Source inspected:** implemented path read at the pinned commit; no claim it was exercised in a real browser.
- **Automated:** named script executed; exact outcome/log in [test-results.json](test-results.json). A mapping alone is not a passing assertion.
- **Runtime metadata:** published service source/version inspected read-only. No production room was created, joined, edited, reset or deleted for this audit.
- **Inferred:** implication of coupling or code ordering, explicitly called out in risks.
- **Unknown/external:** deployment configuration, platform guarantees, browser behaviour or game rules not proven here.

## Using this baseline for a future change

Identify affected CAP IDs, follow their source/test references, inspect related entries and risk IDs, then reproduce the relevant characterisation. Compare persisted schemas and API semantics before changing controls. Preserve existing tests, including the failing baseline test, until its intended contract is separately decided. Do not infer absence of functionality from absence of a visible button or passing VM tests.

Run safe baseline checks from repository root:

```sh
python3 docs/system/tests/run-baseline.py
node docs/system/tests/preservation.cjs
python3 docs/system/tests/validate-docs.py
```

The baseline suite intentionally excludes the paid `test-ai-live.mjs`. It currently contains one pre-existing frontend failure; details are preserved rather than repaired. Only documentation, evidence copies and non-invasive tests are added in this branch; production source and existing tests are unchanged.
