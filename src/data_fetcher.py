from __future__ import annotations

from dataclasses import dataclass

import requests

from src.config import Settings, load_settings


class MarketDataError(RuntimeError):
    pass


@dataclass(frozen=True, slots=True)
class Quote:
    symbol: str
    price: float
    volume: int | None = None
    latest_trading_day: str | None = None


class AlphaVantageClient:
    def __init__(self, settings: Settings | None = None, session: requests.Session | None = None) -> None:
        self.settings = settings or load_settings()
        self.session = session or requests.Session()

    def fetch_quote(self, symbol: str) -> Quote:
        if not self.settings.alpha_vantage_api_key:
            raise MarketDataError("ALPHA_VANTAGE_API_KEY is not configured.")
        normalized = symbol.strip().upper()
        try:
            response = self.session.get(
                self.settings.api_url,
                params={
                    "function": "GLOBAL_QUOTE",
                    "symbol": normalized,
                    "apikey": self.settings.alpha_vantage_api_key,
                },
                timeout=self.settings.request_timeout_seconds,
            )
            response.raise_for_status()
            payload = response.json()
        except (requests.RequestException, ValueError) as exc:
            raise MarketDataError(f"Market data request failed: {exc}") from exc
        msg = payload.get("Note") or payload.get("Information") or payload.get("Error Message")
        if msg:
            raise MarketDataError(str(msg))
        raw = payload.get("Global Quote")
        if not isinstance(raw, dict) or not raw:
            raise MarketDataError(f"No quote was returned for {normalized}.")
        try:
            return Quote(
                str(raw.get("01. symbol") or normalized),
                float(raw["05. price"]),
                int(raw["06. volume"]) if raw.get("06. volume") else None,
                raw.get("07. latest trading day"),
            )
        except (KeyError, TypeError, ValueError) as exc:
            raise MarketDataError("Quote response is missing valid price fields.") from exc
