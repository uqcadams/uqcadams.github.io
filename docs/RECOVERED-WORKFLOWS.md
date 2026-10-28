# Recovered alliance planning workflows

Recovered from the uncommitted `uqcadams-urban-happiness-layout` worktree, based on commit `5e526df`, and reconciled against main after PR #2 (`0c20edb`). Original planner snapshot SHA256: `f289b9877b0253a6a9a22afcee91ad416bfd1e547d76feeeb6a8646f602af510`.

Restores double-click region selection/editing, the alliance list on the left in alliance mode, dragging list entries onto the map to reorder, temporary drag previews, a separate live-rotation section, and a display toggle for grass extensions. The existing dedicated Quick Layouts tab remains available alongside the recovered inline quick controls.

Recovery corrections preserve Major/Minor input and allocation, manual-area reservations during preview/display changes, and the padding/mode fixes from PR #2. Grass visibility changes display geometry only. It does not alter saved allocations. Double-clicking hidden regions or during another map operation is ignored. Returning to Add Player or the mobile Players tab leaves alliance mode correctly.

The screenshot importer, review workflow, placement validation, local persistence, JSON import/export and optional shared rooms retain their existing implementation. The server-side Luna lifetime allowance is a separate deployed service and is not changed by this frontend recovery.

Run `node tests/recovered-alliance-workflows.cjs` from the repository root. The test needs only Node.js; it uses a mocked React component and no paid API calls. It covers region selection, mode guards, sidebar navigation, minor tiers, map drop order, preview immutability, preserved shares, grass visibility/persistence and manual-area exclusions.
