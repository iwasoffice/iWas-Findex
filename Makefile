.PHONY: run test lint format

run:
	python run.py

test:
	pytest tests/

lint:
	flake8 src/ tests/

format:
	black src/ tests/
