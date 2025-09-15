# Portfolio - Famicom/NES Style

A retro gaming-inspired portfolio website built with Next.js 15, featuring an 8-bit aesthetic combined with modern web technologies.

## 🎮 Overview

**"PLAYFUL CODE, REAL IMPACT"** - Professional portfolio content delivered through a nostalgic Famicom/NES gaming interface.

### Live Demo

🚧 Coming soon

## 🚀 Features

- **8-bit Retro Design**: Authentic Famicom/NES visual style with pixel-perfect graphics
- **Keyboard Navigation**: Full keyboard controls (↑↓←→ + Enter) for classic gaming feel
- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Performance Optimized**: Turbopack, Partial Prerendering (PPR), and streaming
- **Responsive Design**: Mobile-first approach with touch and keyboard support
- **Interactive Elements**: Game-like interactions and animations

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **UI**: React 19 + TypeScript 5.6+
- **Build Tool**: Turbopack (dev & production)
- **Styling**: Tailwind CSS v4 + NES.css
- **Font**: Press Start 2P (optimized with next/font)
- **Code Quality**: ESLint 9, Prettier 3, Husky, lint-staged

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/ogison/portfolio.git
cd portfolio

# Install dependencies
npm install
```

## 🎮 Development

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # UI components
├── lib/               # Utility functions
└── styles/            # Additional styles
```

## 🎨 Design System

### Color Palette

- **Primary Accent**: `#e60012` (Nintendo Red)
- **Background**: `#1a1a1a`
- **Foreground**: `#f5f5f5`
- **Success**: `#92cc41`
- **Warning**: `#f7d51d`
- **Error**: `#e76e55`

### Typography

- **Headings**: Press Start 2P font for authentic 8-bit feel
- **Body**: System fonts optimized for readability

## 🎯 Content Sections

- **Home**: Hero section with "PRESS START" CTA
- **About**: Personal introduction and timeline
- **Skills**: Core competencies and tech stack
- **Works**: Featured projects with impact metrics
- **Demos**: Interactive experiments and mini-games
- **Writing**: Technical articles and learning logs
- **Contact**: Contact form with social links

## ⌨️ Keyboard Controls

- **Arrow Keys** (↑↓←→): Navigate menu items
- **Enter/Space**: Select item
- **Escape**: Close menus
- **Tab**: Move between focusable elements

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## 🚀 Deployment

The project is configured for deployment on various platforms:

```bash
# Build for production
npm run build

# The output will be in .next/ directory
# Deploy to your preferred hosting platform
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**ogison**

- GitHub: [@ogison](https://github.com/ogison)

## 🙏 Acknowledgments

- Design inspired by classic Famicom/NES games
- Built with [Next.js](https://nextjs.org/)
- UI components from [NES.css](https://nostalgic-css.github.io/NES.css/)
- Font: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)

---

*Generated with [Claude Code](https://claude.ai/code)*