# Admin audit

The planner header's **Admin audit** button follows Export. It opens an isolated native dialog containing a responsive reference page. This is public, read-only documentation, not a site-admin authentication or administration screen.

## Content sources

- Features: the canonical `docs/system/feature-registry.json` plus `features.json` for the two new audit capabilities. Historical CAP IDs and the pinned preservation baseline stay unchanged. Counts and groups are derived from content, not hardcoded.
- Workflows: `docs/system/07-behavioural-specifications.md`, parsed as text into the documented FLOW headings and labelled fields. No Markdown HTML is executed.
- API: the canonical `docs/system/openapi.yaml`, shown by Swagger UI 5.35.1. Browser-only operations stay in the catalogue/workflows; they are not invented HTTP endpoints.

Maintain existing feature/endpoint documentation at its canonical source. Add future audit-specific features to `features.json` only where they are not already in the main registry; duplicate identifiers fail visibly rather than hiding an entry. The page displays baseline age and test limitations because this is a reference catalogue, not a live health scan.

## Isolation

`dialog.js` delegates the header click independently of React. It creates a modal without changing Planner state, modes, history, local/session plan storage, roster records or shared-room connections. Escape closes from either iframe level, Close restores header focus, and native dialog modality keeps the underlying planner inert. User-entered search and expansion state exist only in the documentation page.

Swagger assets are bundled locally and lazy-loaded with the API tab. Request execution is disabled with `supportedSubmitMethods:[]`; authorization persistence, external validator and query configuration are disabled. The API frame's CSP permits same-origin asset/document fetches only, blocking connections to the independently hosted service/provider. No service/admin/API key is needed to browse. Failed loading offers Retry and the canonical document link.

## Third-party assets

`vendor/provenance.json` pins official Swagger UI tag v5.35.1, upstream URLs and SHA-256 hashes. Apache-2.0 LICENSE and the distributed bundle's dependency license notices are retained. Updating the bundle requires updating this provenance atomically; the upstream OpenAPI document remains the source of truth.

## Verification

The existing VM suites remain unmodified. The new `tests/browser/admin-audit.cjs` starts a disposable static server, uses an isolated browser context and synthetic roster, and blocks unexpected external network requests. With Playwright and its Chromium installed:

```sh
node tests/browser/admin-audit.cjs
# Or point PLAYWRIGHT_MODULE to an existing Playwright installation.
```

It covers catalogue completeness, filter/search/empty states, related-feature navigation, canonical workflows, real Swagger expansion without execution controls, focus/Escape/reopen, phone-width layout, unchanged saved plan and failure/retry. It is separate from the existing root VM-script glob.

In this development environment, shell-launched Chromium is blocked by the macOS process sandbox. The script was syntax-checked but could not complete here. Equivalent interactive checks in the Codex app browser verified 102 catalogue entries, 10 HQ-filter entries, empty/clear/search/related navigation, 19 workflows, 35 rendered Swagger operations, endpoint expansion, no execution controls, keyboard tabs, Escape/focus restoration, reopen, correct desktop header order and a 390×844 modal without horizontal overflow. Browser console errors were absent. The synthetic-context persistence assertion and injected load-failure/retry scenario still need this standalone browser script to execute in an unrestricted test environment; they are not claimed passed by the interactive check. Physical-device and screen-reader coverage are not established.
