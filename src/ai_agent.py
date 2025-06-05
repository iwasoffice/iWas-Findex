# src/ai_agent.py
# Core AI Agent that analyzes data and evolves algorithms

import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

class AI_EvolvingAgent:
    def __init__(self):
        # Initialize data storage
        self.data_history = pd.DataFrame()
        self.model = LinearRegression()
        self.is_model_trained = False

    def update_data(self, new_data: dict):
        """
        Add new data point to history.

        Args:
            new_data (dict): Dictionary containing new data with keys like price, volume, etc.
        """
        try:
            # Convert dict to DataFrame and append
            new_df = pd.DataFrame([new_data])
            self.data_history = pd.concat([self.data_history, new_df], ignore_index=True)

            # Keep only last 100 data points to limit memory
            if len(self.data_history) > 100:
                self.data_history = self.data_history.tail(100).reset_index(drop=True)

        except Exception as e:
            print(f"Error updating data: {e}")

    def train_model(self):
        """
        Train model based on historical data to predict next price.
        """
        try:
            if len(self.data_history) < 10:
                print("Not enough data to train.")
                return
            
            # Example: use time index to predict price
            self.data_history["time_idx"] = np.arange(len(self.data_history))
            X = self.data_history[["time_idx"]]
            y = self.data_history["05. price"].astype(float)  # Assuming price key
            
            self.model.fit(X, y)
            self.is_model_trained = True
            print("Model trained successfully.")
        except Exception as e:
            print(f"Error training model: {e}")

    def predict_next_price(self) -> float:
        """
        Predict next price based on model.

        Returns:
            float: Predicted price.
        """
        try:
            if not self.is_model_trained:
                print("Model not trained yet.")
                return None
            
            next_time_idx = len(self.data_history)
            prediction = self.model.predict([[next_time_idx]])
            return prediction[0]
        except Exception as e:
            print(f"Error predicting next price: {e}")
            return None

    def evolve_algorithm(self):
        """
        Placeholder for self-evolving algorithm logic.
        This could implement more complex AI approaches, retraining,
        feature engineering, etc., over time.
        """
        print("Evolving algorithm: currently placeholder method.")
