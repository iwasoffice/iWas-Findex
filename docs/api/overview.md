# Market API

## Endpoint

`GET /api/market?symbol=AAPL`

The endpoint returns normalized daily candles, latest-session statistics and a one-step linear trend forecast.

## Query parameters

| Name | Required | Description |
| --- | --- | --- |
| `symbol` | No | US-listed equity or ETF ticker. Default is `AAPL`. |
| `demo` | No | Set to `1` to force deterministic demo data. |

## Modes

- `live` means the response came from Alpha Vantage.
- `demo` means the built-in deterministic series is being used. The response includes a `message` explaining why.
