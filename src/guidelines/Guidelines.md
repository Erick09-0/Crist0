**Add your own guidelines here**
# Margarita – UI/UX Guidelines (Web Content Hub)

## Design goal
- The product must feel like a **Content Hub** (browse → pick → detail → continue), inspired by reading/streaming apps:
  - A **Featured / Spotlight** area on top (one large hero card with a strong CTA)
  - Clear section blocks (Explore, Recent, Recommended, Progress)
  - **Cards + horizontal carousels** for content discovery
- Visual style: clean, modern, friendly; lots of whitespace; minimal but “premium”.

---

## Layout & Responsiveness (Web-first)
- Design **desktop-first**, then adapt down:
  - Desktop: max-width 1200–1280px centered, side padding 24–32px.
  - Recommended grid: **12 columns**, gaps 16–24px.
  - Tablet: 2-column cards; Mobile: 1-column stacked layout.
- Avoid empty above-the-fold:
  - Always show Featured + at least one section visible without scrolling.
- Use **Auto Layout** and constraints. **Avoid absolute positioning** except for overlays/modals.

---

## Visual style (tokens)
- App background: soft neutral (e.g., #F6F7F9 / #F5F5F5).
- Surfaces: white (#FFFFFF).
- Borders: very subtle gray (e.g., #E5E7EB).
- Text: primary dark (e.g., #111827), secondary gray (e.g., #6B7280).
- Single accent color: **Margarita Sky Blue (#0EA5E9)** (buttons/active states). Avoid extra brand colors.
- Radius:
  - Cards: 16–24
  - Pill buttons: 999 (fully rounded)
- Shadows: soft, short, subtle. Hover: slightly elevate (one shadow level up).

---

## Typography
- Font: Inter / system.
- Base: 16px (desktop). Secondary body: 14px.
- Headings:
  - H1: 28–32 / semibold
  - H2: 18–20 / semibold
- Use an 8pt spacing system: 8 / 16 / 24 / 32.

---

## Navigation (Web)
- **Sticky topbar** (64px):
  - Left: logo + “Margarita”
  - Center: navigation (Home, My Games, My Progress)
  - Right: avatar + menu
- No bottom navigation on desktop. (Mobile can have it, but it’s not the primary target.)
- Clear active states: dark pill OR underline + icon.

---

## Required screen patterns
### 1) Home / Dashboard (Content Hub)
Must include:
- **Featured Spotlight Card** (large hero card):
  - Recommended module title + micro-metrics (time, level, progress)
  - **Primary pill CTA**: “Continue / Read now / Play”
  - Side widget for progress (XP, modules completed)
- **Explore Modules**
  - Card grid (desktop 4 per row, tablet 2, mobile 1)
- **Recent**
  - Horizontal carousel with mini cards (scroll + snap)
- **Quick Access**
  - 2–3 horizontal shortcut cards (Games Hub, Progress, Achievements)

### 2) Explore / Games (listing)
- Search bar + segmented control / tabs (minimum 3 options)
- Card listing + “Featured” carousel section on top

### 3) Detail (module/game)
- Hero card with image placeholder + title + CTA
- Description with “Read more” (collapsible)
- “Related / Suggested” section as a horizontal carousel
- Optional sticky secondary CTA (only one primary CTA on the page)

---

## Components (look & usage rules)
### Cards
- Always white surface, large radius, subtle shadow.
- Internal structure:
  - Icon/thumbnail (left or top), title, subtitle, meta (time/progress)
- Hover: slight lift + shadow increase.

### Search bar
- Large input, left icon, soft placeholder.
- Right-side filter icon button.

### Tabs / Segmented control
- Minimum 3 options (e.g., Spotlight / New / Free).
- Active state uses pill fill or subtle background. Don’t use a dropdown for 2–3 options.

### Buttons
- Primary: filled Margarita Sky Blue, white text, pill shape.
- Secondary: subtle outline, white background.
- Tertiary/Ghost: text + icon only.
- Rule: **one primary CTA per section** (avoid multiple competing CTAs).

### Chips / Badges
- Always in sets of 3+ (e.g., “10 min”, “Level 1”, “Free”).
- Soft style, not saturated.

### Icon buttons
- 40x40, circular, clear hover/focus states.

---

## Interactions & micro-UX
- Transitions: 150–200ms (hover, focus, “Read more” expansion).
- Tap targets: minimum 44px.
- States:
  - Skeleton loading for cards
  - Empty states with simple illustration + CTA

---

## Anti-guidelines (what to avoid)
- Avoid “corporate dashboard” look: tables, harsh dividers, dense grids.
- No heavy gradients, no glassmorphism, no neon.
- Don’t overuse colors: **one accent only** + neutrals.
- Keep hierarchy simple: max 2 levels per section, avoid visual noise.