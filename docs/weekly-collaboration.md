# Weekly multi-alliance collaboration

This adds collaboration to the existing shared-room service. It does not replace local plans, registration rooms, existing codes, archives, or published member deployments.

## User flow

1. Open **Session & collaboration → Create / join session & access codes**. Create a shared session from the current plan, enabling weekly rollover, alliance access and member registration as needed. Creating copies the local plan; joining replaces the displayed working plan while retaining the local plan separately.
2. Keep the coordinator code private. The existing site-admin dashboard can recover coordinator access; an officer code cannot revoke the coordinator or change room settings.
3. Create an **Alliance officer** code for each alliance. Officer codes are room-scoped and remain valid over weekly rollover until revoked. Member registration codes remain separate and cannot edit the plan.
4. Officers join using their code/link. Their roster defaults to their alliance; **View all alliances** exposes the shared context. This is a view filter, not a security boundary: the accepted map is shared.
5. Open **Participants & proposals** to see alliances that joined this week and previous participants. This does not assert that someone is online now. A coordinator without an alliance does not impersonate a participating alliance.
6. Own-alliance roster and deployment edits continue through normal operations. For another alliance's HQ or territory changes, start a proposal, move the HQ or adjust existing zone corners, enter a reason, and submit. The banner explicitly identifies this as an unpublished local draft.
7. Review the change list and optionally preview the proposed map. Close the preview before approving or declining. Each affected alliance approves through an officer code; coordinators can explicitly **Apply override** with confirmation. Withdrawn, declined and applied proposals remain visible.

## Contracts

- Sunday–Saturday sessions retain the existing APOC/UTC−2 weekly boundary and archives. Access codes persist; permissions, proposals and participation are scoped by room and week.
- Participation is recorded on officer login or explicit Join this weekly session. Earlier participants are subdued, never labelled live/online. Creating an officer code alone is not participation.
- Approved plan version must equal the proposal's base version. Any intervening accepted plan change marks a pending proposal `needs-review`; stale approval/override returns 409. The proposer must withdraw and prepare a new proposal; approvals are not silently carried forward.
- HQ proposals allow existing coordinates and resetting arrival to false. They do not transfer alliance ownership, edit another roster, delete players, or alter map settings. Zone proposals allow existing points/polygons/manual geometry/layout metadata, not names or ownership.
- Territory changes are treated conservatively as shared allocation decisions: **all alliances with allocated zones must approve**, or the coordinator must override. This intentionally avoids claiming exact geometric impact detection. Own zone geometry also requires a proposal unless territory editing is unlocked; own appearance/label controls remain subject to the existing ownership guard.
- A target alliance may unlock movement of its own HQs; the coordinator may unlock any alliance. Only coordinators can unlock territory editing. Unlocks are explicit, version checked and week scoped; they do not grant roster, naming, ownership or room-setting permissions.
- New proposal applications and unlocked cross-alliance HQ moves validate integer coordinates, whole HQ footprint collision, capital/turret exclusions and manual blocked tiles on the server. Alliance edges are centre-based planning allocations; outer footprint spill remains allowed. Existing own-alliance editing retains its established client validation.
- Proposal acceptance atomically changes the plan version, proposal state and decision audit record in one D1 batch guarded by proposal and plan versions. Duplicate decisions cannot reapply changes. Multi-party approvals use proposal-version comparisons.
- Accepted changes invoke the existing direct shared deployment publisher. Drafts and review previews cannot enter the shared plan save queue, linked publishing queue or plan undo history. Registration responses remain separate.
- Shared codes identify capabilities/alliances, not verified individual people. Optional editor names are self-reported. Decision records retain capability IDs and alliance identity server-side; no codes are returned in collaboration data.
- Closed rooms and archives are read-only. Revoked codes and paused alliance access are enforced before collaboration operations. Site ownership remains the existing site-admin credential boundary; no browser identity is promoted to super-admin.

## Storage and deployment

`worker/collaboration.js` idempotently creates three additive tables: `session_participants`, `session_permissions`, and `session_proposals`. No existing table/data is rewritten or backfilled. Historical participation begins when this feature is used; pre-feature logins cannot be inferred.

The backend remains in its own Sites source repository. The published system preservation snapshot remains immutable; the current extension's API is documented separately in `collaboration-api.openapi.json`. The read-only Swagger reference offers both specifications.

## Verification

- Backend: `scripts/test-collaboration.mjs` exercises participation, persistent code scope, forbidden/viewer operations, ownership protection, permission versions, approval authority, stale and replayed decisions, collision rejection, swaps, revocation and week isolation.
- Frontend: `tests/session-collaboration.cjs` exercises foreign edit denial, proposal isolation, arrival reset, cancel restoration, explicit unlocks, protected metadata and read-only review.
- Existing roster, deployment, registration and room admin suites are rerun without changing their assertions. The historical quick-deployment capacity failure is tracked in the preservation baseline rather than repaired as part of this feature.
