# Refactoring-readiness assessment

## Decision summary

The documentation is sufficient to begin bounded interaction-design work only when changes are limited to contracts with direct preservation evidence. A major cross-cutting interaction refactor should remain blocked until the P0 gaps below have explicit characterisation.

| Area | Current assessment | Refactoring implication |
|---|---|---|
| Documentation completeness | 100 stable CAP IDs, source manifest, API/data/state/workflow docs and evidence index exist | Suitable as navigation baseline; continue updating derived matrices with changes |
| Behavioural specificity | Registry fields now distinguish actions, gates, invariants and capability-specific risks; 10 calibration examples are evidence-reviewed and 90 are mechanically assisted from pinned descriptions/risk IDs | Review high-risk batches semantically before redesigning their controls |
| Automated regression protection | Backend/offline and selected frontend paths pass; quick deployment has a preserved failure; several capabilities have no direct current coverage | Do not use green helper tests as proof of browser or multi-client safety |
| Browser/mobile verification | Native touch, pointer, focus, clipboard, download, canvas/SVG and accessibility remain unverified | Blocks changes to interaction modes, gestures and input semantics |
| Backend/synchronisation verification | Disposable SQLite tests pass, but production D1 transactions, rollover, publication races and runtime schema creation remain unverified | Blocks changes to authority, conflict, publication and weekly lifecycle semantics |
| Import/OCR/provider verification | Mocked import and budget paths pass; paid provider and OCR accuracy are not certified | Treat extraction and billing changes as separately gated |

## Major-refactor blockers

1. No browser/device characterisation for native drag, touch, focus and cancellation paths.
2. No complete multi-client verification for shared-room conflicts and linked deployment publication.
3. Physical geometry, strategic centre allocation and server structural validation are not one invariant.
4. The quick-deployment capacity expectation remains unresolved and later assertions are blocked.
5. Backend publication/licensing authority for the copied evidence must remain explicit.

## Incremental follow-up

Safe incremental work can add isolated browser fixtures, deterministic polygon cases, conflict/publication simulations, OCR fixtures and explicit capacity decisions without changing production behaviour. Each change should identify affected CAP IDs, preserve the source baseline, add or update targeted evidence, and rerun the preservation suite before broader UI changes.
