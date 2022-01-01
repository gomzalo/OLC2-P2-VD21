from flask import render_template, jsonify, request, Flask
# from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin
from api.Reporte1 import reporte1
from api.FormatFile import get_file
# from fastai.text import *


app = Flask(__name__)
# app = Flask(__name__, static_url_path='', static_folder='../frontend/build')
CORS(app) # Comment on deploy
# api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.register_blueprint(reporte1)
app.register_blueprint(get_file)
# app.register_blueprint(sendf)

@app.route('/')
@cross_origin()
def test():
    # return render_template("index.html")
# @app.route("/", defaults={'path':''})
# def serve(path):
#     return send_from_directory(app.static_folder, 'index.html')
    return 'Servidor Flask corriendo en puerto 5000.'

# @app.route('/reporte1', methods=["POST", "GET"])
# def rep1():
#     # return api.add_resource(reporte1, '/reporte1')
#     return rep1
    
if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0')
    app.run(host='0.0.0.0')
#     # cors.init_app(app)
#     print("Up and running on ${host}:5000")