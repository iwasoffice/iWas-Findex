from src.config import Settings
from src.data_fetcher import Quote
from src.realtime_stream import RealTimeStreamer


class FakeClient:
    def fetch_quote(self, symbol: str) -> Quote:
        return Quote(symbol=symbol, price=100.0)


def test_streamer_poll_once_updates_each_agent() -> None:
    settings = Settings(
        alpha_vantage_api_key="test",
        api_url="https://example.test",
        symbols=("AAPL", "MSFT"),
        fetch_interval_seconds=300,
        request_timeout_seconds=10,
    )
    streamer = RealTimeStreamer(settings=settings, client=FakeClient())
    results = streamer.poll_once()
    assert len(results) == 2
    assert all(agent.prices == (100.0,) for agent in streamer.agents.values())
