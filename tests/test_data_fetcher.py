import pytest

from src.config import Settings
from src.data_fetcher import AlphaVantageClient, MarketDataError


class MockResponse:
    def __init__(self, payload: dict, status_code: int = 200) -> None:
        self.payload = payload
        self.status_code = status_code

    def raise_for_status(self) -> None:
        if self.status_code >= 400:
            raise RuntimeError("HTTP failure")

    def json(self) -> dict:
        return self.payload


class MockSession:
    def __init__(self, response: MockResponse) -> None:
        self.response = response
        self.calls: list[dict] = []

    def get(self, url: str, **kwargs):
        self.calls.append({"url": url, **kwargs})
        return self.response


def settings(key: str | None = "test-key") -> Settings:
    return Settings(
        alpha_vantage_api_key=key,
        api_url="https://example.test/query",
        symbols=("AAPL",),
        fetch_interval_seconds=300,
        request_timeout_seconds=10,
    )


def test_fetch_quote_parses_valid_response() -> None:
    session = MockSession(
        MockResponse(
            {
                "Global Quote": {
                    "01. symbol": "AAPL",
                    "05. price": "210.25",
                    "06. volume": "1000",
                    "07. latest trading day": "2026-07-17",
                }
            }
        )
    )
    quote = AlphaVantageClient(settings(), session=session).fetch_quote("aapl")
    assert quote.symbol == "AAPL"
    assert quote.price == 210.25
    assert session.calls[0]["timeout"] == 10


def test_missing_key_is_explicit() -> None:
    with pytest.raises(MarketDataError, match="not configured"):
        client = AlphaVantageClient(settings(None), session=MockSession(MockResponse({})))
        client.fetch_quote("AAPL")


def test_provider_message_is_reported() -> None:
    client = AlphaVantageClient(
        settings(),
        session=MockSession(MockResponse({"Information": "Rate limit reached"})),
    )
    with pytest.raises(MarketDataError, match="Rate limit"):
        client.fetch_quote("AAPL")
