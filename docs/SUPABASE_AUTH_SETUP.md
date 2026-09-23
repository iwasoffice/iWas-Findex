# Supabase account setup

iWas Findex includes email/password accounts, Google sign-in, password reset, a profile page, cloud-synced watchlists and synced theme preferences.

## Required environment variables

Add these to Vercel and Render:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

The publishable key is designed for browser use. Do not add a Supabase service-role/secret key to client-side variables.

## Database

Create a Supabase project, then run:

`supabase/migrations/20260923030000_accounts.sql`

in the Supabase SQL editor (or apply it as a migration).

## Authentication URLs

Set the Supabase Site URL to your production URL and add all deployment URLs you use as Redirect URLs, including the Vercel and Render domains. The app uses:

- `/auth/callback`
- `/auth/confirm`
- `/auth/update-password`

## Google login

Enable Google under Supabase Authentication providers and configure the Google OAuth client credentials requested by Supabase.

## Email confirmation

Hosted Supabase projects normally require email confirmation. The app supports both the normal code callback and token-hash confirmation route.
