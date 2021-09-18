"""
import wn

for ss in wn.synsets("fast"):
    synos = [w.lemma() for w in ss.words()]

    print(f"{ss.pos} - {ss.definition()}")
    print(set(synos))

print("-" * 50)

for ss in wn.synsets("strong"):
    for w in ss.relations().get("similar") or []:
        print(w.lemmas())

print("-" * 50)

others = []
word = "small"

w = wn.words(form=word)[0]

for sense in w.senses():
    #print(wn.synset(sense.synset().id))
    for s in wn.synset(sense.synset().id).words():
        others.append(s.lemma())

print(set(others))
"""