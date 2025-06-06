# API Endpoints Reference

## 1. Get Financial Data

### Request

`GET /financial-data`

### Query Parameters

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------|
| `symbol`  | string | Yes      | Ticker symbol (e.g., "AAPL")    |
| `interval`| string | No       | Data interval: "1min", "5min", "daily" (default: "1min") |

### Response

```json
{
  "symbol": "AAPL",
  "interval": "1min",
  "data": [
    {
      "timestamp": "2025-06-06T11:30:00Z",
      "open": 145.30,
      "high": 146.00,
      "low": 145.00,
      "close": 145.85,
      "volume": 120000
    },
    ...
  ]
}
````

---

## 2. Get AI Prediction

### Request

`POST /predictions`

### Request Body (JSON)

```json
{
  "symbol": "AAPL",
  "features": {
    "open": 145.30,
    "high": 146.00,
    "low": 145.00,
    "close": 145.85,
    "volume": 120000
  }
}
```

### Response

```json
{
  "symbol": "AAPL",
  "prediction": 146.15,
  "confidence": 0.92
}
```

---

## 3. List Algorithms

### Request

`GET /algorithms`

### Response

```json
[
  {
    "id": "algo_001",
    "name": "Linear Regression v1",
    "description": "Baseline regression model",
    "last_updated": "2025-06-05T08:30:00Z"
  },
  {
    "id": "algo_002",
    "name": "Neural Network v3",
    "description": "Deep learning prediction model",
    "last_updated": "2025-06-06T10:00:00Z"
  }
]
```
