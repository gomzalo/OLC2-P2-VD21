/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { React, useState } from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// import axios from 'axios';
import font from 'assets/fonts/times.ttf'
import font_bold from 'assets/fonts/times-bold.ttf'
import font_italic from 'assets/fonts/times-italic.ttf'
// reactstrap components
import {
  // Button,
  // ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// PDF generator
import { 
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  ReactPDF,
  Image,
  Font,
} from '@react-pdf/renderer';

// Create styles

function Dashboard(props) {
  const [prediccion, setPrediccion] = useState(0);
  var reporte_arr = [
    {index: 1, reporte: "Tendencia de la infección por COVID-19 en un país."},
    {index: 2, reporte: "Predicción de infectados en un país."},
    {index: 3, reporte: "Índice de progresión de la pandemia."},
    {index: 4, reporte: "Predicción de mortalidad por COVID en un departamento."},
    {index: 5, reporte: "Predicción de mortalidad por COVID en un país."},
    {index: 6, reporte: "Análisis del número de muertes por coronavirus en un país."},
    {index: 7, reporte: "Tendencia del número de infectados por día de un país."},
    {index: 8, reporte: "Predicción de casos de un país para un año."},
    {index: 9, reporte: "Tendencia de la vacunación en un país."},
    {index: 10, reporte: "Ánalisis comparativo de vacunación entre 2 paises."},
    {index: 11, reporte: "Porcentaje de hombres infectados por COVID-19 en un país desde el primer caso activo."},
    {index: 12, reporte: "Ánalisis comparativo entre 2 o más paises o continentes."},
    {index: 13, reporte: "Muertes promedio por casos confirmados y edad de COVID-19 en un país."},
    {index: 14, reporte: "Muertes según regiones de un país por COVID-19."},
    {index: 15, reporte: "Tendencia de casos confirmados de coronavirus en un departamento de un país."},
    {index: 16, reporte: "Porcentaje de muertes frente al total de casos en un país, región o continente."},
    {index: 17, reporte: "Tasa de comportamiento de casos activos en relación al número de muertes en un continente."},
    {index: 18, reporte: "Comportamiento y clasificación de personas infectadas por COVID-19 por municipio en un país."},
    {index: 19, reporte: "Predicción de muertes en el último día del primer año de infecciones en un país."},
    {index: 20, reporte: "Tasa de crecimiento de casos de COVID-19 en relación con nuevos casos diarios y tasa de muerte por COVID-19."},
    {index: 21, reporte: "Predicciones de casos y muertes en todo el mundo - Neural Network MLPRegressor."},
    {index: 22, reporte: "Tasa de mortalidad por coronavirus (COVID-19) en un país."},
    {index: 23, reporte: "Factores de muerte por COVID-19 en un país."},
    {index: 24, reporte: "Comparación entre el número de casos detectados y el número de pruebas de un país."},
    {index: 25, reporte: "Predicción de casos confirmados por día."}
  ];
  let reporte_map = new Map();
  
  const headers = localStorage.getItem("headers");
  const reporte_activo_key = localStorage.getItem("reporte_activo");
  const datos_grafica = localStorage.getItem("datos_grafica");
  const params_grafica = localStorage.getItem("params_grafica");
  const datos_rep = localStorage.getItem("datos_rep");
  let params_data_json = JSON.parse(params_grafica);
  let res_pred = JSON.parse(datos_grafica);
  let datos_rep_json = JSON.parse(datos_rep);
  console.log(res_pred);
  /**
  *   const params_data = {
        reporte: reporte,
        col: col,
        valor: valor,
        x: x,
        isDate: isDate,
        y: y,
        pred: pred
      }
   */
  console.log(params_data_json);
  let param_col;
  let param_x;
  let param_y;
  let param_pred;
  let param_filtro;
  param_col = params_data_json.col;
  param_x = params_data_json.x;
  param_y = params_data_json.y;
  param_pred = params_data_json.pred;
  param_filtro = params_data_json.valor;
  /*
  ::::::  datos_grafica   ::::::
    data:
      eje_x,
      eje_y,
      pred,
      resultado,
      rmse,
      r2,
  */
  const eje_x = JSON.parse(res_pred.data.eje_x);
  const eje_y = JSON.parse(res_pred.data.eje_y);
  const prediccao = JSON.parse(res_pred.data.pred);
  const img64 = JSON.parse(res_pred.data.img64);
  // const resultado = res_pred.data.resultado;
  const rmse = JSON.parse(res_pred.data.rmse);
  const r2 = JSON.parse(res_pred.data.r2);
  const coef = JSON.parse(res_pred.data.coef);
  /*
  ::::::  datos_reporte   ::::::
      dis,
      conc,
  */
  const diseno = datos_rep_json.diseno;
  const conclusion = datos_rep_json.conclusion;
  // console.log(img64);
  // const data_arr = res_pred.data.arr_data;
  let data_arr = [];
  for (let i = 0; i < eje_x.length; i++) {
    data_arr.push({'x': eje_x[i], 'y': eje_y[i]})
  }
  // console.log("data_arr");
  // console.log(data_arr);
  let reporte_activo = "";
  reporte_arr.forEach(element => {
    reporte_map.set(element.index, element.reporte);
    if(reporte_activo_key == element.index){
      reporte_activo = element.reporte;
    }
  });
  console.log(reporte_activo);
  // :::::::::::::::::::::::::  PDF  :::::::::::::::::::::::::
  // Registro de fuentes
  Font.register({family: 'Times New Roman', format: "truetype", src: font })
  Font.register({family: 'Times New Roman Bold', format: "truetype", src: font_bold })
  Font.register({family: 'Times New Roman Italic', format: "truetype", src: font_italic })
  // Create styles
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Times New Roman',
      // flex: 1,
      // flexDirection: 'row',
      // flexWrap: 'wrap',
      padding: 10,
      backgroundColor: '#FFFF'
    },
    title: {
      display: 'block',
      fontSize: 30,
      textAlign: 'center',
      marginTop: 1,
      marginBottom: 1,
      marginLeft: 0,
      marginRight: 0,
      padding: 10,
    },
    subtitle: {
      display: 'block',
      fontSize: 13,
      textAlign: 'center',
      marginTop: 1,
      marginBottom: 1,
      marginLeft: 0,
      marginRight: 0,
      padding: 10,
    },
    h2: {
      display: 'block',
      fontSize: 20,
      textAlign: 'center',
      marginTop: 1,
      marginBottom: 1,
      marginLeft: 0,
      marginRight: 0,
      padding: 10,
    },
    h3: {
      display: 'block',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 1,
      marginBottom: 1,
      marginLeft: 0,
      marginRight: 0,
      padding: 10,
    },
    h4: {
      // display: 'block',
      fontSize: 13,
      textAlign: 'center',
      marginTop: 0.5,
      marginBottom: 0.5,
      marginLeft: 0,
      marginRight: 0,
      padding: 1,
    },
    abs: {
      // display: 'block',
      fontFamily: 'Times New Roman Bold',
      fontSize: 10,
      textAlign: 'justify',
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      padding: 1,
    },
    italic: {
      // display: 'block',
      fontFamily: 'Times New Roman Italic',
      fontSize: 9,
      textAlign: 'left',
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      padding: 1,
    },
    footer: {
      fontSize: 8,
      textAlign: 'left'
    },
    texto: {
      display: 'block',
      fontSize: 11,
      flex: 0,
      marginTop: 1,
      marginBottom: 1,
      marginLeft: 0,
      marginRight: 0,
      padding: 15,
      // flexDirection: 'row',
      flexWrap: 'wrap',
      textAlign: 'justify'
    },
    section: {
      margin: 25,
      padding: 30,
      flexGrow: 1
    },
    col: {
      margin: 15,
      padding: 10,
      // width: '50%',
      flexGrow: 1
    },
    row: {
      margin: 20,
      padding: 10,
      // width: '50%',
      flex: 1,
      flexDirection: 'row',
      flexGrow: 1
    },
    left: {
      // width: '50%',// <- working alternative
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 200,
      },
    right: {
      padding: 25,
      // width: "50%", // <- working alternative
      flexShrink: 1,
      flexGrow: 2,
      },
  });

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page wrap size="A4" style={styles.page}>
        <Text style={styles.title}>
          {reporte_activo}
        </Text>
        <Text style={styles.h4}>Universidad de San Carlos de Guatemala</Text>
        <Text style={styles.h4}>Facultad de Ingenieria, Escuela de Ciencias y Sistemas</Text>
        <Text style={styles.h4}>Laboratorio de Organización de Lenguajes y Compiladores 2</Text>
        <Text style={styles.h4}>201318652 - Gonzalo Antonio García Solares</Text>
        <View style={[styles.row, {height: 700}]}>
          <View style={styles.left}>
            <Text style={styles.abs}>
              Abstract - Desde diciembre de 2019, la pandemia del virus (SARS-CoV-2)
              y la enfermedad (COVID-19) ha estado causando estragos a nivel mundial,
              afectando fuertemente la salud y economía.
            </Text>
            <Text style={styles.abs}>
              Desde inicios de esta, se ha estado utilizando la IA para analizar su
              comportamiento y propagación. Además, los cientificos se han apoyado de estas
              herramientas para predecir y tratar de tomar mejores decisiones
            </Text>
            <Text style={styles.title}>
            </Text>
            <Text style={styles.h4}>
              I.  Objetivos
            </Text>
            <Text style={styles.h4}>
            </Text>
            <Text style={styles.italic}>
              I-A.  Generales
            </Text>
            <Text style={styles.h4}>
            </Text>
            <Text style={styles.texto}>
              • Utilizar Scikit-Learn para el análisis de datos.
            </Text>
            <Text style={styles.texto}>
              • Permitir que el usuario generar graficas y predicciones.
            </Text>
            <Text style={styles.title}>
            </Text>
            <Text style={styles.h4}>
              II.  Marco teórico
            </Text>
            <Text style={styles.h4}>
            </Text>
            <Text style={styles.h4}>
            </Text>
            <Text style={styles.italic}>
              II-A.  Regresión lineal
            </Text>
            <Text style={styles.h4}>
            </Text>
            <Text style={styles.texto}>
              En estadística, la regresión lineal o ajuste lineal es un modelo matemático 
              usado para aproximar la relación de dependencia entre una variable dependiente 
              Y, m variables independientes Xi con m e Z y un término aleatorio epsilon.
              Este modelo puede ser expresado como:
            </Text>
            <Text style={styles.title}>
            </Text>
            <Text style={styles.title}>
            </Text>
            <Text style={styles.title}>
            </Text>
            <Text style={styles.title}>
            </Text>
            <Text style={styles.texto}>
              Y = Bo + B1X1 + ... + BmXm + epsilon.
            </Text>
            <Text style={styles.title}>
            </Text>
            <Text style={styles.italic}>
              II-B.  Regresión polinomial
            </Text>
            <Text style={styles.texto}>
              La Regresión Polinomial es un caso especial de la Regresión Lineal, 
              extiende el modelo lineal al agregar predictores adicionales, 
              obtenidos al elevar cada uno de los predictores originales a una potencia.
              Por ejemplo, una regresión cúbica utiliza tres variables, como predictores. 
              Este enfoque proporciona una forma sencilla de proporcionar un ajuste no lineal a los datos.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.texto}>
                El método estándar para extender la Regresión Lineal a una relación no 
                lineal entre las variables dependientes e independientes, ha sido reemplazar 
                el modelo lineal con una función polinomial.
              </Text>
              <Text style={styles.title}>
              </Text>
              <Text style={styles.title}>
              </Text>
              <Text style={styles.title}>
              </Text>
              <Text style={styles.texto}>
                Y = Bo + B1X1 + B2X^2 + B3X^3 ... + BmXm + epsilon.
              </Text>
              <Text style={styles.title}>
              </Text>
              <Text style={styles.h4}>
                III.  Diseño experimental
              </Text>
              <Text style={styles.h4}>
              </Text>
              <Text style={styles.texto}>
                {diseno}
              </Text>
              <Text style={styles.h4}>
              </Text>
              <Text style={styles.title}>
              </Text>
              <Text style={styles.title}>
              </Text>
              <Text style={styles.title}>
              </Text>
              <Text style={styles.abs}>
                • Variable independiente (X):
              </Text>
              <Text style={styles.texto}>
                {ejexL}
              </Text>
              <Text style={styles.h4}>
              </Text>
              <Text style={styles.abs}>
                • Variable dependiente (Y):
              </Text>
              <Text style={styles.texto}>
                {ejeyL}
              </Text>
              <Text style={styles.h4}>
              </Text>
              <Text style={styles.title}>
              </Text>
              <Text style={styles.h4}>
                IV.  Resultados
              </Text>
              <Text style={styles.h4}>
              </Text>
              <Text style={styles.abs}>
                • Error:
              </Text>
              <Text style={styles.texto}>
                {rmse}
              </Text>
              <Text style={styles.h4}>
              </Text>
              <Text style={styles.abs}>
                • R2:
              </Text>
              <Text style={styles.texto}>
                {r2}
              </Text>
              <Text style={styles.h4}>
              </Text>
              <Text style={styles.title}>
              </Text>
            </View>
            <View style={styles.right}>
            </View>
          </View>
        </View>
      </Page>
      <Page wrap size="A4" style={styles.page}>
        <View style={[styles.row, {height: 700}]}>
        <View style={styles.left}>
          <Text style={styles.h4}>
          </Text>
          <Text style={styles.abs}>
            • Coeficientes:
          </Text>
          <Text style={styles.texto}>
            {coef}
          </Text>
          <Text style={styles.h4}>
          </Text>
          <Text style={styles.title}>
          </Text>
          <Text style={styles.title}>
          </Text>
          <Text style={styles.title}>
          </Text>
          <Text style={styles.title}>
          </Text>
          <Text style={styles.h4}>
            V.  Conclusiones
          </Text>
          <Text style={styles.h4}>
          </Text>
          <Text style={styles.texto}>
            {conclusion}
          </Text>
          <Text style={styles.title}>
          </Text>
          <Text style={styles.title}>
          </Text>
          <Text style={styles.title}>
          </Text>
          <Text style={styles.h4}>
          </Text>
          <Image
            src={img64}
            fixed={true}
          ></Image>
          <Text style={styles.footer}>Figura I</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
  // ReactPDF.renderToStream(<MyDocument />);
  // :::::::::::::::::::::::::    Grafica   :::::::::::::::::::::::::
  // Legendas de ejes
  let ejexL = '';
  let ejeyL = '';
  if(params_grafica !== null){
    ejexL = param_x;
    ejeyL = param_y;
  }else{
    ejexL = 'Eje X';
    ejeyL = 'Eje Y';
  }
  const grafiquinha = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
      gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
      gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors
  
      return {
        // labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
        labels: eje_x,
        datasets: [
          {
            label: ejeyL,
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#00d6b4",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#00d6b4",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#00d6b4",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            // data: [90, 27, 60, 12, 80],
            data: data_arr,
          },
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
  
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: ejeyL
            },
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
  
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: ejexL
            },
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(0,242,195,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
      },
    },
  };
  
  // var image = grafiquinha.data.toDataURL("image/png");
  // console.log(image)
  return (
    <>
      <div className="content">
        <div>{reporte_activo !== null ? 
          <h1>{reporte_activo}</h1>
          :
          <h1>Reporte activo</h1>
        }</div>
        <Row>
          <Col lg="5" md='20'>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Resultado</h5>
                  {
                    params_grafica !== null ?
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-bell-55 text-info" /> 
                      {param_filtro}
                    </CardTitle>
                    :
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-bell-55 text-info" /> 
                      Gráfica
                    </CardTitle>
                  }
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={grafiquinha.data}
                    options={grafiquinha.options}
                  />
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Predicción</CardTitle>
              </CardHeader>
              <CardBody>
              <div>{res_pred !== null ? 
                <h1>{prediccao}</h1>
                :
                <h1>Resultado prediccion</h1>
              }</div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h1 className="card-category">Reporte</h1>
                <CardTitle tag="h3">
                <PDFViewer
                  height='700'
                  width='750'
                >
                  <MyDocument 
                  />
                </PDFViewer>
                </CardTitle>
              </CardHeader>
              <CardBody>
                {/* PDF */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          
        </Row> */}
      </div>
    </>
  );
}

export default Dashboard;
