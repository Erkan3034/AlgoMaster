# 🧠 Algo Master

**Interactive Data Structures & Algorithms Learning Platform**

Modern, interactive web application for learning data structures and algorithms with visual explanations, code examples, and hands-on experiments.

![Algo Master](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?logo=netlify)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)

---

## ✨ Features

### 📚 Educational Content
- **Data Structures**: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hash Tables
- **Algorithms**: Sorting, Searching, Graph algorithms with step-by-step explanations
- **Complexity Analysis**: Big O notation with visual comparisons
- **Code Examples**: JavaScript implementations with detailed comments

### 🎨 User Experience
- 🌓 Light/Dark theme support
- 🌍 English & Turkish language support
- 📱 Fully responsive design
- ⚡ Fast, optimized performance
- 🔍 Global search functionality

### 🔐 Admin Panel (with Supabase)
- Secure authentication
- Content management (CRUD)
- Real-time updates

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+

### Local Development

```bash
# Clone the repository
git clone https://github.com/Erkan3034/algo-master.git
cd algo-master

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

> 📝 **Note**: Without Supabase configuration, the app runs with static data. 
---

## 🗄️ Database Setup (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your **URL** and **anon key**

### 2. Create Tables
Run the SQL script in Supabase SQL Editor:

```sql
-- Located at: supabase/schema.sql
```

### 3. Create Admin User
1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter admin email and password

---

## 🌐 Deployment (Netlify)

### One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Manual Deployment

1. **Connect to GitHub**
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Select your repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

4. **Deploy!**

---

## 📁 Project Structure

```
algo-master/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilities & configs
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
├── shared/                # Shared types & static data
├── supabase/              # Database schema
├── netlify.toml           # Netlify configuration
└── package.json           # Dependencies
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, Radix UI |
| **State** | TanStack Query |
| **Backend** | Supabase (PostgreSQL, Auth) |
| **Hosting** | Netlify |

---

## 📜 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run check    # Type-check without emitting
```

---

## 🙏 Acknowledgments

Built with ❤️ for developers learning DSA.

---

## 📄 License

MIT License - Feel free to use for personal and commercial projects.
