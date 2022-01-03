from flask import Blueprint, redirect, url_for, request, jsonify, Flask
from flask.json import jsonify
from flask_cors import CORS, cross_origin
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn import base, linear_model
import base64
import json
from ast import literal_eval
import csv
# Import reportes
from api.Reportes.Reporte1 import reportar_1
from api.Reportes.Reporte2 import reportar_2
from api.Reportes.Reporte7 import reportar_7

import numpy as np
import pandas as pd

set_params = Blueprint('set_params', __name__)

rep_dict = {
    1: "Tendencia de la infección por Covid-19 en un País.",
    2: "Predicción de Infectados en un País.",
    3: "Indice de Progresión de la pandemia.",
    4: "Predicción de mortalidad por COVID en un Departamento.",
    5: "Predicción de mortalidad por COVID en un País.",
    6: "Análisis del número de muertes por coronavirus en un País.",
    7: "Tendencia del número de infectados por día de un País.",
    8: "Predicción de casos de un país para un año.",
    9: "Tendencia de la vacunación de en un País.",
    10: "Ánalisis Comparativo de Vacunaciópn entre 2 paises.",
    11: "Porcentaje de hombres infectados por covid-19 en un País desde el primer caso activo.",
    12: "Ánalisis Comparativo entres 2 o más paises o continentes.",
    13: "Muertes promedio por casos confirmados y edad de covid 19 en un País.",
    14: "Muertes según regiones de un país - Covid 19.",
    15: "Tendencia de casos confirmados de Coronavirus en un departamento de un País.",
    16: "Porcentaje de muertes frente al total de casos en un país, región o continente.",
    17: "Tasa de comportamiento de casos activos en relación al número de muertes en un continente.",
    18: "Comportamiento y clasificación de personas infectadas por COVID-19 por municipio en un País.",
    19: "Predicción de muertes en el último día del primer año de infecciones en un país.",
    20: "Tasa de crecimiento de casos de COVID-19 en relación con nuevos casos diarios y tasa de muerte por COVID-19.",
    21: "Predicciones de casos y muertes en todo el mundo - Neural Network MLPRegressor.",
    22: "Tasa de mortalidad por coronavirus (COVID-19) en un país.",
    23: "Factores de muerte por COVID-19 en un país.",
    24: "Comparación entre el número de casos detectados y el número de pruebas de un país.",
    24: "Predicción de casos confirmados por día."
}

@set_params.route("/set_params", methods = ["POST", "GET"])
@cross_origin()
def post():
    if request.method == "POST":
        reporte_key = request.json['reporte']
        reporte = rep_dict[reporte_key]
        col = request.json['col']
        valor = request.json['valor']
        x = request.json['x']
        y = request.json['y']
        is_date = request.json['isDate']
        print("\nReporte: " + str(reporte_key) + " - " + reporte + "\nx: " + x + ", y: " + y + ", col: " + col + "\nvalor: " + valor + ", isDate: " + str(is_date) + '\n')
        if reporte_key == 1:
            res_r1 = reportar_1(x, y, col, valor, is_date)
            return{
                'resultStatus': 'SUCCESS',
                'message': "Reporte 1 generado correctamente",
                'data': res_r1
            }
        elif reporte_key == 2:
            pred = request.json['pred']
            print("pred: " + str(pred))
            res_r2 = reportar_2(x, y, col, valor, pred, is_date)
            return{
                'resultStatus': 'SUCCESS',
                'message': "Reporte 2 generado correctamente",
                'data': res_r2
            }
        elif reporte_key == 7:
            res_r7 = reportar_7(x, y, col, valor, is_date)
            return{
                'resultStatus': 'SUCCESS',
                'message': "Reporte 7 generado correctamente",
                'data': res_r7
            }
        # print(rep_dict)
        # print(type(rep_dict))
        return{
            'resultStatus': 'ERROR',
            'message': "Error"
        }