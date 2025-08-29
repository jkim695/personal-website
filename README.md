# Joshua A. Kim - Portfolio Website

A modern, responsive portfolio website showcasing my experience as a Software Engineer and Creative Problem Solver.

## 🌐 Live Site

**Deployed on GitHub Pages**: https://jkim695.github.io/personal-website/

## 📋 Project Overview

This is a React-based portfolio website built with modern web technologies. It features:

- **Responsive Design**: Optimized for all device sizes
- **Scroll-driven Animations**: Interactive video storytelling and smooth scroll effects
- **Apple-inspired Design System**: Clean, modern aesthetic with glass morphism effects
- **Performance Optimized**: Built with Vite for fast loading and optimal bundle size

## 🚀 Technologies Used

- **Build Tool**: Vite with React SWC plugin
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM with HashRouter for GitHub Pages compatibility
- **State Management**: React Query for server state
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with automated CI/CD

## 🏗️ Project Structure

```
src/
├── components/ui/     # shadcn/ui components
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── lib/              # Utility functions
├── assets/           # Static assets
└── App.tsx           # Main app component
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/jkim695/personal-website.git

# Navigate to project directory
cd modern-student-site

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start on `http://localhost:8080`

## 📜 Available Scripts

- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:

1. **Triggers**: Automatically deploys on push to `main` branch
2. **Build Process**: Runs `npm run build` to create production bundle
3. **Deployment**: Uses GitHub Pages action to deploy to `gh-pages`
4. **URL**: Available at https://jkim695.github.io/modern-student-site/

### Manual Deployment

To deploy manually:

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# This is automatically deployed via GitHub Actions
```

## 🎨 Design Features

### Custom Design System
- CSS custom properties for consistent theming
- Glass morphism effects (`.glass-header`)
- Custom container utilities (`.container-custom`)
- Fade-in animations (`.fade-in`)
- Tech tags styling (`.tech-tag`)
- Button variants (`.btn-primary`, `.btn-secondary`)

### Special Features
- **Scroll-driven Video**: Interactive video storytelling controlled by scroll position
- **Intersection Observer**: Elements animate in when visible
- **Smooth Navigation**: Seamless scrolling between sections
- **Mobile Responsive**: Optimized experience across all devices

## 📱 Sections

The portfolio includes:

- **Hero Section**: Animated background with introduction
- **Story Section**: Scroll-driven video narrative
- **Experience Timeline**: Professional background and education
- **Projects Grid**: Showcase of key projects and achievements
- **Contact Section**: Ways to get in touch
- **Footer**: Additional links and information

## 🔧 Configuration

### Path Aliases
- `@/` resolves to `src/` directory for clean imports

### Router Configuration
- Uses HashRouter for GitHub Pages compatibility
- Includes 404.html for proper routing fallbacks

### Build Configuration
- Base path set to `/modern-student-site/` for GitHub Pages
- Optimized asset handling and code splitting

## 📄 License

This project is for portfolio purposes. All rights reserved.

## 🤝 Contact

**Joshua A. Kim**  
Software Engineer & Creative Problem Solver

Feel free to reach out through the contact form on the website or connect with me on professional platforms.

---

*Built with ❤️ using React, TypeScript, and modern web technologies*