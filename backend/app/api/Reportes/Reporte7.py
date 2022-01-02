# from flask_restful import Api, Resource, reqparse, render_template, abort
from flask import Blueprint, redirect, url_for, request
from flask_cors import CORS, cross_origin
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn import linear_model
import json
from json import JSONEncoder
import io
import base64
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import mean_squared_error, r2_score


def reportar_7(eje_x, eje_y, col, filtro, pred):
    # print("entro a reportar_1")
    # ||||||||||||||    LINEAL  ||||||||||||||
    # Parametrizacion y filtrado
    df = pd.read_csv('csv_file.csv')
    df = df.loc[df[col]==filtro,]
    x = np.asarray(df[eje_x]).reshape(-1,1)
    # df[eje_x] = pd.DatetimeIndex(df[eje_x])
    x_data = df[eje_x]
    y = df[eje_y]
    pf = PolynomialFeatures(degree = 5)
    
    x_trans = pf.fit_transform(x)
    regr = linear_model.LinearRegression()
    regr.fit(x,y)
    prediccion = regr.predict([[pred]]) # Prediccion
    regr.fit(x_trans,y)
    # print("x\n")
    # print(type(x))
    # print(x)
    # print("y\n")
    # print(type(y))
    # print(y)    
    
    # ||||||||||||||    POLINOMIAL  ||||||||||||||
    y_pred = regr.predict(x_trans)
    rmse = np.sqrt(mean_squared_error(y, y_pred))
    r2 = r2_score(y, y_pred)
    # print("y_pred\n")
    # print(type(y_pred))
    # print(y_pred)
    plt.scatter(x, y, color='black')
    plt.plot(x, y_pred, color='blue', linewidth=3)
    # plt.show()
    
    # Preparando variables a devolver
    x_json = json.dumps(x_data.tolist())
    y_json = json.dumps(y.tolist())
    pred_json =  json.dumps(prediccion.tolist())

    # Generando imagen en B64
    s = io.BytesIO()
    figure = plt.gcf()
    figure.set_size_inches(8, 6)
    plt.savefig(s, format='png', bbox_inches="tight", dpi=100)
    plt.close()
    s = base64.b64encode(s.getvalue()).decode("utf-8").replace("\n", "")
    imgb64 = 'data:image/png;base64,%s' % s
    img64_json = json.dumps(imgb64)
    print(imgb64)
    ret = {
        "eje_x": x_json,
        "eje_y": y_json,
        "img64": img64_json,
        "pred": pred_json
        }
    return ret
    # ||||||||||||||    END PANDAS  ||||||||||||||