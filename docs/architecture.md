# iWas Findex – Architecture Overview

## 🧠 Goal

Create a self-evolving AI agent that:

- Continuously monitors financial indices in real time.
- Discovers and updates its own predictive algorithms.
- Works efficiently on emerging market data streams.

---

## 🏗️ High-Level Architecture

      ┌──────────────┐
      │   run.py     │
      └─────┬────────┘
            │
    ┌───────▼────────┐
    │ RealTimeStreamer│
    └───────┬────────┘
            │
    ┌───────▼────────┐       ┌────────────────────┐
    │ fetch_index_data ├────▶│ Financial Data APIs │
    └───────┬────────┘       └────────────────────┘
            │
    ┌───────▼────────┐
    │ AI_EvolvingAgent│
    └───────┬────────┘
            │
    ┌───────▼────────┐
    │   utils.py     │
    └───────┬────────┘
            │
    ┌───────▼────────┐
    │   config.py    │
    └────────────────┘

---

## 📂 Module Overview

### 1. `src/data_fetcher.py`
- Connects to external APIs.
- Converts raw JSON into clean dictionaries.

### 2. `src/ai_agent.py`
- Stores time series data.
- Trains models dynamically (linear regression, etc.).
- Predicts next price based on recent data.

### 3. `src/realtime_stream.py`
- Loops every second.
- Fetches, feeds, and logs data to the AI agent.

---

## 💡 Future Ideas

- Add anomaly detection.
- Integrate reinforcement learning.
- Stream to a dashboard or mobile app.
