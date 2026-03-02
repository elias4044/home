# Elias4044.com

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38b2ac?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Deployed](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

A modern, interactive personal portfolio and home center built with cutting-edge web technologies. Features smooth animations, a custom canvas-based node visualization, and a fully responsive design.

---

## About

This is the source code for **elias4044.com** — a portfolio that showcases my work in full-stack development, creative coding, and modern web design. The site combines thoughtful UX, clean architecture, and interactive visual elements to create an engaging experience.

### What Makes It Special

- **Interactive Canvas Visualization** — Custom WebGL/Canvas-based node system
- **Smooth Animations** — Polished transitions powered by Framer Motion and GSAP
- **Responsive Design** — Optimized for all screen sizes
- **Magnetic Cursor** — Custom interactive cursor effects
- **Modern Stack** — Next.js 16, React 19, Tailwind CSS, and TypeScript

---

## Tech Stack

### Frontend
- **Framework** — [Next.js](https://nextjs.org/) 16
- **Runtime** — React 19 with React Server Components
- **Styling** — [Tailwind CSS](https://tailwindcss.com/) with custom utilities
- **Animations** — [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **UI Components** — Radix UI (Accordion, Dialog, Tabs, Toast, Tooltip, etc.)
- **Icons** — [Lucide React](https://lucide.dev/)

### Graphics & Interaction
- **Canvas Rendering** — [OGL](https://github.com/oframe/ogl) (Minimal WebGL library)
- **Name Color Generation** — [NTC.js](https://chir.ag/projects/ntcjs/)

### Backend & Services
- **Database & Auth** — Firebase & Firebase Admin SDK
- **Hosting** — Vercel (with Edge Functions support)

### Tools & Quality
- **Package Manager** — Node.js
- **Code Quality** — [Biomejs](https://biomejs.dev/)
- **TypeScript** — Strict mode for type safety
- **Compiler** — Next.js React Compiler enabled for optimal performance

---
Optionally for local usage/development
## Getting Started

### Prerequisites

Ensure you have Node.js installed (version 18 or higher recommended).

### Installation

```bash
# Clone the repository
git clone https://github.com/elias4044/home.git
cd home

# Install dependencies
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

### Building

Build for production:

```bash
npm run build
npm start
```

### Code Quality

Format and check code:

```bash
npm run lint      # Check code with Biomejs
npm run format    # Format code with Biomejs
```

---

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── api/               # API routes
│
├── components/            # React components
│   ├── hero-section.tsx       # Landing section
│   ├── about-section.tsx      # About me section
│   ├── projects-section.tsx   # Work showcase
│   ├── connect-section.tsx    # Contact/CTA section
│   ├── navigation.tsx         # Main navigation
│   ├── node-canvas.tsx        # Interactive canvas
│   ├── magnetic-cursor.tsx    # Custom cursor effect
│   ├── theme-provider.tsx     # Dark/light theme
│   ├── footer.tsx            # Footer
│   │
│   │
│   └── ui/                # Shadcn-style UI primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── tabs.tsx
│       └── ...
│
├── hooks/                 # Custom React hooks
│   ├── use-in-view.ts    # Intersection observer hook
│   ├── use-mobile.ts     # Mobile detection hook
│   └── use-toast.ts      # Toast notifications hook
│
├── lib/                   # Utilities & helpers
│   └── utils.ts          # Shared utility functions
│
├── public/               # Static assets
│
└── package.json          # Project metadata & dependencies
```

---

## Key Components

### Hero Section
The landing section with animated introduction, status indicator, and call-to-action. Features mount animations and smooth transitions.

### About Section
Detailed background with:
- Multi-paragraph narrative about background and philosophy
- Technology skills with hover effects
- Interests and focus areas
- Intersection observer-based animations

### Projects Section
Showcase of work with:
- Project cards with descriptions and tech tags
- Live links and status indicators (live, in-progress, archived)
- Responsive grid layout

### Interactive Elements
- **Node Canvas** — Custom WebGL visualization of interconnected nodes
- **Magnetic Cursor** — Custom cursor that follows and interacts with elements
- **Smooth Scrolling** — Active section navigation based on scroll position

---

## Deployment

The site is deployed on **Vercel** and automatically deploys when changes are pushed to the `master` branch.

### Vercel Configuration

See `vercel.json` for deployment settings.

---

## Customization

### Theme & Colors
The site uses Tailwind CSS with custom theme configuration in `tailwind.config.js`. Modify color variables to customize the appearance.

### Content Updates
- Update hero section text in `components/hero-section.tsx`
- Modify projects array in `components/projects-section.tsx`
- Edit about content in `components/about-section.tsx`
- Change navigation items in `components/navigation.tsx`

### Typography & Spacing
All sizing and spacing uses Tailwind's utility classes. Adjust in component files or update the base Tailwind configuration.

---

## Browser Support

The site is optimized for all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

---

## Performance

- **React Compiler** — Enabled for automatic optimization
- **Image Optimization** — Next.js built-in image optimization
- **Code Splitting** — Automatic with Next.js App Router
- **CSS Efficiency** — Tailwind CSS with PurgeCSS

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Author

**Elias Gulam**

- Website: [elias4044.com](https://elias4044.com)
- Email: [elias4044@proton.me](mailto:elias4044@proton.me)
- GitHub: [@elias4044](https://github.com/elias4044)

---

## Contributing

While this is a personal project, feedback and suggestions are always welcome. Feel free to open an issue or reach out with ideas.

---

## Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [GSAP](https://gsap.com/) for advanced animation capabilities
- [Next.js](https://nextjs.org/) for the modern React framework