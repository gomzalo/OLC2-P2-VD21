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


# ******* 12: "Ánalisis Comparativo entres 2 o más paises o continentes." *******
def reportar_12(eje_x, eje_y, col, filtro, filtro2, filtro3, es_fecha):
    # print("entro a reportar_2")
    # Lectura del archivo
    df0 = pd.read_csv('csv_file.csv')
    df0 = df0.fillna(0)
    # Filtrado
    df = df0.loc[df0[col]==filtro,]
    df2 = df0.loc[df0[col]==filtro2,]
    if filtro != "0":
        df3 = df0.loc[df0[col]==filtro3,]
        if es_fecha:
            df3[eje_x] = pd.DatetimeIndex(df3[eje_x])
    # Parametrizando fecha
    if es_fecha:
        df[eje_x] = pd.DatetimeIndex(df[eje_x])
        df2[eje_x] = pd.DatetimeIndex(df2[eje_x])
    # Parametrizando ejes
    x = np.asarray(df[eje_x]).reshape(-1,1)
    x_data = df[eje_x]
    y = df[eje_y]
    # ||||||||||||||    LINEAL  ||||||||||||||
    regr = linear_model.LinearRegression()
    # Entrenando el modelo lin
    regr.fit(x,y)
    # Realizando predicicion lin
    # prediccion = regr.predict([[pred]]) # Prediccion
    
    # print("x\n")
    # print(type(x))
    # print(x)
    # print("y\n")
    # print(type(y))
    # print(y)    
    
    # ||||||||||||||    POLINOMIAL  ||||||||||||||
    # Indicando el grado de la distribucion polinomial
    pf = PolynomialFeatures(degree = 5)
    x_trans = pf.fit_transform(x)
    # Entrenando el modelo pol
    regr.fit(x_trans,y)
    # Realizando predicicion pol
    y_pred = regr.predict(x_trans)
    # rmse y r2
    rmse = np.sqrt(mean_squared_error(y, y_pred))
    r2 = r2_score(y, y_pred)
    # print("y_pred\n")
    # print(type(y_pred))
    # print(y_pred)
    # -------   Parametrizando ejes df2   -------
    x2 = np.asarray(df2[eje_x]).reshape(-1,1)
    x2_data = df2[eje_x]
    y2 = df2[eje_y]
    # ||||||||||||||    LINEAL  ||||||||||||||
    regr.fit(x2,y2)
    # ||||||||||||||    POLINOMIAL  ||||||||||||||
    # Indicando el grado de la distribucion polinomial
    pf = PolynomialFeatures(degree = 5)
    x2_trans = pf.fit_transform(x2)
    # Entrenando el modelo pol
    regr.fit(x2_trans,y2)
    # Realizando predicicion pol
    y2_pred = regr.predict(x2_trans)
    # rmse y r2
    rmse2 = np.sqrt(mean_squared_error(y2, y2_pred))
    r22 = r2_score(y2, y2_pred)
    # ****  GRAFICA  **** 
    plt.scatter(x, y, color='black')
    
    plt.xlabel(eje_x)
    plt.ylabel(eje_y)
    plt.plot(x, y_pred, color='blue', linewidth=3)
    # plt.show()
    # ****  GRAFICA 2 **** 
    plt.scatter(x2, y2, color='orange')
    plt.plot(x2, y2_pred, color='gray', linewidth=3)
    plt.title("Predicción de Infectados en " + str(filtro) + " vs " + str(filtro2))
        # -------   Parametrizando ejes df3   -------
    if filtro != "0":
        x3 = np.asarray(df3[eje_x]).reshape(-1,1)
        x3_data = df3[eje_x]
        y3 = df3[eje_y]
        # ||||||||||||||    LINEAL  ||||||||||||||
        regr.fit(x3,y3)
        # ||||||||||||||    POLINOMIAL  ||||||||||||||
        # Indicando el grado de la distribucion polinomial
        pf = PolynomialFeatures(degree = 5)
        x3_trans = pf.fit_transform(x3)
        # Entrenando el modelo pol
        regr.fit(x3_trans,y3)
        # Realizando predicicion pol
        y3_pred = regr.predict(x3_trans)
        # rmse y r2
        rmse23 = np.sqrt(mean_squared_error(y3, y3_pred))
        r23 = r2_score(y3, y3_pred)
        # ****  GRAFICA 3 **** 
        plt.scatter(x3, y3, color='green')
        plt.plot(x3, y3_pred, color='red', linewidth=3)
        plt.title("Predicción de Infectados en " + str(filtro) + " vs " + str(filtro2) + " vs " + str(filtro3))
    # Preparando variables a devolver en peticion
    if es_fecha:
        print("FECHA")
        # x_data = df[eje_x].astype(str)
        x_json = json.dumps(x.tolist())
    else:
        x_json = json.dumps(x_data.tolist())
    y_json = json.dumps(y.tolist())
    # pred_json =  json.dumps(prediccion.tolist())
    # print(x_json)
    rmse_json = json.dumps(rmse.tolist())
    coeficiente = regr.coef_
    coef_json = json.dumps(coeficiente.tolist())
    
    # Generando imagen en B64
    s = io.BytesIO()
    figure = plt.gcf()
    figure.set_size_inches(8, 6)
    plt.savefig(s, format='png', bbox_inches="tight", dpi=100)
    plt.close()
    s = base64.b64encode(s.getvalue()).decode("utf-8").replace("\n", "")
    imgb64 = 'data:image/png;base64,%s' % s
    img64_json = json.dumps(imgb64)
    # print(imgb64)
    # pred = {
    #     rmse2:
    # }
    # JSON response
    ret = {
        "eje_x": x_json,
        "eje_y": y_json,
        # "arr_data": arr_data,
        # "y_pred": y_pred.tolist(),
        # "img64": str(s),
        "img64": img64_json,
        "pred": 0,
        "rmse": rmse_json,
        "r2": r2,
        "coef": coef_json
        }
    # # print(ret)
    # ret_json = json.dumps(ret)
    # print(ret_json)
    # return ret_json
    # return "ret_json"
    # plt.show()
    return ret