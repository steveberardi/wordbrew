import os
import wn

wn.config.allow_multithreading = True
if os.environ.get("WN_DATA_PATH"):
    wn.config.data_directory = os.environ.get("WN_DATA_PATH")

RELATIONS_DEFAULT = {
    "hypernyms": ["hypernym", "instance_hypernym"],
    "hyponyms": ["hyponym", "instance_hyponym"],
    "meronyms": [
        "meronym",
        "mero_location",
        "mero_member",
        "mero_part",
        "mero_portion",
        "mero_substance",
    ],
    "similar": ["similar"],
}


def brew(query, relations=None, min_score=2, max_length=20):
    results = []
    relations = relations or RELATIONS_DEFAULT

    for ss in wn.synsets(query):
        result = {
            "id": ss.id,
            "pos": ss.pos,
            "definition": ss.definition(),
            "lemmas": ss.lemmas(),
        }

        for relname, rels in relations.items():
            lemmas = set()
            for w in ss.get_related(*rels) or []:
                lems = [lem for lem in w.lemmas() if len(lem) <= max_length]
                lemmas.update(lems)
            result[relname] = list(lemmas)

        result["score"] = (
            len(result.get("hyponyms", []))
            + len(result.get("meronyms", []))
            + len(result.get("similar", []))
        )

        results.append(result)

    # sort by amount of data and remove low score results
    return list(
        filter(
            lambda d: d["score"] >= min_score,
            sorted(results, key=lambda k: k["score"], reverse=True),
        )
    )
