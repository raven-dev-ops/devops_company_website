# Raven Development Operations - Internal Wiki (Hub)

Lightweight hub for the demo website and assistant backend wiring.

## Overview
- **Repository:** Marketing/demo site plus the production assistant backend (`chat-assistant-backend/`) and an optional legacy Node backend.
- **Frontend:** React 18 + Vite + React Router + Tailwind + Netlify Functions.
- **Assistant backend (production):** `chat-assistant-backend/` FastAPI service backed by Cloud SQL (Postgres) + OpenAI; rate-limited per IP.
- **Assistant backend (legacy/local):** `OpenAuxilium/` Node + Express (kept for experimentation only).
- **Content:** Portfolio and blog data in `src/data/portfolio.js` and `src/data/blogPosts.js` now list every public repo from [github.com/raven-dev-ops](https://github.com/raven-dev-ops/).

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
- The chat header no longer shows a live/offline badge; chat still handles live vs offline modes internally.

## Running Locally (frontend only)
```bash
npm install
npm run dev   # http://localhost:5173
```
Add a `.env.local` with `VITE_CHAT_API_BASE` if you want to point to a different backend URL.

## Testing
- Frontend: `npm test -- --runInBand`
- Backend: `cd chat-assistant-backend && py -3.12 -m pip install -r backend/requirements.txt && py -3.12 -m pytest`

## Versioning & Tags
- Frontend version is in `package.json`.
- Legacy OpenAuxilium version is in `OpenAuxilium/package.json`.
- Suggested tags: `website-vX.Y.Z` (site), `openauxilium-vX.Y.Z` (legacy backend).

## Operations Notes
- Keep secrets (API tokens, DB creds, admin tokens) out of Git; use platform secrets.
- Monitoring: rely on hosting/platform logs; expand as needed.
- The production backend lives in `chat-assistant-backend/` (FastAPI + Postgres). `OpenAuxilium/` is legacy/local-only.

## Hosting & Domain (current status)
- The Netlify production deploy is healthy at the latest unique URL (see Netlify deploy logs), but `ravdevops.com`/`www.ravdevops.com` currently return a 307→403 because DNS is not pointed at Netlify.
- To serve from Netlify: on NS1 (current nameservers), set apex A records to `75.2.60.5` and `99.83.190.102`; set `www` CNAME to `ravdevops.netlify.app`; remove other A/ALIAS targets. Keep TTL low (300s), wait for propagation, then `curl -I https://ravdevops.com` should return 200.
- If migrating hosting to Google Cloud Run + HTTPS Load Balancer: deploy the frontend to Cloud Storage + Cloud CDN or to a static site on Cloud Run; provision a global HTTPS load balancer with a managed cert for `ravdevops.com`/`www.ravdevops.com`; point NS1 apex A to the LB IPv4 (and AAAA if issued), and `www` CNAME to the LB hostname. Add the new origins to CORS allowlist on the assistant backend.
- Keep `VITE_CHAT_API_BASE` aligned with the active assistant backend (Cloud Run gateway preferred; Heroku is only a temporary fallback). Update Netlify environment variables (or `netlify.toml`) before the next deploy.
