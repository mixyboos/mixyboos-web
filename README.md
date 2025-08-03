<div align="center">

# 🎵 Mixyboos

**Your Ultimate Music Mixing Platform**

*Create, share, and discover AI-powered music mixes with crystal-clear audio quality*

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Router](https://img.shields.io/badge/TanStack-Router-FF6B35?style=for-the-badge&logo=react&logoColor=white)](https://tanstack.com/router)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[🚀 Live Demo](https://mixyboos.com) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/mixyboos/mixyboos-web/issues) • [✨ Request Feature](https://github.com/mixyboos/mixyboos-web/issues)

</div>

---

## ✨ Features

### 🎧 **AI-Powered Mixing**
- Intelligent audio analysis and seamless mixing
- Personalized mix recommendations based on your taste
- Advanced audio processing with crystal-clear quality

### 🎵 **Audio Experience**
- High-quality audio streaming with HLS support
- Interactive waveform visualization
- Real-time audio processing and progress tracking
- Support for various audio formats

### 📱 **Modern UI/UX**
- Responsive design that works on all devices
- Dark/Light theme toggle with system preference detection
- Beautiful animations and transitions
- Accessible components with shadcn/ui

### 🔄 **Real-time Features**
- Live streaming capabilities
- Real-time mix processing status
- Instant audio playback and controls
- Progress tracking for uploads and processing

### 🎛️ **Creator Tools**
- Drag-and-drop audio file uploads
- Mix metadata management (title, description, artwork)
- Audio processing pipeline with progress indicators
- Mix editing and management dashboard

### 👥 **Social Features**
- User profiles and mix collections
- Like, share, and download functionality
- Personal mix libraries and discovery feeds
- User authentication and authorization

---

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development experience
- **Vite** - Lightning-fast build tool and dev server

### **Routing & State**
- **TanStack Router** - Type-safe file-based routing
- **TanStack Query** - Powerful data synchronization
- **Zustand** - Lightweight state management for audio context

### **UI & Styling**
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Lucide React** - Consistent icon system
- **Framer Motion** - Smooth animations (if used)

### **Audio Processing**
- **HLS.js** - HTTP Live Streaming support
- **Web Audio API** - Advanced audio manipulation
- **Custom waveform visualization** - Interactive audio timeline

### **Development Tools**
- **ESLint** - Code linting with TanStack config
- **Prettier** - Code formatting
- **Vitest** - Fast unit testing
- **Bun** - Fast package manager and runtime

---

## 🚀 Quick Start

### Prerequisites
- **Bun** (recommended) or **Node.js 18+**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/mixyboos/mixyboos-web.git
cd mixyboos-web

# Install dependencies
bun install

# Start development server
bun run start
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
# Build the application
bun run build

# Preview the production build
bun run preview
```

---

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── mix/             # Mix-specific components
│   ├── widgets/         # Audio players and controls
│   ├── ui/              # shadcn/ui components
│   └── layouts/         # Page layouts
├── pages/               # Page components
├── routes/              # TanStack Router routes
├── lib/                 # Utilities and services
│   ├── contexts/        # React contexts
│   ├── services/        # API services
│   ├── models/          # TypeScript types
│   └── utils/           # Helper functions
└── styles/              # Global styles
```

---

## 🔧 Development

### Available Scripts

```bash
# Development
bun run start          # Start dev server
bun run build          # Build for production
bun run preview        # Preview production build

# Code Quality
bun run lint           # Lint code
bun run format         # Format code
bun run check          # Type check + lint

# Testing
bun run test           # Run tests
bun run test:watch     # Run tests in watch mode
```

### Adding New Components

Use shadcn/ui to add new components:

```bash
# Add a new UI component
pnpx shadcn@latest add button
pnpx shadcn@latest add dialog
```

### Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=your_api_url
VITE_APP_TITLE=Mixyboos
```

---

## 🎯 Key Features Implementation

### Audio Management
- **Multi-format support** - Handles various audio file formats
- **Streaming optimization** - HLS streaming for efficient audio delivery
- **Real-time processing** - Background audio processing with progress tracking

### User Experience
- **Responsive design** - Mobile-first approach with desktop optimization
- **Accessibility** - WCAG compliant components and keyboard navigation
- **Performance** - Optimized with React 18 features and Vite bundling

### Developer Experience
- **Type safety** - Full TypeScript coverage
- **Modern tooling** - Latest development tools and practices
- **Testing** - Comprehensive test suite with Vitest

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `bun run test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** - For the beautiful component library
- **TanStack** - For the excellent router and query tools
- **Tailwind CSS** - For the utility-first CSS framework
- **React Community** - For the amazing ecosystem

---

<div align="center">

**Built with ❤️ by the Mixyboos team**

*Transform your music experience with AI-powered mixing*

</div>
