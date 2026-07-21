"""Polling coordinator for the optional Python command-line process."""

from __future__ import annotations

import logging
import threading
from collections.abc import Callable

from src.ai_agent import AIEvolvingAgent
from src.config import Settings, load_settings
from src.data_fetcher import AlphaVantageClient, MarketDataError, Quote

LOGGER = logging.getLogger(__name__)


class RealTimeStreamer:
    def __init__(
        self,
        settings: Settings | None = None,
        client: AlphaVantageClient | None = None,
        agent_factory: Callable[[], AIEvolvingAgent] = AIEvolvingAgent,
    ) -> None:
        self.settings = settings or load_settings()
        self.client = client or AlphaVantageClient(self.settings)
        self.agents = {symbol: agent_factory() for symbol in self.settings.symbols}
        self._stop_event = threading.Event()

    @property
    def agent(self) -> AIEvolvingAgent:
        """Compatibility accessor for older tests and single-symbol usage."""
        return next(iter(self.agents.values()))

    def stop(self) -> None:
        self._stop_event.set()

    def poll_once(self) -> list[tuple[Quote, float | None]]:
        results: list[tuple[Quote, float | None]] = []
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
        LOGGER.info("Starting market polling for %s", ", ".join(self.settings.symbols))
        cycles = 0
        try:
            while not self._stop_event.is_set():
                for quote, prediction in self.poll_once():
                    prediction_text = "warming up" if prediction is None else f"{prediction:.2f}"
                    LOGGER.info(
                        "%s price %.2f, next trend estimate %s",
                        quote.symbol,
                        quote.price,
                        prediction_text,
                    )
                cycles += 1
                if max_cycles is not None and cycles >= max_cycles:
                    break
                self._stop_event.wait(self.settings.fetch_interval_seconds)
        except KeyboardInterrupt:
            LOGGER.info("Polling stopped by user.")
        finally:
            self.stop()
