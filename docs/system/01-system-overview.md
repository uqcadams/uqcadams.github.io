# System overview and scope

The system combines four separately meaningful records: a **planning map**, an **alliance roster**, **weekly registration responses**, and **published deployment instructions**. A local map can exist without a room. A shared map can also link to a different room as a read-only roster source and publish instructions back with separate write authority. These are distinct paths, not one universal “sync”. Evidence: planner `createSharedRoom`, `joinSharedRoom`, `syncRosterSource`, `publishLinkedDeployment`; [CAP-068–081](03-feature-catalogue.md#rooms).

## Entrypoints

| Path | Implementation | Boundary |
|---|---|---|
| `/acm1-planner/` | [Inline React class/canvas](../../acm1-planner/index.html) | Local plan, optional collaboration, imports/exports and deployment |
| `/acm1-planner/register/` | [Standalone native DOM/SVG](../../acm1-planner/register/index.html) | Member roster/availability and read-only deployment inspection |
| `/acm1-planner/register/LABEL` | [Root 404 redirect](../../404.html), registration `boot` | GitHub Pages fallback navigates into registration code handling; JavaScript required |
| `/acm1-planner/admin/` | [Standalone native DOM](../../acm1-planner/admin/index.html) | Global room inventory and code/lifecycle administration |
| `/acm1-planner/anchor-test.html` | [Legacy planner](../../acm1-planner/anchor-test.html) | Directly reachable old app, not current navigation; same local-plan storage key |
| Shared-service root | [Worker fetch](evidence/shared-service/worker/index.js#L103) | Informational link to planner; JSON API under `/api/` |
| Repository `/` | [Original portfolio README](../../README.md), [root HTML](../../index.html) | Unrelated portfolio with `js/`, `css/`, `img/`; not planner modules |

The repository has no root package/build manifest or GitHub Actions workflow. Main app dependencies are embedded in HTML; current tests extract a specific inline script position. All repository files are inventoried with hashes in [source-manifest.json](source-manifest.json).

## Terms that must not be collapsed

| Term | Actual meaning |
|---|---|
| Waiting / Planned / Arrived | Pool membership / placed HQ / `hasMoved` in planner |
| Available / Unavailable / Not responded | Registration response status or absence |
| Pending / Approved | Self-enrolled roster review eligibility |
| Deployed / Deployment Updated | Published assigned coordinates and whether prior assignment changed |
| Locked position | Prevent move; independent of all status fields above |
| Locked share | Region percentage stays fixed during redistribution |
| Region / alliance allocation | Strategic polygon; does not physically block HQ footprint spill |
| Capital exclusion / turret / blocked cell | Full HQ footprint prohibited |
| Mud / grass | HQ centre shielding classification relative to green outer perimeter |
| Room closed / code revoked | Room write lifecycle / capability access revoked; neither deletes records |
| Server | Branded generic UI still uses hardcoded coordinate server **759** |

## Discovery coverage and limits

Inspected active entry points, legacy page, unrelated portfolio boundary, recovered documentation, all 13 repository test scripts, seven backend test scripts and 17 historical workspace test scripts. Historical scripts and backend are captured separately with provenance. Source inspection includes less visible helpers and old render paths, but a lexical symbol inventory is not proof that every branch is reachable. No visual/browser/device/game accuracy certification is claimed. The audit does not access real rosters or reveal real access codes.
