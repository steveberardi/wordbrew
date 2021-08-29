import wn

def brew(query):
    result = []
    for ss in wn.synsets(query):
        for w in ss.relations().get("similar") or []:
            result.extend(w.lemmas())

    return list(set(result))
