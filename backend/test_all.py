from wordbrew import brew


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


def test_server_valid_query():
    pass


def test_server_bad_query():
    pass
