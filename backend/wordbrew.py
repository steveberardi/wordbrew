import os
import wn

wn.config.allow_multithreading = True
if os.environ.get("WN_DATA_PATH"):
    wn.config.data_directory = os.environ.get("WN_DATA_PATH")

def similar(query):
    result = []
    for ss in wn.synsets(query):
        for w in ss.relations().get("similar") or []:
            result.extend(w.lemmas())

    return list(set(result))

def brew(query):
    result = []
    for ss in wn.synsets(query):

        hypernyms = []
        for hypernym in ss.hypernyms():
            hypernyms.extend(hypernym.lemmas())

        hyponyms = []
        for hyponym in ss.hyponyms():
            hyponyms.extend(hyponym.lemmas())

        similar = []
        for w in ss.relations().get("similar") or []:
            similar.extend(w.lemmas())

        weight = len(hyponyms) + len(similar)

        result.append(
            {
                "id": ss.id,
                "pos": ss.pos,
                "weight": weight,
                "definition": ss.definition(),
                "hypernyms": hypernyms,
                "hyponyms": hyponyms,
                "lemmas": ss.lemmas(),
                "similar": similar,
            }
        )

    # sort by amount of data and remove low weight results
    return list(
        filter(lambda d: d['weight'] > 1,
            sorted(
                result,
                key=lambda k: k['weight'],
                reverse=True
            )
        )
    )
