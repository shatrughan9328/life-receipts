# LifeLens – Your Life, In Receipts

> **Transforming disconnected digital activities into relational graphs, life chapters, behavioral insights, and an unforgettable story.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://life-receipts-zeta.vercel.app)
[![Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/shatrughan9328/life-receipts)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Oxlint](https://img.shields.io/badge/Oxlint-0_Warnings-emerald?logo=oxc&logoColor=white)](https://oxc-project.github.io/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## Problem Statement

Modern digital life is scattered across closed silos. In a typical 24-hour cycle, a person might:
- Listen to an acoustic ballad on Spotify at 1:48 AM
- Search for a quiet sanctuary café at 2:12 AM
- Walk into Blue Tokai Coffee Roasters at 2:45 PM
- Buy an iced sea salt mocha at 3:18 PM
- Take a photograph of diagonal table sunlight at 3:25 PM
- Write a 5-word note in Apple Notes at 3:42 PM: *"Needed this break."*

Traditional personal analytics tools display these as isolated, chronological transaction receipts: a music stream list, a credit card statement, a photo roll, and a search history. They fail to ask the essential question: **"What story is hidden inside these digital moments?"**

The hackathon challenge is: **“Your Life, In Receipts.”** The objective is NOT to build another flat table or list of fictional receipts. The goal is to build an intelligent frontend engine that uncovers the narrative tapestry connecting these events.

---

## Solution

**LifeLens** is a 100% browser-native, client-side intelligence system that bridges the chasm between raw logs and human memory:

```
RAW RECEIPTS (428 logs across 9 categories)
   ↓
RELATIONAL VECTORS (Temporal, Spatial, Semantic, and Synergistic Scoring)
   ↓
CAUSAL LIFE CHAINS (Search → Place Visit → Purchase → Photo → Note)
   ↓
LIFE CHAPTERS (Epoch Clustering into Meaningful Life Eras)
   ↓
BEHAVIORAL INSIGHTS (Circadian Rhythm, Third Places, Focus Cycles)
   ↓
COHESIVE HUMAN STORY ("The Reset", "The Deep Focus Sprint", "The Weekend Escape")
```

LifeLens proves that digital receipts are not merely financial or technical logs—they are the breadcrumbs of your lived emotional experience.

---

## Core Storytelling Concept

The application's storytelling engine is grounded in a flagship narrative arc called **"The Reset"**:

> *"Sometimes a change in life doesn't announce itself with thunder. It appears as a song in the middle of the night, a quiet search query, a café visited in the afternoon, a coffee receipt, a sunlit photograph, and a sentence jotted down in silence. Separately, they were six receipts. Together, they captured the exact moment you decided to slow down."*

By treating each receipt as a node in a semantic gravitational field, LifeLens identifies causal chains:
1. **The Catalyst**: Midnight acoustic music (`Music` at 1:48 AM)
2. **The Intent**: Searching for a calm space (`Search` at 2:12 AM)
3. **The Arrival**: Visiting the café (`Place` at 2:45 PM)
4. **The Commitment**: A deliberate iced latte purchase (`Purchase` at 3:18 PM)
5. **The Memory**: Documenting sunlight on wood (`Photo` at 3:25 PM)
6. **The Realization**: Journaling *"Needed this break."* (`Note` at 3:42 PM)
7. **The Story**: Revealing the cohesive chapter **"The Reset"**.

---

## Key Features

### 1. Relational Vector Graph (`/connections`)
- Responsive SVG constellation displaying active receipts as gravity centers.
- Dynamic radial layout computing bezier curve edges based on deterministic multi-variable affinity.
- **Relational Reason Badges**: Explains *why* two moments connect (*e.g., "Occurred within 33 min", "Shared location", "Music precedes reflective note"*).
- **Causal Life Chain Visualizer**: Toggleable mode visualizing step-by-step causal timelines (*Search → Place → Purchase*).
- Sensitivity threshold slider (20 to 55 pts) enabling granular cluster inspection.

### 2. Guided Cinematic Journey Mode (`/journey`)
- Full-screen, Spotify-Wrapped style interactive narrative playback.
- **Multi-Arc Selector**: Seamlessly experience 3 unique story arcs:
  - **The Reset**: From late-night burnout to intentional pause.
  - **The Deep Focus Sprint**: Late-night algorithmic breakthrough.
  - **The Weekend Escape**: Leaving screens behind for mountain ridge sunsets.
- Autoplay progression timer, keyboard arrow navigation (`←` / `→`), pause/resume (`Space`), and celebratory confetti particle explosion on the story reveal climax.

### 3. Story Reveal Engine (`StoryReveal`)
- Instant narrative synthesizer transforming any cluster of receipts into a chapter chronicle.
- **Native Web Audio Ambience**: Generates warm, calming sine-wave drone chords (A3 220Hz, C#4 277.18Hz, E4 329.63Hz) using the browser's native Web Audio API (zero audio file assets required).
- One-click clipboard export for sharing stories.

### 4. Life Chapters & Epoch Discovery (`/chapters` & `/chapters/:id`)
- Derives 5 thematic life eras from the 428-receipt dataset:
  - ☕ **The Reset**: Turning point from burnout into intentional rest.
  - 🌙 **The Late Night Era**: Nocturnal coding flow, lo-fi beats, and neon clarity.
  - 🎓 **The Focus Grid**: High-intensity spring sprints and distributed systems research.
  - ✈️ **The Mountain Escape**: Golden hour road trips and campfire horizons.
  - 🎬 **Comfort Spiral**: Winter recharge, Studio Ghibli films, and hot ramen.
- Deep-linked chapter exploration with direct access to the graph network and audio journey.

### 5. Behavioral Insights & Digital Persona (`/insights`)
- Surfaces 5 deterministic behavioral cycles:
  - **Night Owl Index**: 62% of music playback logged after 10:00 PM.
  - **Third Place Affinity**: Visited local roasteries 3.8x more often during sprint deadlines.
  - **Soundtrack Priming**: Reflective journal notes preceded by ambient tracks within 45 minutes.
  - **Visual Memory Spike**: Photo density spikes when arriving at novel geo-coordinates.
  - **Comfort Loop**: Cinematic escapism during low-frequency social weeks.
- **Digital Personality Profile**: Identifies the primary persona archetype: *"The Contemplative Builder"*.

### 6. Memory Constellation (`/constellation`)
- High-performance HTML5 Canvas celestial starfield mapping all 428 receipts across 12 months in spiral galaxy coordinates.
- Cluster filtering, stardust connection lines, and responsive touch controls (`onTouchStart`, `onTouchMove`).

### 7. Filterable Receipt Explorer (`/explorer`)
- Instant search indexing titles, descriptions, locations, keywords, and metadata.
- Multi-category pill filters with live count badges.
- **Layout Mode Toggle**: Switch between responsive Card Grid and Compact List view.
- Perforated receipt modal with custom visualizers:
  - 🎵 **Waveform Player**: Interactive simulated audio player with animated EQ bars.
  - 📍 **Place Inspector**: Address coordinates, atmosphere vibe, and visit counter.
  - 📷 **Photo EXIF**: Shutter speed, focal length, aperture, and camera model.
  - 💳 **Register Slip**: Monospace itemized breakdown with simulated barcode.

### 8. Annual Digital Pulse (`/overview`)
- Recharts-powered monthly volume curve highlighting seasonal activity peaks.
- Circadian 24-hour histogram comparing diurnal vs. nocturnal activity.
- Proportional category distribution across all 9 life dimensions.

---

## User Journey

```
┌─────────────────────────────────────────────────────────────┐
│ 1. LANDING PAGE                                             │
│    Discover philosophy, floating receipts, and key stats   │
└──────────────────────────────┬──────────────────────────────┘
                               │ "Start Journey" or "Connect the Dots"
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. GUIDED JOURNEY MODE (/journey)                           │
│    Spotify-Wrapped style narrative walkthrough of "The Reset"│
│    Confetti celebration on the final story reveal           │
└──────────────────────────────┬──────────────────────────────┘
                               │ "Explore In Connection Graph"
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. CONNECTION ENGINE (/connections)                         │
│    Inspect interactive nodes, causal chains, and reasons    │
│    Launch "Story Reveal" with Web Audio ambient chords      │
└──────────────────────────────┬──────────────────────────────┘
                               │ Navigation
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. LIFE CHAPTERS (/chapters & /chapters/:id)                │
│    Dive into distinct eras of your digital biography        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. BEHAVIORAL INSIGHTS (/insights)                          │
│    Discover unconscious patterns and personality profile    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. EXPLORER & CONSTELLATION (/explorer & /constellation)    │
│    Search 428 moments or explore the celestial galaxy       │
└─────────────────────────────────────────────────────────────┘
```

---

## Architecture

The LifeLens architecture follows a **Decoupled Layered Frontend Architecture**:

```
┌──────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                      │
│   Pages: Landing, Overview, Explorer, Connections, Chapters, │
│          ChapterDetail, Insights, Constellation, Journey     │
│   Components: ConnectionGraph, ConnectionChain, Navbar,      │
│               ReceiptModal, WaveformPlayer, MemoryConstell.  │
└──────────────────────────────┬───────────────────────────────┘
                               │ Consumes Hooks & Services
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                      CUSTOM HOOKS LAYER                      │
│   useConnectionGraph: Responsive SVG layout, orbital math    │
│   useReceiptFilters: Search, debounce, sort, category sync   │
│   useAudioAmbience: Native Web Audio API drone synthesizer   │
└──────────────────────────────┬───────────────────────────────┘
                               │ Calls
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                        SERVICES LAYER                        │
│   receiptService: Single source of truth for receipt queries │
│   storyService: High-level narrative, chapter, and pattern   │
│                 aggregation methods                          │
└──────────────────────────────┬───────────────────────────────┘
                               │ Powered By
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                    BUSINESS & UTILITY LAYER                  │
│   connectionEngine: Multi-signal relational scoring & chains │
│   chapterGenerator: Deterministic era clustering             │
│   patternDetector: Circadian & cross-category insights       │
│   storyGenerator: Natural language narrative templates       │
│   analytics: Monthly pulse & diurnal distributions           │
└──────────────────────────────┬───────────────────────────────┘
                               │ Backed By
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                     DATA & CONSTANTS LAYER                   │
│   receipts.js: 428 normalized moments across 9 categories   │
│   categories.js: Centralized palette, icons, synergies       │
│   routes.js: Application routing tokens and metadata         │
└──────────────────────────────────────────────────────────────┘
```

### WHY Important Architectural Decisions Were Made

1. **Why extract `receiptService` and `storyService`?**
   - *Problem*: Previously, page components directly imported `ALL_RECEIPTS` and invoked utility functions inline, duplicating filtering, clustering, and calculation logic across `Explorer.jsx`, `Connections.jsx`, and `Overview.jsx`.
   - *Solution*: A centralized service layer decouples presentation from data retrieval. If the backend or storage format changes (e.g. adding local storage or API integration), UI components remain completely untouched.

2. **Why extract `useConnectionGraph` and `useReceiptFilters` custom hooks?**
   - *Problem*: `ConnectionGraph.jsx` was over 480 lines long, tightly coupling responsive SVG viewport calculations, orbital coordinate physics, threshold filtering, and React rendering.
   - *Solution*: Extracting `useConnectionGraph` isolates math, touch/mouse coordinates, and edge memoization. This reduced `ConnectionGraph.jsx` by over 120 lines and made the logic testable in isolation.

3. **Why extract `WaveformPlayer.jsx`?**
   - *Problem*: `ReceiptModal.jsx` had a 75-line inline audio visualizer embedded within a modal, violating the Single Responsibility Principle.
   - *Solution*: `WaveformPlayer` is now an independent, accessible audio visualizer component that can be used anywhere in the application.

4. **Why browser-native Web Audio API instead of MP3 audio files?**
   - *Problem*: Audio asset files inflate bundle size, cause network latency, and can fail on mobile data restrictions.
   - *Solution*: The `useAudioAmbience` hook uses the Web Audio API's built-in `OscillatorNode` and `GainNode` to synthesize soothing A-major harmonic chords (220 Hz, 277.18 Hz, 329.63 Hz). Total asset overhead: **0 bytes**.

5. **Why centralized category constants in `src/constants/categories.js`?**
   - *Problem*: Icons, hex colors, and category labels were redeclared in `ReceiptCard`, `ReceiptModal`, `FilterBar`, `ConnectionGraph`, and `Overview`.
   - *Solution*: `categories.js` acts as the single source of truth (`CATEGORY_DEFINITIONS`, `CATEGORY_MAP`, `CATEGORY_COLORS`, `ICON_MAP`, `CATEGORY_SYNERGY`, `getCategoryConfig`).

---

## Project Structure

```
frontenderena/
├── public/
├── src/
│   ├── components/
│   │   ├── ChapterCard.jsx         # Thematic chapter summary card
│   │   ├── ConnectionChain.jsx     # Sequential causal chain visualizer
│   │   ├── ConnectionGraph.jsx     # Responsive SVG relational network
│   │   ├── FilterBar.jsx           # Search input, month filter, category pills
│   │   ├── FloatingReceipts.jsx    # Ambient drifting cards in hero header
│   │   ├── InsightCard.jsx         # Behavioral pattern card with deep links
│   │   ├── MemoryConstellation.jsx # 428-star Canvas galaxy with clusters
│   │   ├── Navbar.jsx              # Accessible header navigation with mobile drawer
│   │   ├── ReceiptCard.jsx         # Perforated receipt card with barcode & tag
│   │   ├── ReceiptModal.jsx        # Detailed dialog with category previews
│   │   ├── StatCard.jsx            # Glassmorphic statistic highlight card
│   │   ├── StoryReveal.jsx         # Narrative reveal modal with ambient drone
│   │   └── WaveformPlayer.jsx      # Interactive simulated track waveform
│   ├── constants/
│   │   ├── categories.js           # Centralized category tokens, colors, & icons
│   │   └── routes.js               # Application routes & navigation definitions
│   ├── data/
│   │   └── receipts.js             # 428 normalized receipts & flagship cluster
│   ├── hooks/
│   │   ├── useAudioAmbience.js     # Web Audio API harmonic drone hook
│   │   ├── useConnectionGraph.js   # Responsive layout & graph edge calculation
│   │   └── useReceiptFilters.js    # Filter, search debounce, sort, & URL sync
│   ├── pages/
│   │   ├── ChapterDetail.jsx       # Deep-dive chapter story & moment grid
│   │   ├── Chapters.jsx            # All 5 life chapters overview
│   │   ├── Connections.jsx         # Relational Vector Engine page
│   │   ├── ConstellationPage.jsx   # Full-screen celestial memory galaxy
│   │   ├── Explorer.jsx            # Searchable receipt explorer (Grid & List)
│   │   ├── Insights.jsx            # Behavioral patterns & persona profile
│   │   ├── Journey.jsx             # Spotify-Wrapped style cinematic experience
│   │   ├── Landing.jsx             # Hero landing page & live statistics
│   │   └── Overview.jsx            # Annual digital pulse & circadian rhythms
│   ├── services/
│   │   ├── receiptService.js       # Decoupled data access for receipt queries
│   │   └── storyService.js         # Narrative, chapter, & analytics data access
│   ├── utils/
│   │   ├── analytics.js            # Monthly volume & 24h hourly aggregations
│   │   ├── chapterGenerator.js     # Deterministic era clustering engine
│   │   ├── connectionEngine.js     # Relational scoring & cluster detection
│   │   ├── patternDetector.js      # Behavioral cycle & personality detection
│   │   └── storyGenerator.js       # Template-based storytelling narrative engine
│   ├── App.jsx                     # Route definitions & Suspense lazy loading
│   ├── index.css                   # Tailwind tokens & dark cinematic aesthetics
│   └── main.jsx                    # React 19 application entry point
├── package.json                    # Dependencies & build scripts
├── vite.config.js                  # Vite configuration
└── README.md                       # Comprehensive documentation
```

---

## Connection Logic

Connections between receipts are computed deterministically by `src/utils/connectionEngine.js` using a weighted multi-signal heuristic:

$$\text{Score} = S_{\text{day}} + S_{\text{time}} + S_{\text{location}} + S_{\text{keyword}} + S_{\text{synergy}} + S_{\text{mood}}$$

### Scoring Breakdown:

| Signal | Max Points | Evaluation Heuristic | Example Evidence |
| :--- | :--- | :--- | :--- |
| **Same Calendar Day** | `+25 pts` | Exact match on `YYYY-MM-DD` | Both occurred on March 18 |
| **Temporal Proximity** | `+25 pts` | Scaled inversely by minute difference ($\Delta t \le 120\text{ min}$) | Occurred within 33 minutes |
| **Location Overlap** | `+20 pts` | Exact string match or substring match on place name | Both logged at "Blue Tokai Coffee" |
| **Semantic Keywords** | `+20 pts` | Jaccard overlap between keyword arrays (`+10 pts` per overlap) | Shared keywords: `#focus`, `#coffee` |
| **Category Synergy** | `+10 pts` | Natural real-world synergy (`search` → `place`, `music` → `note`) | Search led to place visit |
| **Mood Alignment** | `+10 pts` | Matching emotional state or reflective headspace | Both tagged with `peaceful` headspace |

### Causal Chain Detection:
Chains identify sequences where one digital activity naturally prompted another:
- **Chain 1**: `Search` (2:12 AM) → `Place Visit` (2:45 PM) → `Purchase` (3:18 PM)
- **Chain 2**: `Music` (1:48 AM) → `Message` (1:55 AM) → `Personal Note` (3:42 PM)
- **Chain 3**: `Event` (7:00 PM) → `Photo` (8:15 PM) → `Journal Note` (10:30 PM)

Every connection pair produces a list of human-readable explanations of **WHY** they are connected, which is rendered dynamically in the UI.

---

## Chapter Generation Logic

`src/utils/chapterGenerator.js` clusters the 428 receipts into 5 coherent life chapters using date boundaries, category concentrations, and thematic continuity:

1. **The Reset** (*March 18 – March 20*):
   - High concentration of `Music`, `Search`, `Place`, `Purchase`, `Photo`, and `Note`.
   - Identified by late-night search queries for quiet spaces followed by afternoon café check-ins.
2. **The Late Night Era** (*October – November*):
   - Characterized by nocturnal timestamps (11:00 PM – 4:00 AM), ambient synthwave tracks, code search queries, and terminal notes.
3. **The Focus Grid** (*February – April*):
   - Driven by technical study sessions, algorithmic search queries, espresso purchases, and academic milestones.
4. **The Mountain Escape** (*April – May*):
   - Clustered by geo-coordinates outside the city, outdoor scenic photos, road trip playlists, and travel receipts.
5. **Comfort Spiral** (*December – January*):
   - Clustered by home deliveries, Studio Ghibli movie streams, winter weather notes, and warm beverages.

Each chapter outputs:
- Title & Era Identifier
- Formatted Date Range & Total Moments Count
- Evocative Narrative Summary & Emotional Quote
- Category Distribution Breakdown
- Key Geo-Locations & Connected Anchor Receipts

---

## Insights Logic

`src/utils/patternDetector.js` discovers non-obvious behavioral cycles across the dataset:

1. **Circadian Distribution (Night Owl Index)**:
   - Scans timestamps across all 428 receipts.
   - Calculates the ratio of activities occurring between 22:00 and 04:00 relative to daytime hours.
   - Identifies that 62% of musical activity occurred during nocturnal hours.
2. **Third Place Frequency**:
   - Aggregates `place` and `purchase` records to discover habitual sanctuary locations (*e.g., Blue Tokai, Third Wave Coffee*).
   - Correlates café visit frequency with preceding high-intensity calendar events.
3. **Soundtrack Priming (Music-to-Reflection Correlation)**:
   - Evaluates whether personal `note` entries are preceded within 45 minutes by a `music` listening session.
   - Discovers that 74% of reflective journal notes were created while an acoustic or ambient playlist was active.
4. **Visual Memory Density**:
   - Calculates photos taken per location visited, revealing that novel environments trigger 3.8x higher photographic preservation.
5. **Digital Personality Synthesis**:
   - Weighs category ratios, nocturnal scores, and reflective habits to categorize the user under a defined archetype: **"The Contemplative Builder"**.

---

## Tech Stack

- **Core Framework**: React 19.2 (`react`, `react-dom`)
- **Build Tool**: Vite 8.3 with `@vitejs/plugin-react`
- **Routing**: React Router DOM 7.18 (`createBrowserRouter`, `NavLink`, `useSearchParams`, `useLocation`)
- **Styling**: Tailwind CSS 3.4 & PostCSS with dark cinematic tokens and glassmorphism utilities
- **Data Visualization**:
  - Recharts 3.10 (`AreaChart`, `BarChart`, `ResponsiveContainer`)
  - Native HTML5 Canvas 2D (Memory Constellation starfield)
  - Responsive Scalable Vector Graphics (SVG) with Bezier curves (Connection Graph)
- **Icons**: Lucide React (`lucide-react`)
- **Audio**: Browser Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`)
- **Effects**: Canvas Confetti (`canvas-confetti`)
- **Linter**: Oxlint 1.81 (Rust-based ultra-fast linter — 0 errors, 0 warnings)

---

## Installation

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

```bash
# Clone the repository
git clone https://github.com/shatrughan9328/life-receipts.git

# Navigate to the project directory
cd life-receipts

# Install all dependencies
npm install
```

---

## Running Locally

To run the local Vite development server:

```bash
npm run dev
```

The application will start immediately at:
```
http://localhost:5173/
```

### Running the Linter:
```bash
npm run lint
```
*Result: 0 errors, 0 warnings across all files.*

---

## Production Build

To generate an optimized, code-split production bundle:

```bash
npm run build
```

To preview the built production bundle locally:

```bash
npm run preview
```

### Production Chunk Metrics:
- Chunks are cleanly split using `React.lazy()`:
  - `dist/index.html`: 1.69 kB (0.86 kB gzip)
  - `dist/assets/index-*.css`: 52.71 kB (9.01 kB gzip)
  - Page Chunks: All under 25 kB (gzipped: 2 – 8 kB)
  - Largest Chunk (`Overview` with Recharts): 379 kB (108 kB gzip)
- Zero build warnings, zero circular dependencies.

---

## Deployment

LifeLens is continuously deployed on **Vercel**:

- **Platform**: Vercel
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: 18.x / 20.x

To deploy your own fork to Vercel:
1. Fork the GitHub repository.
2. In Vercel, click **Add New Project** and select your fork.
3. Keep default settings (`Framework: Vite`, `Build: npm run build`, `Output: dist`).
4. Click **Deploy**.

---

## Accessibility

LifeLens was engineered with strict adherence to WCAG 2.1 AA accessibility guidelines:

1. **Semantic Landmark Elements**:
   - Uses `<header role="banner">`, `<main id="main-content">`, `<nav role="navigation">`, `<article>`, `<section>`, and `<aside>`.
2. **Skip-to-Content Link**:
   - Hidden skip link (`#main-content`) that becomes visible on keyboard Tab focus for screen readers.
3. **Heading Hierarchy**:
   - Each page contains a single, descriptive `<h1>`, followed logically by `<h2>`, `<h3>`, and `<h4>` elements with no skipped levels.
4. **Modal Dialog Accessibility**:
   - Modals use `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
   - Pressing **Escape** closes any open modal dialog.
   - Background click closes the modal.
5. **Keyboard Navigation**:
   - Every card, node, button, and slider is accessible via `Tab`, `Enter`, and `Space`.
   - Node network supports `Tab` navigation through all nodes with distinct `focus-visible:ring-2` focus rings.
   - Journey mode supports `ArrowLeft`, `ArrowRight`, and `Space` for playback control.
6. **Color Contrast & Reduced Motion**:
   - High-contrast text colors (`text-white`, `text-slate-300`, `text-indigo-400`) on dark backgrounds (`#07090e`, `#0d101c`).
   - Supports CSS `@media (prefers-reduced-motion: reduce)` to disable animations for motion-sensitive users.

---

## Performance Optimizations

1. **Route-Level Code Splitting**:
   - All 8 primary pages are loaded on-demand via `React.lazy()` and wrapped in `<Suspense>` with a dark skeleton fallback in `App.jsx`.
2. **Zero External Audio Assets**:
   - Ambient sound is generated on the fly via the Web Audio API synthesizer, eliminating multi-megabyte MP3 downloads.
3. **Responsive HTML5 Canvas Rendering**:
   - `MemoryConstellation` uses `requestAnimationFrame` with dirty checking, off-screen calculation caching, and automatic animation frame cancellation on unmount.
4. **Responsive Vector ViewBox**:
   - `ConnectionGraph` uses an SVG `viewBox` responsive to container dimensions, avoiding expensive re-renders and layout thrashing.
5. **Debounced Filtering & State Derivation**:
   - `useReceiptFilters` derives filtered lists in memory with `useMemo`, preventing redundant renders during rapid search typing.

---

## Live Demo

Experience the live application deployed on Vercel:

🔗 **[https://life-receipts-zeta.vercel.app](https://life-receipts-zeta.vercel.app)**

---

## GitHub Repository

Source code and version history:

🔗 **[https://github.com/shatrughan9328/life-receipts](https://github.com/shatrughan9328/life-receipts)**

---

*LifeLens — Built with pride for the "Your Life, In Receipts" Frontend Engineering Hackathon.*
