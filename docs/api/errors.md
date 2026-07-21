# API errors

Invalid client input returns HTTP 400:

```json
{
  "error": "Use a valid ticker containing letters, numbers, dots or hyphens."
}
```

Provider failures do not expose secrets. The API falls back to a clearly labelled demo response and includes a human-readable message.
