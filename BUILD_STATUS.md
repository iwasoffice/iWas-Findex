# Build status

Regenerated on 22 September 2026 after the conversation was branched.

Validated locally in the available environment:

- JavaScript/TypeScript unit tests: 4 passed
- Python tests: 2 passed
- Python bytecode compilation: passed
- TypeScript/TSX syntax transpilation: 19 files, 0 syntax errors
- Chromium extension JavaScript syntax: passed
- Firefox extension JavaScript syntax: passed
- Both extension manifests: valid JSON
- Both extension ZIP archives: integrity check passed

A full Next.js production build was not executed because this runtime does not have the project npm dependencies installed and external package-registry access may be unavailable. The GitHub Actions workflow and Vercel deployment are configured to run `npm install` followed by lint, tests, and build.

Deployment hardening before repository replacement:

- Render/Vercel health route added at `/api/health`
- Next.js standalone output enabled for Docker/Render compatibility
- Runtime dependencies pinned to exact versions to reduce deployment drift
- Existing GitHub `main` is backed up before replacement
