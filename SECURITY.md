# Raven Development Operations - Security Policy

This repository contains the marketing site and assistant backends for Raven Development Operations. It is not a multi-tenant SaaS product, but it may be deployed to public infrastructure (for example, Netlify + Functions, Cloud Run, or Heroku).

## Supported Versions

Security updates are provided on a best-effort basis for the most recent major versions of the frontend site and the assistant backends.

| Component                                         | Version range | Supported          |
| ------------------------------------------------- | ------------- | ------------------ |
| Website (`package.json`)                          | 1.0.x         | :white_check_mark: |
| Chat assistant backend (`chat-assistant-backend`) | 0.2.x         | :white_check_mark: |
| OpenAuxilium backend (`OpenAuxilium/package.json`) | 0.1.x        | :white_check_mark: |
| Earlier versions                                  | < listed      | :x:                |

When cutting a new release, update this table to reflect which ranges are still receiving security fixes.

## Reporting a Vulnerability

If you believe you have found a security issue in this project:

- Do **not** open a public GitHub issue with sensitive details.
- Instead, either:
  - Open a private *GitHub Security Advisory* for this repository, or
  - Email the maintainer using the contact details published on the Raven Development Operations website (for example the support or security contact address).

Please include:

- A description of the issue and potential impact.
- Exact steps or proof-of-concept to reproduce, when possible.
- Any logs, stack traces, or configuration details that help narrow down the problem.

You can generally expect:

- An initial acknowledgement within a reasonable timeframe (typically a few business days).
- Follow-up questions as needed to reproduce and assess impact.
- Notification once a fix is prepared and released, along with any remediation steps (for example, updating to a patched version or rotating credentials).

## Operational Security Guidelines

Deployments of this project should follow these practices:

- Never commit real secrets (API keys, database URIs, SMTP credentials, Calendly tokens, model paths) to Git. Use environment variables or platform-specific secret stores.
- Keep `.env` files, local model files, and `node_modules` out of version control (the root `.gitignore` already covers these). If you commit sample env files (for example `.env.example`), only include obviously fake placeholder values.
- Restrict assistant backend access (for example `chat-assistant-backend` or `OpenAuxilium`) using CORS and network-level controls so only the website origin and trusted automation can call them.
- Monitor third-party dependencies for vulnerabilities using tools like GitHub Dependabot and CodeQL (this repo already includes a CodeQL workflow under `.github/workflows/codeql.yml`).
- Rotate credentials (API tokens, SMTP passwords, etc.) if you suspect they may have been exposed, or if they were ever committed to Git in the past.

If you have questions about secure deployment or configuration for Raven Development Operations assets, reach out using the same channels as for vulnerability reports.

## Current Security Posture

The following notes describe the current security state of this repository's `main` branch:

- **Chat assistant backend (`chat-assistant-backend`):**
  - Deploys to Cloud Run behind API Gateway; `/admin/*` and collection write endpoints require the `ADMIN_API_TOKEN` bearer token and fail closed if the token is unset.
  - Applies in-memory per-IP rate limiting to `POST /api/chat` and write endpoints to reduce abuse risk.
  - A valid Postgres `DATABASE_URL` is required for live mode; if it is missing or disabled, the service degrades gracefully to offline responses without exposing admin endpoints.
  - Python dependencies are periodically checked with tools like `pip-audit` and CodeQL; the supported line is 0.2.x.
- **Website / frontend:**
  - Built with Vite + React 18; `npm audit` is monitored via Dependabot.
  - Required production env var is `VITE_CHAT_API_BASE` (assistant gateway). Netlify Functions rely on platform-scoped secrets (for example Calendly tokens) and do not bundle secrets into the static site.
  - No server-rendered secrets are present; keep `.env` files and tokens out of Git.

As new hardening work lands (for example, adding stronger authentication or tightening CORS), this document should be updated to reflect the current posture.
