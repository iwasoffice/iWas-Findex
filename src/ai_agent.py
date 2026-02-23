# src/ai_agent.py
# Core AI Agent that analyzes data and evolves algorithms

from statistics import mean


class AI_EvolvingAgent:
    def __init__(self):
        # Store a bounded history of dict records.
        self.data_history = []
        self.slope = 0.0
        self.intercept = 0.0
        self.is_model_trained = False

    def update_data(self, new_data: dict):
        """
        Add new data point to history.

        Args:
            new_data (dict): Dictionary containing new data with keys like price, volume, etc.
        """
        try:
            self.data_history.append(dict(new_data))

            # Keep only last 100 data points to limit memory
            if len(self.data_history) > 100:
                self.data_history = self.data_history[-100:]

        except Exception as e:
            print(f"Error updating data: {e}")

    def train_model(self):
        """
        Train a lightweight linear model based on historical data to predict next price.
        """
        try:
            if len(self.data_history) < 10:
                print("Not enough data to train.")
                return

            x_vals = list(range(len(self.data_history)))
            y_vals = [float(point["05. price"]) for point in self.data_history]

            x_mean = mean(x_vals)
            y_mean = mean(y_vals)

            numerator = sum((x - x_mean) * (y - y_mean) for x, y in zip(x_vals, y_vals))
            denominator = sum((x - x_mean) ** 2 for x in x_vals)

            if denominator == 0:
                self.slope = 0.0
            else:
                self.slope = numerator / denominator

            self.intercept = y_mean - self.slope * x_mean
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
            prediction = self.intercept + self.slope * next_time_idx
            return float(prediction)
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
