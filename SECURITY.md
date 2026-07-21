# Security policy

Report suspected vulnerabilities privately to `iwasofficial@outlook.com`. Do not publish credentials, exploit details or personal data in a public issue.

## Supported version

Security fixes are applied to the latest version on the `main` branch.

## Secret handling

- Store `ALPHA_VANTAGE_API_KEY` in `.env.local` for local development or in Vercel Environment Variables.
- Never use a `NEXT_PUBLIC_` prefix for provider secrets.
- Never commit `.env`, `.env.local` or real credentials.
- Rotate a key immediately if it is exposed.
