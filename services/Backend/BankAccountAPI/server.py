from flask import Flask, jsonify, request

from flask_cors import CORS
from flask_cors import cross_origin

app = Flask(__name__)
cors = CORS(app)


from prometheus_client import make_wsgi_app
from werkzeug.middleware.dispatcher import DispatcherMiddleware

# Add prometheus wsgi middleware to route /metrics requests
app.wsgi_app = DispatcherMiddleware(app.wsgi_app, {
    '/metrics': make_wsgi_app()
})

admin = {"account_id":"ADMIN_ACCOUNT","bank_account_type_id":0,"balance":0,"currency_name":"EUR"}
user = {"account_id":"USER_ACCOUNT","bank_account_type_id":0,"balance":100,"currency_name":"EUR"}

@app.route('/get_account', methods=["GET"])
@cross_origin()
def find_account():
    acc_id = request.args.get('account_id')
    if acc_id == "ADMIN_ACCOUNT":
        return jsonify(admin)
    if acc_id == "USER_ACCOUNT":
        return jsonify(user)
    return "doesn't exists"


@app.route('/add_money', methods=["POST"])
@cross_origin()
def add_money():
    id = request.args.get('id')
    delta = int(request.args.get('delta'))
    if acc_id == "ADMIN_ACCOUNT":
        admin["balance"] += delta
    if acc_id == "USER_ACCOUNT":
        user["balance"] += delta
    return "ok"


if __name__ == "__main__":
    app.run(host="127.0.0.1", port="6666", debug=True)
