# AGENTS.md

## Project rules for AI agents

### Mockups (sole sources of truth)
- `topiq_mockup_v25.html` → the DASHBOARD section (student/teacher/school-admin, onboarding).
- `abstopiq_landing.html` → the LANDING PAGE.
- Always use the file matching the area being worked on. Reproduce exactly; never
  redesign. Preserve text, colors, spacing, animations, dark mode, responsive behavior.
- No backend/API/DB/auth work.

### Tailwind CSS conversions
- Before converting any traditional-CSS page/component to Tailwind, FIRST read
  `TOPIQ_TAILWIND_TOKENS.md` and follow its contract: reuse existing tokens,
  never re-declare equivalent arbitrary values, and promote any value repeated
  5+ times into `@theme inline` (src/app/globals.css) + the registry in the
  same change.

### State & architecture
- Reuse existing `DashboardContext` state, routes, nav and data — no second
  conflicting state; single shared `appMode`, single shared `liveSession`.
- Each route folder may own a `components/` subfolder for its page-specific
  components; move such components there when converting a page.

### Full migration contract
- See `TOPIQ_MIGRATION_RULES.md`.
