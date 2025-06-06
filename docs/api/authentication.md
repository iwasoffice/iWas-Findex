# Authentication

## API Key

To use the iWas Findex API, you must provide a valid API key.

### How to provide API key:

Add the following header to every request:

```

Authorization: Bearer YOUR\_API\_KEY

````

### Example:

```bash
curl -H "Authorization: Bearer abc123xyz" \
     https://api.iwasfindex.com/v1/financial-data?symbol=AAPL
````

Requests without a valid key will receive:

* HTTP 401 Unauthorized
* Response body:

```json
{
  "error": "Unauthorized",
  "message": "API key missing or invalid."
}
```
