# src/data_fetcher.py
# Module to fetch real-time financial data from Alpha Vantage API

import requests
from src.config import FINANCE_API_URL, FINANCE_API_KEY

def fetch_index_data(symbol: str) -> dict:
    """
    Fetch real-time financial index data from Alpha Vantage.

    Args:
        symbol (str): The symbol of the financial index.

    Returns:
        dict: Parsed JSON data containing the latest financial info.
    """
    params = {
        "function": "GLOBAL_QUOTE",
        "symbol": symbol,
        "apikey": FINANCE_API_KEY
    }
    try:
        response = requests.get(FINANCE_API_URL, params=params)
        response.raise_for_status()
        data = response.json()

        # Check for valid data
        if "Global Quote" in data and data["Global Quote"]:
            return data["Global Quote"]
        else:
            raise ValueError(f"No data found for symbol: {symbol}")
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")
        return {}
