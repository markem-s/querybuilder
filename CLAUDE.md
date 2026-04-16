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
