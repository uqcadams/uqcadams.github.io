# Sites Worker ESM starter

Use this starter for a static microsite, click counter, or simple internal UI whose state is browser-scoped. It has no dependencies and needs no install.

Edit `worker/index.js`, then publish through the Sites hosting workflow with this starter's build and validation in `commands`.

The build copies only `worker/index.js` and `.openai/hosting.json`. Do not add standalone asset files. Embed any essential raster bytes in `worker/index.js` and serve or reference them as a data URL.

Pass these argument arrays as `commands`:

```json
[
  ["bash", "scripts/build.sh"],
  ["node", "scripts/validate-artifact.mjs"]
]
```

The deterministic build produces:

```text
dist/
├── .openai/
│   └── hosting.json
└── server/
    └── index.js
```

`dist/server/index.js` is an ES module with a default export containing `fetch(request, env, ctx)`. Edit `worker/index.js`, not the generated file under `dist/`.

## Standalone weekly member registration

The GitHub Pages planner now serves `/acm1-planner/register/`. Members enter an alliance member code; the standalone API returns only the scoped roster, schedule and registration records, without the map document. Member-code links use the URL fragment (`#code=…`) and are stored only for that browser session.

Leaders import the roster as usual, create/join a room with registration and alliance access enabled, then create an alliance member code. Copy link for member codes points at the standalone page. Enable weekly rollover for a new response period each Sunday 00:00 APOC (UTC−2).

Self-enrollment adds a pending player to the scoped alliance. Officers approve, remove or merge pending entries in Member registration. Merging transfers a response and its history to the retained imported member ID; if both entries have responses the service refuses to overwrite either. Official roster reconciliation also approves matched pending names. Pending status survives weekly rollover; availability resets for the new week. No database migration is required.

Deployment can require a full availability window, filter a role and respect strict mud/grass terrain choices. Pending, unavailable, unsure, unanswered and incomplete-window entries stay waiting; quick deployment remains available without registrations in standalone local plans.

Checks: `node scripts/test-server.mjs`, `node scripts/test-member-registration.mjs`, `node scripts/test-ai-budget.mjs`. For a disposable local registration test, run `node scripts/preview-registration.mjs` and use its test-only member code.

### Readable registration codes

Member codes with labels such as `ACM1-OCT31` use that label as their access code. Labels must be 4–40 ASCII letters/numbers with hyphens, and are globally unique; previously issued codes are not recycled. Officer/coordinator codes retain their existing generated format. Existing member codes continue to work, and an existing unique member label in this format can also resolve as an alias. Ambiguous legacy labels are rejected rather than joining an unintended room. Revoking a capability also disables label-based access.

GitHub Pages serves the member UI at `/acm1-planner/register/`. Its scoped custom 404 handler forwards `/acm1-planner/register/<code>` into that page, which opens the roster and restores the readable address. Other missing pages remain normal not-found pages.

## Site-wide rooms administration

The planner serves `/acm1-planner/admin/`, also linked from Shared rooms / Room & sharing. The dashboard requires an independent site-admin key. The service stores only its SHA-256 digest in the secret runtime variable `ROOM_ADMIN_TOKEN_HASH`; the owner’s access key must remain outside the public repository. Room, officer and member codes cannot list all rooms.

Admin endpoints provide paginated room summaries, code metadata (including revoked codes), saved instances and admin history. Codes are redacted until an authenticated Reveal/Copy operation. Administrators can close/reopen rooms, revoke individual/all room codes, and issue replacement coordinator access. Nothing is permanently deleted by these controls. A room with no active codes is shown as Access revoked; this is distinct from a closed room.

Closure is stored in the room config and preserves roster, placements, responses and archives. Existing codes can view a closed room but all ordinary mutation endpoints reject writes. Closed weekly rooms do not roll over until reopened. Both planner and member registration display the read-only state. This update uses existing tables and needs no migration.

Check with `node scripts/test-room-admin.mjs` alongside the existing room, registration and AI-budget tests. Admin history records only action metadata, never access-code values.

Room cards link directly to member registration (with an alliance chooser for multiple member codes), allow registration-code creation/replacement, and duplicate the current roster, placements, boundaries and settings into a new open room with new scoped access codes. Duplication does not copy registration responses, archives or edit history. Replacing a code atomically revokes the previous code; old links stop working without deleting roster data.

## Live member deployments

Registration state includes an alliance-scoped deployment map and member assignments. `room_deployment_maps` is created additively on first use and retains per-week snapshots, revision numbers and last coordinates. First assignments are deployed, changed coordinates are updated, and recalled assignments have no coordinates. Direct shared planner position/boundary edits refresh the map; separate linked planners publish through `/api/deployment` (officer/coordinator) or the site-admin room deployment endpoint. Publishing uses version checks and never modifies registration responses or the source roster. The member page polls every ten seconds, preserves active forms/notes, renders a territory crop, and copies in-game coordinates.
