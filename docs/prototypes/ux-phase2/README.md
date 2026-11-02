# ACM1 Territory Planner Phase 2 interaction prototype

This is an isolated, static UX prototype for the accepted Phase 1 interaction architecture. It uses synthetic data and in-memory state only. It does **not** import the production planner, touch `localStorage`, call the shared service, access registration records, or publish deployments.

## Preview

From the repository root:

```sh
python3 -m http.server 4173 --directory docs/prototypes/ux-phase2
```

Open <http://localhost:4173/>.

## Demonstrated hypotheses

- Primary navigation: Overview, Players, Regions, Deploy and Share.
- Persistent map context with map-focus, split and data-focus compositions.
- Contextual panels for roster, region, deployment and collaboration tasks.
- A complete synthetic Players and Placement journey: add/select a player, choose a location, inspect valid and blocked placement states, confirm/cancel, then access lock, coordinate-copy and arrival actions.
- Separate plan, shared-synchronisation, permission and publication status.
- Responsive desktop/mobile layout.
- Blocked-cell editing and placement validation remain visible contextual tools rather than being hidden in Advanced.

## Design-review questions

1. Is the five-item primary navigation the right task grouping, or should Regions and Deploy be nested under Plan?
2. Is the persistent map context useful in Share and data-focused compositions, or should those tasks take over the workspace?
3. Does the Players and Placement journey make the distinction between identity, target selection, validation and commit clear enough?
4. Which operational states need stronger visual treatment: local draft, shared sync, conflict, stale preview or publication progress?
5. Are role-aware affordances sufficiently different without creating separate products for coordinators, officers, members and viewers?
