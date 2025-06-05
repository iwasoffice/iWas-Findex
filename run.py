# run.py
# Entrypoint to start the iWas Findex AI system

from src.realtime_stream import RealTimeStreamer
from src.utils import print_header

def main():
    print_header("Welcome to iWas Findex - The Future of Finance")
    streamer = RealTimeStreamer()
    streamer.start_stream()

if __name__ == "__main__":
    main()
