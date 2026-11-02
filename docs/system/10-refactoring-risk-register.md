# Refactoring dependency and risk register

These are preservation risks, not approved solutions. Source evidence is in named symbols and [registry](feature-registry.json); automated coverage details are in [test inventory](09-test-coverage.md). Severity reflects potential data/permission/placement impact, not an assertion of an exploited vulnerability.

| ID | Risk / evidence | Severity | Affected capabilities / preservation condition |
|---|---|---|---|
| R01 | `setState` + `componentDidUpdate` combine authorization, reservation reflow, history, saves, publishing and rendering | Critical | All mutations: changing navigation/state ownership must preserve ordering and side effects |
| R02 | Local/shared map/source roster/published map use different identity and persistence boundaries | Critical | CAP-054,068–081: avoid “one sync” replacement that overwrites placements/registration |
| R03 | JSON import strips linked metadata/regenerates pool IDs; null level numeric conversion | High | CAP-056/057: do not advertise lossless room backup; retain captured quirk until explicit migration decision |
| R04 | Legacy anchor-test shares main localStorage key | High | CAP-066/097: unlinked route can overwrite newer local fields |
| R05 | Browser role guards are scattered; server independently owns role/alliance checks | Critical | CAP-074/080/091+: keep server enforcement and permission-dependent navigation together |
| R06 | Centre-vs-footprint semantics differ by rule | Critical | CAP-005–007/044: physical exclusions full footprint, strategic territory centre-only, mud centre-only |
| R07 | Source refresh calls `enableDeploymentPublishing` again and resets versions/signature | High | CAP-079–081: inferred repeated publication and stale-base adoption risk; not tested multi-client |
| R08 | `commitPlan` and direct deployment snapshot publishing not one atomic database transaction | High | CAP-071/081: error may follow plan persistence; clients must not assume every 500 means no write |
| R09 | VM tests depend on fourth literal script element and stub native lifecycle | High | Entire frontend: moving scripts or relying on native drag/focus can bypass coverage |
| R10 | Polygon parts/holes, reserved manual territory, group shares and live rotation coupled | High | CAP-026–039: preserving drawn outline alone can lose holes, allocation or identity |
| R11 | Optimistic before-value patches, week guards and offline drafts | Critical | CAP-071–078: preserve unrelated-field merge vs same-field conflict, archive protections |
| R12 | Permanent spend ledger lives in table called rate_limits | High | CAP-051/099: cleanup or schema migration could reset lifetime allowance |
| R13 | Admin, room and member codes are bearer authority; labels are access credentials | High | CAP-074/082/091+: display/log/export must not inadvertently broaden access |
| R14 | Registration render replaces DOM; inspector view state and gesture guards separate | Medium | CAP-083–091: refresh must not reset gestures/selection or destroy unsaved/conflicted edits |
| R15 | Automatic deployment heuristics not global optimizer; test fixture already stale | High | CAP-040–047: capacity changes alone do not imply geometry regression; never relax exclusions |
| R16 | “Reset can undo” only true for seven snapshot fields | High | CAP-062/063: disconnect/settings loss cannot be inferred recoverable from undo |
| R17 | Different name/tag normalizers + source IDs | High | CAP-022/024/040/078: normalized display grouping is not identity migration |
| R18 | Server validates JSON structure, not physical map rules | High | CAP-005/041/081: alternate clients can submit geometrically invalid assignments |
| R19 | Backend deployment table created at runtime, not initial migration | Medium | Deployment persistence: schema-only restore without route initialization differs |
| R20 | Shared session save suppression and leaving-room memory restore | High | CAP-066/068–070: local reset/join/leave must not destroy separate local map |
| R21 | Mobile touch and desktop native drag/pointer paths differ | High | CAP-014/065/089: VM success does not prove phone usability or accessible equivalents |
| R22 | Public maintenance route and lazy rollover can change week on read | Medium | CAP-076/100: account for time/read side effects, cannot call all GETs storage-pure |
| R23 | Label uniqueness includes revoked codes; admin duplicate creates fresh scope | Medium | CAP-082/096: weekly code naming cannot assume label reuse |

Future considerations: establish browser/device and multi-client fixtures, decide defects explicitly, and require capability-by-capability preservation evidence before reorganizing workflows. No mitigation or redesign is implemented here.
