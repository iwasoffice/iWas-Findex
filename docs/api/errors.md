# API Error Handling

## Common HTTP Status Codes

| Status | Meaning                   | Description                               |
| ------ | ------------------------- | ----------------------------------------|
| 200    | OK                        | Request successful                       |
| 400    | Bad Request               | Missing or invalid parameters            |
| 401    | Unauthorized              | Missing or invalid API key                |
| 403    | Forbidden                 | API key lacks required permissions       |
| 404    | Not Found                 | Resource not found                        |
| 500    | Internal Server Error     | Server error, try again later             |

---

## Error Response Format

Errors return JSON with the following structure:

```json
{
  "error": "ErrorType",
  "message": "Detailed error message"
}
````

### Example:

```json
{
  "error": "BadRequest",
  "message": "Missing required parameter 'symbol'."
}
```
