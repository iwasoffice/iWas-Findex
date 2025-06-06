# API Usage Examples

## Fetch financial data using curl

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.iwasfindex.com/v1/financial-data?symbol=AAPL&interval=1min"
````

---

## Get prediction using Python `requests`

```python
import requests

API_URL = "https://api.iwasfindex.com/v1/predictions"
API_KEY = "YOUR_API_KEY"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "symbol": "AAPL",
    "features": {
        "open": 145.30,
        "high": 146.00,
        "low": 145.00,
        "close": 145.85,
        "volume": 120000
    }
}

response = requests.post(API_URL, json=payload, headers=headers)

if response.status_code == 200:
    prediction_data = response.json()
    print(f"Prediction: {prediction_data['prediction']}, Confidence: {prediction_data['confidence']}")
else:
    print(f"Error: {response.status_code} - {response.text}")
```

---

## Handling errors in curl

```bash
curl -i -H "Authorization: Bearer INVALID_KEY" \
     "https://api.iwasfindex.com/v1/financial-data?symbol=AAPL"
```

Returns:

```
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "error": "Unauthorized",
  "message": "API key missing or invalid."
}
```
