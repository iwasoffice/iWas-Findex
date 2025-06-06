
# Quickstart Guide

1. **Get your API key**

Register on the iWas Findex website and obtain your API key.

2. **Test fetching financial data**

Use curl or Postman to call the endpoint:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.iwasfindex.com/v1/financial-data?symbol=AAPL"
````

3. **Get AI model predictions**

Send POST requests with your input features:

```bash
curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" \
     -d '{"symbol":"AAPL","features":{"open":145.3,"high":146,"low":145,"close":145.85,"volume":120000}}' \
     https://api.iwasfindex.com/v1/predictions
```

4. **Integrate with your app**

Use the examples in the `docs/api/examples.md` to incorporate API calls in Python or other languages.

---

For detailed docs on endpoints, authentication, and error codes, see the other files in this folder.

---

# How to add this to your repo:

- Create folder `docs/api/`
- Add the above `.md` files with exact filenames:
  - `overview.md`
  - `authentication.md`
  - `endpoints.md`
  - `errors.md`
  - `examples.md`
  - `quickstart.md`

---

If you want me to provide other folders/files (datasets, frontend, monitoring, examples) with this same level of detail, just ask!
