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
import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
// import axios from 'axios';
import font from 'assets/fonts/times.ttf'
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
  var reporte_arr = [{index: 1, reporte: "Tendencia de la infección por Covid-19 en un País."},
  {index: 2, reporte: "Predicción de Infertados en un País."},
  {index: 3, reporte: "Indice de Progresión de la pandemia."},
  {index: 4, reporte: "Predicción de mortalidad por COVID en un Departamento."},
  {index: 5, reporte: "Predicción de mortalidad por COVID en un País."},
  {index: 6, reporte: "Análisis del número de muertes por coronavirus en un País."},
  {index: 7, reporte: "Tendencia del número de infectados por día de un País."},
  {index: 8, reporte: "Predicción de casos de un país para un año."},
  {index: 9, reporte: "Tendencia de la vacunación de en un País."},
  {index: 10, reporte: "Ánalisis Comparativo de Vacunaciópn entre 2 paises."},
  {index: 11, reporte: "Porcentaje de hombres infectados por covid-19 en un País desde el primer caso activo."},
  {index: 12, reporte: "Ánalisis Comparativo entres 2 o más paises o continentes."},
  {index: 13, reporte: "Muertes promedio por casos confirmados y edad de covid 19 en un País."},
  {index: 14, reporte: "Muertes según regiones de un país - Covid 19."},
  {index: 15, reporte: "Tendencia de casos confirmados de Coronavirus en un departamento de un País."},
  {index: 16, reporte: "Porcentaje de muertes frente al total de casos en un país, región o continente."},
  {index: 17, reporte: "Tasa de comportamiento de casos activos en relación al número de muertes en un continente."},
  {index: 18, reporte: "Comportamiento y clasificación de personas infectadas por COVID-19 por municipio en un País."},
  {index: 19, reporte: "Predicción de muertes en el último día del primer año de infecciones en un país."},
  {index: 20, reporte: "Tasa de crecimiento de casos de COVID-19 en relación con nuevos casos diarios y tasa de muerte por COVID-19."},
  {index: 21, reporte: "Predicciones de casos y muertes en todo el mundo - Neural Network MLPRegressor."},
  {index: 22, reporte: "Tasa de mortalidad por coronavirus (COVID-19) en un país."},
  {index: 23, reporte: "Factores de muerte por COVID-19 en un país."},
  {index: 24, reporte: "Comparación entre el número de casos detectados y el número de pruebas de un país."},
  {index: 25, reporte: "Predicción de casos confirmados por día."}];
  let reporte_map = new Map();
  
  const headers = localStorage.getItem("headers");
  const reporte_activo_key = localStorage.getItem("reporte_activo");
  const datos_grafica = localStorage.getItem("datos_grafica");
  let res_pred = JSON.parse(datos_grafica);
  console.log(res_pred);
  /*
  data:
    eje_x, eje_y, pred
  */
  const eje_x = JSON.parse(res_pred.data.eje_x);
  const eje_y = JSON.parse(res_pred.data.eje_y);
  const prediccao = JSON.parse(res_pred.data.pred);
  const img64 = JSON.parse(res_pred.data.img64);
  console.log(img64);
  // const data_arr = res_pred.data.arr_data;
  let data_arr = [];
  for (let i = 0; i < eje_x.length; i++) {
    data_arr.push({'x': eje_x[i], 'y': eje_y[i]})
  }
  // console.log("data_arr");
  // console.log(data_arr);

  const params_grafica = localStorage.getItem("params_grafica");
  let reporte_activo = "";
  reporte_arr.forEach(element => {
    reporte_map.set(element.index, element.reporte);
    if(reporte_activo_key == element.index){
      reporte_activo = element.reporte;
    }
  });
  console.log(reporte_activo);
  // :::::::::::::::::::::::::  PDF  :::::::::::::::::::::::::
  // Fuente
  Font.register({family: 'Times New Roman', format: "truetype", src: font })
  // Create styles
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Times New Roman',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#FFFF'
    },
    title: {
      fontSize: 24,
      textAlign: 'center'
    },
    footer: {
      fontSize: 10,
      textAlign: 'left'
    },
    texto: {
      fontSize: 12,
      flex: 0,
      flexDirection: 'col',
      flexWrap: 'wrap',
      textAlign: 'left'
    },
    section: {
      margin: 25,
      padding: 30,
      flexGrow: 1
    },
    col: {
      margin: 5,
      padding: 10,
      // width: '50%',
      flexGrow: 1
    }
  });

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}
          >{reporte_activo}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.texto}
          >Se muestra la figura I, que representa el reporte y su predicción.</Text>
        </View>
        <View style={styles.section}>
        <Image
        src={img64}
        // style={{textAlign: 'left', padding:20, margin: 10 }}
        fixed={true}
        ></Image>
        <Text style={styles.footer}>Figura I</Text>
        </View>
      </Page>
    </Document>
  );
  // ReactPDF.renderToStream(<MyDocument />);
  // :::::::::::::::::::::::::    Grafica   :::::::::::::::::::::::::
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
            label: "My First dataset",
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
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> Gráfica
                </CardTitle>
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
