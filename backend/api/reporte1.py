from flask_restful import Api, Resource, reqparse

class reporte1(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "SIIIIMMMM"
            }
