# EchoGPT 2.0 — Redesigned Multi-AI Ecosystem & Chrome Extension

> **Unified Multi-AI Workspace & Browser Intelligence Platform**  
> Access OpenAI **GPT-4o**, Anthropic **Claude 3.5 Sonnet**, **DeepSeek V3 / R1**, Google **Gemini 1.5 Pro**, and **Perplexity Live Web Search** in one seamless web app and Chrome extension.

---

## 🚀 Live Demo & Repository
- **Interactive Multi-AI Ecosystem Web Application:** Ready for deployment (Vercel / Netlify)
- **Local Dev Server:** `npm run dev` (Runs locally on `http://localhost:5173`)
- **Production Build:** Verified cleanly with `npm run build`

---

## 📌 Deliverables Overview & Key Tasks

### Task 1: Redesign the EchoGPT Web App
- **Multi-AI Chat Interface:** Seamlessly switch between 7 flagship AI models (**GPT-4o, Claude 3.5 Sonnet, DeepSeek V3, Gemini 1.5 Pro, Perplexity Sonar, Llama 3.3, Mistral Large**).
- **Exclusive Dual-Model Split View Mode:** Run prompts through two AI models simultaneously to compare code quality, reasoning logic, and speed side-by-side with synchronized scrolling.
- **Rich Prompt Input & Tools:**
  - File attachment previews (`.pdf`, `.ts`, `.png`, `.json`).
  - Voice dictation audio simulation with listening state indicators.
  - Quick action toolbar (*Summarize, Refactor Code, Improve Tone, Web Fact Check*).
  - Searchable **Prompt Engineering Library** with one-click template insertion.
- **Conversation Management:** Pin important chats, search title history, export chats as formatted Markdown/JSON files, and delete threads.
- **Workspace Settings:** Configure BYOK API keys (OpenAI, Anthropic, Google, DeepSeek), edit default system prompts, toggle dark/light theme, and control Web Audio FX.

### Task 2: Single-Page EchoGPT Landing Page
- **Hero Section:** Dynamic headline, floating model tags, animated ambient gradient mesh, live interactive prompt sandbox, and quick preset shortcuts.
- **Features Grid:** 6 glassmorphic feature cards detailing multi-AI synergy, dual model comparison, browser side-panel, and enterprise security.
- **Interactive Model Showcase:** Dynamic model selector inspecting inference speed ratings (1-100), logic reasoning scores, 2M context window limits, token costs, and recommended superpowers.
- **Chrome Extension Showcase:** 3-tab interactive tab switcher previewing the Popup UI, Docked Side Panel Mode, and On-Page Selection Overlay.
- **Why Choose EchoGPT Comparison Matrix:** Clear breakdown comparing EchoGPT ($19/mo all-in-one) vs standalone ChatGPT Plus ($20/mo) and Claude Pro ($20/mo).
- **Pricing Tiers:** Explorer Free ($0), Pro Power User ($19/mo), and Team ($49/mo) cards with Monthly vs Annual billing toggle (Save 25%).
- **Interactive FAQ Accordion:** Instant search input and category filtering (General, Models, Extension, Billing, Security).
- **Testimonials & Social Proof:** Review grid featuring developer ratings from Vercel, DesignFlow, and Stanford AI Lab.
- **High-Conversion Call-To-Action (CTA):** Vibrant bottom banner with particle effect triggers and direct app launch buttons.

### Task 3: Redesigned Chrome Extension Concept
- **Browser Environment Simulator:** Dedicated interactive sandbox simulating how EchoGPT operates on active web pages (e.g. GitHub repositories or documentation sites).
- **Streamlined Popup UI:** Compact model switcher, active tab context reader, token counter, and preset task buttons (*Summarize, Explain Code, Translate*).
- **Chrome Side Panel Integration:** Simulated docked right-edge panel for continuous AI co-pilot browsing.
- **On-Page Text Selection Overlay:** Tooltip floating bar appearing when highlighting text on any website.

---

## 🛠️ Technology Stack & Best Practices

- **Frontend Framework:** React 19 + TypeScript (Strict typings & clean interfaces).
- **Build Engine:** Vite 8 + `@tailwindcss/vite`.
- **Styling & Aesthetics:** Tailwind CSS v4 with custom dark mode colors, glassmorphism, gradient meshes, and custom scrollbars.
- **Animations & Micro-interactions:** Framer Motion (Page transitions, tab switches, popup modals) + `canvas-confetti`.
- **Iconography:** Lucide React icons.
- **Audio Feedback:** Native Web Audio API bleep synthesizer for tactile user feedback.
- **State Management & Persistence:** React Context API (`AppProvider`, `ThemeProvider`) with automatic `localStorage` state syncing.

---

## 💻 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/echogpt-redesign.git
   cd echogpt-redesign
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled bundle will be available in the `dist/` directory ready for deployment on Vercel, Netlify, or Cloudflare Pages.

---

## ✨ Bonus Features Implemented

- 🌓 **Dark / Light Mode Toggle:** Full theme customizer with seamless smooth background transitions.
- 🔊 **Web Audio API Feedback FX:** Optional subtle sound effects on user actions and stream responses.
- 🧪 **Live Interactive Sandbox:** Users can test all AI models, prompt templates, dual split view, and Chrome extension tools directly inside the app without needing external API setup.
- 📄 **One-Click Markdown Export:** Export chat conversations cleanly to `.md` files for record-keeping.

---

*Designed & Implemented for the EchoGPT Frontend Redesign Assignment.*
