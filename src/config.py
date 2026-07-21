"""Environment-backed configuration for the Python command-line client."""

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


def _positive_int(name: str, default: int, minimum: int = 1) -> int:
    raw = os.getenv(name, str(default))
    try:
        value = int(raw)
    except ValueError as exc:
        raise ValueError(f"{name} must be an integer.") from exc
    if value < minimum:
        raise ValueError(f"{name} must be at least {minimum}.")
    return value


def load_settings() -> Settings:
    symbols = tuple(
        symbol.strip().upper()
        for symbol in os.getenv("FINDEX_SYMBOLS", "AAPL,MSFT,NVDA").split(",")
        if symbol.strip()
    )
    if not symbols:
        raise ValueError("FINDEX_SYMBOLS must contain at least one symbol.")

    key = os.getenv("ALPHA_VANTAGE_API_KEY", "").strip() or None
    return Settings(
        alpha_vantage_api_key=key,
        api_url="https://www.alphavantage.co/query",
        symbols=symbols,
        fetch_interval_seconds=_positive_int("FETCH_INTERVAL_SECONDS", 300, minimum=30),
        request_timeout_seconds=_positive_int("REQUEST_TIMEOUT_SECONDS", 10),
    )
