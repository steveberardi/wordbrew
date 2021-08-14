from flask import Flask, request

from wordbrew import brew

app = Flask(__name__)

@app.route("/", methods=["GET"])
def get_synonyms():
    query = request.args.get("query", "")
    result = brew(query)
    return {"result": result}




