# Algo Master - Data Structures & Algorithms Learning Platform

🎯 Algo Master is an interactive educational web application designed to teach Data Structures and Algorithms to beginners and developers. The platform provides hands-on learning through visual animations, code examples, interactive playgrounds, and comprehensive explanations.

![Algo Master](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Firebase](https://img.shields.io/badge/Firebase-10-orange) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue)

## ✨ Features

- 📚 **14+ Data Structures** - Arrays, Linked Lists, Trees, Graphs, and more
- 🔄 **12+ Algorithms** - Sorting, Searching, Graph algorithms
- 🎬 **Interactive Visualizer** - Watch algorithms in action step-by-step
- 💻 **Code Playground** - Write and run code in real-time
- 🔐 **Admin Panel** - Manage content (Firebase Authentication)
- 🌍 **Multi-language** - English and Turkish support
- 🌙 **Dark/Light Mode** - System preference detection

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase account (free)

### Installation

```bash
# Clone the repository
git clone https://github.com/Erkan3034/AlgoMaster.git
cd AlgoMaster

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 🔥 Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" → Enter project name → Create
3. Wait for project creation

### Step 2: Enable Authentication

1. In Firebase Console → Build → Authentication
2. Click "Get started"
3. Sign-in method → Email/Password → Enable → Save

### Step 3: Create Admin User

1. Authentication → Users tab
2. Click "Add user"
3. Enter your admin email and password
4. Click "Add user"

### Step 4: Get Firebase Config

1. Project Settings (gear icon) → General
2. Scroll to "Your apps" → Click Web icon (</>) 
3. Register app name → Register
4. Copy the firebaseConfig values

### Step 5: Configure Environment

Create `.env` file in project root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 🌐 Deploy to Firebase Hosting

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login & Init

```bash
# Login to Firebase
firebase login

# Initialize (select Hosting, use existing project)
firebase init hosting
```

When asked:
- Public directory: `dist`
- Single-page app: `Yes`
- Overwrite index.html: `No`

### Step 3: Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

🎉 Your app is now live at: `https://your-project-id.web.app`

---

## 📁 Project Structure

```
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # UI components (shadcn/ui)
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Firebase config & utilities
│   └── public/            # Static assets
├── shared/                # Data (algorithms, data structures)
├── firebase.json          # Firebase Hosting config
└── vite.config.ts        # Vite build config
```

---

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS + shadcn/ui
- **Auth:** Firebase Authentication
- **Hosting:** Firebase Hosting
- **Animations:** Framer Motion

---

## 📝 Content

### Data Structures
- Array, Linked List, Stack, Queue
- Hash Table, Tree, Binary Search Tree
- Heap, Graph, Trie, AVL Tree
- Priority Queue, Deque, Set & Map

### Algorithms
- **Sorting:** Bubble, Selection, Insertion, Merge, Quick, Heap Sort
- **Searching:** Linear, Binary, Jump Search
- **Graph:** BFS, DFS, Dijkstra's Algorithm

---

## 🌍 Internationalization

The platform supports:
- 🇬🇧 English
- 🇹🇷 Turkish (Türkçe)

Language is auto-detected from browser settings and persisted in localStorage.

---

## 📄 License

MIT License - feel free to use for learning and educational purposes!

---

Made with ❤️ for learners everywhere
