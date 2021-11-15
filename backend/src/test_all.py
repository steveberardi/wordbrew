import json
import pytest

from wordbrew import brew
from server import app


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_brew_with_real_word():
    results = brew("walk")
    expected_keys = set(
        [
            "id",
            "pos",
            "weight",
            "definition",
            "hypernyms",
            "hyponyms",
            "meronyms",
            "lemmas",
            "similar",
        ]
    )
    for r in results:
        assert set(r.keys()) - expected_keys == set()


def test_brew_with_fake_word():
    assert brew("foobar") == []


def test_server_with_real_word(client):
    resp = client.get("/?query=walk")
    resp_data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(resp_data["result"]) > 0


def test_server_with_fake_word(client):
    resp = client.get("/?query=foobar")
    resp_data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(resp_data["result"]) == 0
