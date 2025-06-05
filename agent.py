import importlib
import os
import traceback
from typing import Callable, List, Dict, Any

from algorithms import basic_analysis


class SelfEvolvingAgent:
    """
    A self-evolving AI agent that can:
    - Accept real-time financial data
    - Run modular analysis algorithms
    - Evolve by dynamically integrating new algorithm modules at runtime
    """

    def __init__(self):
        self.algorithms: List[Callable[[Dict[str, Any]], Dict[str, Any]]] = []
        self.register_default_algorithms()

    def register_default_algorithms(self):
        """Load initial default analysis algorithms."""
        try:
            self.algorithms.append(basic_analysis.run_analysis)
            print("[INFO] Default algorithm 'basic_analysis' registered.")
        except Exception as e:
            print(f"[ERROR] Failed to load default algorithms: {e}")

    def run(self, data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Run all registered analysis algorithms on the given data.

        :param data: Dictionary mapping index symbols to DataFrame data
        :return: List of results from each algorithm
        """
        print("[INFO] Running analysis on incoming data...")
        results = []
        for idx, algo in enumerate(self.algorithms):
            try:
                result = algo(data)
                results.append(result)
                print(f"[INFO] Algorithm {idx+1} completed successfully.")
            except Exception as e:
                print(f"[ERROR] Algorithm {idx+1} failed: {e}\n{traceback.format_exc()}")
        return results

    def evolve(self, new_algo_code: str, name: str = "custom_algo") -> bool:
        """
        Dynamically add a new algorithm to the agent by writing Python code to the algorithms directory.

        :param new_algo_code: Python code string defining a function 'run_analysis(data)'
        :param name: File name (without .py) to save the algorithm under
        :return: True if successful, False otherwise
        """
        algo_path = f"algorithms/{name}.py"
        try:
            # Save new algorithm code to file
            with open(algo_path, "w") as f:
                f.write(new_algo_code)

            print(f"[INFO] New algorithm written to {algo_path}.")

            # Invalidate and import new module
            importlib.invalidate_caches()
            new_module = importlib.import_module(f"algorithms.{name}")
            if hasattr(new_module, "run_analysis"):
                self.algorithms.append(getattr(new_module, "run_analysis"))
                print(f"[INFO] Successfully evolved and integrated new algorithm: {name}")
                return True
            else:
                print("[ERROR] No 'run_analysis' function found in new algorithm.")
                return False
        except Exception as e:
            print(f"[ERROR] Evolution failed: {e}\n{traceback.format_exc()}")
            return False
