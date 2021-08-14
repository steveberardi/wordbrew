from flask import Flask, request, jsonify

from wordbrew import brew

app = Flask(__name__)

@app.route("/", methods=["GET"])
def get_synonyms():
    query = request.args.get("query", "")
    result = brew(query)
    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response




