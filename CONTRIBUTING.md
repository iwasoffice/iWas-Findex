# Contributing to iWas Findex

## Local setup

Install the web application:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Install the optional Python core in a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
```

On Windows PowerShell, activate with `./.venv/Scripts/Activate.ps1`.

## Before opening a pull request

Run all web checks:

```bash
npm run check
```

Run Python checks:

```bash
ruff check src tests run.py
pytest
```

New behaviour should include a focused test. Update `README.md` or `docs/` when public behaviour, configuration or architecture changes.

## Pull request process

1. Create a focused branch from `main`.
2. Keep secrets and local environment files out of Git.
3. Use a clear commit message describing the change.
4. Open a pull request with the problem, implementation and verification steps.
5. Confirm that GitHub Actions passes.

By participating, contributors agree to follow `CODE_OF_CONDUCT.md`.
