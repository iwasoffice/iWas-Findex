# tests/test_realtime_stream.py

import pytest
from src.realtime_stream import RealTimeStreamer
from src.ai_agent import AI_EvolvingAgent

def test_streamer_initialization():
    """
    Test that the RealTimeStreamer initializes with an AI agent.
    """
    streamer = RealTimeStreamer()
    assert isinstance(streamer.agent, AI_EvolvingAgent)
