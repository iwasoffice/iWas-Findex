"""Command-line entry point for the optional Python market poller."""

from __future__ import annotations

import argparse

from src.realtime_stream import RealTimeStreamer
from src.utils import configure_logging, print_header


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the iWas Findex market poller.")
    parser.add_argument("--once", action="store_true", help="Fetch one cycle and exit.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    configure_logging()
    print_header("iWas Findex market analytics")
    streamer = RealTimeStreamer()
    streamer.start_stream(max_cycles=1 if args.once else None)


if __name__ == "__main__":
    main()
