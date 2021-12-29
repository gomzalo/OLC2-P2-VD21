from typing import DefaultDict
from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from api.reporte1 import reporte1

app = Flask(__name__, static_url_path='', static_folder='../frontend/build')
# CORS(app) # Comment on deploy
# api = Api(app)
@app.route('/')
def test():
    return 'siuuu'
# @app.route("/", defaults={'path':''})
# def serve(path):
#     return send_from_directory(app.static_folder, 'index.html')

# api.add_resource(reporte1, '/reporte1')
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
#     # cors.init_app(app)
#     print("Up and running on ${host}:5000")