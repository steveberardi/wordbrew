import os
import wn

wn.config.allow_multithreading = True
if os.environ.get("WN_DATA_PATH"):
    wn.config.data_directory = os.environ.get("WN_DATA_PATH")


def brew(query):
    result = []
    for ss in wn.synsets(query):

        hypernyms = set()
        for hypernym in ss.hypernyms():
            hypernyms.update(hypernym.lemmas())

        hyponyms = set()
        for hyponym in ss.hyponyms():
            hyponyms.update(hyponym.lemmas())

        similar = set()
        for w in ss.relations().get("similar") or []:
            similar.update(w.lemmas())

        weight = len(hyponyms) + len(similar)

        result.append(
            {
                "id": ss.id,
                "pos": ss.pos,
                "weight": weight,
                "definition": ss.definition(),
                "hypernyms": list(hypernyms),
                "hyponyms": list(hyponyms),
                "lemmas": ss.lemmas(),
                "similar": list(similar),
            }
        )

    # sort by amount of data and remove low weight results
    return list(
        filter(
            lambda d: d["weight"] > 1,
            sorted(result, key=lambda k: k["weight"], reverse=True),
        )
    )
