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
import { React, useEffect, useState } from "react";
import axios from 'axios';
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

function Inicio() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('http://0.0.0.0:5000/').then(response => {
      console.log("SUCCESS", response);
      setGetMessage(response);
    }).catch(error => {
      console.log(error);
    })
  }, []);
  return (
    <>
      <div div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="mb-5">
                <h5 className="card-category">Bienvenido</h5>
                <CardTitle tag="h1">
                Coronavirus Data Analysis With Machine Learning
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="typography-line">
                  <h3>
                    <span>¿Qué es COVICHO?</span>
                    Es una herramienta de análisis de datos, que permite generar graficas y reportes a partir de un archivo de entrada.
                    Esto mediante el uso de herramientas de ciencias de datos, tales como Scickit-Learn que permiten el análisis de grupos de dtaos
                    y a partir de estos generar gráficas.
                  </h3>
                </div>
                <div className="typography-line">
                  <h4>
                    <span></span>
                    ¿Cómo utilizar COVICHO?
                  </h4>
                </div>
                <div className="typography-line">
                  <span>Carga</span>
                  <p className="text-primary">
                  Antes de iniciar el análisis de datos es necesario una fuente de datos; COVICHO permite cargar archivos que sean de las siguientes extensiones:
                  </p>
                </div>
                <div className="typography-line">
                  {/* <span>Lists</span> */}
                  <Row>
                    <Col md="3">
                      <h5>Formatos de archivos soportados</h5>
                      <ul>
                        <li>.csv</li>
                        <li>.json</li>
                        <li>xlxs</li>
                      </ul>
                    </Col>
                  </Row>
                </div>
                <div className="typography-line">
                  <span>Parametrización</span>
                  <p className="text-info">
                    Luego de tener cargados los datos, se debe de parametrizar los datos.
                    Dicho de otra forma, se deben de elegir las variables que estaremos analizando.
                    A su vez se elige la predicción que se desea realizar.
                  </p>
                </div>
                <div className="typography-line">
                  <span>Reporte</span>
                  
                  <p className="text-success">
                    Una vez se han cargado y parametrizado los datos, a su vez, habiendo elegido que predicción se desea realizar.
                    Es posible observar tanto una gráfica, como también un reporte que explica la misma; una descarga de este como PDF también se encontrará disponible.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div>{getMessage.status === 200 ? 
          <p>{getMessage.data.message}</p>
          :
          <p>Servidor no encontrado...</p>
        }</div>
      </div>
    </>
  );
}

export default Inicio;
