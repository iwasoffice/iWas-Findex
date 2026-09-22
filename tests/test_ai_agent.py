import pytest
from src.ai_agent import AIEvolvingAgent
def test_linear_sequence():
    a=AIEvolvingAgent()
    for p in [100,101,102,103,104]:a.update_data(p)
    f=a.train_model();assert f is not None;assert f.next_price==pytest.approx(105);assert f.r_squared==pytest.approx(1)
def test_invalid_price():
    a=AIEvolvingAgent()
    with pytest.raises(ValueError):a.update_data({"05. price":"bad"})
