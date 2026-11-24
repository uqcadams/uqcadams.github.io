# UX implementation boundaries

Reviewed 22 November 2026 against frontend `08a34036711b198e543fa7ef0093c854b4286b4c` (application source unchanged from `5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd`) and the documented worker snapshot `11235f4c7ebd07fd55f7c8d16f0dc1e73bb62bcc`. This is a bridge from the UX proposal to existing behaviour. It does not certify today's independently deployed backend or introduce a new API.

The redesign's success criterion is whether an unfamiliar alliance leader can complete the main tasks without learning the implementation vocabulary. APIs and preservation evidence support that objective; they are not the primary navigation model.

## Start with the user's jobs

These are proposed task groupings, not new server operations or implemented production navigation.

| User's job | What the interface should make clear | Existing operations underneath |
|---|---|---|
| Define where each alliance goes | Select an alliance, draw/generate its territory, see and adjust its allocation | Browser region draft, layout, rotation, share, tier and order operations |
| Bring in alliance members | Choose the alliance, import/review members, see who is on its roster | Screenshot reader and local waiting roster; shared reconciliation when a registration roster is being maintained |
| Ask members to register | Create/open that alliance's registration link; see responses in the same alliance context | Room features, scoped member code, registration records and roster-source link |
| Arrange headquarters | Select players, choose mud/grass policy, preview, inspect leftovers, apply or cancel | Browser placement/packing and registration eligibility; shared plan changes when connected |
| Give members their instructions | Know which assignments were published, inspect the member view, copy current coordinates | Versioned deployment publication and scoped member-page reads |

One alliance context can carry through these tasks. The UI can guide or sequence existing operations without pretending they are one atomic server transaction. Local import, shared reconciliation and source linking currently have different entry points; a simpler unified presentation will need explicit orchestration of them.

## Which API are we talking about?

There are two implementation boundaries:

1. **HTTP API:** room, roster, registration, code, history and deployment endpoints. See the existing [OpenAPI specification](../../system/openapi.yaml) and [endpoint reference](../../system/04-api-contracts.md). Those describe request/response structures, authority and explicit error branches.
2. **Browser operations:** map targeting, placement, region generation, draft history, preview/apply, recall and local persistence. These are methods and helpers embedded in `Planner`, not a separately exported, stable JavaScript SDK. New controls must preserve their caller guards and state/lifecycle effects.

A future UI adapter is a proposed implementation seam, not something this branch has created. Moving a method call into a new component does not automatically preserve its guard, history or publishing effects.

## Browser operations the new controls must preserve

Source links below are pinned to the inspected application. They describe current behaviour, including awkward return values and caller-dependent checks.

| Intent | Existing entry point and input | Validation / transition / failure | Preservation evidence and remaining gap |
|---|---|---|---|
| Select a player | [`choosePlayer(player, pool)`](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1184) | Chooses placed or waiting details, sets inspector/mobile context, exits placement selection. Does not deploy or retag the player | CAP-021/039; native focus restoration needs browser verification |
| Place an existing waiting player | [`startPool(player)`](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1186), then [`deployPoolAt({x,y})`](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1015) | Selection is transient. Deployment validates footprint, moves that same ID from pool to homes, and retains metadata. Missing player or invalid target returns false; invalid target reports reasons | `alliance-focus-roster-drag.cjs` asserts pool emptied and the waiting ID appears at x545; excluded/occupied drops leave its position unchanged. Complete new-control/touch journey remains unverified |
| Add a new HQ | [`addHQ(x,y,name)`](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L789) with add-alliance/colour/lock defaults in state | Coerces/checks whole-number coordinates, checks physical footprint, then creates a new ID and selects it. Invalid coordinates can return without a message. No HQ-level parameter or success boolean contract; retaining a new form's entered level needs the existing metadata path or a tested adapter. Observe accepted state rather than treating undefined as success | CAP-011/012. New form identity, cancel, single-create and coordinate validation need direct browser cases |
| Move an HQ | [`updateHQ(id, patch)`](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L791), through eligible move/drag handlers | Coordinate patch checks whole integers and footprint. A changed position resets `hasMoved:false`. This method alone does not enforce position lock; preserve caller `canRosterDrag`/lock and room guards. Its true return does not prove an entity existed or a shared state patch was authorized | `alliance-focus-roster-drag.cjs` asserts locked, foreign-officer, viewer and archived drag ineligible; `roster-drop-preview.cjs` checks target identity/X/Y and cleanup. New direct controls must not bypass those wrappers |
| Copy / lock / mark arrived | [`copyGameCoordinates`](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L815), existing HQ menu/details actions | Copy produces `Name — [#:759 X:n Y:n]`; clipboard can fail. Lock and `hasMoved` are separate flags. Arrival does not submit registration or move the HQ in-game | CAP-015/017/058. Clipboard permissions and native action feedback lack browser coverage |
| Preview / apply automatic placement | [`previewQuickDeployment()` / `applyQuickDeployment()`](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1098) | Preview selects eligible waiting members, produces transient candidates and records a signature/token. Apply rejects stale region/plan or invalid candidates before moving IDs to homes. Registration/time/terrain policy and packing gap still apply | `preview-territory.cjs` asserts centre-only allocation and footprint spill; `deployment-packing.cjs` checks compact spacing/apply/recall. `quick-deployment.cjs` stops at its old capacity assertion: later assertions there are not protection |
| Cancel an active task | [`cancelTask()`](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1182) | Invalidates preview, clears drag/draft/selected-placement state and returns to inspect. It is not rollback of a player already created before this call | CAP-027/045/064. The redesigned Add journey needs its own staged form data so cancelling before commit creates nothing |
| Change strategic regions | [`updateRegionLive`, `generateAllianceLayout`, `resizeRegionShare`, node/draft methods](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1064) | Changes can reflow manual reservations and several generated regions. Preserve polygon parts/holes, group IDs, locked shares, tiers and rotation convention; appearance-only edits must not recreate identities | CAP-026–038. Do not flatten region data to the visible outline or assume historical test associations prove native node editing |

All current test links are under [tests](../../../tests/); the names above refer to those unmodified scripts. CAP definitions and broader evidence remain in the [catalogue](../../system/03-feature-catalogue.md). These targeted assertions establish only the named behaviour, not an entire user journey.

### Shared state boundary behind those operations

[`Planner.setState`](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L648) applies region reflow and shared authority checks. [`componentDidUpdate`](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L708) handles history, shared-save scheduling, publishing scheduling, painting and local saving. A new interface must keep those effects or explicitly reproduce them with tests; writing arrays directly is not a safe replacement.

The plan history snapshots seven fields: homes, pool, outer, inner, excludedCells, anchorId and regions. It does not undo registration responses, links, credentials or every reset setting. Do not label every operation “Undoable” merely because plan undo exists.

## HTTP operations grouped by the work they support

Authentication is possession of a code, not individual user login. Use bearer Authorization for room/admin operations and `X-Import-Passcode` for AI import; join accepts the code in its JSON body. Never place real credentials in examples, logs or user-visible failure details.

| Task | Existing API and minimal payload / result | Success means | Failure or sequencing that the UX must preserve |
|---|---|---|---|
| Create or open shared planning | `POST /api/rooms {name,features,plan}` → coordinator/viewer codes and RoomState; `POST /api/join {code}` → RoomState | A room was created or a code resolved; joining a map replaces the displayed plan | Do not combine Join with local roster merge. Invalid/revoked401, scoped/feature403, quotas429; local plan/draft needs its existing recovery path |
| Save shared map edits | `PATCH /api/plan {week,changes,actor}` → RoomState | Accepted plan mutations persisted; unrelated concurrent fields may merge | Coordinator/officer scope, before-value/presence checks, archived/closed gates.409 latest/weekChanged requires recovery. Downstream publication can fail after plan persistence; generic failure is not proof nothing saved |
| Refresh/link a registration roster | `POST /api/join {code}` via `syncRosterSource` → source roster/responses mapped locally | Source IDs/responses refreshed while target positions/regions stay intact | Keep source member IDs and current week. A read-capable code does not grant publishing. A new source week requires explicit refresh; missing waiting and missing placed members are handled differently |
| Maintain the imported alliance roster | `POST /api/reconcile {alliance,members,mode}` → diff/version; repeat with `apply:true,version` → RoomState | Preview is a diff; explicit apply updates the chosen alliance roster with matched IDs retained | Officer own alliance/coordinator. Stale409 requires re-preview. Replace removes missing members, additive mode does not. Flush current map changes before preview; do not imply local OCR Add already reconciled the shared roster |
| Read member registration | `POST /api/registration/join {code}`, then `GET /api/registration/state` → MemberState | Current scoped members, responses and deployment maps loaded | Viewer denied; registration/alliance-access gates. Reads can initialize derived deployment storage, so read-only UI does not imply storage-pure GET |
| Save a member response | `PUT /api/register {week,memberId,version,status,placement,role,windows,notes,actor}` → Registration | That response version saved | Own-alliance member/officer or coordinator. Preserve fields omitted by the simplified UI.409 conflicts do not authorize silent overwrite; closed/revoked/stale week needs explicit state |
| Add/review a missing member | `POST /api/registration/members {week,name,level,...}` → memberId/existing/state; `POST /api/registration/review {week,memberId,action,targetId?}` | Enrollment returns existing ID or pending member; review approves/rejects/merges | Response submission is a separate operation and can fail after enrollment. Pending is not auto-deploy eligibility. Merge with two responses conflicts |
| Publish assignments | `GET /api/deployment` → roomId/week/maps; `POST /api/deployment {alliance,week,version,homes,regions,outer,inner,excludedCells}` → map | Assignments published to the source alliance's member view | Match expected room ID first; coordinator/officer own alliance or explicit admin route. Use source member IDs, not local mapped IDs.409 requires reload; several alliance requests may only partly succeed |
| Read budget / extract screenshots | `GET /api/import-ai/budget`; `POST /api/import-ai {images}` → players, usage, budget, response metadata | Extraction returned review candidates; no roster was committed | Up to10 images per request, balanced client batches; passcode/provider/ledger errors retained. Retry may incur another paid request; cancellation does not refund a completed request |
| Room lifecycle / access | `/api/settings`, `/api/codes`, `/api/codes/revoke`, `/api/admin/rooms/...` | One feature/code/lifecycle operation completed | Site-admin key differs from coordinator code. Closed room, revoked code, duplicate room and deleted player are different actions with different retention. Keep advanced controls reachable without placing raw code handling in the main planning task |

The [OpenAPI schemas](../../system/openapi.yaml) are the field-level reference for these summaries; [API contracts](../../system/04-api-contracts.md) covers all 35 documented operations, including history, archives, restore and administrative variants. No endpoint is removed because its control moves into contextual or advanced navigation.

### Three request examples (synthetic, not actual access codes)

A roster preview never means the roster was applied:

```json
{"alliance":"ASAS","members":[{"name":"Example member","level":27}],"mode":"add"}
```

After inspecting the returned diff, apply with that preview's returned version. For deletion of missing names, use the explicit replace workflow and show its consequences. Do not translate “sync” into replacement automatically.

A registration response stores numeric hours relative to Saturday00:00 APOC (UTC−2). Before Clash is0–12 and During Clash12–16. Preserve role/custom hours/notes even when the current form shows fewer controls:

```json
{"week":"2026-10-25","memberId":"source-member-1","version":2,"status":"available","placement":"grass","role":"flexible","windows":[{"start":12,"end":16}],"notes":"Example only","actor":"Example member"}
```

Publishing uses the registration roster's ID and the deployment map's version, not the shared plan's version:

```json
{"alliance":"ASAS","week":"2026-10-25","version":3,"homes":[{"memberId":"source-member-1","x":530,"y":510}]}
```

This abbreviated publish request uses existing source geometry defaults. A map UI publishing new boundary geometry must include its intended scoped regions and exclusion geometry; do not accidentally substitute defaults by omitting fields during a redesign.

## Present consequences clearly without exposing internal complexity

Use task language in the interface, with distinct status where the consequences differ:

| User-visible outcome | Evidence required before showing it |
|---|---|
| Player added / position changed | Accepted plan state contains the intended identity/coordinates; invalid or unauthorized patches did not become success |
| Saved in this browser | Local save path, separate from room save; current implementation swallows some storage failures, so stronger verified-save wording needs implementation work |
| Synced to the shared plan | Shared plan response accepted; a local canvas redraw alone is insufficient |
| Registration saved | The response PUT succeeded with its returned version |
| Published to members | The relevant alliance assignment POST succeeded; applying a plan preview alone is insufficient |
| Deployment updated | A previous published assignment changed; not equivalent to Available, Arrived or position-locked |

Keep room plan, imported roster, response records and published assignments distinct underneath a single understandable alliance workspace. The user should not need to manually navigate their internal names, but error/recovery choices must still identify the affected record.

## Gate for the first real UX slice

The first implementation slice should make the Players and Placement journey work for a newcomer. Before connecting redesigned controls to production state, demonstrate these with disposable data in a real desktop browser and a phone-sized/touch interaction path:

1. Enter a new name/alliance/HQ level, choose a target and see those same values in preview. Confirm creates exactly one new player. Cancel creates none and does not move the previously selected player.
2. Place a waiting player without changing its ID/source association/registration. Invalid footprint stays invalid; display a reason and let the user choose again.
3. Move an eligible HQ with coordinate preview; locked, foreign-alliance, viewer, member, archived and closed cases remain guarded. A changed position clears arrival as current code requires.
4. Preserve full-footprint physical exclusion/overlap checks, centre-only alliance allocation and centre-based mud/grass shielding as separate rules.
5. Show actionable lock/unlock, arrival, copy, delete and recovery controls without nested hunting. Clipboard failure is visible; copying does not mark arrival or publish.
6. Preserve selection/map context, Cancel/Escape semantics, focus and history across panels and live refresh. Plan undo has its documented scope.
7. In a shared fixture, distinguish a local accepted change from server save and member publication; exercise a version conflict without silently losing either edit.

These are proposed acceptance checks, not claims of existing automated coverage. Existing VM/backend tests protect useful pieces; browser/mobile and multi-client gaps remain in the [readiness assessment](../../system/qa/refactoring-readiness.md). Bound the redesign to a verified journey, then repeat for Regions, Deploy and Share. Do not wait for speculative perfection across every feature before making a useful, tested UX improvement.
