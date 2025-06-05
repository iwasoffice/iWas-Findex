# tests/test_ai_agent.py

import pytest
from src.ai_agent import AI_EvolvingAgent

def test_update_and_predict():
    agent = AI_EvolvingAgent()

    # Simulate 20 fake price entries
    for i in range(20):
        data = {"05. price": str(100 + i)}  # increasing price
        agent.update_data(data)

    agent.train_model()
    prediction = agent.predict_next_price()

    assert prediction is not None
    assert isinstance(prediction, float)
