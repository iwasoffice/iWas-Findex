from __future__ import annotations
import argparse,logging
from src.realtime_stream import RealTimeStreamer
def main():
    parser=argparse.ArgumentParser();parser.add_argument("--once",action="store_true");args=parser.parse_args();logging.basicConfig(level=logging.INFO,format="%(asctime)s | %(levelname)s | %(message)s");RealTimeStreamer().start_stream(max_cycles=1 if args.once else None)
if __name__=="__main__":main()
