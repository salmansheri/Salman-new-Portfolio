# Salman Sheriff Portfolio App

A premium, high-performance developer portfolio application built with Next.js 16, React 19, Tailwind CSS v4, and dynamic GSAP animations. This project features full-page responsiveness, a bento-style design layout, dark/light theme options, and dynamic project detail views loaded from local portfolio configurations.

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Architecture Overview](#architecture-overview)
- [Data Structure Schema](#data-structure-schema)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Key Features

- **Dynamic Interactive Bento Layout**: Fluid components utilizing micro-scaling and active translation transitions.
- **GSAP Scroll Trigger Animations**: High-fidelity entrance reveals, staggered fades, and scroll-triggered motion effects.
- **Dynamic Project Details Pages**: Redesigned dynamic sub-routes under `/project/[slug]` rendering full-width hero header cards, custom metadata sections (Client, Role, Timeline), and a bento achievements grid.
- **Integrated Theme System**: Light and Dark mode toggles saving preferences to local storage with anti-flash script initialization.
- **Built-in Quality Gates**: Strict syntax and styling formatting enforced via Biome.

---

## Tech Stack

- **Framework**: Next.js 16.2.9 (App Router with Turbopack)
- **Runtime**: React 19.2.4
- **Styling**: Tailwind CSS v4 (PostCSS integration)
- **Animation**: GSAP 3 + `@gsap/react`
- **Linter & Formatter**: Biome 2.2.0
- **Language**: TypeScript 5.x

---

## Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js**: `v20.x` or higher (LTS recommended)
- **Package Manager**: `npm` (v10+) or `yarn`

---

## Getting Started

Follow these steps to set up the development environment locally:

### 1. Clone the Repository
```bash
git clone https://github.com/salmansheri/Salman-new-Portfolio.git
cd Salman-new-Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
Run the local dev server using Next.js with Turbopack support:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Architecture Overview

### Directory Structure

```
├── docs/                     # Technical documentation files
│   └── PROJECT_DETAILS.md    # Detail View specifications
├── src/
│   ├── app/                  # Next.js App Router root
│   │   ├── globals.css       # Tailwind v4 directives & theme definitions
│   │   ├── layout.tsx        # Global HTML template & font preloads
│   │   ├── page.tsx          # Main Portfolio landing page
│   │   └── project/          # Dynamic project details routes
│   │       └── [slug]/
│   │           └── page.tsx  # Dynamic leaf router
│   ├── components/           # Reusable UI component modules
│   │   ├── Navbar.tsx        # Navigation & Theme toggle state
│   │   ├── Projects.tsx      # Landing page selecion grid
│   │   ├── ProjectDetails.tsx# Core details widget with progress rings
│   │   ├── Skills.tsx        # Tech stack grid panels
│   │   └── GlowBackground.tsx# Decorative ambient canvas blobs
│   └── data/
│       └── portfolio.json    # Global database source of truth
├── biome.json                # Biome compiler and linter rules
├── package.json              # App manifest & dependencies
└── tsconfig.json             # TypeScript compiler settings
```

### Data Flow

```
User visits Home Page (/) 
  └─ Clicks selected work item (Link wrapper)
      └─ Navigates to /project/[slug]
          └─ Resolves async slug Promise using React.use(params)
              └─ Filters data array inside portfolio.json
                  └─ Mounts ProjectDetails.tsx & animates via GSAP
```

---

## Data Structure Schema

The portfolio details are configured in **[`src/data/portfolio.json`](file:///mnt/projects/Salman-new-Portfolio/src/data/portfolio.json)**. To add a new project, follow this structure:

```json
{
  "title": "PROJECT TITLE",
  "slug": "project-slug",
  "description": "Long-form description overview.",
  "tag": "BADGE_TEXT",
  "image": "https://image-url.png",
  "alt": "Accessibility text description of thumbnail.",
  "link": "/project/project-slug",
  "status": "In Progress",
  "clientName": "Client Enterprise",
  "startDate": "Start Month",
  "endDate": "End Month",
  "budget": 120000,
  "progress": 75,
  "tech": ["Framework1", "Library2", "Database3"],
  "projectLead": {
    "name": "Lead Name",
    "role": "Lead Role Title",
    "email": "lead@domain.com"
  },
  "achievements": [
    {
      "title": "Achievement Title",
      "description": "Elaborate detail of achievement.",
      "icon": "speed",
      "span": 1
    }
  ],
  "milestones": [
    {
      "id": "unique-m1",
      "name": "Phase Name",
      "description": "Brief description of phase work.",
      "status": "completed",
      "dueDate": "Oct 10, 2026"
    }
  ],
  "team": [
    {
      "id": "team-member-1",
      "name": "Member Name",
      "role": "Role Title",
      "email": "member@domain.com"
    }
  ]
}
```

---

## Available Scripts

The following commands are defined in `package.json`:

| Command | Description |
|---|---|
| `npm run dev` | Runs the local development server on port 3000. |
| `npm run build` | Builds the optimized Next.js static and dynamic bundles. |
| `npm run start` | Runs the built production server locally. |
| `npm run lint` | Runs the Biome compiler check to verify syntax and lint. |
| `npm run format` | Runs the Biome automatic formatter on all src files. |

---

## Deployment

### Deploying to Vercel (Recommended)
This Next.js application compiles cleanly into static layout segments and dynamic endpoints.

1. Install the Vercel CLI or connect your Git repository to the [Vercel Dashboard](https://vercel.com).
2. Set the build settings to default:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
3. Click Deploy.

### Manual Node.js VPS / Docker
To run on a standalone server:
```bash
# 1. Build the production package
npm run build

# 2. Run the production server daemon
npm start
```

---

## Troubleshooting

### Biome Linter Warnings
If compilation fails due to lint rules:
```bash
npm run lint
```
To automatically fix format alignment issues:
```bash
npm run format
```

### Next.js Dynamic Route Parameter Errors
*Next.js 15/16 uses asynchronous dynamic route params.* Ensure page components resolve route inputs using `await params` (for server components) or React's `use(params)` (for client components) as shown in `src/app/project/[slug]/page.tsx`.
