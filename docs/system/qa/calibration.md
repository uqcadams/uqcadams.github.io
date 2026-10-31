# Capability contract calibration

Status: **calibration review required before bulk registry correction**
Baseline: frontend `5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd`; backend `11235f4c7ebd07fd55f7c8d16f0dc1e73bb62bcc`

This report calibrates the proposed contract standard on ten capabilities before the remaining 90 registry entries are changed. It compares the original registry fields with the revised fields in `feature-registry.json`, then ties each revision to implementation behaviour, state/validation conditions and actual evidence. Text uniqueness is not treated as semantic proof.

## Review standard

- `user_actions` names an observable user operation, system event, scheduled process, API invocation or internal mechanism. A capability with no direct user action must say so.
- `preconditions` states the state, permission, input or external condition required before the path can be entered. Unverified conditions remain explicitly unverified.
- `business_rules` states invariants or ordering/authority rules that must survive a change; it is not a restatement of the summary description.
- `regression_risks` explains how a listed risk-register concern could change this capability's observable behaviour or data boundary.
- Evidence labels remain conservative: source inspection and VM/backend tests do not certify browser, device, production or multi-client behaviour.

## Calibration comparisons

### CAP-001 — Coordinate transforms

**Original registry:** `user_actions: ["Coordinate transforms"]`; precondition was the opening sentence of the description; `business_rules` repeated the complete description; `regression_risks` was the generic “preserve inputs, gating, state mutation and side effects” sentence.

**Revised contract:** Users move the pointer over the map or use geometry controls to inspect the cell/coordinate relationship. The canvas and helpers must be mounted and receive pixel input; exact game geometry for negative/parity cells is unverified. Rules now separate the `(500,500)` pointy odd-r convention, parity/sign consistency and the distinction between an implementation convention and live game semantics. Risks identify conversion drift, placement-target changes and native-input paths outside VM coverage.

**Evidence:** `acm1-planner/index.html:712-713` (`coordToPx`, `pxToCoord`), `CAP-001` source references, and the catalogue's source-inspection-only status. No direct current test is claimed.

### CAP-011 — Add player drawer

**Original registry:** `user_actions: ["Add player drawer"]`; precondition and business rule copied the description; risk was generic.

**Revised contract:** Actions now cover opening the drawer, entering identity/lock fields, choosing a cell or coordinates, and confirming/cancelling. Preconditions require an editable planner, required identity input and normal placement validation. Rules preserve field-before-target ordering, validation of supplied coordinates and no partial commit on cancellation. Risks target `geomStatus` bypass and incorrect lock initialization.

**Evidence:** `acm1-planner/index.html:1132-1133` (`openAddPlayer`, `placeAtHighlightedCell`), `acm1-planner/index.html:1199` (`renderAddForm`), and `tests/alliance-tag-matching.cjs` as mapped evidence. The source path's placement validation is also consistent with `addHQ` and `geomStatus` in the pinned planner.

### CAP-028 — Boundary completion and appearance

**Original registry:** `user_actions: ["Boundary completion and appearance"]`; precondition and business rule copied the description; risk was generic.

**Revised contract:** Actions distinguish closing a draft, editing review fields, completing, and cancelling. Preconditions require region authority, minimum corners and non-self-intersection validation. Rules preserve review-before-commit, cancel semantics, unused-colour selection and rejection of invalid geometry. Risks identify draft/history confusion and loss of allocation geometry through simplification, colour reuse or hole handling.

**Evidence:** `acm1-planner/index.html:788` (`finishRegion`), `:1157` (`renderBoundaryDetails`), `:1126` (`unusedLayoutColour`), plus the region workflow in `07-behavioural-specifications.md` FLOW-04 and the historical region-panel evidence. Browser interaction remains unverified.

### CAP-040 — Eligibility and alliance matching

**Original registry:** `user_actions: ["Eligibility and alliance matching"]`; precondition and business rule copied the description; risk was generic.

**Revised contract:** Actions distinguish focusing a region, requesting preview, and applying/cancelling it. Preconditions require an editable map, focused region and eligible waiting players. Rules preserve normalized alliance matching, exclusion of removed/pending/unavailable/foreign records, and the separation between strategic region allocation and physical footprint exclusion. Risks identify eligibility-order regressions, centre-versus-footprint confusion and blocked later assertions.

**Evidence:** `acm1-planner/index.html:1092` (`quickDeployRoster`) and `:1073` (`deploymentExclusion`), with `tests/alliance-tag-matching.cjs`, `tests/registration-deployment.cjs`, `tests/deployment-packing.cjs`, and the early-stop limitation documented for `tests/quick-deployment.cjs`.

### CAP-068 — Create shared room

**Original registry:** `user_actions: ["Create shared room"]`; precondition and business rule copied the description; risk was generic.

**Revised contract:** Actions cover creating a room and handling the returned role codes. Preconditions require a local plan and reachable shared service; no sign-in is inferred, so codes remain bearer authority. Rules preserve remote-copy/local-memory separation, distinct role codes and code sensitivity. Risks target local/remote overwrite, access broadening and partial remote persistence.

**Evidence:** `acm1-planner/index.html:652` (`createSharedRoom`), the shared-room flows in `07-behavioural-specifications.md` FLOW-10/11, `docs/system/evidence/shared-service/scripts/test-server.mjs`, and the backend persistence/race risk entries R02, R08, R13 and R20.

### CAP-075 — Feature settings and close state

**Original registry:** `user_actions: ["Feature settings and close state"]`; precondition and business rule copied the description; risk was generic.

**Revised contract:** Actions distinguish feature toggles from close/reopen/revoke operations. Preconditions require the relevant room/site-admin authority and known lifecycle/week state. Rules preserve independent false defaults, closed-room read-only behaviour, retained data and the distinction between reopening and revoking. Risks target scattered role checks, conflated lifecycle transitions and week-target changes.

**Evidence:** `acm1-planner/index.html:667` (`updateRoomSettings`), `worker/index.js:17` (`config`), `worker/index.js:101` (`currentRoom`/lazy rollover path), and `test-room-admin.mjs` assertions for global authentication, close/read-only, reopen, revoke and retained responses.

### CAP-080 — Deployment publisher connection

**Original registry:** `user_actions: ["Deployment publisher connection"]`; precondition and business rule copied the description; risk was generic.

**Revised contract:** Actions distinguish entering write credentials, enabling publishing and pausing it. Preconditions require a linked source room and matching coordinator/officer/site-admin authority; read-only codes are insufficient. Rules preserve session-only credentials, wrong-room/version rejection and the non-rollback meaning of pause. Risks target refresh-induced version/signature resets, authority broadening and misleading client success.

**Evidence:** `acm1-planner/index.html:633-635` (`deploymentPublishAuth`, `enableDeploymentPublishing`), the direct publishing path in the same pinned source, and `tests/deployment-publisher.cjs` assertions for explicit editor authentication, matching room, stable source IDs, version updates, recall, unchanged suppression and pause.

### CAP-083 — Scoped roster listing and search

**Original registry:** `user_actions: ["Scoped roster listing and search"]`; precondition and business rule copied the description; risk was generic.

**Revised contract:** Actions cover opening a registration link/code and inspecting/searching the scoped roster. Preconditions require a valid active code, successful join and an open room. Rules preserve alliance scoping, separation of roster/assignment/response concepts and server rejection of invalid access. Risks target scope disclosure, DOM refresh loss and pending-versus-approved eligibility confusion.

**Evidence:** `acm1-planner/register/index.html:48` (`boot`), `acm1-planner/register/index.html:24` (`render`), `worker/index.js:74` (`memberState`), and `test-member-registration.mjs` assertions for scoped roster, self-enrollment, duplicate/pending/review/merge and response history.

### CAP-092 — Admin authentication and inventory

**Original registry:** `user_actions: ["Admin authentication and inventory"]`; precondition and business rule copied the description; risk was generic.

**Revised contract:** Actions distinguish submitting the site-admin key from loading, paginating and explicitly revealing inventory. Preconditions require a separate session-held site-admin key. Rules preserve all-room authority, redacted summaries, pagination and non-interchangeability of codes. Risks target global/room-role confusion, secret persistence and disclosure/omission through inventory changes.

**Evidence:** `worker/index.js:83` (`requireSiteAdmin`), `:85` (`adminRooms`), `acm1-planner/admin/index.html:12` (`render`), and `test-room-admin.mjs` assertions for isolated admin authentication, redaction, reveal, close/reopen/revoke, replacement and duplicate-room behaviour.

### CAP-099 — AI quota and provider failure

**Original registry:** `user_actions: ["AI quota and provider failure"]`; precondition and business rule copied the description; risk was generic.

**Revised contract:** Actions cover image submission and cancellation/error recovery. Preconditions require acceptable images and access, while provider availability and live paid execution remain explicitly unverified. Rules distinguish daily/per-IP limits from the permanent cost ledger, fail closed on provider/parse/quota errors and do not treat cancellation as a refund. Risks target ledger reset, quota undercount and malformed output acceptance.

**Evidence:** `worker/index.js:35` (`aiQuota`), `:45` (`aiImport`), `test-ai-budget.mjs` assertions for persistent reservation/settlement/concurrency/fail-closed behaviour, `test-ai-import.mjs` mocked payload/error coverage, and the intentionally skipped paid `test-ai-live.mjs`.

## Calibration status

The ten records retain their original CAP IDs, source references, baselines, test mappings and risk-register IDs. The revised fields are now evidence-specific, but this report is a **review checkpoint**, not a claim that the remaining 90 entries meet the same standard. Bulk correction must wait for semantic approval of these examples.
