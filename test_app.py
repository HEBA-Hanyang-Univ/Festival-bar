from flask import Flask, render_template
from flask_socketio import SocketIO, send
import requests
import os

### Flask setup
app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

# SocketIO setup
socket_io = SocketIO(app)

@app.route("/")
def index():
    return render_template('index.html')

@socket_io.on("message")
def test_request(message):
    print('message : ' + message)
    to_client = dict()
    if message == 'new_connect':
        to_client['message'] = "New user"
        to_client['type'] = 'connect'
    else :
        to_client['message'] = message
        to_client['type'] = 'normal'
    send(to_client, broadcast=True)

if __name__ == "__main__":
    socket_io.run(app, host='0.0.0.0', port=5000)
