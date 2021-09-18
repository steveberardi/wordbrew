import pathlib

import wn

wn.config.allow_multithreading = True
#wn.config.data_directory = pathlib.Path(__file__).parent.resolve()

def brew(query):
    result = []
    for ss in wn.synsets(query):
        for w in ss.relations().get("similar") or []:
            result.extend(w.lemmas())

    return list(set(result))
