# Integrations and deployment assumptions

All statements here are pinned-source observations unless explicitly unknown. [Manifest](source-manifest.json), [provenance](evidence/provenance.json), [worker](evidence/shared-service/worker/index.js), planner `readScreenshotsAI`/`readMemberCards`.

| Dependency | Actual boundary | Failure/verification limit |
|---|---|---|
| GitHub Pages | Static repository paths and root 404 fallback | Friendly registration paths rely on JavaScript redirect, not a server rewrite; caching/deployment timing not audited |
| Embedded React/ReactDOM | Controls/state lifecycle in main HTML | Not a package-managed reproducible frontend build; VM tests stub React |
| Embedded polygon-clipping | Region differences, holes, reserved/manual areas | Bundled library source included in symbol inventory; complex geometry robustness not proven exhaustively |
| Canvas and SVG | Main map / separate registration inspector | DOM, DPR, pointer/touch, accessibility and font metrics require real-browser checks |
| Tesseract.js 6.0.1 CDN + language assets | Browser OCR, English/Spanish, card preprocessing/two passes | Availability/network/model download; no accuracy benchmark in current suite; local OCR is not guaranteed offline on fresh load |
| Shared Sites service | Fixed `https://acm1-shared-rooms.duskyfield128.chatgpt.site` | Independently deployed worker version 9; service DB/backups/settings not in frontend Git |
| D1 binding `DB` | SQLite via worker prepared statements/batches | Tests use Python sqlite adapter, not actual platform transactional/rate behaviour |
| OpenAI Responses | Worker-only image extraction, `OPENAI_API_KEY` | Paid calls skipped; current external pricing/model support not verified by this source audit |
| Runtime secrets | `OPENAI_API_KEY`, `AI_IMPORT_PASSCODE`, `ROOM_ADMIN_TOKEN_HASH` | Values never copied/read for this audit. Missing secret yields service error; no secret belongs in frontend |
| Browser storage/clipboard/files | Local plans, session capabilities, import/download | Storage quota, permissions, clipboard support and user device policy external |

## AI import contract

Frontend accepts multiple images, validates image size/type and decoded dimensions, encodes max-side 2800 JPEG quality .95, and balances <=10 images/request, splitting for payload size. Provider requests are serial. Review sources stay in browser memory; cancellation prevents subsequent processing but does not undo a paid server call already accepted.

Worker invokes `/v1/responses` using `gpt-6-luna`, `store:false`, default service tier, low reasoning, low verbosity, text response and 12,000 maximum output tokens, no tools. Prompt requests exact visible usernames/building-icon HQ levels, Unicode/punctuation retention and ignores decorative officer portraits. Inputs are untrusted image content. Parsed JSON rows become names/levels/warnings. These settings describe the snapshot; they are not a current OpenAI product recommendation.

Per-IP attempts, daily image quota and the permanent five-dollar ledger are distinct. Ledger initializes with ten cents historical allowance; each request reserves 350,000 microUSD atomically before provider access. Known valid token usage settles using code constants; missing/invalid/uncertain usage retains conservative reserve. Larger-token rates differ. Unknown outcomes can stop service early. It does not cap separate Playground/API usage or prove actual invoiced spending. Never clear `rate_limits` wholesale to reset throttling. [Budget tests](evidence/shared-service/scripts/test-ai-budget.mjs).

## External contracts not established

Platform backup retention/restore, real scheduled-trigger configuration, browser/device support matrix, OpenAI invoice reconciliation, production rate traffic, service uptime and game coordinate accuracy are not demonstrated by the audit. Published version identity was checked read-only; no fresh paid/image/provider call or live shared-room modification was made.
