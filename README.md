# Anoop — Personal Developer & AI Engineer Portfolio

A premium, modern, responsive personal developer portfolio engineered for **Anoop**, a Computer Science and Engineering student at **KMIT Hyderabad** (Class of 2028) and aspiring **Software Engineer / AI Engineer**.

Built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons** following high-standard software engineering practices, accessible semantic HTML, and clean component modularity.

---

## 🌟 Key Features & Highlights

- **Aesthetic & Theme:** Sophisticated dark charcoal background (`#090a0f`) with subtle grid textures, ambient radial glow accents, and glassmorphic card panels.
- **Hero Section:**
  - Name: **ANOOP** with developer monogram.
  - Main Heading: _"Building Intelligent Solutions Through Code."_
  - Bio & Focus: Highlighting Software Development, Artificial Intelligence & Machine Learning, Full-Stack Development, and Data Structures & Algorithms.
  - Quick CTAs: _Explore My Work_, _Download Resume_ (modal & direct PDF download), and _Contact Me_.
- **About Me:**
  - Complete narrative on academic journey at KMIT Hyderabad, deep technological curiosity, and dedication to first-principles thinking.
  - Core philosophy cards: First-Principles Understanding, Intelligent & Scalable Systems, and Continuous Exploration.
- **Education:**
  - **Degree:** Bachelor of Technology (B.Tech) in Computer Science and Engineering.
  - **Institution:** Keshav Memorial Institute of Technology (KMIT), Hyderabad.
  - **Timeline:** 2024 – 2028 (Expected Graduation: 2028).
  - Explicit placeholder for CGPA until semester evaluations are finalized.
- **Technical Skills:**
  - Grouped into 6 categories: Programming Languages, Web Development, Databases, AI & Machine Learning, Tools & Technologies, and Core Computer Science.
  - **Search & category filter** with instantaneous tag matching.
  - Zero arbitrary percentages; cleanly presented tags and categories.
- **Featured Projects:**
  - **RetailMind-AI:** Agentic Retail Recommendation System with Memory, RAG (BGE-M3, ChromaDB/FAISS), Amazon Reviews Dataset, and interactive multi-step pipeline breakdown.
  - **Forensic AI Writer:** AI-powered digital forensic platform that ingests multi-format evidence (PDF, TXT, CSV, JSON, LOG, EVTX), calculates SHA-256 hashes for chain of custody, correlates cross-source findings, reconstructs incident timelines, and generates unified, court-ready forensic reports ([GitHub Repo](https://github.com/Anoop-Tech-AI/FORENSIC_AI_WRITER)).
  - **Student Management System:** Complete Node.js / Express / MongoDB / Mongoose RESTful CRUD application.
  - **DevOps & CI/CD Practice:** Automated containerization and orchestration workflows with Jenkins, Docker, Kubernetes, and Maven.
  - Clear differentiation between **Completed Projects** and **Under Development** initiatives.
  - Interactive project detail modal with architectural pipeline flow.
- **Problem Solving & DSA:**
  - Dedicated focus on Algorithmic thinking, C++ programming, competitive programming, and amortized complexity.
  - Systematic 4-step problem-solving workflow (Deconstruction → Asymptotic Analysis → Optimal Pattern Selection → Clean Implementation).
  - Coding profile placeholders for LeetCode, Codeforces, HackerRank, and GitHub.
- **Currently Exploring:**
  - Active study tracks in Advanced AI Systems, Agentic AI, Large Language Models, RAG, Full-Stack, and Advanced DSA.
- **Contact Section:**
  - Heading: _"Have an interesting idea? Let's build something."_
  - Verified contact form with client-side validation for name, email, subject, and message.
  - Honest submission architecture: pre-formats and initiates message in user's default email client without falsely claiming backend transmission.
  - One-click email copy button with feedback toast.
- **Interactive Enhancements:**
  - Dynamic scroll progress bar at the top of the viewport.
  - Active section observer in navbar.
  - Responsive mobile drawer navigation with backdrop blur.
  - Floating back-to-top button.
  - Resume preview modal and downloadable PDF handler.
  - Fully dynamic copyright year in footer.

---

## 🛠️ Tech Stack

- **Frontend Library:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & Custom SVG Brand Monograms
- **Typography:** Inter & JetBrains Mono (via Google Fonts)
- **Code Linter:** [Oxlint](https://oxc-project.github.io/)

---

## 📁 Project Structure

```
Porofolio/
├── public/
│   ├── code-icon.svg          # Portfolio favicon
│   └── resume.pdf             # Resume PDF placeholder
├── src/
│   ├── assets/                # Static visual assets
│   ├── components/
│   │   ├── About.jsx          # About narrative & engineering principles
│   │   ├── BackToTop.jsx      # Smooth scroll-to-top floating button
│   │   ├── Contact.jsx        # Validated contact form & direct reach-out
│   │   ├── CurrentlyExploring.jsx # Emerging technologies & research
│   │   ├── Education.jsx      # B.Tech CSE at KMIT Hyderabad
│   │   ├── Footer.jsx         # Dynamic copyright, social links & credits
│   │   ├── Hero.jsx           # Animated introduction & primary CTAs
│   │   ├── Icons.jsx          # GitHub & LinkedIn SVG brand icons
│   │   ├── Navbar.jsx         # Sticky header with active scroll observer
│   │   ├── ProblemSolving.jsx # DSA, CP, C++, and platform badges
│   │   ├── ProjectModal.jsx   # Architectural pipeline deep-dive modal
│   │   ├── Projects.jsx       # Featured projects grid & category filters
│   │   ├── ResumeModal.jsx    # Curriculum vitae summary & download modal
│   │   ├── ScrollProgress.jsx # Top scroll reading indicator
│   │   └── Skills.jsx         # Filterable tech stack & search catalog
│   ├── data/
│   │   └── portfolioData.js   # Centralized data model & placeholders
│   ├── App.jsx                # Root application coordinator
│   ├── index.css              # Tailwind base, utilities & glassmorphism
│   └── main.jsx               # Application entry point
├── .env.example               # Environment variables template
├── .gitignore                 # Production git ignore configuration
├── index.html                 # HTML shell with SEO meta & fonts
├── package.json               # Dependencies & scripts
├── tailwind.config.js         # Custom colors, fonts & animations
└── vite.config.js             # Vite build configuration
```

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js (version 18+ or 20+ recommended)
- npm or yarn / pnpm

### 1. Clone or Open the Repository

```bash
cd Porofolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
```

This generates optimized production static files in the `dist/` directory.

### 5. Preview Production Build

```bash
npm run preview
```

### 6. Lint Code

```bash
npm run lint
```

---

## ⚙️ Customization & Updating Placeholders

All personal information, social links, and project records are centralized in [src/data/portfolioData.js](file:///c:/Programing/Porofolio/src/data/portfolioData.js):

1. **Social URLs & Email:**
   Update `personalInfo.socials` with your actual handles:
   ```javascript
   socials: {
     github: "https://github.com/<your-username>",
     linkedin: "https://linkedin.com/in/<your-profile>",
     email: "mailto:<your-email>@domain.com",
     leetcode: "https://leetcode.com/<your-handle>",
     codeforces: "https://codeforces.com/profile/<your-handle>",
   }
   ```
2. **Academic CGPA:**
   Update `educationData.cgpaPlaceholder` when your official semester evaluations are released.
3. **Resume PDF:**
   Place your verified PDF in `public/resume.pdf` to replace the default template.

---

## 🌐 Deploying to Vercel

### Option 1: Vercel CLI (Fastest)

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Run deployment from the project root:
   ```bash
   vercel
   ```
3. For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Deploying via GitHub & Vercel Dashboard

1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: complete premium portfolio for Anoop"
   ```
2. Create a new repository on [GitHub](https://github.com/) named `portfolio` or `anoop-portfolio`.
3. Link and push to GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
4. Go to [vercel.com](https://vercel.com/) and click **Add New Project**.
5. Import your GitHub repository.
6. Vercel automatically detects **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
7. Click **Deploy**. Your portfolio will be live with free automatic SSL and global CDN!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Designed & Built by **Anoop**.
