from postgres_client import DatabaseClient
from flask import Flask, jsonify, request
from hashlib import sha256

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


@app.before_first_request
def before_request():
    with DatabaseClient() as db:
        db.create_table()


@app.route('/login', methods=["POST"])
@cross_origin()
def login():
    json = request.get_json()
    login = json['username']
    password = json['password']
    email = json['email']
    with DatabaseClient() as db:
        user = db.get_user(login)
    if not user:
        return jsonify(error='no such user'), 404
    id, account_type_id, login, email, password_hash = user
    if sha256(password.encode('utf-8')).hexdigest() != password_hash:
        return jsonify(error='unauthorized'), 401
    return jsonify(username=login, email=email, account_type_id=account_type_id), 200


@app.route('/register', methods=["POST"])
@cross_origin()
def register():
    json = request.get_json()
    account_type_id = json['account_type_id']
    login = json['username']
    password = json['password']
    email = json['email']
    with DatabaseClient() as db:
        db.create_user(account_type_id, login, email,
                       sha256(password.encode('utf-8')).hexdigest())
    return jsonify(status='ok'), 201


if __name__ == "__main__":
    app.run(host="127.0.0.1", port="6666", debug=True)
