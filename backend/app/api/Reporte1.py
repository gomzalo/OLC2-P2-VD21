# from flask_restful import Api, Resource, reqparse, render_template, abort
from flask import Blueprint

reporte1 = Blueprint('reporte1', __name__)
# class reporte1(Resource):

@reporte1.route("/reporte1")
def get():
    return {
        'resultStatus': 'SUCCESS',
        'message': "SIIIIMMMM"
        }
