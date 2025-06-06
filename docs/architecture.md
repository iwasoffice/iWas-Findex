# iWas Findex – Architecture Overview

## 🧠 Goal

Create a self-evolving AI agent that:

- Continuously monitors financial indices in real time.
- Discovers and updates its own predictive algorithms.
- Works efficiently on emerging market data streams.
- Supports multiple APIs including Alpha Vantage and OpenAI for enhanced predictions.

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
    └───────┬────────┘       │  (Alpha Vantage,    │
            │                │    OpenAI, etc.)    │
    ┌───────▼────────┐       └────────────────────┘
    │ AI_EvolvingAgent│
    └───────┬────────┘
            │
    ┌───────▼────────┐
    │   utils.py     │
    └───────┬────────┘
            │
    ┌───────▼────────┐
    │   config.py    │  ← Reads .env for API keys and config
    └────────────────┘

---

## 📂 Module Overview

### 1. `src/data_fetcher.py`
- Connects to external APIs.
- Converts raw JSON into clean dictionaries.
- Supports Alpha Vantage and OpenAI API calls.

### 2. `src/ai_agent.py`
- Stores time series data.
- Trains models dynamically (linear regression, etc.).
- Predicts next price based on recent data.

### 3. `src/realtime_stream.py`
- Loops every second.
- Fetches, feeds, and logs data to the AI agent.

### 4. `src/utils.py`
- Helper functions for data processing, logging, and API interaction.

### 5. `src/config.py`
- Loads environment variables and API keys from `.env`.

---

## 🛠️ Deployment & Dev Ops

- `Dockerfile` and `.dockerignore` for containerized deployment.
- `.env.example` to guide environment setup.
- Unit tests in `tests/`.
- Jupyter notebooks for prototyping in `notebooks/`.

---

## 💡 Future Ideas

- Add anomaly detection.
- Integrate reinforcement learning.
- Stream to a dashboard or mobile app.
- Enhance multi-API support and data versioning.
