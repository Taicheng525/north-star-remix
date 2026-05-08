# Design System — Project Wiring of SONIC-DS

**Source:** `@mirrorworld-universe/sonic-ds@0.1.0` (private GitHub Packages)
**Wiring:** Tailwind v4 `@theme inline` in [src/app/globals.css](../../../src/app/globals.css)
**Themes:** **Dark** (SONIC-DS default, used by in-app dApp UI) **+ Light alternative** (landing-page / marketing surfaces only). The landing page uses the light theme.

> **For the translator:** During Phase 3, only use the Tailwind classes listed below. Never write raw hex / rgba / arbitrary px in components. Anything that doesn't fit gets noted in `audit/{section}.md`.

---

## Fonts (loaded via `next/font/google` in layout.tsx)

| Class | Family | When to use |
|---|---|---|
| `font-heading` | Orbitron | Headlines, navigation, labels, buttons, badges, status tags |
| `font-body` | Manrope | Body, descriptions, form inputs, toast messages |

**Weights available:** 400, 500, 600, 700, 800. Tailwind: `font-normal` / `font-medium` / `font-semibold` / `font-bold` / `font-extrabold`.

### Typography Compositions (recommended combos)

| Composition | Class combo |
|---|---|
| headline0 (hero display) | `font-heading text-48 leading-56 font-extrabold text-text-primary` |
| headline1 (page title) | `font-heading text-40 leading-44 font-extrabold text-text-primary` |
| headline2 (section title) | `font-heading text-32 leading-40 font-extrabold text-text-primary` |
| headline3 (sub-section) | `font-heading text-28 leading-32 font-extrabold text-text-primary` |
| headline4 (card title) | `font-heading text-24 leading-28 font-extrabold text-text-primary` |
| headline5 (subtitle) | `font-heading text-20 leading-24 font-extrabold text-text-primary` |
| title1 | `font-heading text-20 font-semibold text-text-primary` |
| title2 | `font-heading text-16 font-semibold text-text-primary` |
| title3 | `font-heading text-14 font-semibold text-text-primary` |
| title4 | `font-heading text-12 font-semibold text-text-primary` |
| body1 | `font-body text-20 text-text-secondary` |
| body2 | `font-body text-16 text-text-secondary` |
| body3 | `font-body text-14 text-text-tertiary` |
| body4 | `font-body text-12 text-text-tertiary` |
| caption1 | `font-body text-10 text-text-muted` |
| ctaButton | `font-heading text-14 font-semibold text-text-primary` |
| statusTag | `font-heading text-10 uppercase` (color contextual) |

### Font sizes (raw)
`text-10` `text-12` `text-14` `text-16` `text-20` `text-22` `text-24` `text-28` `text-32` `text-40` `text-48`

### Line heights (raw)
`leading-16` `leading-18` `leading-20` `leading-22` `leading-24` `leading-28` `leading-32` `leading-34` `leading-40` `leading-44` `leading-56` `leading-68`

### Letter spacing
`tracking-0` `tracking-sm` (0.4px) `tracking-md` (0.8px) `tracking-lg` (1px) `tracking-wide` (2px)

---

## Colors

All colors below are usable as `bg-{name}` / `text-{name}` / `border-{name}` / `ring-{name}` etc. No raw hex allowed.

### Text
| Class | Hex | Use |
|---|---|---|
| `text-text-primary` | `#FFFFFF` | Headings, primary body |
| `text-text-secondary` | `#DADADA` | Subtitles |
| `text-text-tertiary` | `#999999` | Captions, hints |
| `text-text-muted` | `#666666` | Low-emphasis |
| `text-text-quaternary` | `#4D4D4D` | Very low-emphasis |
| `text-text-fifth` | `#454545` | Placeholder, faintest |
| `text-text-black` | `#000000` | Text on light surfaces (rare) |

### Brand / Primary
| Class | Hex | Use |
|---|---|---|
| `bg-primary-blue` / `text-primary-blue` | `#0000FF` | Primary CTA, active state, links |
| `bg-primary-blue-50` | rgba blue 50% | Hover/active overlay |
| `bg-primary-blue-30` | rgba blue 30% | Soft focus ring |
| `bg-primary-blue-10` | rgba blue 10% | Subtle blue tint |
| `bg-primary-blue-5` | rgba blue 5% | Faintest blue tint |
| `bg-primary-blue-bg` | `#000033` | Dark blue-themed container bg |

### Status / Secondary
| Class | Hex | Use |
|---|---|---|
| `bg-secondary-green` / `text-secondary-green` | `#00FF94` | Success, active/online |
| `bg-secondary-green-30/-10` | rgba | Soft success bg |
| `bg-secondary-dark-green` | `#002E1D` | Deep green panel |
| `bg-secondary-red` / `text-secondary-red` | `#FF0000` | Error, inactive/offline |
| `bg-secondary-red-30/-10` | rgba | Soft error bg |
| `bg-secondary-dark-red` | `#330000` | Deep red panel |
| `bg-secondary-blue` / `text-secondary-blue` | `#3399EE` | Info |
| `bg-secondary-blue-10` | rgba | Soft info bg |
| `bg-secondary-light-blue` | `#44AAFF` | Lighter info accent |

### Tertiary / Highlight
| Class | Hex | Use |
|---|---|---|
| `bg-tertiary-purple` / `text-tertiary-purple` | `#A855F7` | Highlight, tertiary accent |
| `bg-tertiary-purple-50/-30/-10` | rgba | Tinted variants |

### Lines / Borders
| Class | Hex | Use |
|---|---|---|
| `border-line-primary` | `#262830` | Card borders, subtle dividers |
| `border-line-secondary` | `#3B3B3B` | Stronger borders, separators |
| `border-line-tertiary` | `#1F1F1F` | Intermediate borders |
| `border-line-button` | `#404040` | Outline button border |
| `border-line-handle` | `#27282D` | Drag handles, scrollbar |

### Surfaces / Cards
| Class | Hex | Use |
|---|---|---|
| `bg-card-primary` | `#0A0A0A` | Primary card |
| `bg-card-secondary` | `#161616` | Nested / elevated |
| `bg-card-tertiary` | `#1A1A1A` | Tertiary surface |
| `bg-card-dark-glass-50` | rgba(10,10,10,0.5) | Glass overlay |

### Icons
| Class | Hex | Use |
|---|---|---|
| `text-icon-primary` | `#EBEBEB` | Active icons |
| `text-icon-secondary` | `#999999` | Inactive icons |
| `text-icon-tertiary` | `#4D4D4D` | Disabled icons |

### Backgrounds (dark theme)
| Class | Hex | Use |
|---|---|---|
| `bg-background-primary` | `#000000` | Dark-mode page background (pure black) |
| `bg-background-secondary` | `#0A0A0A` | Dark-mode secondary section bg |
| `bg-background-tertiary` | `#050505` | Dark-mode deep dark bg |

### Light Theme Surfaces (landing-page only)
| Class | Hex / value | Use |
|---|---|---|
| `bg-surface-light` | `#EFEFF5` | Landing-page main background |
| `bg-surface-light-soft` | `#F7F7FB` | Lighter section bg |
| `bg-surface-light-elevated` | `rgba(255,255,255,0.7)` | Elevated cards on light bg |
| `bg-surface-light-pane` | `rgba(255,255,255,0.4)` | Soft pane / glass overlay on light bg |

### Light Theme Text
| Class | Hex | Use |
|---|---|---|
| `text-on-light-primary` | `#0F172A` | Primary text on light bg (slate-900) — class: `text-on-light-primary` |
| `text-on-light-secondary` | `#475569` | Body text on light bg (slate-600) — class: `text-on-light-secondary` |
| `text-on-light-muted` | `#64748B` | Muted text / labels on light bg (slate-500) — class: `text-on-light-muted` |
| `text-on-light-faint` | `#94A3B8` | Hint / faint text on light bg (slate-400) |

### Light Theme Borders / Lines
| Class | value | Use |
|---|---|---|
| `border-line-on-light` | rgba(148,163,184,0.4) | Default border on light bg |
| `border-line-on-light-soft` | rgba(148,163,184,0.25) | Soft divider |
| `border-line-on-light-strong` | rgba(148,163,184,0.6) | Strong divider |

### Light Theme Primary-Blue Tints (for blue-tinted bg / borders on light surfaces)
| Class | value | Use |
|---|---|---|
| `bg-primary-blue-on-light-bg` | rgba(0,0,255,0.04) | Faint blue tint card bg |
| `bg-primary-blue-on-light-bg-strong` | rgba(0,0,255,0.08) | Stronger blue tint chip / icon bg |
| `border-primary-blue-on-light-border` | rgba(0,0,255,0.18) | Blue-tinted border on light bg |
| `border-primary-blue-on-light-border-strong` | rgba(0,0,255,0.45) | Strong blue-tinted accent (corner brackets) |

### On-Blue Theme (saturated `#0000FF` section bg — for proof / final-CTA "rhythm break" sections)

Used on `ByTheNumbers` and `Closing` only. Section bg = `bg-primary-blue` (`#0000FF`).

| Class | value | Use |
|---|---|---|
| `text-on-blue-primary` | `#FFFFFF` | Headings, big stat numbers on blue |
| `text-on-blue-secondary` | rgba(255,255,255,0.85) | Body text on blue |
| `text-on-blue-muted` | rgba(255,255,255,0.6) | Muted text / labels on blue |
| `text-on-blue-faint` | rgba(255,255,255,0.4) | Hint / faint text on blue |
| `border-line-on-blue` | rgba(255,255,255,0.18) | Default divider on blue |
| `border-line-on-blue-strong` | rgba(255,255,255,0.45) | Strong border / corner brackets on blue |
| `bg-surface-on-blue-pane` | rgba(255,255,255,0.05) | Translucent white "elevated pane" sitting on blue |

**Single accent within blue sections:** SONIC-DS `secondary-green` (`#00FF94`) — semantically "live / online / active" — used for: pulse dots, the `Is Open` headline accent in Closing, floating-link arrows. Do NOT introduce purple, secondary-blue, or other accents inside an on-blue section.

### Chart
`bg-chart-tooltip-bg` (`#151518`) · `border-chart-border` (`#2B2F36`) · `text-chart-label` (`#848E9C`)

### Secondary Button fills
`bg-secondarybutton-secondary-fill` `bg-secondarybutton-tertiary-fill` `bg-secondarybutton-disabled-fill` `bg-secondarybutton-white-fill` `bg-secondarybutton-hover-white-3`

### Semantic mapping (use these intents)
- **CTA / active** → `primary-blue`
- **Success / online** → `secondary-green`
- **Error / offline** → `secondary-red`
- **Info** → `secondary-blue`
- **Highlight** → `tertiary-purple`

---

## Spacing

**4px grid.** Tailwind `p-N`, `m-N`, `gap-N`, `space-y-N`, etc. produce `N × 4px`.

Approved scale: `0` `1` `2` `3` `4` `5` `6` `7` `8` `9` `10` `11` `12` `14` `16` `20` `24` `32` (representing 0/4/8/.../128 px). Avoid arbitrary numbers.

Common usage:
- `p-2` (8px) — icon-to-text gap
- `p-4` (16px) — default component padding
- `p-6` (24px) — large component padding
- `gap-8` (32px) — between cards in a row
- `py-16` to `py-24` (64–96px) — between page sections
- `py-32` (128px) — hero / closing emphasis

---

## Border Radius

Sharp / angular feel. Use only these tokens. **No arbitrary values.**

| Class | Value | Use |
|---|---|---|
| `rounded-xs` | 2px | Status dots, tiny indicators |
| `rounded-sm` | 4px | Badge, tag, inline status |
| `rounded-md` | 6px | Button, tab, tooltip, popover (default) |
| `rounded-lg` | 8px | Input, toast, dialog |
| `rounded-xl` | 10px | Medium panels |
| `rounded-2xl` | 12px | Cards, large dialog |
| `rounded-3xl` | 16px | Extra-large special emphasis |
| `rounded-full` | 9999px | Avatar, pill badge, progress bar |

---

## Shadows

| Class | Use |
|---|---|
| `shadow-sm` | Small card, tab active |
| `shadow-md` | Popover, dropdown |
| `shadow-lg` | Dialog, modal |
| `shadow-xl` | Large dialog |
| `shadow-glow-blue` | Primary inner glow (CTA, active state) |
| `shadow-glow-blue-out` | Primary outer glow (highlighted elements) |
| `shadow-glow-green` | Success inner glow (status indicators) |
| `shadow-glow-green-out` | Success outer glow (online nodes) |

---

## Component Conventions (from DS spec)

### Button
- Heights: default 48px, sm 40px, lg 32px
- Font: `font-heading font-semibold text-14`
- Primary: `bg-primary-blue text-text-primary`, often paired with `shadow-glow-blue` or `shadow-glow-blue-out`
- Secondary: transparent + `border border-line-primary`
- Ghost: transparent + muted text only
- **Casing:** Title Case for buttons. ALL CAPS only for small status tags / badge labels.

### Input
- Heights: 48px / 56px
- Font: `font-body`
- Border: `border-line-primary`; focus: `border-primary-blue` + `ring` with `bg-primary-blue-30`
- Placeholder: `text-text-muted`

### Card
- Border: `border-line-handle` (`#27282D`)
- Padding: desktop `p-8` (32px), mobile `p-4` (16px)
- Internal gap: `gap-6` (24px)
- Title: `font-heading font-semibold text-14` to `text-16`

### Badge / Status Tag
- `font-heading text-10 uppercase`
- Variants:
  - active → `text-secondary-green`
  - boosting → white pulse
  - inactive → `text-secondary-red`
  - network → white

---

## Hard Rules (enforced during translation)

1. **Page-level theme + selective on-blue breaks.** A landing page uses **light** as its base theme (`bg-surface-light` `#EFEFF5`). Up to **2 saturated-blue sections** may be inserted as rhythm breaks (proof / final-CTA moments), using `bg-primary-blue` + `on-blue-*` tokens. Never invert the whole page to blue. Never mix light + dark + blue arbitrarily.
2. **Section transitions handled by `SectionDivider`, not numbers.** Internal sections use a unified `SectionDivider` component (label + animated hairline) at their top edge. Do NOT add inline section numbering like `§ 07 / Launch Sequence` or `Use Cases — 03` — global section identity is communicated via the `SectionDivider` label keyword (e.g. MECHANICS / PERFORMANCE / USE CASES / LAUNCH). Only HowItWorks may keep its internal `01 / The Problem` and `02 / The Solution` sub-flow markers.
3. **No per-section grid backgrounds inside content sections.** Hero (WebGL grid) and Footer (radial-mask grid) keep their decorative grids as visual signatures. All other interior sections (HowItWorks, ByTheNumbers, WhatYouCanBuild, Closing) use clean solid surfaces (light or saturated blue) — no inline `linear-gradient` grid patterns. Cross-section grid alignment is impossible to maintain across light + blue boundaries; clean surfaces avoid the visual mismatch.
4. **Within an on-blue section the only accent is `secondary-green`** (live/online semantic). Never use blue accents (invisible) or other hues.
2. **No raw hex / rgba / arbitrary px.** Always use the classes above. Exceptions go in `audit/{section}.md` with reason.
3. **No fonts outside `font-heading` / `font-body`.** Anything else gets flagged in audit.
4. **Status indicators use color-coded dots:** green=active, red=inactive, blue=boosting.
5. **Errors → `secondary-red`, success → `secondary-green`, CTA/active → `primary-blue`.**
6. **Sharp aesthetic:** prefer smaller radius tokens; reach for `rounded-2xl` / `rounded-3xl` only when called for.
7. **Reduced-motion fallback:** every animation must honor `prefers-reduced-motion`.

---

## Reference paths in this repo

- Token CSS variables: imported from `@mirrorworld-universe/sonic-ds/variables.css` in [src/app/globals.css](../../../src/app/globals.css)
- Tailwind v4 `@theme` mapping: same file
- Fonts: [src/app/layout.tsx](../../../src/app/layout.tsx)
- Full DS spec: `node_modules/@mirrorworld-universe/sonic-ds/DESIGN_RULES.md`
- Token JSON: `node_modules/@mirrorworld-universe/sonic-ds/tokens/*.json`
