# HTMLLeaf Quarterfinal Audit

## Moved Features

- Projects list: old extreme-left workspace rail -> landing-page central project grid
- New project entry point: old left rail `+ New` button -> landing-page actions and signed-in header action
- Compile page controls: old formatting toolbar page selectors -> workspace preview header mode controls
- Compile status: old preview sub-bar -> workspace preview status bar
- Save action: old global top header button -> workspace preview header
- Sign-in entry: old isolated header button/modal launch -> landing auth gate plus persistent header auth action

## Removed From Old Locations

- The workspace no longer includes the old project-management rail.
- The old formatting toolbar and duplicate compile-era page controls were removed.
- Template gallery and pricing surfaces are not present in the redesigned landing flow.

## Scaffolding Notes

- The richer multi-file workspace model is stored inside the existing `projects.content` field so the app can evolve without depending on an immediate table redesign.
- When the configured Supabase backend is unreachable, HTMLLeaf falls back to local draft mode instead of failing closed during UI iteration.
