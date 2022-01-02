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


def reportar_1(eje_x, eje_y, col, filtro, pred):
    # print("entro a reportar_1")
    # ||||||||||||||    PANDAS  ||||||||||||||
    df = pd.read_csv('csv_file.csv')
    df = df.loc[df[col]==filtro,]
    x = np.asarray(df[eje_x]).reshape(-1,1)
    x_data = df[eje_x]
    y = df[eje_y]
    regr = linear_model.LinearRegression()
    regr.fit(x,y)
    # print("x\n")
    # print(type(x))
    # print(x)
    # print("y\n")
    # print(type(y))
    # print(y)    
    
    y_pred = regr.predict(x)
    # print("y_pred\n")
    # print(type(y_pred))
    # print(y_pred)
    plt.scatter(x, y, color='black')
    plt.plot(x, y_pred, color='blue', linewidth=3)
    # plt.show()
    pred = regr.predict([[pred]]) # Prediccion
    # Creating arr
    arr_data = []
    # print(len(x_data))
    # print(len(y))
    cont = 0
    # while cont < len(y):
    #     arr_data.insert(cont, {'x': x_data[cont], 'y': y[cont]})
    #     cont += 1
        
    x_json = json.dumps(x_data.tolist())
    y_json = json.dumps(y.tolist())
    pred_json =  json.dumps(pred.tolist())
    # print(x_json)
    # print(type(arr_data))
    
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
        # "arr_data": arr_data,
        # "y_pred": y_pred.tolist(),
        # "img64": str(s),
        "img64": img64_json,
        "pred": pred_json
        }
    # # print(ret)
    # ret_json = json.dumps(ret)
    # print(ret_json)
    # return ret_json
    # return "ret_json"
    # plt.show()
    return ret
    # ||||||||||||||    END PANDAS  ||||||||||||||