import json
from flask import Flask, jsonify, request, send_from_directory
import docx_controller

app = Flask(__name__)

@app.route('/get_operation_status_doc')
def get_doc():
    filename = request.args.get('filename')
    return send_from_directory(docx_controller.UPLOAD_FOLDER, filename)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port="7777", debug=True)
