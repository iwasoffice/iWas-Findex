"""Small, transparent linear-trend model for streaming quote observations."""

from __future__ import annotations

from collections import deque
from collections.abc import Mapping
from dataclasses import dataclass
from math import sqrt


@dataclass(frozen=True, slots=True)
class Forecast:
    next_price: float
    slope: float
    r_squared: float
    residual_error: float
    observations: int


class AIEvolvingAgent:
    def __init__(self, max_history: int = 100, min_training_points: int = 3) -> None:
        if max_history < min_training_points:
            raise ValueError("max_history cannot be smaller than min_training_points.")
        self._prices: deque[float] = deque(maxlen=max_history)
        self.min_training_points = min_training_points
        self.forecast: Forecast | None = None

    @property
    def prices(self) -> tuple[float, ...]:
        return tuple(self._prices)

    @property
    def is_model_trained(self) -> bool:
        return self.forecast is not None

    def update_data(self, new_data: Mapping[str, object] | float | int) -> None:
        raw_price: object
        if isinstance(new_data, (float, int)):
            raw_price = new_data
        else:
            raw_price = new_data.get("price", new_data.get("05. price"))
        try:
            price = float(raw_price)  # type: ignore[arg-type]
        except (TypeError, ValueError) as exc:
            raise ValueError("new_data must contain a numeric price.") from exc
        if price <= 0:
            raise ValueError("price must be greater than zero.")
        self._prices.append(price)

    def train_model(self) -> Forecast | None:
        if len(self._prices) < self.min_training_points:
            self.forecast = None
            return None

        values = list(self._prices)
        n = len(values)
        mean_x = (n - 1) / 2
        mean_y = sum(values) / n
        denominator = sum((index - mean_x) ** 2 for index in range(n))
        slope = (
            sum((index - mean_x) * (value - mean_y) for index, value in enumerate(values))
            / denominator
            if denominator
            else 0.0
        )
        intercept = mean_y - slope * mean_x
        fitted = [intercept + slope * index for index in range(n)]
        total_squares = sum((value - mean_y) ** 2 for value in values)
        residual_squares = sum(
            (value - estimate) ** 2
            for value, estimate in zip(values, fitted, strict=True)
        )
        r_squared = (
            1.0
            if total_squares == 0
            else max(0.0, min(1.0, 1 - residual_squares / total_squares))
        )
        residual_error = sqrt(residual_squares / max(1, n - 2))

        self.forecast = Forecast(
            next_price=max(0.0, intercept + slope * n),
            slope=slope,
            r_squared=r_squared,
            residual_error=residual_error,
            observations=n,
        )
        return self.forecast

    def predict_next_price(self) -> float | None:
        return self.forecast.next_price if self.forecast else None

    def evolve_algorithm(self) -> Forecast | None:
        """Retrain the transparent baseline model on all retained observations."""
        return self.train_model()


# Compatibility alias for existing imports.
AI_EvolvingAgent = AIEvolvingAgent
