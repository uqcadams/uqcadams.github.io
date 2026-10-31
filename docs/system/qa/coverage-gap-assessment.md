# Coverage and discrepancy assessment

Audit baseline: frontend `5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd`; backend `11235f4c7ebd07fd55f7c8d16f0dc1e73bb62bcc`.

## Coverage classification

The registry was classified from mapped assertion bodies and recorded execution results, not test filenames alone:

- **Direct behavioural coverage:** the mapped test reaches assertions for the capability's core state transition or validation result.
- **Partial assertion coverage:** the test reaches a related path but stops before all assertions or covers only a subset of the contract.
- **Indirect coverage:** another workflow exercises a shared helper or state boundary, but not the capability's complete entry path.
- **No current/new coverage:** the capability is source-inspected or historically supplemented only, with no current/new assertion mapped.

The 33 capabilities that had no current or new mapped test at the start of this QA pass are retained as gaps rather than being upgraded by prose. Their highest-priority classes are:

| Priority | Gap class | Typical capabilities | Required next evidence |
|---|---|---|---|
| P0 | Native input and mode transitions | map navigation, geometry editing, HQ menus, touch/drag paths | Browser/device characterisation of pointer, touch, focus, cancellation and accessibility |
| P0 | Persistence and conflict boundaries | local/shared reset, import/export, offline/conflict recovery | Isolated state fixtures plus multi-client conflict scenarios |
| P1 | Region geometry and allocation | draft completion, node editing, clipping, holes, share/rotation semantics | Deterministic polygon fixtures covering invalid, hole and reservation cases |
| P1 | Registration refresh and inspector state | live form refresh, gestures, scoped UI | Real-browser refresh/gesture checks and conflict assertions |
| P1 | Backend publication and rollover | partial publication, lazy rollover, deployment schema creation | Disposable multi-client/service tests and runtime migration verification |
| P2 | Legacy/UI-only behaviour | welcome, menu, display settings, legacy compatibility | Targeted DOM/browser checks where the path remains supported |

Passing a shared helper test does not establish coverage of its native event wrapper, browser lifecycle, or deployment environment. The registry continues to identify source-inspected and unknown/external boundaries explicitly.

## Existing-test discrepancy investigation

The safe baseline contains 13 current frontend scripts: 12 pass and `quick-deployment.cjs` fails at its capacity assertion (`positions.length < 99`) after packing 99 eligible players. Assertions after that line are not executed. This is retained as a baseline failure; no existing test was edited.

Historical workspace evidence contains **9 passing-current-source scripts, 6 failing-current-source scripts, and 2 inspected-not-run scripts**. The six failures are not six complete failing suites:

- **Five** stop at the obsolete Export-menu button aria-label assertion at line 21.
- **One** (`test-topbar-alliance.cjs`) proceeds farther and stops at the missing inline Minor checkbox assertion at line 44.
- Later assertions in those scripts are unexecuted and are not counted as coverage.
- `test-card-reader.cjs` and `test-pool.cjs` remain inspected-not-run because their original OCR fixtures/dependencies are unavailable; no network or paid OCR was attempted.

Current classifications:

| Observation | Classification | Disposition |
|---|---|---|
| Quick-deployment capacity threshold | Unresolved specification ambiguity between an old expectation and current 99-player packing | Preserve failure; decide capacity contract separately |
| Quick-deployment later assertions | Blocked by earlier assertion | Add independent safe characterisation only if the contract is needed |
| Five historical Export-menu failures | Obsolete test expectation or historical UI fixture mismatch | Preserve evidence; do not claim later coverage |
| Minor checkbox failure | Obsolete UI expectation or unresolved UI contract | Preserve evidence; investigate before any UI redesign |
| OCR scripts not run | Missing fixture/dependency, not an implementation failure | Keep not-run status; add fixture-based benchmark only with approved data |
