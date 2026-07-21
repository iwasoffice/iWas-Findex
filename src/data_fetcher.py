"""Alpha Vantage data access with explicit errors and response validation."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

import requests

from src.config import Settings, load_settings


class MarketDataError(RuntimeError):
    """Raised when provider data is missing, malformed or unavailable."""


@dataclass(frozen=True, slots=True)
class Quote:
    symbol: str
    price: float
    volume: int | None = None
    latest_trading_day: str | None = None

    def as_legacy_dict(self) -> dict[str, str]:
        result = {"01. symbol": self.symbol, "05. price": f"{self.price:.4f}"}
        if self.volume is not None:
            result["06. volume"] = str(self.volume)
        if self.latest_trading_day:
            result["07. latest trading day"] = self.latest_trading_day
        return result


class AlphaVantageClient:
    def __init__(
        self,
        settings: Settings | None = None,
        session: requests.Session | None = None,
    ) -> None:
        self.settings = settings or load_settings()
        self.session = session or requests.Session()

    def fetch_quote(self, symbol: str) -> Quote:
        if not self.settings.alpha_vantage_api_key:
            raise MarketDataError("ALPHA_VANTAGE_API_KEY is not configured.")

        normalized = symbol.strip().upper()
        if not normalized:
            raise ValueError("symbol cannot be empty.")

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
            payload: dict[str, Any] = response.json()
        except requests.RequestException as exc:
            raise MarketDataError(f"Market data request failed: {exc}") from exc
        except ValueError as exc:
            raise MarketDataError("Market data provider returned invalid JSON.") from exc

        provider_message = (
            payload.get("Note")
            or payload.get("Information")
            or payload.get("Error Message")
        )
        if provider_message:
            raise MarketDataError(str(provider_message))

        raw = payload.get("Global Quote")
        if not isinstance(raw, dict) or not raw:
            raise MarketDataError(f"No quote was returned for {normalized}.")

        try:
            price = float(raw["05. price"])
            volume_raw = raw.get("06. volume")
            volume = int(volume_raw) if volume_raw not in (None, "") else None
        except (KeyError, TypeError, ValueError) as exc:
            raise MarketDataError("Quote response is missing valid price fields.") from exc

        return Quote(
            symbol=str(raw.get("01. symbol") or normalized),
            price=price,
            volume=volume,
            latest_trading_day=raw.get("07. latest trading day"),
        )


def fetch_index_data(symbol: str) -> dict[str, str]:
    """Backward-compatible helper used by earlier versions of the repository."""
    return AlphaVantageClient().fetch_quote(symbol).as_legacy_dict()
