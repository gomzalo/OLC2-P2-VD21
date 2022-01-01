# from flask_restful import Api, Resource, reqparse, render_template, abort
from flask import Blueprint, redirect, url_for, request
from flask_cors import CORS, cross_origin
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn import linear_model

reporte1 = Blueprint('reporte1', __name__)

@reporte1.route("/reporte1")
@cross_origin()
def get():
    return {
        'resultStatus': 'SUCCESS',
        'message': "SIIIIMMMM"
    }