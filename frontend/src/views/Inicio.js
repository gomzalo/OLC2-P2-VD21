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
                {/* <div className="typography-line">
                  <h1>
                    <span>Header 1</span>
                    The Life of Black Dashboard React
                  </h1>
                </div>
                <div className="typography-line">
                  <h2>
                    <span>Header 2</span>
                    The Life of Black Dashboard React
                  </h2>
                </div> */}
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
                {/* 
                <div className="typography-line">
                  <h5>
                    <span>Header 5</span>
                    The Life of Black Dashboard React
                  </h5>
                </div>
                <div className="typography-line">
                  <h6>
                    <span>Header 6</span>
                    The Life of Black Dashboard React
                  </h6>
                </div>
                <div className="typography-line">
                  <p>
                    <span>Paragraph</span>I will be the leader of a company that
                    ends up being worth billions of dollars, because I got the
                    answers. I understand culture. I am the nucleus. I think
                    that’s a responsibility that I have, to push possibilities,
                    to show people, this is the level that things could be at.
                  </p>
                </div> */}
                {/* <div className="typography-line">
                  <span>Quote</span>
                  <blockquote>
                    <p className="blockquote blockquote-primary">
                      "I will be the leader of a company that ends up being
                      worth billions of dollars, because I got the answers. I
                      understand culture. I am the nucleus. I think that’s a
                      responsibility that I have, to push possibilities, to show
                      people, this is the level that things could be at." <br />
                      <br />
                      <small>- Noaa</small>
                    </p>
                  </blockquote>
                </div> */}
                {/* <div className="typography-line">
                  <span>Carga</span>
                  <p className="text-muted">
                    Antes de iniciar el análisis de datos
                  </p>
                </div> */}
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
                        {/* <li className="list-unstyled">
                          <ul>
                            <li>List Item</li>
                            <li>List Item</li>
                            <li>List Item</li>
                          </ul>
                        </li> */}
                        <li>xlxs</li>
                      </ul>
                    </Col>
                    {/* <Col md="3">
                      <h5>Ordered List</h5>
                      <ol>
                        <li>List Item</li>
                        <li>List Item</li>
                        <li>List item</li>
                        <li>List Item</li>
                      </ol>
                    </Col>
                    <Col md="3">
                      <h5>Unstyled List</h5>
                      <ul className="list-unstyled">
                        <li>List Item</li>
                        <li>List Item</li>
                        <li>List item</li>
                        <li>List Item</li>
                      </ul>
                    </Col>
                    <Col md="3">
                      <h5>Inline List</h5>
                      <ul className="list-inline">
                        <li className="list-inline-item">List1</li>
                        <li className="list-inline-item">List2</li>
                        <li className="list-inline-item">List3</li>
                      </ul>
                    </Col> */}
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
                {/* <div className="typography-line">
                  <span>Warning Text</span>
                  <p className="text-warning">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <span>Danger Text</span>
                  <p className="text-danger">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>
                <div className="typography-line">
                  <h2>
                    <span>Small Tag</span>
                    Header with small subtitle <br />
                    <small>Use "small" tag for the headers</small>
                  </h2>
                </div> */}
                {/* <div className="typography-line">
                  <span>Code</span>
                  <p>
                    This is <code>.css-class-as-code</code>, an example of an
                    inline code element. Wrap inline code within a{" "}
                    <code>{`<code>...</code>`}</code>
                    tag.
                  </p>
                  <pre>
                    1. #This is an example of preformatted text.
                    <br />
                    2. #Here is another line of code
                  </pre>
                </div> */}
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
