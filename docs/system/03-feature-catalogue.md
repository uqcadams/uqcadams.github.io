# Capability catalogue

Baseline `5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd`; audited 2026-10-31. **100 stable capability IDs**. These are implemented contracts, not proposed navigation. [Detailed machine registry](feature-registry.json) records inputs, outputs, triggers, preconditions, models, side effects, tests, risks and verification per entry. [Traceability CSV](traceability-matrix.csv); [execution results](test-results.json).

## Map

### CAP-001 — Coordinate transforms

Pointy odd-r cells convert via axial/cube rounding around 500,500. Negative/parity coordinates require consistent conversion; grid interpretation is provisional rather than verified game geometry.

Implementation: [coordToPx](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L712), [pxToCoord](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L713).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R06, R09, R18, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-002 — Navigation and fit

Wheel and +/- zoom; Fit frames map. Pointer drag pans; touch navigation has separate pinch/drag state. Resizing recalculates canvas dimensions. These native event paths lack browser regression coverage.

Implementation: [wheel](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L704), [zoom](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L765), [fit](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L767), [touchMove](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L704).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R06, R09, R18, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-003 — Grid and coordinate layers

Grid, sparse/all coordinates, labels and zone visibility are display settings. All XY remains subject to zoom readability; toggles do not alter placement validity.

Implementation: [toggleAllCoords](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L787), [draw](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L711).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R06, R09, R18, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-004 — Terrain style

Classic and terrain views recolour mud brown and grass green. Map style persists separately from plan JSON. Terrain rendering must not change classification or geometry.

Implementation: [draw](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L711), [renderTools](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1203).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R06, R09, R18, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-005 — Cell-edge capital exclusion

Inclusive excluded cell centres produce a shared-edge-cancelled outer outline. Every HQ footprint cell is checked; crossing the red boundary is invalid even when the centre is clear.

Implementation: [capitalCells](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L452), [hexOuterEdges](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L459), [geomStatus](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L487).

Tests: [quick-deployment.cjs](../../tests/quick-deployment.cjs), [roster-drop-preview.cjs](../../tests/roster-drop-preview.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R06, R09, R18, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-006 — Defined turret exclusions

Three fixed filled labelled polygons block all intersecting footprint cells. They remain exclusions regardless of strategic alliance allocation.

Implementation: [TURRETS](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L433), [geomStatus](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L487).

Tests: [quick-deployment.cjs](../../tests/quick-deployment.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R06, R09, R18, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-007 — Mud and shielding classification

Outer green perimeter follows cell edges. Centre inside mud cannot shield; centre outside can shield even if radius-one footprint enters mud. Both terrains permit placement when other checks pass.

Implementation: [canShield](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L473), [capitalCells](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L452).

Tests: [registration-deployment.cjs](../../tests/registration-deployment.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R06, R09, R18, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-008 — Manual blocked cells

Exclude mode toggles clicked cell keys. Clear requires confirmation. Exclusions affect movement, generated positions and quick deployment; included in plan history and exports.

Implementation: [toggleExcluded](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L722), [clearExcluded](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L792), [tabExclusions](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1031).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R06, R09, R18, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-009 — Editable zone geometry

Outer/inner vertex controls and reset affect all derived geometry. Arrays are cache keys; replace arrays rather than mutate in place. Default geometry is provisional.

Implementation: [setVertex](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L802), [resetZones](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L803), [tabGeometry](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1035).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R06, R09, R18, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-010 — Validation display

Validation reports invalid existing placements; it does not silently repair them. Imported/previous positions may become invalid after boundary changes.

Implementation: [tabValidation](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1036), [geomStatus](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L487).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R06, R09, R18, R21 in [risk register](10-refactoring-risk-register.md).

## HQ

### CAP-011 — Add player drawer

Name/alliance/level/colour/lock settings precede choose-map or highlighted-cell placement; optional coordinates use the same placement validation. Deeper right details remain separately accessible.

Implementation: [openAddPlayer](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1132), [renderAddForm](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1199), [placeAtHighlightedCell](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1133).

Tests: [alliance-tag-matching.cjs](../../tests/alliance-tag-matching.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R05, R06, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-012 — Direct empty-cell deployment

Right-click empty cell opens quick add at that cell with editable identity/colour. It must preserve blocked footprint and existing HQ checks.

Implementation: [openCellMenu](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L884), [quickDeploy](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L886).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R05, R06, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-013 — HQ move and map dragging

Select-to-move and drag update integer centres. Locked positions cannot move. Mode/selected task determines click semantics and cancellation restores normal navigation.

Implementation: [startHQDrag](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1187), [selectHQToMove](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L895), [applyCellTap](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L722).

Tests: [alliance-focus-roster-drag.cjs](../../tests/alliance-focus-roster-drag.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R05, R06, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-014 — Roster drag onto map

Waiting or unlocked placed players can be dragged from sidebar. Show seven-cell validity preview with name, HQ level and X/Y; invalid/leave/end clears target without moving data.

Implementation: [startRosterDrag](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1110), [mapDragOver](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1112), [mapDrop](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1113).

Tests: [alliance-focus-roster-drag.cjs](../../tests/alliance-focus-roster-drag.cjs), [roster-drop-preview.cjs](../../tests/roster-drop-preview.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R05, R06, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-015 — Position lock

Lock prevents accidental drag/move, independent of arrived status and registration confirmation. It remains editable via eligible menus/details.

Implementation: [updateHQ](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L717), [renderHQMenu](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L897).

Tests: [alliance-focus-roster-drag.cjs](../../tests/alliance-focus-roster-drag.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R05, R06, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-016 — Rename and metadata editing

HQ and waiting entries permit name/alliance/level/colour edits; context rename selects full name for replacement. Editing alliance membership changes filtering/deployment eligibility.

Implementation: [updateHQ](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L717), [updatePool](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1135), [renderHQMenu](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L897).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R05, R06, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-017 — Confirm in-game arrival

hasMoved records arrived in-game independently of registration availability. Planner never teleports an actual game HQ.

Implementation: [renderHQMenu](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L897), [renderPlayerDetails](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1204).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R05, R06, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-018 — Delete deployed or waiting player

Context menus and detail removal delete selected entity, with confirmation where implemented. Anchor removal clears anchor; history only covers plan fields.

Implementation: [remove](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L477), [renderPoolMenu](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L897), [renderHQMenu](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L897).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R05, R06, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-019 — Anchor selection and ring

Any existing HQ can be anchor; optional radius-two perimeter is display-only. Lock and anchor are separate concepts; default is no hardcoded commander.

Implementation: [setAnchor](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L769), [anchorHQ](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L768).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R05, R06, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-020 — Anchor-relative formations

Formation offsets/count use current anchor; invalid generated targets are skipped. Requires valid anchor, validates bounds/count and respects existing/blocked placements.

Implementation: [generate](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L795), [renderFormation](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1202).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R05, R06, R21 in [risk register](10-refactoring-risk-register.md).

## Roster

### CAP-021 — Search placement status and sorting

Search name/alliance/level combines All/Waiting/Planned/Arrived, alliance and registration filters. Original/name/level/terrain ordering preserves displayed name and level.

Implementation: [sectionLeft](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1197), [selected](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L277).

Tests: [alliance-roster-filter.cjs](../../tests/alliance-roster-filter.cjs), [deployment-packing.cjs](../../tests/deployment-packing.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-022 — Alliance filter and counts

NFKC, trim and case folding group tags; Unassigned distinguishes blanks. Missing filter option resets. Filter does not delete or retag players.

Implementation: [rosterAllianceKey](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1192), [rosterAllianceOptions](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L708), [rosterAllianceMatches](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1194).

Tests: [alliance-roster-filter.cjs](../../tests/alliance-roster-filter.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-023 — Registration preview and response filter

Cards show available/unavailable/no response, hours/terrain/notes indicators. Responded means a record exists, not necessarily available; filters combine with other roster conditions.

Implementation: [rosterResponse](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L627), [rosterResponseMatches](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L628), [renderRosterResponse](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L630).

Tests: [roster-sync.cjs](../../tests/roster-sync.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-024 — Assign unassigned alliance

Explicit bulk tag action recovers blank imported tags and supports undo. Existing nonblank foreign alliances must remain unchanged.

Implementation: [unassignedRoster](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1068), [assignUnassignedRoster](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1069).

Tests: [alliance-tag-matching.cjs](../../tests/alliance-tag-matching.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R17 in [risk register](10-refactoring-risk-register.md).

## Regions

### CAP-025 — Strategic overlay and mode

Regions are planning allocations, not placement blockers. Region mode recolours interface and changes map interactions. Hidden overlays and editing modes gate hit testing.

Implementation: [allianceMode](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1190), [displayRegions](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L718), [renderRegionTask](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1165).

Tests: [recovered-alliance-workflows.cjs](../../tests/recovered-alliance-workflows.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-026 — Start manual boundary at capital

Starts at world capital origin 500,500. First explicit origin click still supplies marker feedback; later origin click closes when enough corners exist. Points are not snapped to hexes.

Implementation: [beginRegion](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1146), [addRegionPoint](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L722).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-027 — Boundary draft undo redo cancel

Draft point history is independent of plan undo. Undo removes last point, redo restores; cancel discards draft without creating saved region.

Implementation: [undoRegionPoint](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L788), [redoRegionPoint](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1154), [cancelTask](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L788).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-028 — Boundary completion and appearance

Close shape opens label/colour/opacity review; Complete commits. Choose an unused colour automatically. Invalid or self-intersecting geometry is rejected.

Implementation: [finishRegion](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L788), [renderBoundaryDetails](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1157), [unusedLayoutColour](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1126).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-029 — Drag and simplify boundary nodes

Existing/draft corners drag in world coordinates; redundant straight-line nodes simplify. Drag and pan must remain distinct; self-intersection validation still applies.

Implementation: [beginNodeDrag](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L715), [moveBoundaryNode](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L717), [simplifyBoundary](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1141).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-030 — Manual reservations and grass extension

Manual territory reserves space before quick slices. Grass extension scales planning extent approximately twelve hexes; subtraction/reflow avoids overlap. Complex polygon holes must remain represented.

Implementation: [setManualGrass](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1115), [reflowReservedRegions](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L648).

Tests: [recovered-alliance-workflows.cjs](../../tests/recovered-alliance-workflows.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-031 — Equal-area quick layout

Generate 1–36 weighted equal-area slices over full or half domain; manual reservations are removed first. Area allocation is not simply equal angles. Centre/valid domain preconditions apply.

Implementation: [generateAllianceLayout](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1126), [layoutFootprint](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1125).

Tests: [recovered-alliance-workflows.cjs](../../tests/recovered-alliance-workflows.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-032 — Applied and additional layouts

Generate becomes Update for applied group; additional layout creates another version. Selection controls visible group and editing state; stable group and region identities matter.

Implementation: [appliedLayout](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L718), [selectLayout](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1062), [additionalLayout](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1063).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-033 — Live layout rotation

Rotation updates saved regions immediately. Displayed zero includes physical +90-degree orientation. Do not confuse control degrees with old persisted offset.

Implementation: [setLiveRotation](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1054), [updateLayoutGroup](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1054).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-034 — Major minor allocation

Major labels use weight two, minor one. Minor checkbox updates live; changing tier redistributes eligible shares rather than requiring a regenerate-from-scratch flow.

Implementation: [setRegionTier](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1056), [weightedLayoutShares](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1055).

Tests: [recovered-alliance-workflows.cjs](../../tests/recovered-alliance-workflows.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-035 — Live region appearance

Inline label/colour/opacity edits immediately update map and persistence. Renaming a boundary is not necessarily bulk retagging all existing roster members.

Implementation: [updateRegionLive](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1064), [renderInlineRegion](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1105).

Tests: [alliance-focus-roster-drag.cjs](../../tests/alliance-focus-roster-drag.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-036 — Share resize and locked percentages

Locked shares stay fixed; unlocked shares redistribute proportionally within remaining allocation. Insufficient unlocked allocation must not corrupt totals or geometry.

Implementation: [resizeRegionShare](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1115), [toggleRegionShareLock](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1066).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-037 — Reorder alliance slices

Up/down, position select, native drag and map/pointer reorder change angular sequence live while retaining share/name. Multi-group reorder must remain scoped.

Implementation: [reorderRegion](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1043), [dropRegion](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1043), [regionPointerUp](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1050).

Tests: [recovered-alliance-workflows.cjs](../../tests/recovered-alliance-workflows.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-038 — Delete region or layout group

Delete saved region or whole group is distinct; confirmation and reflow update remaining geometry. Historical group-render method exists even when primary navigation uses applied layout controls.

Implementation: [removeRegion](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1160), [deleteLayoutGroup](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1120).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

### CAP-039 — Alliance focus inspector

Double-click visible region opens right inspector. Counts use HQ centres inside polygon excluding holes, split mud/grass and matching normalized tag. Waiting players excluded.

Implementation: [focusRegion](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L720), [allianceFocusCounts](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1104), [renderAllianceFocus](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1105).

Tests: [alliance-focus-roster-drag.cjs](../../tests/alliance-focus-roster-drag.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R10, R17 in [risk register](10-refactoring-risk-register.md).

## Deployment

### CAP-040 — Eligibility and alliance matching

Eligible waiting players match focused region alliance; removed/pending/unavailable/locked or foreign players excluded as applicable. Imported tag normalization must agree with region matching.

Implementation: [quickDeployRoster](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1092), [deploymentExclusion](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1073).

Tests: [alliance-tag-matching.cjs](../../tests/alliance-tag-matching.cjs), [registration-deployment.cjs](../../tests/registration-deployment.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R06, R11, R15, R18 in [risk register](10-refactoring-risk-register.md).

### CAP-041 — Registration-constrained placement

Optional registration use requires approved available response covering entire selected window. Mud/grass preference constrains centre; disabling registration filtering permits eligible unregistered players.

Implementation: [deploymentRegistration](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L627), [deploymentTerrain](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1074).

Tests: [registration-deployment.cjs](../../tests/registration-deployment.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R06, R11, R15, R18 in [risk register](10-refactoring-risk-register.md).

### CAP-042 — Standard spacing and mud priority

Standard minimum centre distance four leaves an empty hex between radius-one footprints. Fill mud first then grass; footprint cannot overlap blocked cells or existing HQs.

Implementation: [buildStandardDeployment](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1085), [quickDeployFits](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1085).

Tests: [quick-deployment.cjs](../../tests/quick-deployment.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R06, R11, R15, R18 in [risk register](10-refactoring-risk-register.md).

### CAP-043 — Compact packing alternatives

Compact hex and row trials allow distance three with touching footprints, never overlap. Try multiple phases/directions and retain better feasible result; heuristic has no global optimality guarantee.

Implementation: [buildQuickDeployment](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1085), [deploymentGap](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1081).

Tests: [deployment-packing.cjs](../../tests/deployment-packing.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R06, R11, R15, R18 in [risk register](10-refactoring-risk-register.md).

### CAP-044 — Boundary centre containment

Only HQ centre must belong to chosen allocation and not its holes; outer footprint may spill into adjacent alliance allocation. Capital/turret/manual exclusions still apply to full footprint.

Implementation: [quickDeployFits](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1085).

Tests: [preview-territory.cjs](../../tests/preview-territory.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R06, R11, R15, R18 in [risk register](10-refactoring-risk-register.md).

### CAP-045 — Preview labels and cancellation

Preview leaves plan untouched, shows names/levels and coordinates, totals and leftovers. Cancel invalidates asynchronous run token and drops draft positions.

Implementation: [previewQuickDeployment](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1098), [drawDeploymentPreviewLabels](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1088), [renderDeploymentPreviewPlayers](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1089).

Tests: [preview-territory.cjs](../../tests/preview-territory.cjs), [quick-deployment.cjs](../../tests/quick-deployment.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R06, R11, R15, R18 in [risk register](10-refactoring-risk-register.md).

### CAP-046 — Apply preview and stale protection

Signature change refuses stale preview; apply rechecks current placement constraints. Accepted players move pool to homes with identity retained; leftovers remain waiting. Undo restores snapshot.

Implementation: [quickDeploySignature](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1093), [applyQuickDeployment](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1099).

Tests: [quick-deployment.cjs](../../tests/quick-deployment.cjs), [deployment-packing.cjs](../../tests/deployment-packing.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R06, R11, R15, R18 in [risk register](10-refactoring-risk-register.md).

### CAP-047 — Recall all deployments

Confirmed recall returns all homes to waiting including arrived/locked, strips positions and lock/arrival state, clears anchor, retains roster metadata/registrations/regions. Scope is all deployed players, not sidebar filter.

Implementation: [recallDeployments](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1083).

Tests: [deployment-packing.cjs](../../tests/deployment-packing.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R06, R11, R15, R18 in [risk register](10-refactoring-risk-register.md).

## Import

### CAP-048 — Multi-file select and drop

Choose/drop appends screenshots; upload count is not capped at ten. Decode/type/size checks, progress and cancellation are transient; raw images are not plan-persisted.

Implementation: [uploadRosterScreenshots](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L908), [renderScreenshotImport](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1018).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R02, R03, R12 in [risk register](10-refactoring-risk-register.md).

### CAP-049 — Balanced AI batches

At most ten images per provider request; eleven distributes six plus five. Payload-size splitting may add requests. Requests execute serially, with elapsed time/provider usage displayed.

Implementation: [balancedScreenshotBatches](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L909), [readScreenshotsAI](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L908).

Tests: [preservation.cjs](tests/preservation.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R03, R12 in [risk register](10-refactoring-risk-register.md).

### CAP-050 — AI image extraction

Server invokes configured Luna Responses model with low reasoning/verbosity, no tools/store, text JSON and prompt ignoring decorative officers. Server secret never enters frontend; passcode gates testing.

Implementation: [aiImport](evidence/shared-service/worker/index.js#L45).

Tests: [test-ai-import.mjs](evidence/shared-service/scripts/test-ai-import.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R03, R12 in [risk register](10-refactoring-risk-register.md).

### CAP-051 — Permanent AI spend ledger

Server atomically reserves conservative cost before paid calls; lifetime allowance five USD seeded ten cents. Missing/unknown cost retains reserve; exhaustion fails closed. This is service accounting, not account-wide invoicing.

Implementation: [reserveAIBudget](evidence/shared-service/worker/index.js#L41), [settleAIBudget](evidence/shared-service/worker/index.js#L42).

Tests: [test-ai-budget.mjs](evidence/shared-service/scripts/test-ai-budget.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R03, R12 in [risk register](10-refactoring-risk-register.md).

### CAP-052 — Local OCR double reading

Tesseract browser worker reads cropped cards/leader in two passes; confidence/disagreement creates review flags. CDN/language downloads require network; no paid API involved.

Implementation: [readScreenshots](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L908), [readMemberCards](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L973).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R02, R03, R12 in [risk register](10-refactoring-risk-register.md).

### CAP-053 — Review uncertain names and levels

Source images/crops and row warnings support correction, selection, merge/discard and explicit confirmation. Missing level/name uncertainty must not silently become trusted exact data.

Implementation: [ocrReviewReasons](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1006), [renderOCRReview](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1013), [editOCRRow](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1008).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R02, R03, R12 in [risk register](10-refactoring-risk-register.md).

### CAP-054 — Deduplicate and add to local roster

Selected valid rows add placeable waiting players; compare existing names and merge duplicate readings. Local Add to roster does not reconcile a shared registration alliance roster automatically.

Implementation: [mergeOCRRows](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1010), [importRosterPool](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1012).

Tests: [alliance-tag-matching.cjs](../../tests/alliance-tag-matching.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R03, R12 in [risk register](10-refactoring-risk-register.md).

### CAP-055 — Shared alliance roster review

Separate coordinator review/reconcile computes added/retained/removed against chosen alliance. Apply requires server version and preserves appropriate identities/registration records; replacing roster is not local import.

Implementation: [useScreenshotRoster](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L675), [previewRoomRoster](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L677), [applyRoomRoster](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L678).

Tests: [roster-sync.cjs](../../tests/roster-sync.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R03, R12 in [risk register](10-refactoring-risk-register.md).

## Export

### CAP-056 — Plan JSON download

Exports plan geometry/HQs/pool/regions and display subset; excludes server registrations and credentials. Treat as plan interchange, not complete shared-room backup.

Implementation: [export](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L681), [tabGameExport](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L820).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R03, R09 in [risk register](10-refactoring-risk-register.md).

### CAP-057 — Plan JSON restore

Parses and reconstructs whitelisted player fields, regenerates some pool IDs and drops source mapping metadata. Null level numeric conversion and identity loss are compatibility hazards; not a lossless round trip.

Implementation: [importJSON](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L838).

Tests: [preservation.cjs](tests/preservation.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R03, R09 in [risk register](10-refactoring-risk-register.md).

### CAP-058 — CSV and game coordinate output

Coordinates use Name — [#:759 X:n Y:n]; CSV/game text export include eligible placed HQs. Locked/existing terminology differs from arrived status; clipboard failure needs fallback.

Implementation: [coordinateHomes](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L805), [copyGameCoordinates](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L815), [downloadGameCoordinates](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L816).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R03, R09 in [risk register](10-refactoring-risk-register.md).

### CAP-059 — Map PNG and current-view snapshot

Canvas image downloads include current display state. Snapshot crops current viewport versus broader map export. Browser canvas, file download and clipboard require runtime checks beyond VM tests.

Implementation: [snapshotCurrentView](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L1040), [export](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L681).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R03, R09 in [risk register](10-refactoring-risk-register.md).

## UI

### CAP-060 — Welcome and optional tutorials

Landing modal links boundary generation, roster import and placement tasks with short next-page guidance. Skip preference persists and can be re-enabled via Welcome.

Implementation: [openWelcome](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L937), [chooseWelcomeTask](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L940), [launchWelcomeTask](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L940).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R09, R16, R20, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-061 — Styled confirmation and notices

Confirmation returns asynchronous decision; footer messages convey success/error. Destructive actions defer mutation until confirmation. Focus, Escape and keyboard semantics need browser verification.

Implementation: [requestConfirmation](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L662), [renderConfirmation](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L775).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R09, R16, R20, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-062 — Reset all local plan

Reset clears homes/pool/regions/geometry/manual blocks/anchor and relevant controls after explicit confirmation. Snapshot undo is narrower than every setting; separate terrain/tutorial keys and remote room records are not full-reset backups.

Implementation: [resetAll](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L776).

Tests: [preservation.cjs](tests/preservation.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R09, R16, R20, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-063 — Plan undo redo

Snapshot seven plan fields only; maximum eighty entries and 900ms coalescing. Display controls, credentials and registration bodies are outside history. Incoming shared state rebases history.

Implementation: [planSnapshot](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L644), [recordHistory](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L708), [travelHistory](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L788).

Tests: [quick-deployment.cjs](../../tests/quick-deployment.cjs), [alliance-tag-matching.cjs](../../tests/alliance-tag-matching.cjs), [preservation.cjs](tests/preservation.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R01, R09, R16, R20, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-064 — Keyboard and task cancellation

Ctrl/Meta Z and redo, Escape and deletion interact with focused inputs/tasks. Map draft, menu, selection and shared permission gates must retain precedence.

Implementation: [keyDown](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L704), [cancelTask](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L788).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R09, R16, R20, R21 in [risk register](10-refactoring-risk-register.md).

### CAP-065 — Responsive panels and touch

Sidebar/details/tool drawers and mobile breakpoints alter visibility. Native HTML drag is not equivalent to touch; touch select/deploy remains separate path. Desktop VM tests do not prove phone usability.

Implementation: [onResize](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L704), [touchStart](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L704), [touchEnd](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L704).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R01, R09, R16, R20, R21 in [risk register](10-refactoring-risk-register.md).

## Persistence

### CAP-066 — Browser local plan

acm1-territory-planner-v1 stores local plan/display fields and optional source link. Save is suppressed while in shared session; parse failure falls back. No schema envelope/migration framework exists.

Implementation: [load](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L615), [save](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L632).

Tests: [preservation.cjs](tests/preservation.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R03, R04, R16, R20 in [risk register](10-refactoring-risk-register.md).

### CAP-067 — Session resumption and drafts

Shared bearer session resumes from sessionStorage; per-room local draft retains pending plan/baseline/week for explicit recovery. Drafts cannot be replayed blindly into a new week.

Implementation: [roomBoot](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L649), [stashRoomDraft](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L655), [restoreRoomDraft](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L661).

Tests: [roster-sync.cjs](../../tests/roster-sync.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R03, R04, R16, R20 in [risk register](10-refactoring-risk-register.md).

## Rooms

### CAP-068 — Create shared room

Create copies current local plan into remote instance and returns coordinator/viewer codes. Local plan memory remains separate for leaving. No account sign-in; possession of code grants access.

Implementation: [createSharedRoom](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L652).

Tests: [test-server.mjs](evidence/shared-service/scripts/test-server.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-069 — Join shared room

Join replaces displayed map with remote plan and session capability, not a merge with existing local map. Validate code, room lifecycle, week and feature flags.

Implementation: [joinSharedRoom](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L649), [applyRoomState](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L652).

Tests: [roster-sync.cjs](../../tests/roster-sync.cjs), [test-server.mjs](evidence/shared-service/scripts/test-server.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-070 — Leave or copy room locally

Leaving restores prior local map; explicit copy can replace local plan after confirmation. Pending draft preservation and session removal have different consequences.

Implementation: [leaveSharedRoom](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L662).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-071 — Optimistic plan changes

Client sends per-field before/presence changes with week. Server merges unrelated concurrent fields, retries optimistic DB version, rejects same-field conflicts with latest state.

Implementation: [flushRoomChanges](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L656), [commitPlan](evidence/shared-service/worker/index.js#L29).

Tests: [test-server.mjs](evidence/shared-service/scripts/test-server.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-072 — Polling and offline drafts

650ms save debounce and five-second visible-page polling pause around drag/conflict/archive. Failed writes leave draft for recovery; no guarantee of instantaneous cross-browser delivery.

Implementation: [queueRoomSave](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L656), [pollSharedRoom](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L649).

Verification: source inspection only; no current-baseline automated test mapped.

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-073 — Conflict resolution and history merge

Keep mine/use latest/download draft are explicit choices. Server restore is a new inverse edit, not database time travel; archived instances are read-only.

Implementation: [resolveRoomConflict](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L660), [mergeRoomHistory](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L657).

Tests: [test-server.mjs](evidence/shared-service/scripts/test-server.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-074 — Codes and role scoping

Coordinator controls room/settings; officer edits alliance entities; member submits alliance registration; viewer reads. Frontend permission guards supplement server checks, not replace them.

Implementation: [createRoomCode](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L665), [revokeRoomCode](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L666), [roomCanChange](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L574).

Tests: [test-server.mjs](evidence/shared-service/scripts/test-server.mjs), [test-room-admin.mjs](evidence/shared-service/scripts/test-room-admin.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-075 — Feature settings and close state

Registration/alliance access/weekly flags default false. Global admin close prevents writes while preserving plan/responses. Reopening and revoking codes are distinct operations.

Implementation: [updateRoomSettings](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L667), [config](evidence/shared-service/worker/index.js#L17).

Tests: [test-room-admin.mjs](evidence/shared-service/scripts/test-room-admin.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-076 — Weekly rollover and archive

Sunday midnight UTC−2 creates new instance lazily/scheduled; old plan archived, roster rolled to waiting, boundaries carried and new responses empty. Closed rooms do not roll over.

Implementation: [rollover](evidence/shared-service/worker/index.js#L26), [weekKey](evidence/shared-service/worker/index.js#L14), [schedule](evidence/shared-service/worker/index.js#L15).

Tests: [test-server.mjs](evidence/shared-service/scripts/test-server.mjs), [preservation.cjs](tests/preservation.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-077 — Shared history and restore

Coordinator can inverse restore eligible current-week plan/roster edits; member history limited to own alliance and recent twenty edits. Actor is self-reported, not authenticated identity.

Implementation: [loadRoomHistory](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L670), [restoreRoomEdit](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L671).

Tests: [test-server.mjs](evidence/shared-service/scripts/test-server.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-078 — Linked roster source

Read-only source join imports/remaps source identities and responses while keeping local geometry and existing placements. Scoped member code limits alliance; source map positions are not copied.

Implementation: [syncRosterSource](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L644), [rosterSourceData](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L641).

Tests: [roster-sync.cjs](../../tests/roster-sync.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-079 — Roster refresh and removals

Fifteen-second visible refresh; missing waiting players removed, placed missing players flagged. Week change requires explicit sync. Disconnect retains imported players but stops live source association.

Implementation: [syncRosterSource](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L644), [disconnectRosterSource](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L645).

Tests: [roster-sync.cjs](../../tests/roster-sync.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-080 — Deployment publisher connection

Publishing needs matching source room coordinator/officer or site-admin authority. Credentials are session-only; source read code alone may not publish. Wrong-room validation and explicit enable/pause apply.

Implementation: [enableDeploymentPublishing](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L635), [deploymentPublishAuth](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L633).

Tests: [deployment-publisher.cjs](../../tests/deployment-publisher.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-081 — Publish positions to registration

One-second debounce posts per-alliance stable source IDs and map geometry with version. Unchanged signature suppresses repeat writes; 409 pauses/error rather than silently overwriting another map.

Implementation: [queueDeploymentPublish](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L635), [publishLinkedDeployment](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/index.html#L636), [writeDeployment](evidence/shared-service/worker/index.js#L70).

Tests: [deployment-publisher.cjs](../../tests/deployment-publisher.cjs), [test-live-deployment.mjs](evidence/shared-service/scripts/test-live-deployment.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R02, R05, R07, R08, R11, R13, R19, R20, R22 in [risk register](10-refactoring-risk-register.md).

## Registration

### CAP-082 — Code entry and friendly links

Standalone register page accepts member code; /register/LABEL uses GitHub Pages 404 redirect into code query then clean path. Friendly labels are access credentials, globally unique including revoked codes.

Implementation: [storedCode](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/register/index.html#L12), [join](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/register/index.html#L20).

Tests: [quick-registration.cjs](../../tests/quick-registration.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R14, R17, R21, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-083 — Scoped roster listing and search

Member page shows own alliance imported roster and pending self-enrolled entries, with name/HQ/status. Does not expose full planner editing controls.

Implementation: [render](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/register/index.html#L24), [memberState](evidence/shared-service/worker/index.js#L74).

Tests: [test-member-registration.mjs](evidence/shared-service/scripts/test-member-registration.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R14, R17, R21, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-084 — Availability quick toggles

Before Clash and During Clash can both be selected; Unavailable clears both. Autosave uses response version; unconfirmed/no record differs from unavailable response.

Implementation: [registrationBody](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/register/index.html#L10), [availabilityPatch](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/register/index.html#L18).

Tests: [quick-registration.cjs](../../tests/quick-registration.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R14, R17, R21, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-085 — Mud grass preference

Terrain toggle persists placement preference consumed by deployment. Preferred role is a separate server field retained for compatibility; UI wording must not conflate them.

Implementation: [registrationBody](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/register/index.html#L10).

Tests: [quick-registration.cjs](../../tests/quick-registration.cjs), [registration-deployment.cjs](../../tests/registration-deployment.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R14, R17, R21, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-086 — Notes modal and preservation

Optional notes autosave while preserving custom hours and other hidden response fields. Avoid replacing rich response with incomplete quick-toggle payload.

Implementation: [registrationBody](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/register/index.html#L10).

Tests: [quick-registration.cjs](../../tests/quick-registration.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R14, R17, R21, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-087 — Missing member enrolment

Name/level with availability submission adds pending member; duplicate detection and officer approve/reject/merge control eligibility. Self-enrolment does not automatically approve deployment.

Implementation: [selfEnroll](evidence/shared-service/worker/index.js#L76), [reviewEnrollment](evidence/shared-service/worker/index.js#L77).

Tests: [test-member-registration.mjs](evidence/shared-service/scripts/test-member-registration.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R14, R17, R21, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-088 — Edit version conflict and reload

Each save uses existing version; stale edits return 409/latest. UI reloads or offers recovery; last writer must not silently erase another response.

Implementation: [registration](evidence/shared-service/worker/index.js#L31), [registrationBody](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/register/index.html#L10).

Tests: [quick-registration.cjs](../../tests/quick-registration.cjs), [test-member-registration.mjs](evidence/shared-service/scripts/test-member-registration.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R14, R17, R21, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-089 — Live deployment status

Not Deployed/Deployed/Deployment Updated derive from current vs prior assigned centre. Updated stays orange until subsequent semantics change; copying coordinates is not acknowledgement or arrival.

Implementation: [memberState](evidence/shared-service/worker/index.js#L74), [writeDeployment](evidence/shared-service/worker/index.js#L70).

Tests: [test-live-deployment.mjs](evidence/shared-service/scripts/test-live-deployment.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R14, R17, R21, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-090 — Deployment map live inspector

Scoped map supports +/- and wheel anchored zoom, pan/Fit and HQ selection with identity/coordinates. No HQ drag/edit; view state remains in-memory across refresh while page lives.

Implementation: [inspectorZoom](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/register/index.html#L30).

Tests: [registration-inspector.cjs](../../tests/registration-inspector.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R14, R17, R21, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-091 — Live refresh and coordinate copy

Page polls deployment/registration data and displays checked/updated timestamps. Copy uses assigned server/X/Y; planner moves do not move game HQ. Native clipboard/events not tested end-to-end.

Implementation: [render](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/register/index.html#L24), [memberState](evidence/shared-service/worker/index.js#L74).

Tests: [test-live-deployment.mjs](evidence/shared-service/scripts/test-live-deployment.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R14, R17, R21, R23 in [risk register](10-refactoring-risk-register.md).

## Admin

### CAP-092 — Admin authentication and inventory

Separate global admin key opens all open/closed/access-revoked rooms, not merely room coordinator's room. Redacted summaries paginate; key kept in sessionStorage.

Implementation: [requireSiteAdmin](evidence/shared-service/worker/index.js#L83), [adminRooms](evidence/shared-service/worker/index.js#L85), [render](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/admin/index.html#L12).

Tests: [test-room-admin.mjs](evidence/shared-service/scripts/test-room-admin.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-093 — Room detail codes and audit

Expanded room lists scoped codes/history/archives. Raw code only revealed by explicit authorised request; no roster hard-delete endpoint exists.

Implementation: [roomAdminRoute](evidence/shared-service/worker/index.js#L90), [render](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/admin/index.html#L12).

Tests: [test-room-admin.mjs](evidence/shared-service/scripts/test-room-admin.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-094 — Close reopen and revoke access

Close preserves records read-only; reopen restores room writes. Revoke one/all code disables access but does not delete room or data.

Implementation: [roomAdminRoute](evidence/shared-service/worker/index.js#L90), [render](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/admin/index.html#L12).

Tests: [test-room-admin.mjs](evidence/shared-service/scripts/test-room-admin.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-095 — Open planner and member page

Admin generates current coordinator planner URL and member registration links. Requires active corresponding code; closed/disabled registration conditions return explicit errors.

Implementation: [registrationURL](evidence/shared-service/worker/index.js#L86), [roomAdminRoute](evidence/shared-service/worker/index.js#L90), [render](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/admin/index.html#L12).

Tests: [test-room-admin.mjs](evidence/shared-service/scripts/test-room-admin.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R23 in [risk register](10-refactoring-risk-register.md).

### CAP-096 — Change code and duplicate room

Code replacement revokes old atomically. Duplicate copies plan/roster into fresh room/code set without responses/archives; no automatic link of future edits between copies.

Implementation: [adminReplaceCode](evidence/shared-service/worker/index.js#L87), [adminDuplicateRoom](evidence/shared-service/worker/index.js#L88), [render](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/admin/index.html#L12).

Tests: [test-room-admin.mjs](evidence/shared-service/scripts/test-room-admin.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R05, R13, R23 in [risk register](10-refactoring-risk-register.md).

## Legacy

### CAP-097 — Legacy anchor test page

Unlinked anchor-test is directly reachable with old planner behaviour and same localStorage key. Running it can overwrite fields newer planner expects; preserve as separate entrypoint, do not treat as current UI.

Implementation: [startBlankBattle](https://github.com/uqcadams/uqcadams.github.io/blob/5f6f7af6aba82d7e585d10098ad2e1b4fa98e7dd/acm1-planner/anchor-test.html#L435).

Tests: [preservation.cjs](tests/preservation.cjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R04 in [risk register](10-refactoring-risk-register.md).

## Integration

### CAP-098 — Service CORS and error envelopes

Only GitHub origin, service origin and localhost numeric ports accepted. OPTIONS 204; JSON errors carry error and optional conflict metadata. Browser requests differ from server-to-server originless calls.

Implementation: [fetch](evidence/shared-service/worker/index.js#L103).

Tests: [test-server.mjs](evidence/shared-service/scripts/test-server.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R08, R12, R18, R19, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-099 — AI quota and provider failure

Daily image and per-IP attempt quotas coexist with lifetime cost reservation. Timeouts/invalid provider output fail with styled client error; cancellation cannot refund a completed external request.

Implementation: [aiQuota](evidence/shared-service/worker/index.js#L35), [aiImport](evidence/shared-service/worker/index.js#L45).

Tests: [test-ai-import.mjs](evidence/shared-service/scripts/test-ai-import.mjs), [test-ai-budget.mjs](evidence/shared-service/scripts/test-ai-budget.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R08, R12, R18, R19, R22 in [risk register](10-refactoring-risk-register.md).

### CAP-100 — Public maintenance route

POST weekly maintenance is dispatched before room/admin auth. It only rolls eligible open weekly rooms; public trigger exposure is an existing contract/risk, not an audit change.

Implementation: [route](evidence/shared-service/worker/index.js#L102).

Tests: [test-server.mjs](evidence/shared-service/scripts/test-server.mjs). Execution/limits in [coverage](09-test-coverage.md).

Preservation risks: R08, R12, R18, R19, R22 in [risk register](10-refactoring-risk-register.md).

