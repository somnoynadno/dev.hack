import json
from flask import Flask, jsonify, request, send_from_directory
import docx_controller

from flask_cors import CORS
from flask_cors import cross_origin

from kafka_daemon import runner

app = Flask(__name__)
cors = CORS(app)


from prometheus_client import make_wsgi_app
from werkzeug.middleware.dispatcher import DispatcherMiddleware

# Add prometheus wsgi middleware to route /metrics requests
app.wsgi_app = DispatcherMiddleware(app.wsgi_app, {
    '/metrics': make_wsgi_app()
})


@app.route('/get_operation_status_doc')
@cross_origin()
def get_doc():
    filename = request.args.get('filename')
    return send_from_directory(docx_controller.UPLOAD_FOLDER, filename)

if __name__ == "__main__":
    import threading

    class KafkaCollector(object):
        def __init__(self):
            thread = threading.Thread(target=self.run, args=())
            thread.daemon = True                            # Daemonize thread
            thread.start()                                  # Start the execution

        def run(self):
            runner()

    daemon = KafkaCollector()
    app.run(host="0.0.0.0", port="7777", debug=True)
