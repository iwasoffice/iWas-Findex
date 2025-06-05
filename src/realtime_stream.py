# src/realtime_stream.py
# Handles real-time polling and invoking AI agent

import time
from src.data_fetcher import fetch_index_data
from src.ai_agent import AI_EvolvingAgent
from src.config import FINANCIAL_INDICES, POLL_INTERVAL_SECONDS

class RealTimeStreamer:
    def __init__(self):
        self.agent = AI_EvolvingAgent()

    def start_stream(self):
        """
        Start polling financial indices in real-time and update AI agent.
        """
        print("Starting real-time stream... Press Ctrl+C to stop.")
        try:
            while True:
                for symbol in FINANCIAL_INDICES:
                    data = fetch_index_data(symbol)
                    if data:
                        self.agent.update_data(data)
                        self.agent.train_model()
                        prediction = self.agent.predict_next_price()
                        print(f"[{symbol}] Predicted next price: {prediction:.2f}")
                    else:
                        print(f"No data for {symbol}")
                time.sleep(POLL_INTERVAL_SECONDS)
        except KeyboardInterrupt:
            print("Real-time streaming stopped.")
