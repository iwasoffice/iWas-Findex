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

    def update_data(self, new_data: Mapping[str, object] | float) -> None:
        raw = new_data if isinstance(new_data, (float, int)) else new_data.get("price", new_data.get("05. price"))
        try:
            price = float(raw)  # type: ignore[arg-type]
        except (TypeError, ValueError) as exc:
            raise ValueError("new_data must contain a numeric price.") from exc
        if price <= 0:
            raise ValueError("price must be greater than zero.")
        self._prices.append(price)

    def train_model(self) -> Forecast | None:
        if len(self._prices) < self.min_training_points:
            self.forecast = None
            return None
        vals = list(self._prices)
        n = len(vals)
        mx = (n - 1) / 2
        my = sum(vals) / n
        den = sum((i - mx) ** 2 for i in range(n))
        slope = sum((i - mx) * (v - my) for i, v in enumerate(vals)) / den if den else 0.0
        intercept = my - slope * mx
        fitted = [intercept + slope * i for i in range(n)]
        tss = sum((v - my) ** 2 for v in vals)
        rss = sum((v - f) ** 2 for v, f in zip(vals, fitted, strict=True))
        r2 = 1.0 if tss == 0 else max(0.0, min(1.0, 1 - rss / tss))
        self.forecast = Forecast(max(0.0, intercept + slope * n), slope, r2, sqrt(rss / max(1, n - 2)), n)
        return self.forecast

    def predict_next_price(self) -> float | None:
        return self.forecast.next_price if self.forecast else None


AI_EvolvingAgent = AIEvolvingAgent
