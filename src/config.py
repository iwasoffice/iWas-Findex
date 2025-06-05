# src/config.py
# Configuration file for API keys and constants

FINANCE_API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY"  # Replace with your key
FINANCE_API_URL = "https://www.alphavantage.co/query"

# List of financial indices to monitor (add more as needed)
FINANCIAL_INDICES = [
    "DJI",   # Dow Jones Industrial Average
    "SPX",   # S&P 500
    "IXIC",  # NASDAQ Composite
    # Emerging markets indices examples:
    "N225",  # Nikkei 225 (Japan)
    "BSESN", # BSE Sensex (India)
]

# Polling interval (seconds)
POLL_INTERVAL_SECONDS = 1
