# Query Builder — Project Instructions

## Design Context

### Users
Intelligence analysts and surveillance operators who build complex geospatial queries to filter device location records, cell tower pings, and events across multiple data sources. Power users who run 5-10 queries per session in low-light operational environments.

### Brand Personality
**Operational. Precise. Restrained.** Professional intelligence tool — not flashy, not playful. Confident but quiet.

### Design Principles

1. **Yellow means "execute"** — Yellow (#E0DD5B) appears only on the Run Query button when conditions are complete. Nothing else uses yellow in the query builder.
2. **Grey communicates hierarchy through depth** — Active states use lighter greys (`bgHover` for tabs, `bgRaised` for toggles), not accent colors. The grey scale (`bgBase` → `bgField` → `bgHover` → `bgRaised`) creates hierarchy through surface elevation alone.
3. **Consistent 8px rhythm** — All section padding uses `sp.sm` (8px). No arbitrary values.
4. **Animations serve transitions, not decoration** — Orchestrated collapse/expand staging with `easeOutExpo`. No bounce or elastic.
5. **28px+ touch targets** — Every interactive element meets minimum size. Rail buttons are 44x44.

### Input Patterns
- **Custom chevron on all selects**: `appearance: none` + SVG chevron background-image, positioned `right 8px center`, `paddingRight: 24px`
- **Source selector**: Borderless pill with `bgField` background — blends into header, no divider below
- **Condition selects**: Bordered with `borderSubtle`, same custom chevron, `borderRadius: 6px`
- **All inputs**: Consistent `4px 8px` padding, `colorScheme: dark`

### Tokens
All values from the `t.*` system (Arkem Design Tokens). Never hard-code colors. Spacing: `sp.*` (4px base). Typography: `type.*`. Motion: `motion.*`.

### Anti-Patterns to Avoid
- Yellow on anything other than Run Query CTA
- Hard-coded color values outside token system
- Bounce/elastic easing
- Neon accents, gradient text, glassmorphism
- Generic card grids or hero metric layouts
- Native `appearance: auto` on selects (produces inconsistent chevrons)

---

## Bottom-Left Panel (BottomQueryBuilder) — Spec

### Role
The **primary query builder**. The top-left Conditions tab has been removed. This floating panel is the sole place for building and running queries.

### Positioning & Surface
- `position: absolute`, `bottom: sp.sm`, `left: panelLeft` (tracks top-left panel collapse: `panelCollapsed ? sp.sm : 320 + sp.sm + sp.sm`)
- Open width: `min(320px, calc(100vw - 16px))`. Collapsed: `44px` (rail only). Max height: `460px`.
- Panel surface: `glassBg` / `glassBorder` — intentional. Glass signals floating overlay vs. docked panel.
- Rail surface: solid `bgBase` — structural spine.
- `willChange: width` on container.

### Rail (44px wide, `bgBase`)
- **Database icon** (top): 44×44, `textSecondary`, `borderBottom: borderDark`, decorative
- **Query tabs** (Q1…Q5): 44×44. Active: `bgHover` bg, `textPrimary`, `fontWeight: 600`. Inactive: transparent, `textSubtle`, `fontWeight: 500`.
- **Condition count badge**: `top: 3, right: 4`, `7px` font, `bg: textSecondary`, `color: textInverse`, `12px` tall
- **Rail delete X**: 18×18, `bg: t.danger`, hover-reveal (opacity 0→1), top-right corner. **Instant delete — no confirmation dialog.**
- **Divider**: `width: 24, height: 1, background: borderDark`
- **New Query** / **Load** / **Collapse** buttons: 44×44 each, at rail bottom

### Header (Content Area, `bgBase`)
- `minHeight: 44`, `paddingBottom: sp.sm`, no `borderBottom`
- **Row 1** (`padding: 0 sp.sm`): Query name (click-to-rename, `type.subheading`) + Save + Reset + Delete icons
  - Rename input: `borderBottom: 1px solid textPrimary`, no outer border
  - Save/Reset: disabled at `opacity: 0.3` + `disabled` attr. Delete: always enabled, `Trash2 color={t.danger}`, triggers confirmation bar.
- **Row 2** (`padding: 0 sp.sm`, `marginTop: sp.xs`): Source select (borderless pill, `bgField`, custom chevron) + AND/OR toggle (`width: 72`)

### Confirmation Bar (inline, `sectionFadeIn`)
- **Reset**: `bg: bgRaised`, `border: borderMuted`, text `textPrimary`, confirm `bg: textSecondary`
- **Delete**: `bg: danger+"18"`, `border: danger+"40"`, text `danger`, confirm `bg: danger, color: "#fff"`

### Condition Area
- Condition card: `bg: bgField`, `border: borderDark`, `borderRadius: sp.xs`, `padding: sp.sm`
  - Row 1: Field select + remove X (`28×28` min). Row 2: Operator + Value.
  - Link label between cards: `8px`, `fontWeight: 600`, `color: borderSubtle`, centered
  - Disabled inputs: `opacity: 0.4`
- **+ Condition**: dashed `borderMuted`, `minHeight: 36`. Hover: `bgHover` bg, `textPrimary`, `borderSubtle`

### Footer (`borderTop: borderDark`, `padding: sp.sm`)
- **Spatial toggle**: pill `bg: bgField`, `border: borderDark`, `padding: 2`. Active option: `bgRaised`, `borderMuted`, `textPrimary`. Inactive: transparent, `textSubtle`.
- **Run Query**: Active `yellow500`/`textInverse`. Disabled `bgHover`/`textSubtle`. `minHeight: 32`, `fontWeight: 600`.

### Collapse Animation
- Collapse: content fades + `translateX(-6px) scale(0.98)` in 100ms → width shrinks with 100ms delay
- Expand: width grows first → content fades/translates in with 120ms delay. All `easeOutExpo`.
