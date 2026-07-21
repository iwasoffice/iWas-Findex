"""Shared command-line helpers."""

from __future__ import annotations

import logging
import os


def configure_logging() -> None:
    level_name = os.getenv("LOG_LEVEL", "INFO").upper()
    level = getattr(logging, level_name, logging.INFO)
    logging.basicConfig(level=level, format="%(asctime)s | %(levelname)s | %(message)s")


def print_header(title: str) -> None:
    border = "=" * max(50, len(title))
    print(border)
    print(title)
    print(border)
