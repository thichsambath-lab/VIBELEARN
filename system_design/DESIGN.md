# Vibe Learn Design System & UI Consistency Guidelines

A unified design language for the Vibe Learn learning platform. Clean, modern, and focused on clarity, consistency, and intuitive learning experiences.
*Version 1.0 • Reference: `design/design-system.png`*

---

## 1. Color Palette

### Primary (Emerald Accent)
Used for brand highlights, active states, key interactive actions, and progress tracking.
- **Primary 500:** `#10B981` (Brand Primary / Main CTAs)
- **Primary 400:** `#34D399` (Hover accents / highlights)
- **Primary 300:** `#6EE7B7` (Subtle indicators)
- **Primary 200:** `#A7F3D0` (Border tints / light badges)
- **Primary 100:** `#D1FAE5` (Background tints / badge backgrounds)

### Neutral (Slate Foundation)
Used for typography, backgrounds, borders, and structured card surfaces.
- **Neutral 900:** `#0F172A` (Primary text & deep darks)
- **Neutral 700:** `#334155` (Secondary text & icons)
- **Neutral 500:** `#64748B` (Muted captions, metadata & placeholders)
- **Neutral 300:** `#CBD5E1` (Borders & dividers)
- **Neutral 200:** `#E2E8F0` (Card borders & subtle outlines)
- **Neutral 100:** `#F1F5F9` (Hover backgrounds & input surfaces)
- **Neutral 50:** `#FAFAFC` (Page background & light card fill)
- **White:** `#FFFFFF` (Surface white)

---

## 2. Typography

### Font Families
- **Display / Hero Headings:** `Playfair Display`, serif (Elegant, Readable, Timeless)
- **UI / Body / Headings:** `Inter`, sans-serif (Clean, Modern, Highly legible)

### Type Scale
| Style | Font | Size / Line Height | Weight | Typical Use |
| :--- | :--- | :--- | :--- | :--- |
| **Display 1** | Playfair Display | 48px / 56px (3rem / 3.5rem) | Bold (700) | Page titles & Hero headers |
| **Display 2** | Playfair Display | 36px / 44px (2.25rem / 2.75rem) | Bold (700) | Section titles |
| **Heading 1** | Inter | 28px / 36px (1.75rem / 2.25rem) | Semi Bold (600) | Card titles, Course titles |
| **Heading 2** | Inter | 22px / 30px (1.375rem / 1.875rem) | Semi Bold (600) | Sub-sections, Modal headers |
| **Heading 3** | Inter | 18px / 26px (1.125rem / 1.625rem) | Medium (500) | Small titles, Widget headers |
| **Body Large** | Inter | 16px / 24px (1rem / 1.5rem) | Regular (400) | Body copy, Lead paragraphs |
| **Body** | Inter | 14px / 20px (0.875rem / 1.25rem) | Regular (400) | Supporting text, Lesson descriptions |
| **Small** | Inter | 12px / 16px (0.75rem / 1rem) | Regular (400) | Captions, Metadata, Badges |

---

## 3. Spacing System
Base unit: **4px**
- `4px` (0.25rem) - `space-1`
- `8px` (0.5rem) - `space-2`
- `12px` (0.75rem) - `space-3`
- `16px` (1rem) - `space-4`
- `24px` (1.5rem) - `space-6`
- `32px` (2rem) - `space-8`
- `40px` (2.5rem) - `space-10`
- `48px` (3rem) - `space-12`
- `64px` (4rem) - `space-16`

---

## 4. Border Radius & Shadows

### Radius
- **xs (4px):** Code blocks, tiny tag markers
- **sm (8px):** Small badges, dropdowns, input elements
- **md (12px):** Buttons, inputs, standard cards, dialogs
- **lg (16px):** Course cards, lesson media panels
- **xl (24px):** Hero feature blocks, modal containers
- **Full (9999px):** Avatars, pill badges, circular action buttons

### Shadows
- **Sm:** `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Md:** `0 4px 12px -2px rgba(0, 0, 0, 0.08)`
- **Lg:** `0 12px 24px -4px rgba(0, 0, 0, 0.10)`
- **Xl:** `0 20px 40px -8px rgba(0, 0, 0, 0.12)`

---

## 5. UI Components Specification

### Buttons
- **Specs:** Height 44px (default), Radius 12px, Padding `0 16px` (lg) or `0 12px` (md), Font Inter Medium (14-16px).
- **Primary:** Background `#10B981`, text `#FFFFFF`, hover `#059669`.
- **Secondary:** Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#10B981`, hover border `#10B981`.
- **Tertiary:** Border `1px solid #E2E8F0`, text `#334155`, hover background `#F8FAFC`.
- **Text:** Transparent background, text `#10B981`, hover underline or subtle opacity.

### Badges / Tags
- **Video:** Background `#10B981`, text `#FFFFFF`, with play icon.
- **Lesson:** Background `#D1FAE5`, text `#10B981`.
- **Popular / Trending:** Background `#D1FAE5`, text `#065F46` or `#10B981`.
- **Beginner / Intermediate:** Pill style with subtle border and text.

### Status Indicators
- **In Progress:** Hollow green circular indicator or clock icon.
- **Completed:** Green solid circle with white checkmark (`#10B981`).
- **Now Playing:** Green play circle with animated or highlighted background (`bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500`).
- **Locked:** Lock icon in neutral gray.

### Course & Lesson Cards
- White surface (`#FFFFFF`) with subtle border (`#E2E8F0`) and smooth hover lift shadow (`hover:shadow-lg`).
- Bottom green accent highlight line on active/hover state.
- Structured metadata at footer: Level, Duration, and Module count with clear icons.

---

## 6. Layout Principles
1. **Clarity First:** Every UI element communicates clearly with no clutter.
2. **Consistency:** Reuse components, type scales, and spacing tokens uniformly across every page.
3. **Focus & Calm:** Remove unnecessary noise; highlight video learning and clear curriculum progression.
4. **Accessible & Responsive:** Proper contrast ratios, semantic HTML, and seamless mobile adaptation (collapsible sidebars, flexible grids).
