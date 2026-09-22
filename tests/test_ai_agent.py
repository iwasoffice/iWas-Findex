import pytest

from src.ai_agent import AIEvolvingAgent


def test_linear_sequence():
    agent = AIEvolvingAgent()
    for price in [100, 101, 102, 103, 104]:
        agent.update_data(price)
    forecast = agent.train_model()
    assert forecast is not None
    assert forecast.next_price == pytest.approx(105)
    assert forecast.r_squared == pytest.approx(1)


def test_invalid_price():
    agent = AIEvolvingAgent()
    with pytest.raises(ValueError):
        agent.update_data({"05. price": "bad"})
