# ADR-0001 — Preserve the observed contract before redesign

Status: audit scope decision, 2026-10-31; no production architecture change.

The attached user brief explicitly requests technical reverse engineering and behavioural preservation, not implementation of a new workflow. This branch therefore adds only documentation, pinned evidence and non-invasive tests. Existing source, tests and historical docs remain unchanged. The separate backend source is included as an evidence snapshot with commit/version provenance because frontend expectations alone cannot establish server guarantees.

Keep static, executed, metadata, inferred and unknown evidence separate. Retain failing assertions and current quirks; do not repair them incidentally. Record untested native/browser/multi-client behaviour and provider/platform dependencies explicitly. Review the pull request without merging as part of this audit task.

The result is a baseline, not a proposed future architecture. Capability IDs should remain stable; later changes can mark superseded contracts with explicit compatibility decisions rather than silently removing them.
