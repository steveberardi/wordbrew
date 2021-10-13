import pytest

from wordbrew import brew
from server import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
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
            "lemmas",
            "similar",
        ]
    )
    for r in results:
        assert set(r.keys()) - expected_keys == set()


def test_brew_with_fake_word():
    assert brew("foobar") == []


def test_server_valid_query(client):
    resp = client.get("/?query=walk")
    assert resp.status_code == 200


def test_server_bad_query():
    pass
