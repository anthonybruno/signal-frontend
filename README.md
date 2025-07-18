# Signal Frontend

Signal is a full-stack, AI-powered portfolio designed to demonstrate engineering leadership through systems thinking, modern tooling, and practical implementation. Built with LLMs, RAG, and MCP, it serves as a conversational interface to my work, experience, and technical decision-making. This project reflects my ability to architect, lead, and deliver thoughtful software in real-world conditions.

## What it does

The frontend provides a chat interface where users can ask questions about my experience, skills, projects, and interests. The AI responds using:

- Personal knowledge base (experience, skills, projects, etc.)
- Live data from GitHub, Spotify, and blog RSS feeds
- Dynamic model routing across multiple AI providers

## Local Development

### Prerequisites

- Node.js 20+
- Backend service running on port 3000
- MCP server running on port 3001

### Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:4000](http://localhost:4000) in your browser

The frontend runs on port 4000 and connects to the backend API on port 3000.

## Production

https://signalll.vercel.app

## Tech Stack

- Next.js 15 with React 19
- TypeScript
- Tailwind CSS
- Axios for API calls
- React Markdown for message rendering
