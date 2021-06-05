from services.Backend.AccountAPI.postgres_client import DatabaseClient
from flask import Flask, jsonify, request
from hashlib import sha256

app = Flask(__name__)


@app.route('/login', methods=["POST"])
def login():
    json = request.get_json()
    login = json['username']
    password = json['password']
    email = json['email']
    with DatabaseClient() as db:
        user = db.get_user(login)
    if not user:
        return jsonify(error='no such user'), 404
    if sha256(password) != user['password_hash']:
        return jsonify(error='unauthorized'), 401
    return jsonify(username=user['login'], email=user['email'], account_type_id=user['account_type_id']), 200


@app.route('/register', methods=["POST"])
def register():
    json = request.get_json()
    account_type_id = json['account_type_id']
    login = json['username']
    password = json['password']
    email = json['email']
    with DatabaseClient() as db:
        db.create_user(account_type_id, login, email, sha256(password))
    return jsonify(status='ok'), 201


if __name__ == "__main__":
    app.run(host="127.0.0.1", port="6666", debug=True)
