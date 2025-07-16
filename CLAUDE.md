# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Architecture

This is a React portfolio website built with Vite, TypeScript, and Tailwind CSS. The project uses shadcn/ui components and includes advanced scroll-driven animations.

### Key Technologies
- **Build Tool**: Vite with React SWC plugin
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom Apple-inspired design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM
- **State Management**: React Query for server state
- **Icons**: Lucide React

### Project Structure
- `src/App.tsx` - Main app component with routing setup
- `src/pages/` - Page components (Index.tsx is the main portfolio page)
- `src/components/ui/` - shadcn/ui components
- `src/hooks/` - Custom React hooks
- `src/lib/utils.ts` - Utility functions
- `src/assets/` - Static assets (images, etc.)

### Design System
The project uses a custom Apple-inspired design system with:
- CSS custom properties for colors and shadows
- Glass morphism effects (`.glass-header` class)
- Custom container utilities (`.container-custom`)
- Fade-in animations (`.fade-in` class)
- Tech tags styling (`.tech-tag` class)
- Button variants (`.btn-primary`, `.btn-secondary`)

### Special Features
- **Scroll-driven video animations**: The Index page includes a complex scroll-story section that controls video playback based on scroll position
- **Intersection Observer animations**: Elements fade in when they become visible
- **Smooth scrolling navigation**: Navigation smoothly scrolls to sections
- **Custom Tailwind configuration**: Extended color palette and Apple-style shadows

### Component Patterns
- Uses `@/` path alias for imports (resolves to `src/`)
- Components follow shadcn/ui patterns with forwardRef and proper TypeScript typing
- Custom hooks are used for mobile detection and toast notifications
- Lucide React icons are used throughout

### Development Notes
- The project uses Lovable's component tagger in development mode
- ESLint is configured with React hooks rules but unused variables are disabled
- TypeScript is configured with relaxed settings (no strict null checks, allows any)
- The main portfolio page is a single-page application with smooth scrolling between sections

### Content Structure
The Index page contains:
- Hero section with animated background
- Scroll-driven story section with video
- Experience timeline
- Projects grid
- Contact section
- Footer

When adding new sections or features, follow the existing patterns for animations, styling, and component structure.