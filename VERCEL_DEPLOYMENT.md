# Vercel deployment guide

## Option A, update the existing GitHub repository

Keep the existing Git history and replace the old project files with the rebuilt files.

```bash
git checkout -b rebuild/full-stack-dashboard
```

Copy this project into the repository, but do not copy `node_modules`, `.next`, `.env` or `.env.local`.

```bash
git add -A
git commit -m "Rebuild iWas Findex as a deployable full-stack dashboard"
git push -u origin rebuild/full-stack-dashboard
```

Open a pull request, review it, then merge it into `main`.

## Option B, create a new repository

Use this when the current repository history is not useful or contains exposed secrets.

```bash
git init
git add .
git commit -m "Initial full-stack iWas Findex release"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Import into Vercel

1. Sign in to Vercel and choose **Add New > Project**.
2. Import the GitHub repository.
3. Confirm that Vercel detects **Next.js**.
4. Keep the root directory as `.`.
5. The install command should be `npm install` or the Vercel default.
6. The build command should be `npm run build` or the Vercel default.
7. Add `ALPHA_VANTAGE_API_KEY` under **Settings > Environment Variables** when live provider data is required.
8. Select Production, Preview and Development for the variable as needed.
9. Deploy.

The application deploys without the key and shows clearly labelled demo data. After adding or changing the key, redeploy the project so the new environment value is used.

## Verify the deployment

Open these addresses on the deployed domain:

```text
/
/api/market?symbol=AAPL
/api/market?symbol=MSFT&demo=1
```

The first page should render the dashboard. The API should return JSON. Check that `mode` is `live` when a working provider key is configured, otherwise it will be `demo` with an explanatory message.
