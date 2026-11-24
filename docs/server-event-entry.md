# Server and weekly event entry

The planner now opens a server home screen before the map. Server 759 is the default; `?server=123` opens another server's home. A `#room=...` access link still authenticates with the existing service, then opens the authoritative event and its overview. Member registration remains a separate member-facing page.

## Orientation

The persistent context strip names the server, weekly dates (or continuous plan), alliance/role and actual sync status. Local drafts say **Only saved on this device**. Shared plans say **Shared changes saved**, pending/offline/conflict status, closed or archived as appropriate. **View event** offers roster, territory, deployment, proposals and access links. **Server home / switch event** is always available and does not itself replace a plan.

The previous tutorial no longer interrupts first entry; it remains under Help → Getting started. The home screen is a native modal over the existing mounted planner so opening it does not detach map listeners or destroy selection/state.

## Entry routes

- Public shared events list names, IDs, server numbers and weekly dates only. Opening one without an authenticated connection asks for the alliance access code. No code, roster, member count, registration, participant or plan data is published by the directory.
- **Enter alliance access code** works for listed and unlisted events. If a user selects an event then enters a code belonging to another event, the planner reports a mismatch before replacing the displayed plan.
- Returning users with an existing tab session reconnect through the existing sessionStorage capability. Their code is not copied to localStorage or a public URL by the directory. Shareable officer links continue to work.
- **Create a weekly event** copies the current local layout/roster into a new weekly shared event; it never overwrites the local draft. The form clearly shows the source and target server and includes a listing checkbox. The coordinator code stays private.
- Choosing another server browses its directory. It does not silently relabel an existing local roster or plan. An empty draft can adopt the chosen server; the private-draft continuation button always names the actual draft server.
- Existing rooms default to server 759 and **unlisted**. Coordinators can explicitly list/unlist a weekly event in its overview. Closed events do not appear in the directory. Duplicated rooms start unlisted. The directory does not designate an event as an official server event or enforce one event per server/week.

## Server identity and exports

`room.features.serverNumber` is authoritative for shared events and cannot be changed after event creation. Shared settings updates preserve server/listing metadata even when older clients omit them. Local drafts persist serverNumber with their saved plan; old drafts/backups default to 759.

Player and empty-cell coordinate copy, text previews/downloads, JSON server metadata, and export filenames use the selected plan's server. Member registration already reads the room's serverNumber and now receives that persisted value. Importing another server's JSON into a shared event is rejected; a private draft can import it. Saving a shared event as a local copy retains its server number.

All existing weekly rollover and APOC/UTC−2 schedule rules remain unchanged. The directory projects the current weekly dates; authenticating the event invokes the existing rollover when required. It does not reveal historical rosters or log participants in.

## API additions

`GET /api/events?server=759` is anonymous, read-only and limited to 50 explicitly listed, open weekly rooms for that server. Server identifiers must be integers from 1 to 999999. Returned structure:

```json
{"serverNumber":759,"week":"2026-11-22","events":[{"id":"opaque-room-id","name":"Server 759 SvS","serverNumber":759,"week":"2026-11-22"}]}
```

`POST /api/rooms` accepts `features.serverNumber` (default 759) and `features.eventListed` (default false). `PATCH /api/settings` permits coordinator-controlled listing changes, preserves omitted feature values and rejects server reassignment. Existing authentication and edit authority are unchanged.

Verification lives in frontend `tests/event-entry.cjs` and backend `scripts/test-event-directory.mjs`, covering private-draft preservation, code/event mismatch, authoritative coordinate exports, public data minimisation, server isolation, listing permissions and immutable shared server identity.

## Guest and organiser journey refinement

The opening screen leads with **Join your alliance’s plan**, a directly usable access-code form and **Open shared plan**. Server selection, listed plans and organiser tools are secondary disclosures. A member arriving to confirm availability is directed to their registration link. Private exploration is a text action, with actual saved zone/player counts. An opaque backdrop prevents the underlying private map being mistaken for a shared event.

Event creation is explicitly an organiser task and has two stages: **Set up a shared SvS event** and **Review your new shared event**. Setup names include the week, describe the actual copied zones/players or an empty plan, and leave public listing off. Listing copy distinguishes public name/date metadata from protected map/roster/codes. Listed existing events trigger a warning and require acknowledgement that a separate event is intended; unlisted events cannot be detected and this limitation is explained.

Only the review screen exposes the final create action. A signature covering source plan, target server, name and listing preference invalidates review when those details change. Cancellation returns to joining and uses a non-submit button. Private exploration and general coordinator navigation are absent during setup so they cannot become competing exits. Creation still uses the existing room API, copies the local draft and preserves coordinator access and existing shared plans.

Browser verification covered the guest screen, setup, review, cancellation and 390×844 layout without horizontal overflow. No production event was created during the check. Automated event-entry tests cover acknowledgement, review gating, changed-draft invalidation, copied counts and target-server/listing payloads, alongside the earlier link, export and private-draft preservation assertions.

## Fresh event or explicit draft copy

Organiser setup now defaults to **Start fresh**. It uses standard OUTER/INNER map geometry, no deployed HQs, waiting players, alliance zones or custom blocked cells, and no formation anchor. **Copy my private draft** is an explicit alternative retaining the existing plan snapshot. The source selector is editable in setup and read-only in review. The source choice and selected plan are included in the review signature, so switching the choice requires another review.

The existing creation endpoint receives the chosen snapshot; no private state is cleared before or after requesting creation. The standard shared-room application preserves the original local plan in localPlanMemory so returning to it remains possible. The older explicitly named “create from this plan” tool continues to copy its source as labelled. Tests verify the actual request payload for fresh and copy modes, reset geometry/exclusions/anchor, source preservation and review invalidation.
