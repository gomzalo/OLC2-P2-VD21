# **MANUAL TÉCNICO**

COVICHO es una herramienta muy util para el usuario que desea analizar, predecir e interpretar un conjunto de datos apoyandose de las distintas herramientas de ciencias de datos que ofrece el lenguaje de programación como Python.

## Servidor Flask
Se encarga de llevar a cabo los distintos analisis y predicciones que el usuario desea realizar.

- ### **SetParams**
  Uno de los metodos principales, encargado de parametrizar los modelos y mandar a llamar los metodos encargados de hacerlas predicciones y devolver los resultados al usuario.
    ```python
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
            
            # ** 1: "Tendencia de la infección por Covid-19 en un País."
            # :::::::::::::::::::  PARAMS REP 1    :::::::::::::::::::
            if reporte_key == 1:
                res_r1 = reportar_1(x, y, col, valor, is_date)
                return{
                    'resultStatus': 'SUCCESS',
                    'message': "Reporte 1 generado correctamente",
                    'data': res_r1
                }
            # ** 2: "Predicción de Infectados en un País."
            # :::::::::::::::::::  PARAMS REP 2    :::::::::::::::::::
            elif reporte_key == 2:
                pred = request.json['pred']
                print("pred: " + str(pred))
                res_r2 = reportar_2(x, y, col, valor, pred, is_date)
                return{
                    'resultStatus': 'SUCCESS',
                    'message': "Reporte 2 generado correctamente",
                    'data': res_r2
                }
            # ** 3: "Indice de Progresión de la pandemia."
            # :::::::::::::::::::  PARAMS REP 3    :::::::::::::::::::
            elif reporte_key == 3:
                # pred = request.json['pred']
                # print("pred: " + str(pred))
                res_r3 = reportar_3(x, y, col, valor, is_date)
                return{
                    'resultStatus': 'SUCCESS',
                    'message': "Reporte 3 generado correctamente",
                    'data': res_r3
                }
            # ** 4: "Predicción de mortalidad por COVID en un Departamento."
            # :::::::::::::::::::  PARAMS REP 4    :::::::::::::::::::
            .
            .
            .
            # Resto de reportes
    ```
- ### **FormatFile**
  
  Método encargado de recibir el archivo con los datos a analizar. Para mayor agilidad se escribe una copia del contenido en el servidor.
  ```python
  get_file = Blueprint('get_file', __name__)
  @get_file.route("/get_file", methods = ["POST", "GET"])
  @cross_origin()
  def post():
      if request.method == "POST":
          txt = request.form
          dict_txt = txt.to_dict(flat=False)
          key_views = dict_txt.keys()
          key_iter = iter(key_views)
          first_val = next(key_iter)
          content = json.dumps(first_val);
          jason = json.loads(content)
          arr = literal_eval(jason)
          for item in arr:
              # print(item)
              if item == [''] or item == [""]:
                  print("item vacio alv")
                  print(item)
                  arr.remove(item)
                  .
                  .
                  .
  ```
## Reportes
  Cada clase reporte contiene el codigo para cada reporte y analisis que requiera realizar la aplicación. Esta, a su vez, devuelve el response que interpretara el cliente.
  ```python
  # ******* 1: "Tendencia de la infección por Covid-19 en un País." *******
  def reportar_1(eje_x, eje_y, col, filtro, es_fecha):
      df = pd.read_csv('csv_file.csv')
      df = df.fillna(0)

      # Filtrado
      df = df.loc[df[col]==filtro,]
      # Parametrizando fecha
      if es_fecha:
          df[eje_x] = pd.DatetimeIndex(df[eje_x])
      # Parametrizando ejes
      x = np.asarray(df[eje_x]).reshape(-1,1)
      x_data = df[eje_x]
      y = df[eje_y]
      # ||||||||||||||    LINEAL  ||||||||||||||
      regr = linear_model.LinearRegression()
      # Entrenando el modelo lin
      regr.fit(x,y)
      .
      .
      .
  ```

### Herramientas <a name="herramientas"></a>

Entre las distintas herramientas utilizadas se encuentran:

- **Python:** Lenguaje de facil aprendizaje y bastante versital en cuanto al analisis de datos.
  - *Instalación*: Varia segun el sistema operativo.
- **Pandas:** Poderosa libreria, muy flexible y de facil uso, usada para analisis y manipulación de datos en Python.
  - *Instalación*:
  ```python
  pip install pandas
  ```
- **Scikit-Learn:** Herramienta simple y eficiente, para el analisis predictivo de datos. De gran utilidad y aplicación en distintos contextos, como Data Science y Machine Learning.
  - *Instalación*:
  ```python
  pip install scikit-learn
  ```
- **Reac-JS:** Framework utilizado para construir interfaz de forma rapida y que a su vez permiten un despliegue agil en la nebe.
  - *Creación de proyecto*:
  ```typescript
    npx create-react-app my-app
  ```