# ACM1 optional shared rooms

Planner: https://uqcadams.github.io/acm1-planner/
Service: https://acm1-shared-rooms.duskyfield128.chatgpt.site
Sites project: appgprj_6adf0ee4a03c8191ba97a4f44bac2654

The planner remains local by default. Use the Local plan badge to create or join a room. Creating copies the current plan into a room. Returning to local restores the separate browser plan. Save as local copy explicitly replaces that local plan after confirmation.

Coordinator codes manage the whole room and issue/revoke view, alliance officer and alliance member codes. Codes are bearer permissions: anyone with a code has that access. Actor names in history are self-reported. No account is required.

Registration, alliance-scoped access and weekly rollover are optional room settings. Registration supports attendance, placement preference, multiple availability windows and notes. Screenshot imports should be reviewed before roster reconciliation. Partial merge retains missing members; complete replacement removes them from the current instance. Matched members keep identities and registration.

APOC time is fixed UTC−2. A new instance begins Sunday 00:00 (02:00 UTC); event begins Saturday 00:00 and scoring runs Saturday 12:00–16:00. Rollover archives the previous plan/registrations, carries the roster into waiting players, and clears new registrations. Boundaries remain. Maintenance schedule Automation_e46c0f74123c8191b3d224064ecbfa86 calls /api/maintenance/weekly; room access also checks for due rollovers.

Shared plan changes sync within a few seconds while a tab is open. Conflicting same-field edits require explicit resolution. Unrelated edits merge. Offline drafts are stored separately per room on the device. Archives are read-only; coordinators can restore eligible plan edits through history. Export JSON remains available.

Frontend source build: python3 work/refactor-ui.py (from workspace root).
Frontend checks: node work/test-rooms.cjs && node work/test-topbar-alliance.cjs
Backend checks: node acm1-rooms/scripts/test-server.mjs
Backend storage: D1 binding DB, migrations in drizzle/. Publish through the existing Sites project, preserving .openai/hosting.json and the DB binding. Never put coordinator codes or test fixtures in the production frontend.

## Experimental Luna screenshot import

Choose Import screenshots → Screenshot reader → Luna AI. The passcode is checked by the server; it is never embedded in the frontend. Screenshots go to OpenAI using gpt-6-luna and the Responses API with store:false. Review the resulting rows and source snippets before adding players. The local OCR option remains the default.

Runtime secrets: OPENAI_API_KEY and AI_IMPORT_PASSCODE, configured in Sites. Do not commit .env.local. The server limits import attempts per IP/hour and caps paid AI reads at 100 per UTC day during this test. Each batch supports at most ten images, one API request per image. Browser cancellation stops remaining uploads; an already-started API request may still consume usage.

Backend tests: node scripts/test-ai-import.mjs and node scripts/test-server.mjs. AI errors are sanitized; images and API responses are not logged or stored in the planner database. Source snippets and review rows are held in the browser during import.

### Multi-image Luna imports (October 28 update)
The browser submits balanced groups of up to ten screenshots in each actual API request (eleven screenshots become six and five), splitting further if the encoded payload exceeds 18 MB. `/api/import-ai` accepts `images: [dataURL, ...]`; the legacy `image` field remains supported. Each image counts toward the existing 100-image daily testing cap. The passcode and server-only API key remain unchanged.

Requests use GPT-6 Luna, standard service, low reasoning and verbosity, text JSON output, no tools, and `store: false`. The prompt ignores decorative officer portraits and reconciles overlapping screenshots. No member count is assumed. The browser exposes full source images for review and records response ID, elapsed time, and token totals in Recognized text. Missing levels can be filled by clear matching readings; genuinely conflicting non-null levels remain unchecked. Exact spelling variants remain separate for human review.

### Permanent US$5 Luna import allowance
The service enforces a permanent (non-monthly) conservative USD allowance in `rate_limits`, key `ai-lifetime-usd-micros-v1`. Do not rename/delete/reset this row during routine releases, weekly rollover, planner resets, or API-key rotation. It starts with US$0.10 accounted for earlier, unmetered imports (the dashboard was below this amount when introduced).

Each model call atomically reserves US$0.35 only if the total stays at or below US$5. This covers the published model context ceiling and the configured 12,000-token output ceiling at current standard rates. On a known response, unused reservation is released using a conservative token calculation (uncached input charged at the cache-write ceiling, ignoring cache discounts). If usage is missing, a request times out, or settlement fails, keep the reservation: it may have incurred a charge. Database failures prevent model calls. There are no automatic retries or client-accessible budget resets. Existing per-hour and per-day limits also apply.

The guard can stop early because it must leave room for a complete request. This is a conservative application allowance, not an invoice reconciliation or an OpenAI organization/account-wide cap. It covers this deployed import endpoint only, not direct Playground/API use or local scripts. Keep rates/reservation current when changing the model, token limits, processing tier, or pricing. Current basis: https://developers.openai.com/api/docs/models/gpt-6-luna (checked October 28, 2026).

`GET /api/import-ai/budget` with `X-Import-Passcode` returns limit, accounted/reserved usage, remaining allowance and whether another call can be admitted. It never calls OpenAI. Verify after deployment without spending paid tokens. Test with `node scripts/test-ai-budget.mjs`; tests use SQLite and mock responses, including simultaneous requests near the cap.
