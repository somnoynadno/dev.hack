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

@app.before_first_request
def before_request():
    with DatabaseClient() as db:
        db.create_table()


@app.route('/new_account', methods=["POST"])
@cross_origin()
def new_account():
    json = request.get_json()
    account_id = json['account_id']
    type_id = json['bank_account_type_id']
    currency_name = json['currency_name']
    with DatabaseClient() as db:
        db.create_account(account_id, type_id, currency_name)
    return jsonify(status='ok'), 201


@app.route('/find_account', methods=["GET"])
@cross_origin()
def find_account():
    id = int(request.args.get('id'))
    with DatabaseClient() as db:
        account = db.get_account(id)
    if not account:
        return jsonify(error='no such account'), 404
    account = list(account)
    account[2] = float(account[2])
    return jsonify(account)


@app.route('/add_money', methods=["POST"])
@cross_origin()
def bank_accounts():
    id = int(request.args.get('id'))
    with DatabaseClient() as db:
        accounts = db.get_accounts_by_parent_id(id)
    if not accounts:
        return jsonify(error='no bank accounts for this account'), 404
    res = []
    for account in accounts:
        account = list(account)
        account[2] = float(account[2])
        res.append(account)
    return jsonify(res)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port="6666", debug=True)
