# Signal Frontend

![Next.js](https://img.shields.io/badge/Next.js-15-000?logo=nextdotjs&logoColor=white&style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Framer](https://img.shields.io/badge/Framer-Motion-0055FF?logo=framer&logoColor=white&style=flat-square)

### Static portfolios are boring.

The frontend is the entry point to Signal. It renders the chat interface, manages user interaction,
and streams responses in real time. This service is where the system feels alive — turning backend
orchestration, RAG memory, and MCP integrations into a usable experience.

## What it does

The frontend is a Next.js app built with React, Tailwind, and TypeScript. It:

- Provides an **interactive chat interface** for exploring my work and career
- Streams responses from the backend in real time
- Displays **context-aware follow-ups** and supporting data
- Implements a **responsive, accessible UI** with thoughtful component structure

This layer reflects my focus on clean React patterns, accessibility, and developer-friendly
practices.

## Architecture overview

![Signal Architecture](https://github.com/user-attachments/assets/9ae777bb-9564-4168-8e72-9ffbc743ae5c)

The frontend acts as the user-facing layer, transforming system outputs into a clear, conversational
experience.

## Tech stack

- **Framework:** Next.js 15 with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with Typography plugin)
- **Rendering:** React Markdown for message content
- **Icons:** Lucide React
- **Dev tooling:** ESLint, Prettier, Husky, and shared configs via
  [dev-config](https://www.npmjs.com/package/abruno-dev-config)

## Local development

Signal’s services can be run locally, but setup involves multiple moving parts.  
For now, the easiest way to explore Signal is the [live demo](https://signal.abruno.net).

Future work may include a simplified `docker-compose` flow for local development.

## Explore

- [Overview repo](https://github.com/anthonybruno/signal)
- [Backend repo](https://github.com/anthonybruno/signal-backend)
- [RAG repo](https://github.com/anthonybruno/signal-rag)
- [MCP repo](https://github.com/anthonybruno/signal-mcp)
- [Live demo](https://signal.abruno.net)

## Signal context

The frontend shows how I approach **UX and developer experience in tandem**. By keeping components
modular, accessible, and responsive, the interface stays maintainable while delivering a polished
user experience. As part of a multi-service system, it demonstrates how frontend craft connects to
orchestration, retrieval, and live data. This reflects the kind of collaboration and clarity I
emphasize as an engineering leader.
