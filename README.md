# 🧠 Algo Master

<div align="center">

**Interactive Data Structures & Algorithms Learning Platform**

*Helping developers and beginners master DSA concepts through visual learning*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[🌐 Live Demo](https://algo-masterr.netlify.app/) · [ Report Bug](https://github.com/Erkan3034/AlgoMaster/issues) · [ Request Feature](https://github.com/Erkan3034/AlgoMaster/issues)

</div>

---

##  Project Vision

**Algo Master** was created with a simple mission: **make learning Data Structures & Algorithms accessible, visual, and enjoyable for everyone.**

Many developers struggle with DSA concepts because traditional learning resources are:
-  Text-heavy and abstract
-  Focused on memorization rather than understanding
-  Lacking interactive elements

Algo Master addresses these challenges by providing:
- **Visual explanations** that show how algorithms work step-by-step
-  **Code examples** in multiple languages with detailed comments
-  **Interactive playground** to experiment with data structures
-  **Complexity analysis** with visual Big O comparisons

---

##  Features

###  Comprehensive Learning Content
| Data Structures | Algorithms |
|-----------------|------------|
| Arrays & Dynamic Arrays | Sorting (Bubble, Quick, Merge, etc.) |
| Linked Lists (Singly, Doubly) | Searching (Binary, Linear, etc.) |
| Stacks & Queues | Graph Traversal (BFS, DFS) |
| Trees (Binary, BST, AVL) | Dynamic Programming |
| Graphs | Greedy Algorithms |
| Hash Tables | Divide & Conquer |

###  User Experience
-  **Dark/Light Theme** - Easy on the eyes
-  **Multi-language** - English & Turkish support
-  **Responsive Design** - Works on all devices
-  **Fast Performance** - Optimized with Vite
-  **Search** - Find topics quickly

###  Manager Panel
- Secure authentication via Supabase
- Full CRUD operations for content management
- Real-time database updates

---

##  Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with hooks and concurrent features |
| **TypeScript** | Type safety and better developer experience |
| **Vite** | Lightning-fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **Radix UI** | Accessible, unstyled UI components |
| **Framer Motion** | Smooth animations and transitions |
| **TanStack Query** | Server state management and caching |
| **Wouter** | Lightweight routing (~1KB) |

### Backend & Infrastructure
| Technology | Purpose |
|------------|---------|
| **Supabase** | PostgreSQL database, authentication, real-time |
| **Netlify** | Hosting, CI/CD, serverless functions |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **PostCSS** | CSS processing |
| **Autoprefixer** | CSS vendor prefixes |

---

##  Getting Started

### Prerequisites
- **Node.js** 20 or higher
- **npm** 10 or higher
- **Git**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Erkan3034/AlgoMaster.git

# 2. Navigate to project directory
cd AlgoMaster

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

>  **Note**: The app works with static data without Supabase configuration. See [Database Setup](#database-setup) for full functionality.

---

##  Database Setup

### 1. Create Supabase Project
1. Visit [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Copy your **Project URL** and **anon key** from Settings → API

### 2. Configure Environment
Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

**Note:** Turkish translation is automatically handled using MyMemory Translation API (free, no API key required). Translations are cached in localStorage for performance. When Turkish language is selected, all content from the database will be automatically translated.

### 3. Initialize Database
Run the SQL scripts in Supabase SQL Editor:

```bash
# Schema setup
supabase/schema.sql

# Seed data (optional)
supabase/seed-data-full.sql
```

### 4. Create Reber User
1. Go to **Authentication** → **Users** in Supabase Dashboard
2. Click **Add User** → **Create New User**
3. Enter reber email and password

---

## 📁 Project Structure

```
AlgoMaster/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/            # Base UI components (Button, Card, etc.)
│   │   │   └── *.tsx          # Feature components
│   │   ├── pages/             # Route pages
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utilities & configurations
│   │   │   ├── supabase.ts    # Supabase client
│   │   │   ├── i18n.tsx       # Internationalization
│   │   │   └── utils.ts       # Helper functions
│   │   └── types/             # TypeScript type definitions
│   ├── public/                # Static assets
│   └── index.html             # HTML entry point
├── shared/                    # Shared code between client/server
│   └── schema.ts              # Database schema types
├── supabase/                  # Database files
│   ├── schema.sql             # Table definitions
│   └── seed-data-full.sql     # Sample data
├── netlify.toml               # Netlify deployment config
├── vite.config.ts             # Vite configuration
├── tailwind.config.ts         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies & scripts
```

---

##  Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Create production build
npm run preview  # Preview production build locally
npm run check    # Run TypeScript type checking
```

---

##  Contributing

We welcome contributions from the community! Algo Master is open source and we appreciate any help to make it better.

### Ways to Contribute

-  **Report Bugs** - Found a bug? [Open an issue](https://github.com/Erkan3034/AlgoMaster/issues/new)
- 💡 **Suggest Features** - Have an idea? [Share it with us](https://github.com/Erkan3034/AlgoMaster/issues/new)
-  **Improve Documentation** - Help others understand the project
-  **Add Translations** - Help us reach more developers
-  **Submit Code** - Fix bugs or add new features

### Contribution Guidelines

#### 1. Fork & Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/Erkan3034/AlgoMaster.git
cd AlgoMaster
npm install
```

#### 2. Create a Branch

```bash
# Create a branch for your feature/fix
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-fix
```

#### 3. Make Changes

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation if needed

#### 4. Test Your Changes

```bash
# Make sure everything works
npm run dev
npm run check
npm run build
```

#### 5. Submit Pull Request

```bash
# Push your changes
git push origin feature/amazing-feature
```

Then open a Pull Request on GitHub with:
- Clear title and description
- Screenshots (if UI changes)
- Reference to related issues

### Code Style Guidelines

- Use **TypeScript** for type safety
- Follow **React best practices** (hooks, functional components)
- Use **Tailwind CSS** for styling
- Keep components **small and focused**
- Use **meaningful variable and function names**

### Priority Areas for Contribution

| Area | Description | Difficulty |
|------|-------------|------------|
|  New Visualizers | Add visualizations for more algorithms | Medium |
|  Translations | Add support for new languages | Easy |
|  Content | Add explanations for new DSA topics | Easy |
|  Accessibility | Improve keyboard navigation and screen reader suport | Medium |
|  Testing | Add unit and integration tests | Medium |
|  Mobile UX | Improve mobile experience | Medium |
|  Performance | Optimize bundle size and load times | Hard |

---

## 🗺️ Roadmap

- [ ]  Animated algorithm visualizations
- [ ]  Interactive coding challenges
- [ ]  Progress tracking and achievements
- [ ]  User accounts and saved progress
- [ ]  More complexity comparisons
- [ ]  More language support
- [ ]  Mobile app (React Native)

---


## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Modify
- ✅ Distribute
---

##  Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [Supabase](https://supabase.com/) for backend infrastructure
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- All our [contributors](https://github.com/Erkan3034/AlgoMaster/graphs/contributors) ❤️

---

<div align="center">

**Built with ❤️ for developers learning DSA**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/Erkan3034/AlgoMaster/issues) · [Request Feature](https://github.com/Erkan3034/AlgoMaster/issues)

</div>
