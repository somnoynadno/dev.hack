from postgres_client import DatabaseClient
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from prometheus_client import make_wsgi_app
from flask import Flask, jsonify, request

from flask_cors import CORS
from flask_cors import cross_origin

from kafka_daemon import runner

app = Flask(__name__)
cors = CORS(app)


# Add prometheus wsgi middleware to route /metrics requests
app.wsgi_app = DispatcherMiddleware(app.wsgi_app, {
    '/metrics': make_wsgi_app()
})


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
    a = {}
    a["id"] = account[0]
    a["account_id"] = account[1]
    a["balance"] = float(account[2])
    a["type_id"] = account[3]
    a["currency_name"] = account[4]
    return jsonify(a)


@app.route('/bank_accounts', methods=["GET"])
@cross_origin()
def bank_accounts():
    id = int(request.args.get('id'))
    with DatabaseClient() as db:
        accounts = db.get_accounts_by_parent_id(id)
    if not accounts:
        return jsonify(error='no bank accounts for this account'), 404
    res = []
    for account in accounts:
        a = {}
        a["id"] = account[0]
        a["account_id"] = account[1]
        a["balance"] = float(account[2])
        a["type_id"] = account[3]
        a["currency_name"] = account[4]
        res.append(a)
    return jsonify(res)


@app.route('/add_money', methods=["POST"])
@cross_origin()
def add_money():
    id = int(request.args.get('id'))
    delta = int(request.args.get('delta'))
    with DatabaseClient() as db:
        db.update_balance(delta, id)
    return jsonify(status='ok')


if __name__ == "__main__":
    class KafkaCollector(object):
        def __init__(self):
            thread = threading.Thread(target=self.run, args=())
            thread.daemon = True                            # Daemonize thread
            thread.start()                                  # Start the execution

        def run(self):
            runner()

    daemon = KafkaCollector()
    app.run(host="0.0.0.0", port="6666", debug=True)
