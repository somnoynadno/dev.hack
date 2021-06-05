import json
from flask import Flask, jsonify, request
import redis_client

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

# get json dict {"EUR":12.2, "RUB":3.1} and so on
# it means that you can by EUR using 12.2 gold pieces
@app.route('/init', methods=["POST"])
@cross_origin()
def init_currency_db():
    try:
        posted_json = request.get_json()
    except werkzeug.exceptions.BadRequest:
        raise ValueError("WHERE IS MY JSON?!")
    for key in posted_json:
        redis_client.set_currency_value_in_gold(key, posted_json[key])
    return "ok"

# url args:
# cur_code = currency code;
# value = how much currency you want to convert
@app.route('/convert_to_gold')
@cross_origin()
def convert_to_gold():
    cur_code = request.args.get('cur_code')
    cur_value = float(request.args.get('value'))
    return str(redis_client.convert_currency_to_gold(cur_code, cur_value))


# url args:
# cur_code = currency code;
# value = how much gold you want to convert
@app.route('/convert_from_gold')
@cross_origin()
def convert_from_gold():
    cur_code = request.args.get('cur_code')
    cur_value = float(request.args.get('value'))
    return str(redis_client.convert_gold_to_currency(cur_code, cur_value))

# url args:
# cur_code_from = currency code you convert from
# cur_code_to = currency code you convert to;
# value = how much currency in cur_code_from currency you want to convert
@app.route('/convert_currency_to_currency')
@cross_origin()
def convert_currency_to_currency():
    cur_code_from = request.args.get('cur_code_from')
    cur_code_to = request.args.get('cur_code_to')
    cur_value = float(request.args.get('value'))
    new_cur_value, comission = redis_client.convert_currency_to_currency(cur_code_from, cur_code_to, cur_value)
    return jsonify({"converted":new_cur_value, "comission":comission})

@app.route('/get_currency_dict')
@cross_origin()
def get_dict():
    return jsonify(redis_client.get_all_currency_prices())

@app.route('/get_currency_list')
@cross_origin()
def get_list():
    return jsonify(redis_client.get_keys())


if __name__ == "__main__":
    app.run(host="127.0.0.1", port="6666", debug=True)
