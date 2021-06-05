import json
from flask import Flask, jsonify, request, send_from_directory
import docx_controller

app = Flask(__name__)

@app.route('/create_operation_status_doc', methods=["POST"])
def create_doc():
    try:
        posted_json = request.get_json()
    except werkzeug.exceptions.BadRequest:
        raise ValueError("WHERE IS MY JSON?!")
    filename = docx_controller.generate_random_filename()

    account_from = posted_json['account_from']
    account_to = posted_json['account_to']
    currency_code_from = posted_json['currency_code_from']
    #currency_to = posted_json['currency_to']

    currency_value = posted_json["currency_value"]
    status = posted_json["status"]

    docx_controller.create_operation_status_docx(account_from, account_to, currency_code_from, currency_value, status, filename)
    return filename

@app.route('/get_operation_status_doc')
def get_doc():
    filename = request.args.get('filename')
    return send_from_directory(docx_controller.UPLOAD_FOLDER, filename)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port="7777", debug=True)
