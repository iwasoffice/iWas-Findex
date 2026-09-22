from __future__ import annotations

import logging
import threading

from src.ai_agent import AIEvolvingAgent
from src.config import Settings, load_settings
from src.data_fetcher import AlphaVantageClient, MarketDataError

LOGGER = logging.getLogger(__name__)


class RealTimeStreamer:
    def __init__(self, settings: Settings | None = None, client: AlphaVantageClient | None = None) -> None:
        self.settings = settings or load_settings()
        self.client = client or AlphaVantageClient(self.settings)
        self.agents = {s: AIEvolvingAgent() for s in self.settings.symbols}
        self._stop = threading.Event()

    def poll_once(self):
        results = []
        for symbol, agent in self.agents.items():
            try:
                quote = self.client.fetch_quote(symbol)
            except MarketDataError as exc:
                LOGGER.error("%s: %s", symbol, exc)
                continue
            agent.update_data(quote.price)
            agent.train_model()
            results.append((quote, agent.predict_next_price()))
        return results

    def start_stream(self, max_cycles: int | None = None) -> None:
        cycles = 0
        try:
            while not self._stop.is_set():
                for quote, prediction in self.poll_once():
                    LOGGER.info(
                        "%s %.2f -> %s",
                        quote.symbol,
                        quote.price,
                        "warming up" if prediction is None else f"{prediction:.2f}",
                    )
                cycles += 1
                if max_cycles is not None and cycles >= max_cycles:
                    break
                self._stop.wait(self.settings.fetch_interval_seconds)
        except KeyboardInterrupt:
            pass
        finally:
            self._stop.set()
