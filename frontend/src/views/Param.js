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
import Swal from "sweetalert2";
// import Swal from 'sweetalert2/src/sweetalert2.js'
// import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  UncontrolledDropdown,
  InputGroupText,
} from "reactstrap";

function UserProfile() {
  const [col, setCol] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [isDate, setIsDate] = useState(false);
  const [reporte, setReporte] = useState();
  const [valor, setValor] = useState();
  const [pred, setPred] = useState();
  const headers = localStorage.getItem("headers");
  const headers_arr = JSON.parse(headers);
  if(headers_arr.length === 0){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡Primero debes de cargar un archivo!'
    });
  }
  const checkHeaders = () => {
    if(headers_arr.length === 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Primero debes de cargar un archivo!'
      });
    }
  }
  // console.log(typeof(headers));
  // console.log(typeof(headers_arr));
  // console.log(headers_arr);
  // console.log(headers_arr.length);
  // const [header, setHeaders] = useState();

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
  reporte_arr.forEach(element => {
    reporte_map.set(element.index, element.reporte);
  });
  // console.log(reporte_map);
  const handleColChange = (e) => {
    checkHeaders();
    let valor = e.target.value;
    console.log(valor);
    if(headers_arr.includes(valor)){
      setCol(valor);
    }else{      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Selecciona una columna valida!'
      });
    }
  }
  const handleXChange = (e) => {
    checkHeaders();
    let valor = e.target.value;
    console.log(valor);
    if(headers_arr.includes(valor)){
      setX(valor);
    }else{      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Selecciona un eje X valido!'
      });
    }
  }
  const handleYChange = (e) => {
    checkHeaders();
    let valor = e.target.value;
    console.log(valor);
    if(headers_arr.includes(valor)){
      setY(valor);
    }else{      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Selecciona un eje Y valido!'
      });
    }
  }
  const handleValorChange = (e) => {
    checkHeaders();
    let valor = e.target.value;
    console.log(valor);
    if(valor != null || valor !== undefined){
      setValor(valor);
    }else{      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Ingresa un valor valido!'
      });
    }
  }
  const handlePredChange = (e) => {
    checkHeaders();
    let valor = e.target.value;
    console.log(valor);
    if(valor > 1){
      setPred(valor);
    }else{      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Ingresa una predicción valida!'
      });
    }
  }
  // Devuelve la key, a partir del valor en un mapa
  const getByValue = (map, valor) => {
    for (let [key, value] of map.entries()){
      if(value === valor)
        return key
    }
  }
  // Eligiendo el reporte a realizar
  const handleReporteChange = (e) => {
    checkHeaders();
    let valor = e.target.value;
    console.log(valor);
    let index = getByValue(reporte_map, valor);
    console.log(index);
    if(index !== undefined){
      setReporte(index);
    }else{      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Selecciona un reporte valido!'
      });
    }
  }
  // Manejando el check
  const handleCheckChange = (e) => {
    checkHeaders();
    let valor = e.target.checked;
    console.log(valor);
    if(valor !== undefined){
      setIsDate(valor);
    }
  }
  // Enviando datos al server
  const setParametros = () => {
    if(reporte != null){
      if(col != null){
        if(valor != null){
          if(x != null){
            if(y != null){
              if(pred != null){
                if(x == y){
                  Swal.fire(
                    '¿Qué deseas analizar?',
                    '¡Seleccionaste los mismos parametros para los ejes X y Y!',
                    'question'
                  );
                }
                const params_data = {
                  reporte: reporte,
                  col: col,
                  valor: valor,
                  x: x,
                  isDate: isDate,
                  y: y,
                  pred: pred
                }
                // const headers = {'Content-Type': 'application/json'}
                // ========  POST request  ========
                fetch('http://0.0.0.0:5000/set_params', {
                  'method': 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(params_data)
                  })
                  .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    // response.json();
                    console.log(data);
                    if (!response.ok) {
                      // get error message from body or default to response status
                      const error = (data && data.message) || response.status;
                      return Promise.reject(error);
                    }
                    Swal.fire(
                      '¡Muy bien!',
                      'Se ha parametrizado el modelo correctamente.',
                      'success'
                    )
                    // localStorage.setItem("reportes_map", JSON.stringify(reporte_map));
                    localStorage.setItem("reporte_activo", JSON.stringify(reporte));
                    localStorage.setItem("datos_grafica", JSON.stringify(data));
                    localStorage.setItem("params_grafica", JSON.stringify(params_data));
                  })
                  .catch(error => {
                    // this.setState({ errorMessage: error.toString() });
                    // console.error('Ocurrio un error: ', error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Ocurrio un error: ' + error.toString()
                    });
                  });
                // ========   end POST request   ========
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: '¡Primero ingresa una predicción!'
                });
              }
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Primero selecciona un eje y!'
              });
            }
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Primero selecciona un eje x!'
            });
          }
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Primero ingresa el valor a buscar!'
          });
        }
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Primero selecciona una columna!'
        });
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Primero selecciona un reporte!'
      });
    }
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Reporte a realizar</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <UncontrolledDropdown>
                          {/* <DropdownToggle caret data-toggle="dropdown">
                              Elige una prediccion
                          </DropdownToggle> */}
                          <select onChange={handleReporteChange} className='bg-success'>
                              <option>Elige un reporte</option>
                              {reporte_arr.map(({index, reporte}) => <option key={index} value={reporte}>{index + ". " + reporte}</option>)}
                          </select>
                        </UncontrolledDropdown>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Columna a filtrar</label>
                        <UncontrolledDropdown>
                          {/* <DropdownToggle caret data-toggle="dropdown">
                              Elige una columna
                          </DropdownToggle> */}
                          <select onChange={handleColChange} className='bg-danger'>
                              <option>Elige una columna</option>
                              {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                          </select>
                      </UncontrolledDropdown>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Valor a buscar</label>
                        <Input id="valorBuscar"
                          onChange={handleValorChange}
                          defaultValue=""
                          placeholder="Escribe el valor a buscar"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>Eje X</label>
                        <UncontrolledDropdown>
                          {/* <DropdownToggle caret data-toggle="dropdown">
                              Elige un eje X
                          </DropdownToggle> */}
                          <select onChange={handleXChange} >
                              <option>Elige un eje X</option>
                              {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                          </select>
                        </UncontrolledDropdown>
                        
                      </FormGroup>
                    </Col>
                    <Col></Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Eje Y</label>
                        <UncontrolledDropdown>
                          {/* <DropdownToggle caret data-toggle="dropdown">
                              Elige un eje Y
                          </DropdownToggle> */}
                          <select onChange={handleYChange} >
                              <option>Elige un eje Y</option>
                              {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                          </select>
                        </UncontrolledDropdown>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Input
                          onChange={handleCheckChange}
                          type="checkbox" />{' '}
                        ¿Fecha?
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Predicción a realizar</label>
                        <Input
                          defaultValue=""
                          onChange={handlePredChange}
                          placeholder="Ingresa el valor que deseas predecir"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button 
                className="btn-fill"
                onClick={(e) => {
                  e.preventDefault()
                  setParametros()
                }}
                color="primary"
                type="submit">
                  Parametrizar
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/header.jpg").default}
                    />
                    <h5 className="title">Parametrización</h5>
                  </a>
                  {/* <p className="description">Ceo/Co-Founder</p> */}
                </div>
                <div className="card-description">
                  Elige las columnas que se utilizarán para la predicción del modelo.
                  A su vez, elige que reporte deseas generar y predecir.
                </div>
              </CardBody>
              {/* <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
