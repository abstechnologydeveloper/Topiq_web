# TOPIQ Tailwind Tokens — Registry & Conversion Contract

## §1 — AI conversion contract

Before converting any traditional-CSS page/component to Tailwind:

1. Read this file first.
2. Reuse existing tokens below — never re-declare an equivalent arbitrary value (e.g. use `text-label`, not `text-[12px]`).
3. If a CSS value/property combo appears **5+ times** in the source being converted and no token exists, ADD it to `@theme inline` in `src/app/globals.css` AND record it in this file in the same change. Use semantic names (e.g. `--text-input`, NOT `--text-14`).
4. Values used fewer than 5 times stay as Tailwind arbitrary values (`text-[9.5px]`).
5. Never remove or rename an existing token without updating this file.

## §2 — Token registry

Mirror of the current `@theme inline` block in `src/app/globals.css`. Keep these tables in sync with that block — any token added/removed there must be added/removed here in the same commit.

### Colors

| Token | Utility prefix | Notes |
|---|---|---|
| `--color-ink` | `bg-ink`, `text-ink`, `border-ink` | |
| `--color-ink-soft` | `bg-ink-soft`, `text-ink-soft`, `border-ink-soft` | |
| `--color-paper` | `bg-paper`, `text-paper`, `border-paper` | |
| `--color-paper-dim` | `bg-paper-dim`, … | |
| `--color-paper-line` | `bg-paper-line`, … | |
| `--color-surface` | `bg-surface`, … | |
| `--color-ash` | `bg-ash`, `text-ash`, … | |
| `--color-ash-line` | `border-ash-line`, … | |
| `--color-thread` | `bg-thread`, `text-thread`, `border-thread` | brand purple |
| `--color-thread-soft` | `bg-thread-soft`, … | |
| `--color-thread-deep` | `bg-thread-deep`, … | |
| `--color-ember` | `bg-ember`, … | |
| `--color-ember-soft` | `bg-ember-soft`, … | |
| `--color-coral` | `bg-coral`, … | |
| `--color-coral-soft` | `bg-coral-soft`, … | |
| `--color-violet` | `bg-violet`, … | |
| `--color-violet-soft` | `bg-violet-soft`, … | |

### Fonts

| Token | Utility | Value |
|---|---|---|
| `--font-sans` | `font-sans` | Inter (`var(--font-inter)`), ui-sans-serif fallback |
| `--font-display` | `font-display` | Fraunces serif (`var(--font-fraunces), serif`) |
| `--font-mono` | `font-mono` | IBM Plex Mono (`var(--font-mono), monospace`) |

### Text sizes

| Token | Utility | Value | Notes |
|---|---|---|---|
| `--text-headline` | `text-headline` | 23px | section headlines |
| `--text-sub` | `text-sub` | 13.5px | line-height 1.6 bundled via `--text-sub--line-height` |
| `--text-label` | `text-label` | 12px | field labels, small captions |
| `--text-input` | `text-input` | 14px | input/button body text |

### Radii

| Token | Utility | Value |
|---|---|---|
| `--radius-input` | `rounded-input` | 10px |
| `--radius-tile` | `rounded-tile` | 12px |
| `--radius-btn` | `rounded-btn` | 14px |
| `--radius-card` | `rounded-card` | 16px |

### Custom utilities

| Utility | Emitted CSS | Defined via |
|---|---|---|
| `border-1_5` | `border-width: 1.5px; border-style: solid` | `@utility border-1_5` in globals.css (promoted from `border-[1.5px]`, 15+ occurrences). Note: project has no Tailwind preflight, so border utilities must always carry their own `border-style`. |

### Spacing

Default Tailwind scale (`--spacing = 0.25rem`). Fractional steps like `px-3.5`, `h-4.75` are valid — do not tokenize them.

## §3 — Shared composite classes

Reusable const strings exported from `src/app/dashboard/components/screens/onboarding/shared.tsx`. Other screens should import/reuse these rather than re-declaring equivalent class strings:

```ts
export const QA_INPUT =
  "w-full rounded-input border-1_5 border-ash-line px-3.5 py-[11px] text-input outline-none focus:border-thread";
export const LABEL = "mb-1.5 block text-label font-bold text-ink-soft";
export const OB_FIELD = "mb-4";
export const MODE_BADGE =
  "block mx-auto mb-3.5 w-fit text-center [font-family:'IBM_Plex_Mono',monospace] text-[9.5px] font-bold uppercase tracking-[0.04em] bg-paper-dim text-ash px-[7px] py-[2px] rounded-lg ml-0.5";
export const BACK = "mb-4 flex cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold text-ash";
export const FINISH_BTN =
  "mt-1.5 w-full cursor-pointer rounded-btn border-none bg-ink px-[13px] py-[13px] text-input font-bold text-paper";
```

Also exported from `shared.tsx`: `BackIcon`, `PersonSVG`, `CameraBadge` (shared SVG components).

## §4 — Pending promotions / watch list

- `border-[1.5px]` — 15+ occurrences → exceeds threshold. **Promoted** as `border-1_5` (see §2 Custom utilities).
- Watch list (below 5× threshold, do NOT tokenize yet):
  - `text-[12.5px]` ×4
  - `text-[26px]` ×3
  - `text-[14.5px]` ×3
  - `text-[13px]` ×3
  - `text-[11px]` ×3

Re-check counts whenever converting a new screen; promote anything that crosses 5+.

## §5 — How to add a token

1. Add the CSS var to `@theme inline` in `src/app/globals.css`. For text sizes with a fixed line-height, bundle it: `--text-sub: 13.5px; --text-sub--line-height: 1.6;`.
2. Replace all usages of the arbitrary value with the new utility across the converted source.
3. Add a row to the relevant table in §2 here, in the same commit.
