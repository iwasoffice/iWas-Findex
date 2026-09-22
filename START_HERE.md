# START HERE

This ZIP is ready to replace the visible files in your existing `iWas-Findex` GitHub Desktop clone.

## Beginner-safe GitHub Desktop steps

1. Extract this ZIP.
2. Open GitHub Desktop and select your `iWas-Findex` repository.
3. Click **Repository → Show in Explorer**.
4. Keep **Hidden items OFF** so the hidden `.git` folder cannot be deleted accidentally.
5. Delete the visible files inside the repository folder.
6. Copy everything from the extracted ZIP into that repository folder.
7. Return to GitHub Desktop.
8. Summary: `Rebuild iWas Findex cross-platform release`.
9. Click **Commit to main**.
10. Click **Push origin**.

## Vercel

Import the GitHub repository or let the existing Vercel project redeploy automatically.

Use Node.js 22, `npm install --no-audit --no-fund`, and `npm run build`.

Add `ALPHA_VANTAGE_API_KEY` only when you want live Alpha Vantage data. Demo mode works without it.
