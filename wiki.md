# Raven Development Operations — Internal Wiki (Hub)

Lightweight hub for the demo website and assistant backend wiring.

## Overview
- **Repository:** Marketing/demo site plus optional legacy assistant backend.
- **Frontend:** React 18 + Vite + React Router + Tailwind + Netlify Functions.
- **Assistant backend (production):** Cloud Run FastAPI service backed by Cloud SQL (Postgres) + OpenAI; rate-limited per IP.
- **Assistant backend (legacy/local):** `OpenAuxilium/` Node + Express (kept for experimentation only).

## Key Areas
- **Architecture:** see `README.md` for stack, deployment, and assistant wiring.
- **Functions:** `netlify/functions/create-calendly-link.js` (Calendly link helper).
- **Releases:** `RELEASES.md` for tagging guidance.
- **Planning:** `roadmap.md` and `timeline.md`.

## Pages & Routes
Frontend routes live under `src/pages/` (Home, Services, Portfolio, Blog, Pricing, About, Contact, Privacy/Terms, 404). The chatbot is defined in `src/components/ChatBot.jsx` and appears on primary pages.

## Chatbot & Backend Wiring
- **Frontend config order:**
  1. `VITE_CHAT_API_BASE` (Netlify/frontend base URL)
  2. `VITE_ASSISTANT_API_URL` (legacy alias)
  3. `VITE_OPENAUXILIUM_URL` (legacy fallback)
  4. Default: `https://chat-assistant-backend-gw-3j4dip0k.uc.gateway.dev` (gateway injects auth)
- **Backend (Cloud Run / Gateway):**
  - `POST /api/chat` - chat endpoint (no admin token needed). Response includes `reply` and `mode` (`live` | `offline`) to drive the badge in the UI.
  - `POST /api/{collection}` - CRUD for collections (requires admin token)
  - `GET /admin/summary` and `GET /admin/ping-db` - guarded by admin token
  - `GET /health` and `/metadata/version` - health/version
- CORS is restricted to `https://ravdevops.com` and `https://www.ravdevops.com`; deploy the frontend on those origins.
- Set `VITE_CHAT_API_BASE` in your environment for local dev or Netlify builds. `netlify.toml` already defines the gateway value for production deploys.
- The chat header shows `LIVE` (OpenAI connected) vs `OFFLINE` (using cached knowledge base responses).

## Running Locally (frontend only)
```bash
npm install
npm run dev   # http://localhost:5173
```
Add a `.env.local` with `VITE_CHAT_API_BASE` if you want to point to a different backend URL.

## Versioning & Tags
- Frontend version is in `package.json`.
- Legacy OpenAuxilium version is in `OpenAuxilium/package.json`.
- Suggested tags: `website-vX.Y.Z` (site), `openauxilium-vX.Y.Z` (legacy backend).

## Operations Notes
- Keep secrets (API tokens, DB creds, admin tokens) out of Git; use platform secrets.
- Monitoring: rely on hosting/platform logs; expand as needed.
- Legacy Python/MongoDB backend docs remain in `chat-assistant-backend/` for historical reference only. The production backend is the Cloud Run Postgres service.
