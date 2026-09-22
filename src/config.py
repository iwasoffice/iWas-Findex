from __future__ import annotations

import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True, slots=True)
class Settings:
    alpha_vantage_api_key: str | None
    api_url: str
    symbols: tuple[str, ...]
    fetch_interval_seconds: int
    request_timeout_seconds: int


def load_settings() -> Settings:
    symbols = tuple(s.strip().upper() for s in os.getenv("FINDEX_SYMBOLS", "AAPL,MSFT,NVDA").split(",") if s.strip())
    return Settings(
        os.getenv("ALPHA_VANTAGE_API_KEY", "").strip() or None,
        "https://www.alphavantage.co/query",
        symbols,
        int(os.getenv("FETCH_INTERVAL_SECONDS", "300")),
        int(os.getenv("REQUEST_TIMEOUT_SECONDS", "10")),
    )
