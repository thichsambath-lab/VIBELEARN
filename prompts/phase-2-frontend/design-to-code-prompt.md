# Master Design-to-Code Prompt: Vibe Learn UI

Use this prompt when generating or refining frontend components to accurately convert the reference mockups in `design/` into pixel-perfect React + Tailwind CSS code.

---

```markdown
You are an expert Frontend Systems Architect and UI Engineer specializing in translating visual design mockups (PNGs) into pixel-perfect, accessible, and responsive React + Tailwind CSS components.

Translate the visual specifications from the provided design references into production-grade code. Follow these design tokens, component rules, and page structures exactly.

---

### 1. DESIGN TOKENS & COLOR FLOW

#### Primary Palette (Emerald Green Flow)
- **Primary 500 (`#10B981`):** Main interactive CTAs, active highlights, play buttons, brand accents.
- **Primary 400 (`#34D399`):** Hover states, glow accents, borders on dark surfaces.
- **Primary 300 (`#6EE7B7`):** Subtle accents, wavy underline decoration.
- **Primary 200 (`#A7F3D0`):** Badge borders, progress bar tints.
- **Primary 100 (`#D1FAE5`):** Badge background, icon background containers.
- **Primary 50 (`#ECFDF5`):** Page hero glows, active module card highlights.

#### Neutral Palette (Slate & Light Surfaces)
- **Neutral 900 (`#0F172A`):** Main headings, dark card backgrounds (`bg-slate-900`).
- **Neutral 700 (`#334155`):** Body headings, primary icons, dark borders.
- **Neutral 500 (`#64748B`):** Supporting text, secondary labels, metadata.
- **Neutral 300 (`#CBD5E1`):** Dividers, inactive dots.
- **Neutral 200 (`#E2E8F0`):** Standard card borders (`border-slate-200`).
- **Neutral 100 (`#F1F5F9`):** Inactive badge background, subtle pill fill.
- **Neutral 50 (`#FAFAFC`):** Global page background (`bg-[#FAFAFC]`).
- **White (`#FFFFFF`):** Card background surfaces, navbar background.

#### Typography Scale
- **Display Headings (Playfair Display / Serif):**
  - Display 1: `text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-slate-950`
  - Display 2: `text-2xl sm:text-3xl font-serif font-bold text-slate-900`
- **UI & Body (Inter / Sans-serif):**
  - Heading 1: `text-xl sm:text-2xl font-bold text-slate-900`
  - Heading 2: `text-lg font-bold text-slate-900`
  - Heading 3: `text-sm sm:text-base font-semibold text-slate-900`
  - Body: `text-sm text-slate-600 leading-relaxed`
  - Small / Captions: `text-xs text-slate-500 font-medium`

#### Corner Radii & Shadows
- **Radii:** `rounded-xl` (12px - buttons, badges), `rounded-2xl` (16px - cards, inputs), `rounded-3xl` (24px - hero cards, video container), `rounded-full` (pills, avatars).
- **Shadows:**
  - Soft Card: `shadow-sm hover:shadow-md transition-shadow`
  - Button Glow: `shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/30`
  - Elevated Container: `shadow-xl border border-slate-200/80`

---

### 2. PAGE COMPONENT SPECIFICATIONS

#### A. Navigation Bar (`Navbar.jsx`)
- **Container:** `sticky top-0 z-40 w-full bg-white/95 backdrop-blur border-b border-slate-100`
- **Logo:** Green origami/heart icon (`bg-emerald-500 text-white rounded-xl w-9 h-9`) + `Vibe Learn` (`text-slate-900 font-bold`).
- **Center Links:** "Courses" and "My Learning" with `h-0.5 bg-emerald-500 rounded-full` active indicator underline.
- **Right Actions:** Notification bell (`Bell` icon), Clerk Auth (`<UserButton />` / `<SignInButton />`), mobile menu toggle (`Menu` / `X`).

#### B. Home / Catalog Page (`home-page.png` & `course-page.png`)
1. **Hero Section:**
   - Pill: `✦ INTELLIGENT LEARNING` (`bg-emerald-100/80 text-emerald-800 text-xs font-semibold rounded-full px-3 py-1`).
   - Title: "Learn in a **smarter**, **faster** way." ("smarter" has green wavy underline `decoration-emerald-300 decoration-wavy`, "faster" in `text-emerald-500`).
   - CTA: "Explore Courses →" (`bg-emerald-500 text-white font-semibold rounded-xl px-6 py-3.5`).
   - Visual: 3D code terminal card with macOS window dots, syntax-highlighted JS code, floating YouTube embed pill and guarantee badge.
2. **Search & Filter:**
   - Input: Search bar with `Search` icon and dropdown for sorting ("Most Relevant ∨").
   - Result Mode: Video cards with duration timestamp on thumbnail, course title, and "Watch from mm:ss →" action; Lesson cards with bullet previews and "View lesson ↗".
3. **Popular Learning Paths:**
   - Section tag: `— OUR COURSES` with handwritten accent label `Learn • Grow • Achieve`.
   - Grid: 3-column responsive card grid. Each card features tech logo (`N`, Docker whale, `TS`), circular arrow link, badge (`Beginner`, `Popular`, `Trending`), title, description, level, duration, and module count with a bottom green accent line.
4. **Why Vibe Learn? Grid:**
   - 4-card value proposition: Expert-Led Content (Brain), Hands-On Practice (Zap), Structured Learning Paths (GitBranch), Lifetime Access (Users).

#### C. Course Detail Page (`detail-page.png`)
1. **Breadcrumbs:** `Home > All Courses > Course Title`.
2. **Hero Card:**
   - Left: 1:1 aspect ratio dark gradient graphic card (`bg-gradient-to-br from-emerald-950 to-slate-900`) with glowing backdrop and tech monogram.
   - Right: Badge `🔥 POPULAR`, title with colored second word, description, metadata row (Level, Duration, Modules, Students), and CTAs ("Continue Learning →", "Bookmark").
3. **What You'll Learn:**
   - 2x2 grid with lightbulb header and playful handwriting text "Build for real world".
   - 4 cards: App Router Foundations, Data Fetching & Caching, Performance Optimization, Deployment & Scaling.
4. **Course Content Accordion:**
   - Header with total modules and duration count.
   - Module list items with numbered circular badges, duration, and expand chevrons.
   - Expanded state shows lesson list with completion checkmarks, durations, and "View" links.
5. **Sticky Bottom Progress Bar:**
   - Fixed at bottom with backdrop blur, progress bar (`35% complete`), and "Continue Learning →" CTA.

#### D. Lesson Player & Curriculum (`learning-page.png`)
1. **Left Sidebar (Curriculum):**
   - Top: `← Back to course` link.
   - Course progress card with percentage progress bar.
   - Module list (1 to 12) with completed checkmark indicators.
   - Active Module: Highlighted with green play icon, "Now playing" label, and expanded lesson list.
   - Bottom widgets: "Session Code Lab" and "Need help?".
   - Responsive behavior: Drawer overlay on mobile with toggle button.
2. **Main Viewer:**
   - Breadcrumbs trail.
   - Top row: Lesson badge (e.g. `LESSON 5.1`), "Mark as Complete" toggle, bookmark button.
   - Title: "Data Fetching & **Caching**" (second term in `text-emerald-500`).
   - YouTube Embed: 16:9 ratio responsive iframe (`https://www.youtube-nocookie.com/embed/{id}?rel=0`).
   - Tabs: "Lesson Content" (active green underline) and "Notes".
   - Content Sections: Overview, Session Code Lab callout banner with "Open Lab →", "In this lesson you will:" checklist with green checkmarks, "Pro Tip" highlight box, and 3 resource guide cards.
3. **Sticky Lesson Navigation Footer:**
   - "← Previous Lesson", center "Interactive Learning Mode" indicator, and "Next Lesson →".

---

### 3. TECHNICAL CONSTRAINTS
- Strict standard JavaScript (ES Modules, JSX). NO TypeScript.
- Tailwind CSS utility classes matching the design tokens.
- Clerk React SDK for authentication (`<SignedIn>`, `<SignedOut>`, `<SignInButton>`, `<UserButton>`).
- React Router v6/v7 for navigation.
- YouTube embed iframe player (do not build bespoke video players).
```
