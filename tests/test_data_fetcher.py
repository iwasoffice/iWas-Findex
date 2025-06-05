# tests/test_data_fetcher.py

import pytest
from src.data_fetcher import fetch_index_data

def test_fetch_valid_index(monkeypatch):
    # Mock the API call
    def mock_get(*args, **kwargs):
        class MockResponse:
            def raise_for_status(self): pass
            def json(self):
                return {
                    "Global Quote": {
                        "01. symbol": "DJI",
                        "05. price": "39000.00"
                    }
                }
        return MockResponse()

    import requests
    monkeypatch.setattr(requests, "get", mock_get)

    data = fetch_index_data("DJI")
    assert "01. symbol" in data
    assert data["01. symbol"] == "DJI"
    assert float(data["05. price"]) == 39000.00
