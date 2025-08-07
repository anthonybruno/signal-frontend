# To-do

- [ ] Update npm scripts in Readme

# Signal Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0+-38B2AC.svg)](https://tailwindcss.com/)

[Signal's](https://github.com/anthonybruno/signal) frontend chat interface that provides a conversational experience for exploring my portfolio, experience, and technical background.

## What it does

This Next.js frontend is the user-facing layer of Signal. It provides a clean, responsive interface for interacting with the LLM, streaming responses, and triggering MCP actions. Designed for clarity, speed, and polish, it showcases thoughtful UX patterns and production-ready engineering. This repo reflects real-world front-end leadership and implementation at the portfolio level.

**Key Features:**

- Real-time AI chat interface
- Streams LLM responses to users
- Displays context-aware follow-ups and source data
- Responsive, accessible UI

## Local Development

### Prerequisites

- Node.js 20+
- [Backend API](https://github.com/anthonybruno/signal-backend) running locally

### Setup

```bash
npm install
npm run dev
```

- **URL**: http://localhost:3000

## Tech Stack

- Next.js 15 with React 19
- TypeScript
- Tailwind CSS
- Axios for API calls
- React Markdown for message rendering

## Architecture Notes

### Integration Points

- Backend API: Handles chat requests and streaming responses
- MCP Server: Provides live data integration
- RAG Server: Supplies personal context and knowledge

## Development Workflow

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run type-check   # Type-check TypeScript
npm run format       # Format code with Prettier
```

## Signal Context

This frontend demonstrates modern React patterns, responsive design, and real-time user experience. As part of a broader portfolio, it showcases full-stack development, API integration, and thoughtful UI/UX design.

- **Additional Info**: [Signal Repo](https://github.com/anthonybruno/signal)
- **Live Site**: [signal.abruno.net](https://signal.abruno.net)
