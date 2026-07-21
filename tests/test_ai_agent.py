import pytest

from src.ai_agent import AIEvolvingAgent


def test_linear_sequence_prediction() -> None:
    agent = AIEvolvingAgent()
    for price in [100, 101, 102, 103, 104]:
        agent.update_data(price)

    forecast = agent.train_model()

    assert forecast is not None
    assert forecast.next_price == pytest.approx(105)
    assert forecast.r_squared == pytest.approx(1)


def test_invalid_price_is_rejected() -> None:
    agent = AIEvolvingAgent()
    with pytest.raises(ValueError, match="numeric price"):
        agent.update_data({"05. price": "not-a-number"})


def test_history_is_bounded() -> None:
    agent = AIEvolvingAgent(max_history=5, min_training_points=3)
    for price in range(1, 11):
        agent.update_data(price)
    assert agent.prices == (6.0, 7.0, 8.0, 9.0, 10.0)
