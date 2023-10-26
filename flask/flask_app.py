from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
import json
import os


global app
app = Flask(__name__, static_folder='../react/heba-festival/build/', static_url_path='/')
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)
CORS(app)

global sio
sio = SocketIO(app)

