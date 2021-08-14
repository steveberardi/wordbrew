import wn

for ss in wn.synsets("fast"):
    synos = [w.lemma() for w in ss.words()]

    print(ss.definition())
    print(set(synos))

print("-" * 50)

for ss in wn.synsets("strong"):
    for w in ss.relations().get("similar") or []:
        print(w.lemmas())
