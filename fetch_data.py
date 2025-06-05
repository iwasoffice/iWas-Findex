import yfinance as yf
import logging
from typing import List, Dict
import pandas as pd

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def fetch_indices(symbols: List[str], period: str = "1d", interval: str = "1m") -> Dict[str, pd.DataFrame]:
    """
    Fetch historical data for a list of financial symbols (indices) from Yahoo Finance.

    Args:
        symbols (List[str]): List of ticker symbols (e.g., ['^GSPC', '^DJI', '^IXIC'])
        period (str): Data period (e.g., '1d' for one day)
        interval (str): Data interval (e.g., '1m' for one minute)

    Returns:
        Dict[str, pd.DataFrame]: Dictionary where keys are ticker symbols and values are their respective DataFrames.
    """
    data = {}
    for symbol in symbols:
        try:
            logging.info(f"Fetching data for: {symbol} (Period: {period}, Interval: {interval})")
            ticker = yf.Ticker(symbol)
            df = ticker.history(period=period, interval=interval)
            if df.empty:
                logging.warning(f"No data returned for symbol: {symbol}")
            else:
                logging.info(f"Successfully fetched data for: {symbol} with {len(df)} records.")
            data[symbol] = df
        except Exception as e:
            logging.error(f"Error fetching data for {symbol}: {e}")
            data[symbol] = pd.DataFrame()  # return empty DataFrame on error
    return data

# Example usage:
if __name__ == "__main__":
    sample_symbols = ['^GSPC', '^DJI', '^IXIC']  # S&P 500, Dow Jones, NASDAQ
    fetched_data = fetch_indices(sample_symbols)
    for sym, df in fetched_data.items():
        print(f"\n--- {sym} ---\n")
        print(df.head())
