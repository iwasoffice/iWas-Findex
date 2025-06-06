# iWas Findex API Documentation - Overview

Welcome to the iWas Findex API documentation. This API allows you to interact with real-time financial data, AI model predictions, and algorithm metadata.

---

## Base URL

```

[https://api.iwasfindex.com/v1](https://api.iwasfindex.com/v1)

```

---

## Authentication

All endpoints require an API key sent via HTTP header:

```

Authorization: Bearer YOUR\_API\_KEY

```

Obtain your API key by registering on the iWas Findex platform.

Unauthorized requests will return HTTP 401.

---

## Supported Endpoints

| Endpoint             | Method | Description                          |
| -------------------- | ------ | ---------------------------------- |
| `/financial-data`    | GET    | Retrieve real-time financial data  |
| `/predictions`       | POST   | Get AI agent prediction on input   |
| `/algorithms`        | GET    | List evolving algorithms metadata  |

