# State and persistence boundaries

Evidence: planner `constructor`, `load`, `save`, `planSnapshot`, `recordHistory`, `roomBoot`, `stashRoomDraft`, `persistRosterLink`, `enableDeploymentPublishing`; registration `storedCode` and `inspectorStates`; admin session storage. [CAP-065–067](03-feature-catalogue.md#persistence), [data model](05-data-models.md).

| Storage / key | Payload / lifetime | Consequences |
|---|---|---|
| localStorage `acm1-territory-planner-v1` | homes/pool/regions/geometry/exclusions/anchor, source link, add defaults and layer settings; `ringPreferenceSet` | Local-only auto-save; suppressed during room session. Legacy anchor-test uses same key. Source link contains bearer code; don't treat file as harmless public config |
| localStorage `acm1-map-style` | terrain/classic | Separate from plan; reset does not reset all independent storage |
| localStorage `lastz-skip-tutorials` | `1`/`0` | Welcome preference, independent of roster and room |
| localStorage `acm1-room-draft:<roomid>` | local plan, server baseline, week, savedAt | Offline/conflict recovery; must validate week before replay |
| sessionStorage `acm1-shared-session` | current shared bearer code | Resume shared map in this tab/session; not individual account authentication |
| sessionStorage `lastz-roster-link:<roomid or local>` | source code/room/week association | Shared map source link is session relationship, separate from shared plan JSON |
| sessionStorage `lastz-deployment-publisher:<source roomid>` | `{kind:room|admin,code}` | Independent publishing write authority; not exported |
| sessionStorage `lastz-room-admin-key` | global admin bearer | Admin session authority, not same as coordinator link |
| sessionStorage `lastz-registration-code` | member code | Standalone member-page session |
| Memory | map pan/zoom, selected cells, dialogs, OCR images/passcode/review, run tokens, inspectorStates | Not durable across page reload; inspector state survives live refresh within page |
| D1 | rooms, instances, capabilities, registrations, edits, deployment maps, rate_limits | Durable service state separate from Git and browser backups; retention/recovery platform policy unverified |

## Mutation propagation

`setState` can enforce room edit scope and reflow manually reserved regions. `componentDidUpdate` performs history, shared-save scheduling, publisher scheduling, draw and local save. `roomApplying` bypasses local mutation semantics while accepting server state. Incoming state must not be recorded as a fresh outgoing edit loop.

Plan undo snapshots exactly **homes, pool, outer, inner, excludedCells, anchorId, regions**. Maximum 80 snapshots, 900ms grouping. Registration edits, display state, source links and credentials are not restored by plan undo. Draft-boundary undo/redo is another history. Reset's UI promise that it can be undone therefore covers plan fields, not every cleared control/link or independent storage key.

## Local/shared/source/published are different stores

1. Local autosave writes only without active shared session.
2. Create shared copies current plan; join applies remote plan to display. It does not silently merge local roster.
3. Leave restores local memory or explicitly copies room locally; these actions differ.
4. Linked roster refresh imports identities/registrations but preserves existing map positions and boundaries. Incoming source placements become waiting entries.
5. Publisher sends source-ID assignments back into a deployment snapshot; it does not write source roster/plan or registration preferences.
6. Registration changes remain server responses; coordinates/arrival are separate records.

## Interchange is narrower than backup

`export('json')` writes name/server/coordinateModel, `headquarters`, `pool`, `outerBoundary`, `innerExclusion`, turret metadata, `excludedCells`, `anchorId`, `allianceRegions`, visibility and validation annotations. `importJSON` maps these to internal fields and discards non-whitelisted home metadata; pool IDs are rebuilt and `Number(null)` becomes zero for nullable imported levels. Registrations, edit history, codes, source mapping and publisher credentials do not round-trip. CSV/game coordinate/PNG exports are presentation artefacts, not restorables.

## Migration and error behaviour

`load` catches JSON parsing failure and returns null; it is not a general schema validator. Constructor migrates the exact old two-demo-HQ fixture to empty and disables an old default radius-two ring unless ring preference was explicitly recorded. Region normalisation handles layout metadata. No central versioned migration envelope exists. Save/storage exceptions are often swallowed; a successful UI mutation does not prove browser disk persistence. WeakMap geometry caches require immutable array replacement. Keep these distinctions in characterisation tests before altering state structure.
