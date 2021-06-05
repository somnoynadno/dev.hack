from postgres_client import DatabaseClient
from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/new_account', methods=["POST"])
def new_account():
    json = request.get_json()
    account_id = json['account_id']
    type_id = json['bank_account_type_id']
    currency_name = json['currency_name']
    with DatabaseClient() as db:
        db.create_account(account_id, type_id, currency_name)
    return jsonify(status='ok'), 201


@app.route('/find_account', methods=["GET"])
def find_account():
    id = int(request.args.get('id'))
    with DatabaseClient() as db:
        account = db.get_account(id)
    if not account:
        return jsonify(error='no such account'), 404
    return jsonify(account)


@app.route('/bank_accounts', methods=["GET"])
def bank_accounts():
    id = int(request.args.get('id'))
    with DatabaseClient() as db:
        accounts = db.get_accounts_by_parent_id(id)
    if not accounts:
        return jsonify(error='no bank accounts for this account'), 404
    return jsonify(accounts)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port="6666", debug=True)
