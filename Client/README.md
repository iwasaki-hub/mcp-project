# Client

Minimal **Vite + React + TypeScript** frontend foundation. This is an independent app under `Client/`; the existing static GitHub Pages site under `docs/` is unchanged.

## Requirements

- Node.js 22 or later
- npm

## Get started

```bash
cd Client
npm install
npm run dev
```

Open the local URL printed by Vite. Other commands:

```bash
npm run typecheck
npm run build
npm run preview
```

The production build is generated in `Client/dist/` and is not committed. There is no deployment, backend connection, authentication, or application functionality yet.

## Validation

`.github/workflows/validate-client.yml` runs dependency installation, TypeScript checks, and a production build for changes to this folder. A dependency lockfile has **not** been committed yet; CI uses `npm install`, so dependency resolution is not fully reproducible. Commit `package-lock.json` after generating and validating it in a Node.js environment before moving beyond the foundation phase.

## Safety

Do not commit credentials or `.env` files. Keep changes scoped to the client and use one task per PR.
