# ACM1 Territory Planner UX and information architecture proposal

Status: **Phase 1 design proposal — review required before implementation**

This proposal treats the merged [System Preservation Baseline v1.0](system/README.md) as the behavioural reference, not as a screen or navigation specification. It recommends a coherent task architecture while preserving data contracts, permissions and critical behavioural invariants. It does not redefine the 100 capability records or claim that untested browser behaviour is verified.

## Design direction

The planner should feel like one operational workspace with a small number of task surfaces, rather than a map surrounded by unrelated controls. The map remains the primary work area; roster, regions, deployment and collaboration become task panels that expose the minimum controls needed for the current task. Registration and site administration remain distinct entry points because they have different audiences and authority, but they should use the same terminology, status language and hand-off patterns.

The central organising question should be **“What are you trying to accomplish now?”**, not **“Which internal subsystem contains the control?”**

## 1. Current-state interaction assessment

### What works as a foundation

- The map is the shared context for HQ placement, regions, exclusions, terrain, previews and coordinate inspection.
- The roster already supports useful task states: waiting, planned and arrived, plus search, alliance filtering, response filtering and terrain sorting.
- The implementation has meaningful task boundaries—placement, region editing, quick deployment, room sharing, roster sync and registration—even though they are presented through a dense control surface.
- Existing state and server boundaries are strong enough to support a staged redesign: local plan, shared room state, linked registration source and published deployment are distinct stores.

### Main interaction problems

1. **Subsystem navigation is exposed instead of task navigation.** The current tools surface mixes “Roster sync”, “Alliance boundaries”, “Quick layouts”, “Formations”, “Blocked cells”, “Layers & boundaries”, “Export & backup”, “Help” and “Add player” at the same level. A user adding one HQ must understand this internal taxonomy.
2. **The primary journey is split across map, roster and tools.** Add Player, choose a position, inspect validation, move/lock, copy coordinates and mark arrival are related actions but are distributed across quick add, details, context menus and map gestures.
3. **Planning and publishing are adjacent without a clear phase boundary.** Preview, apply, recall, linked roster refresh and publishing authority have different consequences, but the current surface makes them feel like variations of the same map action.
4. **Region authoring and allocation are mixed.** Manual boundary drawing, node adjustment, reservations, generated layouts, tier/share controls and alliance focus are distinct jobs with different mental models.
5. **The interface exposes implementation vocabulary.** Terms such as anchor, source mapping, plan snapshot, roster link, publisher and room capability are necessary concepts, but they should appear when relevant rather than in the primary navigation.
6. **Context is fragile during transitions.** Placement mode, region draft state, selection, map focus, previews, dialogs, mobile panels and shared conflict recovery are separate state dimensions. A redesign must make the active task and safe exit visible.
7. **Separate pages repeat concepts.** The planner, member registration page and admin page each have their own rendering and navigation model. That separation is appropriate for authority, but terminology, status summaries and links between surfaces are inconsistent.

### Complexity that should not be hidden

Some complexity is a domain constraint rather than an information-architecture failure:

- HQ footprint validity differs from centre-only region and shielding rules.
- Local plans, shared rooms, linked rosters, registration responses and published deployments must not be conflated.
- Bearer codes represent authority; they are not user accounts.
- Preview/apply, optimistic conflicts, week rollover and publishing can fail independently.
- Undo covers plan fields, not every setting, credential or registration state.

The redesign should explain these boundaries at the moment they matter, not remove them from the model.

## 2. Proposed information architecture

### Planner workspace hierarchy

```text
ACM1 Territory Planner
├── Plan workspace
│   ├── Overview
│   ├── Players
│   ├── Regions
│   └── Deploy
├── Share
│   ├── Shared room
│   ├── Roster source
│   └── Publish status
├── Plan menu
│   ├── Import / export
│   ├── Undo / redo
│   ├── Backup and reset
│   └── Advanced diagnostics
└── Help

Standalone entry points
├── Member registration
└── Site administration
```

The workspace should use a persistent shell:

- **Top bar:** plan name/status, local or shared indicator, unsaved/conflict state, undo/redo, and a compact Help entry.
- **Primary navigation:** Overview, Players, Regions, Deploy, Share.
- **Map canvas:** always retained as the spatial context when the task permits.
- **Context panel:** changes with the selected task or object; it is not a second permanent navigation tree.
- **Task rail or step indicator:** shown for multi-step operations such as adding a player, drawing a region, importing a roster or publishing a deployment.
- **Advanced drawer:** diagnostics, geometry, blocked cells, formations, raw export options and source/publisher details.

### Surface ownership

| Surface | Primary purpose | Typical users | Examples |
|---|---|---|---|
| Overview | Understand current plan state and next action | Everyone | readiness, counts, conflicts, current room/source status |
| Players | Maintain roster and place HQs | Planner operator, alliance officer | import, add, edit, deploy, move, lock, arrive |
| Regions | Define territory and allocation | Planner operator, alliance officer | draw, adjust, reserve, generate, focus |
| Deploy | Preview and apply placements | Planner operator, alliance officer | eligibility, terrain preference, preview, apply, recall |
| Share | Coordinate plan and connected systems | Coordinator, officer | create/join room, reconcile roster, publish, resolve conflicts |
| Plan menu | Lifecycle and interchange | Planner operator | backup, import/export, reset, undo/redo |
| Advanced | Rare or diagnostic operations | Expert operator, support | geometry, blocked cells, formations, validation, raw publisher controls |
| Registration | Member self-service | Member | availability, notes, preferences, deployment inspection |
| Administration | Room lifecycle and capability management | Site administrator | inventory, codes, close/reopen, duplicate, revoke |

### Roles and operational contexts

Use one application vocabulary with role-aware capabilities, not separate products:

- **Planner operator:** local plan authoring, players, regions and deployment.
- **Coordinator:** all shared-room operations, settings, history and publishing.
- **Alliance officer:** own-alliance roster, region, registration review and publishing actions.
- **Member:** registration and read-only deployment inspection through the standalone member surface.
- **Viewer:** read-only shared-room context.
- **Site administrator:** separate administrative inventory and capability management.

Role-aware navigation should hide unavailable actions, but never rely on hiding for security. Server permissions, scope checks, version checks and closed-room rules remain authoritative.

## 3. Primary tasks, contextual tools and advanced administration

### Primary tasks

These deserve first-class navigation and stable URLs or view state:

1. **Build the plan:** inspect map, create/edit players, define regions.
2. **Prepare deployment:** reconcile eligible players, preview placement, apply or recall.
3. **Coordinate:** share a room, connect a roster source, resolve conflicts, publish.
4. **Check-in:** member registration and deployment inspection.

### Contextual tools

These should appear in the context of a selected object or task:

- Map layers and terrain display.
- Copy coordinates, mark arrived, lock/unlock and move.
- Region colour, label, focus, share/tier and corner editing.
- Blocked-cell editing and formation generation when a placement or region is selected.
- Roster filters and sorting relevant to the current alliance or deployment preview.
- Registration response details and deployment inspector controls.

### Advanced administration

Keep these out of the primary planning flow:

- Raw geometry diagnostics and validation.
- Import/export formats beyond the recommended backup flow.
- Publisher credentials and source-room selection.
- Room code reveal/replacement/revocation.
- Close/reopen/duplicate room operations.
- Historical archives and restore.

Advanced controls should be discoverable through an “Advanced” or “More” affordance and should state their scope and reversibility before execution.

## 4. Proposed end-to-end user journeys

### A. Create a territory plan

1. Open the planner and land on Overview with the current local/shared status.
2. Choose **Start with players**, **Import roster**, or **Open existing plan**.
3. Add or import players; show a persistent roster readiness summary.
4. Define or generate alliance regions; keep the map centred on the active region.
5. Review unresolved conflicts, unassigned players and invalid placements.
6. Save locally or enter Share when collaboration is required.

The user should not need to understand plan snapshots, localStorage or layout metadata. Those remain recovery and advanced details.

### B. Add, organise and position headquarters

1. From Players, choose **Add player** or select a waiting player.
2. Collect identity fields first; keep optional coordinates collapsed until needed.
3. Enter **Place on map** mode with a clear task banner, highlighted target and Cancel action.
4. Show footprint validity, terrain/shielding consequence and conflicts at the target.
5. Confirm placement; then offer Move, Lock, Copy coordinates and Mark arrived in the selected-player context.
6. Preserve selection and map focus after completion.

Cancellation must leave no partial HQ or roster mutation. Invalid targets must explain the blocking reason without changing the plan.

### C. Define and manage alliance regions

1. Open Regions and choose **Draw manually** or **Generate layout**.
2. For manual drawing, use a focused drafting mode with visible start/close/undo/cancel actions.
3. Review the region before committing label, colour, opacity and alliance ownership.
4. For generated layouts, show a comparison workspace for share, tier, rotation and order changes.
5. Select a region to focus its roster and deployment context.
6. Keep node editing and deletion behind the selected-region context menu.

The user should not have to distinguish draft history from plan history until a recovery action requires that distinction.

### D. Import, maintain and reconcile rosters

1. In Players, choose **Import roster** and select local OCR or AI review.
2. Present extracted rows as a review queue with source image, confidence/warnings, duplicate handling and explicit confirmation.
3. Add confirmed rows to the local roster or choose **Connect to shared roster**.
4. In Share, preview added/matched/missing records before applying reconciliation.
5. Preserve stable member identity, registration associations and existing map positions.
6. Show refresh age, source week and conflict state without implying that a source refresh changes placements.

Local import, shared reconciliation and registration linking should be separate steps with explicit labels.

### E. Plan, preview and publish deployments

1. In Deploy, select an alliance and view eligibility, terrain preference and unresolved blockers.
2. Generate a non-mutating preview with capacity, leftovers, footprint conflicts and signature age.
3. Compare standard and compact alternatives where available.
4. Apply only after a clear confirmation that placements and history will change.
5. Show per-alliance publishing status separately from plan apply status.
6. Offer recall as a deliberate destructive/reversible action with its own confirmation.

Publishing authority and source-room selection belong in Share, not inside the ordinary preview controls.

### F. Create, join and manage shared rooms

1. In Share, choose Create or Join and see what local plan state will be copied or replaced.
2. After joining, show role, room lifecycle, current week, pending draft and last sync.
3. Keep conflict resolution in a dedicated panel with “Keep mine”, “Use latest” and “Download draft” choices.
4. Put roster source linking and deployment publishing in separate cards with independent status.
5. Make leave/restore behaviour explicit before leaving a room.

The UI must distinguish room plan state, linked roster state and published deployment state.

### G. Member registration and deployment inspection

1. Open the member link and show the current week, alliance and save state.
2. Put availability, terrain preference and notes in one check-in flow with clear unsaved/conflict feedback.
3. Keep deployment inspection read-only and separate from response editing.
4. Preserve zoom, selected HQ and working row across live refresh where implemented.
5. Make closed, revoked, stale-week and conflict states actionable without exposing unrelated room data.

### H. Administration and advanced operations

1. Authenticate once into a separate Admin surface.
2. Start from room inventory and lifecycle status, not from raw codes.
3. Reveal or replace capabilities only after an explicit room and code selection.
4. Keep duplicate, close, reopen and revoke actions behind confirmations that explain retention and irreversibility.
5. Link back to the planner or registration surface using generated, scoped URLs without exposing secrets in ordinary UI.

## 5. Interaction patterns for complexity

### Progressive disclosure

- Default to the task's smallest useful form.
- Put coordinates, geometry diagnostics, raw exports, publisher credentials and advanced layout parameters behind disclosure.
- Replace long tool-tab lists with task-specific “Next action” cards and contextual menus.
- Explain only the rule that affects the current decision; link to “Why is this blocked?” for deeper detail.

### Context preservation

- Preserve selected player/region/alliance, map centre/zoom and current task when opening a panel.
- Keep a visible task banner for placement, region drafting, roster review, conflict resolution and publishing.
- Treat Escape/Cancel as first-class actions and state exactly what will be discarded.
- Restore focus after dialogs and live refresh; do not make refresh look like navigation.
- Use a persistent breadcrumb or step trail for multi-stage workflows.

### Status and consequence language

Use consistent state labels across planner, registration and admin:

| State | User-facing meaning |
|---|---|
| Draft | Local or uncommitted work exists |
| Ready | Required inputs and current validation pass |
| Blocked | A specific rule prevents the next action |
| Preview | Non-mutating candidate result |
| Applied | Plan state changed and history was recorded |
| Publishing | A separate external write is in progress |
| Conflict | Current data changed; user must choose a resolution |
| Read-only | Role, room lifecycle or member context prevents edits |
| Stale | Week, version or preview signature must be refreshed |

### Safe defaults and confirmations

- Never imply that a preview is applied.
- Never treat a successful local mutation as proof of browser persistence.
- State whether an action changes the plan, registration response, shared room, or published deployment.
- Confirm destructive actions with the affected scope: one player, one alliance, current plan, room access, or historical data.
- Keep raw bearer credentials out of ordinary copy, logs and documentation views.

## 6. Prioritised redesign roadmap

### Slice 1 — Players and placement workspace (recommended first)

Unify Add Player, waiting roster selection, map placement, player details, move/lock, coordinate copy and arrival status. Keep the existing geometry and validation functions behind the new presentation. This slice is bounded, highly visible, and provides a useful test of contextual panels, task banners, focus preservation and cancellation without requiring room or registration redesign.

Acceptance boundary:

- A user can add or select a player, place or move an HQ, understand why a target is blocked, cancel safely, lock/unlock, copy coordinates and mark arrival.
- Existing roster identity, footprint validation, centre-only terrain/shielding, history and permissions remain intact.
- Local/shared mode and linked roster state remain visible but are not redesigned wholesale.

### Slice 2 — Regions workspace

Unify manual drawing, corner editing, generated layouts, reservations, alliance focus and region review. Treat draft history and plan history as separate recovery scopes in the UI.

### Slice 3 — Deployment workspace

Separate eligibility, preview, alternatives, apply, recall and publishing status. Add explicit stale-preview and partial-publish recovery surfaces.

### Slice 4 — Share and reconciliation

Unify room lifecycle, roster source linking, conflict recovery and publisher configuration while keeping their data and permission boundaries visible.

### Slice 5 — Member and admin consistency

Refresh registration and administration with shared status language, responsive context preservation and clearer hand-offs; do not merge their authority models into the planner.

### Slice 6 — Advanced and lifecycle polish

Move diagnostics, import/export, archives, restore, reset and legacy compatibility into a coherent advanced/lifecycle area after the primary journeys are stable.

## 7. Design guardrails for implementation

- Treat `docs/system/README.md`, API contracts, state boundaries and behavioural flows as constraints on behaviour, not prescribed layouts.
- Keep presentation changes separate from data-contract migrations.
- Introduce one task surface at a time; do not rewrite the monolithic planner and the separate pages simultaneously.
- Add targeted characterisation around the affected journey before changing native interaction, conflict recovery or publishing.
- Preserve explicit distinctions between local, shared, linked-source and published state.
- Preserve server-side authority checks; client-side visibility is only a usability layer.
- Do not use the absence of current browser coverage as permission to simplify away a behaviour; mark it as a characterization need.

## Recommended next decision

Approve or revise the proposed **Players and placement workspace** as the first implementation slice. The next phase should produce a small interaction prototype or bounded implementation plan for that slice, including its state transitions and characterization cases, before changing production code.
