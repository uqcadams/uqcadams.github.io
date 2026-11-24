# ACM1 Territory Planner Phase 2 interaction prototype

This branch explores the accepted Phase 1 UX direction. Its purpose is to help an unfamiliar alliance leader understand and complete planning tasks. Navigation and visual composition are proposals to review, not a feature-complete replacement for the planner.

The prototype uses synthetic, in-memory data. It does not import the production planner, read/write browser plan storage, call the shared service, access registration records or publish deployments.

## Preview

From the repository root:

```sh
python3 -m http.server 4173 --directory docs/prototypes/ux-phase2
```

Open <http://localhost:4173/>.

## What can be reviewed now

- Overview, Players, Regions, Deploy and Share as task groupings.
- Persistent map context and map/data workspace compositions.
- Panel transitions and presentation of placement, roster and connection status.
- Proposed desktop/mobile layout; actual device usability has not been established.
- Visibility of blocked-cell editing and placement validation during map work.

## Current interaction limitations

The HTML is an early exploration. Several controls are placeholders:

- Add displays name/alliance/level fields, but does not read them into a new player. Confirm placement changes the selected existing player to hardcoded `D5`.
- Map clicks show sample valid/blocked messages; they do not establish arbitrary target selection or real footprint validity.
- Zoom, Fit and Copy display messages rather than perform those operations.
- Preview, Apply, Recall, room connection and region tools do not implement their production workflows.
- There is no demonstrated end-to-end cancellation, browser/mobile, permission, persistence or synchronization preservation result.

Do not treat a clickable control, reassuring status label or responsive CSS as evidence that the corresponding feature is implemented or preserved.

## Implementation reference for the redesign

[UX implementation boundaries](implementation-boundaries.md) maps the user's tasks to existing browser operations and HTTP APIs. It records validation, identity, permissions, side effects, save/publication status and failure recovery that redesigned controls must retain, with source/test references.

The existing [API reference](../../system/04-api-contracts.md), [OpenAPI specification](../../system/openapi.yaml) and [preservation hub](../../system/README.md) remain the detailed baseline. The browser does not currently expose a standalone stable JavaScript SDK; placement, region and history operations live in the Planner class. The boundary guide distinguishes those existing methods from a possible future UI adapter.

## Next bounded UX milestone

Complete the actual Players and Placement journey using disposable data: entered identity → target preview → valid/blocked outcome → confirm/cancel → selected HQ actions. The [seven acceptance checks](implementation-boundaries.md#gate-for-the-first-real-ux-slice) define the preservation gate before connecting that redesigned journey to production state.

Then review it with someone unfamiliar with the planner. They should be able to finish the task without learning which internal panel, record or subsystem owns each step.

## Design-review questions

1. Can a newcomer identify the next action and complete a task without being coached?
2. Does changing panel preserve enough map/selection context, especially on a phone?
3. Are Preview, Applied, shared-save and Published outcomes distinguishable without technical vocabulary?
4. Are secondary features still findable in the context where users need them?
