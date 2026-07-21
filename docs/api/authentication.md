# Provider authentication

The public dashboard endpoint does not require user authentication.

The server uses `ALPHA_VANTAGE_API_KEY` to authenticate with the upstream data provider. Keep this variable server-only. Do not prefix it with `NEXT_PUBLIC_`.
