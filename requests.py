"""Minimal local fallback for environments where `requests` is unavailable.

This module implements only the tiny subset used by this repository's tests.
"""


class RequestException(Exception):
    """Base request exception type compatible with requests.RequestException."""


class HTTPError(RequestException):
    """HTTP error placeholder."""


def get(*args, **kwargs):
    raise RequestException(
        "The real 'requests' package is not installed in this environment."
    )
