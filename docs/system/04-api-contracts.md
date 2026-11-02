# API and integration contracts

Source established from [worker snapshot](evidence/shared-service/worker/index.js#L102), not inferred solely from the frontend. Backend baseline `11235f4c7ebd07fd55f7c8d16f0dc1e73bb62bcc`, published version 9. [OpenAPI 3.1](openapi.yaml) documents 35 method/path operations. Optional metadata objects remain permissive to avoid inventing a stricter server schema.

## Shared protocol

Success is generally HTTP 200 JSON (including create). CORS preflight is 204. Errors are `{error,...extra}` with explicit status or generic500. Conflict extras include latest room state, weekChanged, current registration body or deploymentVersion depending on route; clients cannot assume a uniform latest payload. Non-API root returns HTML. Allowed origins: GitHub Pages origin, service origin and localhost/127.0.0.1 with numeric port; other browser Origins403. Headers: Authorization, Content-Type, X-Editor-Name, X-Import-Passcode. Cache-Control no-store. Authorization is possession of bearer capability, not an individual login.

Client uses 650ms shared-save debounce, five-second shared polling, fifteen-second linked roster polling, one-second publisher debounce; registration refresh ten seconds plus visibility wake. Polling is gated by visibility, gesture/write/conflict state as implemented, not a guaranteed delivery SLA. No automatic paid-provider retry. Before-value patches merge unrelated edits; same-field conflicts require explicit resolution. Publishing version conflicts require reload, not unguarded overwrite.

Numeric registration windows are **hours relative to event Saturday midnight APOC (UTC−2)**, not ISO timestamps. Before is0–12, During12–16; custom windows can span -24..72, at most12. Scoring begins Saturday14:00UTC and ends18:00UTC. Weekly instance opens Sunday02:00UTC.

## Endpoint reference

| Method / endpoint | Caller / authority | Request → response | Established rules and side effects | Explicit errors* |
|---|---|---|---|---|
| `GET /api/health` | service probes / public | none → object (full properties in OpenAPI) | Read-only service identity. Route currently responds regardless of method, GET is documented usage. | general errors |
| `POST /api/maintenance/weekly` | scheduled / external maintenance / public | object → object (full properties in OpenAPI) | Unauthenticated dispatch; rolls eligible open weekly rooms. Lazy rollover also occurs on room access. | 500 |
| `POST /api/rooms` | planner.createSharedRoom / public | object → object (full properties in OpenAPI) | Creates room/current instance and coordinator/viewer capabilities; 25 create attempts per IP UTC day. | 400 413 429 |
| `POST /api/join` | planner.joinSharedRoom / syncRosterSource / public | object → RoomState (full properties in OpenAPI) | Body code authenticates capability. 120 join attempts/minute per IP. May lazily roll room week; does not itself change plan editing state. | 401 403 404 429 |
| `POST /api/registration/join` | registration.boot / public | object → MemberState (full properties in OpenAPI) | Requires registration and appropriate member/officer/coordinator code. Scoped roster and derived deployment snapshots. | 401 403 429 |
| `GET /api/import-ai/budget` | planner screenshot import / passcode | none → Budget (full properties in OpenAPI) | Passcode checked; initializes permanent ledger if absent. No provider call. | 403 503 |
| `POST /api/import-ai` | planner.readScreenshotsAI / passcode | object → object (full properties in OpenAPI) | Legacy single image or 1–10 data images; 20M-character server body limit; quota then credentials/payload/budget/provider. Client has stricter split threshold. | 400 403 413 429 502 503 504 |
| `GET /api/state` | planner.pollSharedRoom / roomRequest / room | none → RoomState (full properties in OpenAPI) | Optional week selects archive. Returns full plan; registration filtering by capability, viewer notes stripped. | 401 403 404 |
| `PATCH /api/plan` | planner.flushRoomChanges / room | object → RoomState (full properties in OpenAPI) | Coordinator/officer; <=1200 changes; before/presence field guards and foreign ordering check. Four DB optimistic attempts. May publish direct deployments after plan persistence. | 400 403 409 413 |
| `PUT /api/register` | registration.saveRow / planner.saveRoomRegistration / room | RegistrationWrite → Registration (full properties in OpenAPI) | Member/officer own alliance or coordinator. Version 0 means no response. Numeric windows are hours relative to event Saturday midnight APOC; max12, end>start, range -24..72. Invalid status/placement/role fall back to defaults. | 400 403 404 409 |
| `POST /api/reconcile` | planner.previewRoomRoster / applyRoomRoster / room | object → object (full properties in OpenAPI) | Officer own alliance/coordinator; 1–1000 unique names. Preview diff; apply checks instance version. mode replace removes missing members; other mode adds/updates without departure removal. | 400 403 409 |
| `GET /api/history` | planner.loadRoomHistory / member history / room | none → object (full properties in OpenAPI) | Optional week/memberId. Viewer denied; noncoordinator member lookup scoped. Member history last20, aggregate last60; noncoordinator result restricted to registration edits. | 403 404 |
| `POST /api/restore` | planner.restoreRoomEdit / room | object → RoomState (full properties in OpenAPI) | Coordinator inverse current-week plan/roster/restore edits; writes a new edit and applies normal conflict checks. | 400 403 409 |
| `GET /api/archives` | planner.loadRoomArchives / room | none → object (full properties in OpenAPI) | Lists week/version/created/archive metadata. Does not delete or restore archive. | 401 403 |
| `PATCH /api/settings` | planner.updateRoomSettings / room | object → RoomState (full properties in OpenAPI) | Coordinator replaces feature booleans; missing flags become false. Preserves lifecycle metadata. Enabling weekly can create new current instance without ordinary reset path. | 400 403 |
| `GET /api/codes` | planner.loadRoomCodes / room | none → object (full properties in OpenAPI) | Coordinator only; includes plaintext code for sharing. Never log raw response to public docs. | 403 |
| `POST /api/codes` | planner.createRoomCode / room | CodeIssue → object (full properties in OpenAPI) | Coordinator issues viewer/officer/member; scoped roles require allianceAccess; member requires registration. Friendly member label becomes code. | 400 403 409 |
| `POST /api/codes/revoke` | planner.revokeRoomCode / room | object → object (full properties in OpenAPI) | Coordinator; cannot revoke current coordinator via room route; SQL excludes coordinator targets. Nonexistent target still ok. | 400 403 |
| `GET /api/registration/state` | registration.refreshRegistrationLive / room | none → MemberState (full properties in OpenAPI) | Member access gates, current roster/responses/deployment maps. Read can initialize derived deployment records. | 403 |
| `POST /api/registration/members` | registration missing-member form / room | object → object (full properties in OpenAPI) | Scoped alliance from code or coordinator body; duplicate returns existing. New entry pending; max200 pending/alliance; enrollment 30 attempts/minute/IP. Separate response write follows enrollment. | 400 403 409 429 |
| `POST /api/registration/review` | planner.performPendingReview / room | object → RoomState (full properties in OpenAPI) | Officer/coordinator reviews pending own-alliance member. Merge requires approved same-alliance target; both responses existing conflicts; transfer response/history guarded. | 400 403 404 409 |
| `GET /api/deployment` | planner.enableDeploymentPublishing / room | none → object (full properties in OpenAPI) | Capability read scope; roomDeployments can derive initial/current map. Publishing client verifies expected source room ID. | 401 403 |
| `POST /api/deployment` | planner.publishLinkedDeployment / room | DeploymentWrite → object (full properties in OpenAPI) | Officer own alliance/coordinator; source roster IDs and coordinate structure validated, version required. Does not modify registration bodies or source plan. No server physical placement validation. | 400 403 409 |
| `GET /api/admin/rooms` | admin inventory / admin | none → object (full properties in OpenAPI) | Separate site admin key. Pagination offset, batches100, max10000. Raw codes redacted. | 401 503 |
| `GET /api/admin/rooms/{id}` | admin room detail / admin | none → object (full properties in OpenAPI) | Room metadata, code summaries, archives and recent admin history; not raw secret reveal. | 401 404 503 |
| `PATCH /api/admin/rooms/{id}/status` | admin close/reopen / admin | object → object (full properties in OpenAPI) | Update lifecycle with audit; close retains data and permits read access through valid codes. | 400 404 |
| `GET /api/admin/rooms/{id}/codes` | admin reveal code / admin | none → object (full properties in OpenAPI) | codeId query selects explicit capability reveal including revoked. | 404 |
| `POST /api/admin/rooms/{id}/codes` | admin issue code / admin | CodeIssue → object (full properties in OpenAPI) | Can issue coordinator in addition to room-route roles. Scoped code rules and unique labels apply. | 400 409 |
| `PATCH /api/admin/rooms/{id}/codes` | admin change code / admin | object → object (full properties in OpenAPI) | Atomic replacement/revocation retains role/alliance/history. Optional code triggers generated replacement where allowed; friendly uniqueness includes revoked. | 400 404 409 |
| `POST /api/admin/rooms/{id}/revoke` | admin revoke / admin | object → object (full properties in OpenAPI) | Single or all revocation; data persists; repeated revocation no-op as implemented. | 404 |
| `GET /api/admin/rooms/{id}/planner` | admin open planner / admin | none → object (full properties in OpenAPI) | Uses active coordinator code; none returns409. | 404 409 |
| `GET /api/admin/rooms/{id}/registration` | admin open registration / admin | none → object (full properties in OpenAPI) | Registration and alliance access enabled; list active member links. | 404 409 |
| `POST /api/admin/rooms/{id}/duplicate` | admin duplicate / admin | object → object (full properties in OpenAPI) | New room/current week copies plan, issues fresh capabilities, excludes old responses/archives. | 400 404 409 |
| `GET /api/admin/rooms/{id}/deployment` | planner publisher with admin key / admin | none → object (full properties in OpenAPI) | Site-admin alternate publishing authorization; source room ID explicit. | 404 |
| `POST /api/admin/rooms/{id}/deployment` | planner publisher with admin key / admin | DeploymentWrite → object (full properties in OpenAPI) | Admin publishing uses same version/roster/geometry checks, rejects closed room. | 400 403 404 409 |

*These are source-established common explicit branches, not an exhaustive guarantee for arbitrary malformed JSON. Common CORS403, auth401/403, general parser400/413 and unhandled500 may also apply. Closed rooms reject authenticated non-GET writes after join/admin dispatch; admin-specific routes have their own checks. A failed downstream direct deployment publication may occur after plan commit.

## Change examples (synthetic)

```json
{"week":"2026-10-25","changes":[{"collection":"homes","id":"fixture-hq","op":"patch","beforePresent":{"x":true},"before":{"x":496},"fields":{"x":497},"removeFields":[]}],"actor":"Fixture officer"}
```

Removal includes whole `before` entity; addition includes `entity`; order uses `beforeIds` and `ids`; setting uses `key,before,value`. Server validates collection ownership and post-change cleanPlan. See `applyChanges`/`rosterDiff`; object-field presence differs from null.

## Permission matrix

| Action | Coordinator | Officer | Member | Viewer | Site admin |
|---|---|---|---|---|---|
| Plan edit | All | Own-alliance entities; no global settings | No | No | Open coordinator link; deployment endpoint separate |
| Registration | All | Own alliance | Own alliance, anyone on that roster | No | No direct generic response-edit endpoint |
| Roster reconcile/review | All | Own alliance | Self-enroll pending only | No | Duplicate plan, not full response editor |
| Codes/settings/history restore | Room scope | Restricted history only | Own-member history | No | Global lifecycle/codes/duplicate routes |
| Publish deployment | All roster alliances | Own alliance | No | No | Explicit room deployment route |

Plan state returned by `/api/state` is broader than member-page scoped roster; do not claim alliance-scoped bearer hides all foreign plan records. Viewer registration notes are removed, but code possession is still access to data. Actor labels are self-reported. Friendly member labels are actual credentials and cannot be reused when revoked because uniqueness remains.

## Provider and storage boundaries

[Integration dependencies](08-integration-dependencies.md) records provider model/prompt/quotas. [Data models](05-data-models.md) records JSON/SQL constraints. GET deployment/memberState may create/update derived snapshot storage. No transaction guarantee spans plan and all alliance publications. Admin duplication intentionally omits previous responses and history.
