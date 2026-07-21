.PHONY: install dev build start test lint check python-install python-test python-run clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

start:
	npm start

test:
	npm run test

lint:
	npm run lint

check:
	npm run check

python-install:
	python -m pip install -r requirements.txt -r requirements-dev.txt

python-test:
	ruff check src tests run.py
	pytest

python-run:
	python run.py --once

clean:
	rm -rf .next node_modules .pytest_cache .ruff_cache __pycache__ src/__pycache__ tests/__pycache__
