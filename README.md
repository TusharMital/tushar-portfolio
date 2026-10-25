# Tushar Mittal — Computer Science Portfolio

A modern, accessible, editorial-style personal portfolio for Tushar Mittal, a second-year Computer Science undergraduate student at JECRC University.

Built with **React 19**, **TypeScript**, and **Vite**, featuring an interactive AI portfolio chatbot powered by the **GroqCloud API** (`openai/gpt-oss-120b`).

---

## Features

- **Grounded AI Portfolio Assistant**: An interactive chatbot grounded strictly in verified facts regarding Tushar's coursework, projects, systems learning, and prompt engineering workflow.
- **Deep-Dive Case Studies**: Comprehensive case studies for all five projects, including architectural decisions, testing strategies, and code comparisons.
- **Accessible Hash Routing**: Clean single-page URL hash navigation (`#/project/:id`) with screen-reader focus management and history support.
- **Project Filtering & Real-Time Search**: Filter projects by technologies (`Python`, `React`, `TypeScript`, `unittest`, etc.) and search by keywords.
- **Warm Editorial Theme**: Cohesive light and dark color palettes with persistent preference storage and flash-free loading.
- **Verified Contact Channels**: Direct email (`mailto:` composition & copy action), GitHub, and LinkedIn links.

---

## Chatbot Architecture & Configuration

The portfolio assistant uses a serverless backend endpoint (`/api/chat`) to securely communicate with the GroqCloud Chat Completions API.

### Environment Variables

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `GROQ_API_KEY` | **Yes** | — | Server-side GroqCloud API key from [Groq Console](https://console.groq.com/keys). |
| `GROQ_MODEL` | No | `openai/gpt-oss-120b` | Supported GroqCloud model identifier (e.g. `openai/gpt-oss-120b` or `openai/gpt-oss-20b`). |

> **Security Note:** `GROQ_API_KEY` is loaded exclusively on the server and is never prefixed with `VITE_`. It is never exposed in client bundles, browser network responses, or client logs.

### Local Development Setup

1. **Clone the repository and install dependencies:**
   ```bash
   git clone https://github.com/TusharMital/tushar-portfolio.git
   cd tushar-portfolio
   npm install
   ```

2. **Configure local environment variables:**
   Create a `.env` file in the project root (this file is ignored by Git):
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=openai/gpt-oss-120b
   ```

3. **Start the local Vite development server:**
   ```bash
   npm run dev
   ```
   The local Vite dev middleware connects `/api/chat` directly to the server handler in `api/chat.ts`.

4. **Verify quality checks:**
   ```bash
   npm run lint
   ```
   ```bash
   npx tsc -b
   ```
   ```bash
   npm run build
   ```

---

## Deployment (Vercel)

The project is structured to deploy smoothly on **Vercel**:

1. **Import the repository** into Vercel.
2. In **Project Settings → Environment Variables**, add:
   - `GROQ_API_KEY`: Your GroqCloud API key.
   - *(Optional)* `GROQ_MODEL`: `openai/gpt-oss-120b` (or another supported Groq model).
3. Ensure the environment variable is configured for **Production** and **Preview** environments.
4. Deploy. The `/api/chat.ts` file is automatically deployed as a Vercel Serverless Function, and single-page routing is preserved by `vercel.json`.

---

## License & Attribution

Designed and developed by Tushar Mittal.
