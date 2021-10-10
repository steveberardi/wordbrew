from flask import Flask, request, jsonify

from wordbrew import brew

app = Flask(__name__)


@app.route("/", methods=["GET"])
def brew_query():
    query = request.args.get("query", "")
    result = brew(query)
    response = jsonify({"result": result})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run()
