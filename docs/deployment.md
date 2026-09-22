# Deployment

## Vercel

The repository root is a full Next.js application. For the existing GitHub-connected Vercel project:

- Framework: Next.js
- Root directory: repository root
- Node.js: 22
- Install command: `npm install --no-audit --no-fund`
- Build command: `npm run build`
- Environment variable: optional `ALPHA_VANTAGE_API_KEY`

The server-side API route is `/api/market`. A deployment health endpoint is available at `/api/health`.

## Render

For an existing GitHub-connected Render Web Service, deploy this repository as a **Node** web service because the application contains server-side Next.js API routes. Recommended settings:

- Branch: `main`
- Root directory: repository root
- Runtime / Language: Node
- Build command: `npm install --no-audit --no-fund && npm run build`
- Start command: `npm start`
- Health check path: `/api/health`
- Node.js: 22 or a compatible newer release
- Environment variable: optional `ALPHA_VANTAGE_API_KEY`

Render redeploys from the linked Git branch when auto-deploy is enabled. The app listens on the platform-supplied `PORT` through Next.js.

### Docker alternative

The root `Dockerfile` is also supported. `next.config.ts` enables standalone output so the production image can copy `.next/standalone` and run `server.js`.

## Browser extension

The source packages are under `platforms/browser-extension`. The prebuilt ZIPs under `public/downloads` are served by the deployed web app and can be downloaded from `/downloads`.
