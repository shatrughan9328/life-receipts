# LifeLens — Connect the Dots of Your Digital Life
> **Hackathon Problem Statement**: *“Your Life, In Receipts”*  
> **Core Concept**: Transforming disconnected digital receipts into patterns, relationships, life chapters, and an interactive personal story.

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 The Philosophy: Beyond A Chronological Timeline

Your digital life is fragmented across platforms: a song played at 1:48 AM on Spotify, a search query at 2:12 AM, a café visit at 2:45 PM, a coffee receipt, a photograph of sunlight on a wooden table, and a five-word journal entry at 3:42 PM.

Individually, they are mere transactions. **Together, they reveal a moment when you decided to slow down.**

LifeLens moves beyond chronological timelines (`January → February → March`) and implements:
```
Raw Receipts ➔ Relational Vectors ➔ Patterns ➔ Life Chapters ➔ Interactive Narrative
```

---

## 🧭 Application Structure & Key Experiences

### 1. Landing Experience (`/`)
- **Cinematic Dark Interface**: Midnight slate backdrop (`#07090e`) with glassmorphism cards, glowing cosmic gradients, and micro-interactions.
- **Floating Receipts**: Ambient cards subtly drifting in the background (*"Played Night Changes"*, *"Visited Blue Tokai"*, *"Needed this break."*).
- **Live Statistics**: 428 Moments Captured • 9 Life Dimensions • 12 Months Traversed • 1 Cohesive Story.

### 2. Overview & Annual Digital Pulse (`/overview`)
- **Your Digital Pulse**: Interactive Recharts area visualization tracking activity across all 12 months with peak indicators in October and April.
- **Circadian Clock**: 24-hour distribution showcasing diurnal routines vs. nocturnal flow (38% of moments logged between 10 PM and 2 AM).
- **Dimensions of Life**: Proportional breakdown of all 9 receipt categories with custom HSL-tailored colors.

### 3. Receipt Explorer (`/explorer`)
- **Instant Search**: Full-text search matching titles, descriptions, locations, and keywords.
- **Multi-Category Pills**: Instant filtering for Music, Movies, Places, Purchases, Photos, Messages, Searches, Events, Notes.
- **Detailed Receipt Modal**:
  - 🎵 **Music**: Simulated waveform audio visualizer with lyrics excerpt.
  - 📍 **Place**: Coordinates, total visit frequency, and atmospheric vibe notes.
  - 📷 **Photo**: Canvas preview with photography EXIF data (ISO, aperture, shutter speed).
  - ☕ **Purchase**: Itemized cash register receipt with barcode and auth stamps.
  - 📝 **Note**: Pocket journal styling with handwriting font and emotional tone badge.
  - 🔗 **Causal Chain Drawer**: Trace sequential life moments directly within the modal.

### 4. Connection Engine & Connect the Dots (`/connections`)
- **Algorithmic Relationship Scoring** (`src/utils/connectionEngine.js`):
  - Same calendar day: `+25 pts`
  - Within 2 hours: up to `+25 pts`
  - Physical location overlap: `+20 pts`
  - Shared semantic keywords: `+20 pts`
  - Category synergy: `+10 pts`
  - Shared mood/headspace: `+10 pts`
- **Interactive SVG Node Network**:
  - Responsive SVG `viewBox` scaling from 320px mobile screens up to 4K displays.
  - Selecting an anchor node dims unrelated moments to 22% and illuminates connected nodes with glowing halos and animated bezier curves.
  - **Causal Life Chain Visualizer**: Explains step-by-step causality (*e.g., Search at 2:12 AM → Place at 2:45 PM → Purchase at 3:18 PM → Photo at 3:25 PM → Note at 3:42 PM*).
  - Sensitivity slider (20pt – 55pt) allowing judges to inspect dense vs. sparse clustering.

### 5. Story Reveal Engine (`StoryReveal.jsx`)
- **Flagship Demo: "The Reset"**:
  > *"Sometimes a change doesn't appear as one big event. It appears as a song, a search, a place, a coffee, a photograph and a sentence. Separately, they were receipts. Together, they captured a moment when you decided to slow down."*
- **Ambient Sound Generator**: Harmonic synthesizer drone built natively with the browser's Web Audio API (zero audio file dependencies).
- **One-Click Share/Copy**: Formatted story card for export.

### 6. Life Chapters (`/chapters` & `/chapters/:id`)
- Groups receipts into 5 life eras:
  1. ☕ **The Reset**: A turning point from burnout into intentional pause.
  2. 🌙 **The Late Night Era**: Midnight coding, synthwave, and nocturnal clarity.
  3. 🎓 **The Grind Era**: High-intensity spring sprints, distributed systems research, and pour-overs.
  4. ✈️ **The Escape**: Mountain highway road trips and starry campfire nights.
  5. 🎬 **Comfort Zone**: Winter recharge, Studio Ghibli films, and hot ramen.

### 7. Pattern Discovery & Persona (`/insights`)
- **5 Calculated Patterns**:
  - 🌙 **Night Owl**: 62% of music activity happened after 10 PM.
  - ☕ **Your Third Place**: Visited cafés most often during study-heavy weeks.
  - 🎵 **Soundtrack Effect**: Late-night notes frequently preceded by music sessions.
  - 📍 **Explorer Mode**: Photo density spiked 3.8x when visiting new locations.
  - 🎬 **Comfort Loop**: Returned to comfort cinema during low-activity weeks.
- **Deep-linking Action**: Every pattern card features a *"View Related Moments in Explorer"* link.
- **Digital Personality Profile**: Archetype: *"The Contemplative Builder"*.

### 8. Memory Constellation (`/constellation`)
- High-performance canvas-based starfield where 428 receipts twinkle as stars in a spiral galaxy.
- Cluster filters (*The Reset Constellation, Nocturnal Orbit, The Focus Grid, Mountain Ridge, Comfort Spiral*).
- Full touch support (`onTouchStart`, `onTouchMove`) for mobile exploration.

### 9. Guided Journey Mode (`/journey`)
- Full-screen, Spotify-Wrapped style cinematic experience.
- Step-by-step auto-playback with keyboard arrow navigation and celebratory confetti on the final story reveal.

---

## 🛠️ Technical Architecture

```
src/
├── data/
│   └── receipts.js           # 428 normalized receipts across 9 categories + demo cluster
├── utils/
│   ├── connectionEngine.js   # Deterministic relationship scoring & cluster detection
│   ├── patternDetector.js    # Behavioral patterns (Night Owl, Third Place, etc.)
│   ├── chapterGenerator.js   # Thematic life chapter synthesis
│   ├── storyGenerator.js     # Template-based narrative synthesis
│   └── analytics.js          # Monthly pulse & circadian rhythm aggregations
├── components/
│   ├── Navbar.jsx            # Responsive glassmorphic navigation with mobile drawer
│   ├── ReceiptCard.jsx       # Semantic card with perforated borders & barcode
│   ├── ReceiptModal.jsx      # Accessible dialog with waveform, maps, & photo EXIF
│   ├── ConnectionGraph.jsx   # Interactive SVG node network with responsive viewBox
│   ├── ConnectionChain.jsx   # Step-by-step causal chain visualizer
│   ├── MemoryConstellation.jsx# Canvas-based 428-star galaxy
│   ├── FilterBar.jsx         # Search debounce, category pills, & month filters
│   ├── StatCard.jsx          # Glassmorphic metric card with glow accents
│   ├── ChapterCard.jsx       # Chapter cards with progress and category breakdown
│   ├── InsightCard.jsx       # Pattern cards with deep-links to Explorer
│   ├── StoryReveal.jsx       # Narrative reveal modal with Web Audio synthesizer
│   └── FloatingReceipts.jsx  # Hero background floating receipts
└── pages/
    ├── Landing.jsx           # Cinematic hero & statistics
    ├── Overview.jsx          # Digital Pulse & Circadian clock
    ├── Explorer.jsx          # Filterable & searchable receipt grid
    ├── Connections.jsx       # Connect the Dots node graph
    ├── Chapters.jsx          # Life Chapters list
    ├── ChapterDetail.jsx     # Immersive chapter story view
    ├── Insights.jsx          # Pattern Discovery & Digital Personality
    ├── ConstellationPage.jsx # Full-screen celestial galaxy
    └── Journey.jsx           # Spotify-Wrapped style story progression
```

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation
```bash
# Clone or navigate to the repository
cd frontenderena

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### Production Build & Linting
```bash
# Verify linting (0 errors, 0 warnings across all 32 files)
npm run lint

# Build the optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 🚀 Deploying to Vercel

1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**.

---

## 🏆 Hackathon Evaluation Highlights

- **100% Frontend-Only**: All relationship calculations, clustering, and narrative generation happen locally in the browser.
- **Accessibility**: Semantic HTML5 landmarks, visible focus rings, WCAG AA contrast, and ARIA dialog attributes.
- **Responsiveness**: Tested from 320px mobile viewports to large desktops with zero overflow.
- **Performance**: Route-level code splitting using `React.lazy()` and `<Suspense>`, keeping chunks lightweight and load times sub-second.
- **Emotional Storytelling**: Connects five isolated receipts into one unforgettable moment: *"The Reset"*.

---

*Built with ❤️ for the "Your Life, In Receipts" Frontend Hackathon.*
