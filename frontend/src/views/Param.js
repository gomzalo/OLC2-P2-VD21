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
import { React, useState, useContext } from "react";
import Swal from "sweetalert2";
// import Swal from 'sweetalert2/src/sweetalert2.js'
// import axios from 'axios';
import { DataContext } from "contexts/DataController";

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
  const [colGen, setColGen] = useState();
  const [csvArr, setCSVArr] = useContext(DataContext);
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [isDate, setIsDate] = useState(false);
  const [reporte, setReporte] = useState();
  // Utilizados para paises (en su maryoria)
  const [valor, setValor] = useState();
  const [valor2, setValor2] = useState();
  const [valor3, setValor3] = useState("0");
  // otros
  // const [genero, setGenero] = useState();
  const [genero2, setGenero2] = useState();
  // const [colGenArr, setColGenArr] = useState([]);
  const [pred, setPred] = useState();
  const [colArr, setColArr] = useState([]);
  const [res_params, set_res_params] = useState();
  const headers = localStorage.getItem("headers");
  const csv_arr = localStorage.getItem("csv_arr");
  // const csv_arr_json = csvArr;
  const csv_arr_json = JSON.parse(csv_arr);
  const headers_arr = JSON.parse(headers);
  let col_arr;
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
  reporte_arr.forEach(element => {
    reporte_map.set(element.index, element.reporte);
  });
  // console.log(reporte_map);
  // Col pais
  const handleColChange = (e) => {
    checkHeaders();
    let valor = e.target.value;
    console.log(valor);
    if(headers_arr.includes(valor)){
      setCol(valor);
      // Obteniendo el index de la columna seleccionada
      let index = headers_arr.indexOf(valor);
      // console.log("index col: ", index);
      // Creando arreglo de la columna seleccionada
      let temp_arr = [];
      // console.log(csv_arr_json);
      csv_arr_json.forEach(element => {
        temp_arr.push(element[index]);
      });
      // Creando arreglo con campos unicos
      let col_arr = [...new Set(temp_arr)];
      let temp = []
      // Removiendo primer elemento, encabezado
      col_arr.shift();
      // Removiendo valores vacios
      for (let i of col_arr) {
        i && temp.push(i);
      }
      // Arreglo de columna con valores unicos
      col_arr = temp;
      setColArr(col_arr);
      console.log(col_arr);
      console.log(typeof col_arr);
      console.log(typeof headers_arr);
      console.log(typeof colArr);
      console.log(colArr);
    }else{      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Selecciona una columna valida!'
      });
    }
  }
  // // Col genero
  // const handleColGenChange = (e) => {
  //   checkHeaders();
  //   let valor = e.target.value;
  //   console.log(valor);
  //   if(headers_arr.includes(valor)){
  //     setColGen(valor);
  //     // Obteniendo el index de la columna seleccionada
  //     let index = headers_arr.indexOf(valor);
  //     // console.log("index col: ", index);
  //     // Creando arreglo de la columna seleccionada
  //     let temp_arr = [];
  //     // console.log(csv_arr_json);
  //     csv_arr_json.forEach(element => {
  //       temp_arr.push(element[index]);
  //     });
  //     // Creando arreglo con campos unicos
  //     let col_arr = [...new Set(temp_arr)];
  //     let temp = []
  //     // Removiendo primer elemento, encabezado
  //     col_arr.shift();
  //     // Removiendo valores vacios
  //     for (let i of col_arr) {
  //       i && temp.push(i);
  //     }
  //     // Arreglo de columna con valores unicos
  //     col_arr = temp;
  //     setColGenArr(col_arr);
  //     console.log(col_arr);
  //     console.log(typeof col_arr);
  //     console.log(typeof headers_arr);
  //     console.log(typeof colArr);
  //     console.log(colArr);
  //   }else{      
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: '¡Selecciona una columna valida!'
  //     });
  //   }
  // }
  const handleGenChange = (e) => {
    checkHeaders();
    let valor = e.target.value;
    console.log(valor);
    if(headers_arr.includes(valor)){
      setColGen(valor);
    }else{      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Selecciona un valor valido!'
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
    if(colArr.includes(valor)){
      setValor(valor);
    }else{      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Elige un valor valido!'
      });
    }
  }
  const handleValor2Change = (e) => {
    checkHeaders();
    let valor = e.target.value;
    console.log(valor);
    if(colArr.includes(valor)){
      setValor2(valor);
    }else{      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Elige un valor 2 valido!'
      });
    }
  }
  const handleValor3Change = (e) => {
    checkHeaders();
    let valor = e.target.value;
    console.log(valor);
    if(colArr.includes(valor)){
      setValor3(valor);
    }else{      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Elige un valor 3 valido!'
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
  // ***** Validaciones de campos *****
  const checkParams = (rep_num) => {
    switch (rep_num) {
      case 1:
        console.log("rep1");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep1 true");
          return true
        }else{
          return false;
        }
      case 2:
        console.log("rep2");
        if(checkCol && checkX && checkY && checkValor && checkPred){
          console.log("rep2 true");
          return true
        }else{
          return false;
        }
      case 3:
        console.log("rep3");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep3 true");
          return true
        }else{
          return false;
        }
      case 4:
        console.log("rep4");
        if(checkCol && checkX && checkY && checkValor && checkPred){
          console.log("rep4 true");
          return true
        }else{
          return false;
        }
      case 5:
        console.log("rep5");
        if(checkCol && checkX && checkY && checkValor && checkPred){
          console.log("rep5 true");
          return true
        }else{
          return false;
        }
      case 6:
        console.log("rep6");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep6 true");
          return true
        }else{
          return false;
        }
      case 7:
        console.log("rep7");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep7 true");
          return true
        }else{
          return false;
        }
      case 8:
        console.log("rep8");
        if(checkCol && checkX && checkY && checkValor && checkPred){
          console.log("rep8 true");
          return true
        }else{
          return false;
        }
      case 9:
        console.log("rep9");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep9 true");
          return true
        }else{
          return false;
        }
      case 10:
        console.log("rep10");
        if(checkCol && checkX && checkY && checkValor && checkValor2){
          console.log("rep10 true");
          return true
        }else{
          return false;
        }
      case 11:
        console.log("rep11");
        if(checkCol && checkX && checkY && checkValor && checkGen){
          console.log("rep11 true");
          return true
        }else{
          return false;
        }
      case 12:
        console.log("rep12");
        if(checkCol && checkX && checkY && checkValor && checkValor2){
          console.log("rep12 true");
          return true
        }else{
          return false;
        }
      case 13:
        console.log("rep13");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep13 true");
          
          return true
        }else{
          return false;
        }
      case 14:
        console.log("rep14");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep14 true");
          return true
        }else{
          return false;
        }
      case 15:
        console.log("rep15");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep15 true");
          return true
        }else{
          return false;
        }
      case 16:
        console.log("rep16");
        if(checkCol && checkX && checkY && checkValor && checkGen){
          console.log("rep16 true");
          return true
        }else{
          return false;
        }
      case 17:
        console.log("rep17");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep17 true");
          
          return true
        }else{
          return false;
        }
      case 18:
        console.log("rep18");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep18 true");
          
          return true
        }else{
          return false;
        }
      case 19:
      console.log("rep19");
      if(checkCol && checkX && checkY && checkValor){
        console.log("rep19 true");
        // console.log(params_rep);
        // set_res_params(JSON.stringify(params_rep));
        return true
      }else{
        return false;
      }
      case 20:
        console.log("rep20");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep20 true");
          
          return true
        }else{
          return false;
        }
      case 21:
        console.log("rep21");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep21 true");
          
          return true
        }else{
          return false;
        }
      case 22:
        console.log("rep22");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep22 true");
          
          return true
        }else{
          return false;
        }
      case 23:
        console.log("rep23");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep23 true");
          
          return true
        }else{
          return false;
        }
      case 24:
        console.log("rep24");
        if(checkCol && checkX && checkY && checkValor){
          console.log("rep24 true");
          
          return true
        }else{
          return false;
        }
      case 25:
        console.log("rep25");
        if(checkX && checkY && checkPred){
          console.log("rep25 true");
          return true
        }else{
          return false;
        }
      default:
        return false;
    }
  }
  const checkCol = () => {
    if(col == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Primero selecciona una columna!'
      });
      return false;
    }else{
      return true;
    }
  }
  // const checkColGen = () => {
  //   if(colGenArr == null){
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: '¡Primero selecciona una columna de genero!'
  //     });
  //     return false;
  //   }else{
  //     return true;
  //   }
  // }
  const checkValor = () => {
    if(valor == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Primero elige el valor a buscar!'
      });
      return false;
    }else{
      return true;
    }
  }
  const checkGen = () => {
    if(colGen == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Primero elige el genero!'
      });
      return false;
    }else{
      return true;
    }
  }
  const checkValor2 = () => {
    if(valor2 == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Primero elige el valor 2 a buscar!'
      });
      return false;
    }else{
      return true;
    }
  }
  const checkValor3 = () => {
    if(valor3 == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Primero elige el valor 3 a buscar!'
      });
      return false;
    }else{
      return true;
    }
  }
  const checkX = () => {
    if(x == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Primero selecciona un eje x!'
      });
      return false;
    }else{
      return true;
    }
  }
  const checkY = () => {
    if(y == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Primero selecciona un eje y!'
      });
      return false;
    }else{
      return true;
    }
  }
  const checkPred = () => {
    if(pred == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Primero ingresa una predicción!'
      });
      return false;
    }else{
      return true;
    }
  }
  // Enviando datos al server
  const setParametros = () => {
    if(reporte != null){
      if(x == y){
        Swal.fire(
          '¿Qué deseas analizar?',
          '¡Seleccionaste los mismos parametros para los ejes X y Y!',
          'question'
        );
      }
      if(checkParams(reporte)){
        let params_rep;
        let dis_conc;
        switch(reporte){
          case 1:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 2:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 3:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 4:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 5:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 6:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 7:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 8:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 9:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              // pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 10:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              valor2: valor2,
              x: x,
              // pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 11:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              colGen: colGen,
              // genero: genero,
              x: x,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 12:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              valor2: valor2,
              valor3: valor3,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 13:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 14:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              // pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 15:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              // pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 16:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              muertes: colGen,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 17:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 18:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 19:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 20:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 21:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 22:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 23:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 24:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: col,
              valor: valor,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          case 25:
            // Parametros para peticion
            params_rep = {
              reporte: reporte,
              col: 0,
              valor: 0,
              x: x,
              pred: pred,
              isDate: isDate,
              y: y,
            }
            // Dis Exp y Conclusiones PDF
            dis_conc = {
              diseno: "",
              conclusion: "",
            }
            break;
          default:
            break;
        }
        console.log(params_rep);
        // const headers = {'Content-Type': 'application/json'}
        // ========  POST request  ========
        fetch('http://0.0.0.0:5000/set_params', {
          'method': 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params_rep)
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
            localStorage.setItem("params_grafica", JSON.stringify(params_rep));
            localStorage.setItem("datos_rep", JSON.stringify(dis_conc));
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
                  {(() => {
                    console.log("rep -> " + (reporte))
                    // ************ BEGIN SWITCH
                    switch(reporte) {
                      // ** 1: "Tendencia de la infección por Covid-19 en un País."
                      // :::::::::::::::::::  PARAMS REP 1    :::::::::::::::::::
                      case 1:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige la columna de paises</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
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
                                  ¿Formato fecha?
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
                              </Col>
                            </Row>
                          </FormGroup>
                        )
                      // ** 2: "Predicción de Infectados en un País."
                      // :::::::::::::::::::  PARAMS REP 2    :::::::::::::::::::
                      case 2:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
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
                          </FormGroup>
                        )
                      // ** 3: "Indice de Progresión de la pandemia."
                      // :::::::::::::::::::  PARAMS REP 3    :::::::::::::::::::
                      case 3:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                          </FormGroup>
                        )
                      // ** 4: "Predicción de mortalidad por COVID en un Departamento."
                      // :::::::::::::::::::  PARAMS REP 4    :::::::::::::::::::
                      case 4:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna departamento</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del departamento</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
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
                          </FormGroup>
                        )
                      // ** 5: "Predicción de mortalidad por COVID en un País."
                      // :::::::::::::::::::  PARAMS REP 5    :::::::::::::::::::
                      case 5:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de muertes</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
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
                          </FormGroup>
                        )
                      // ** 6: "Análisis del número de muertes por coronavirus en un País."
                      // :::::::::::::::::::  PARAMS REP 6    :::::::::::::::::::
                      case 6:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de muertes</label>
                                  <UncontrolledDropdown>
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                          </FormGroup>
                        )
                      // ** 7: "Tendencia del número de infectados por día de un País."
                      // :::::::::::::::::::  PARAMS REP 7    :::::::::::::::::::
                      case 7:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                          </FormGroup>
                        )
                      // ** 8: "Predicción de casos de un país para un año."
                      // :::::::::::::::::::  PARAMS REP 8    :::::::::::::::::::
                      case 8:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de casos</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
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
                          </FormGroup>
                        )
                      // ** 9: "Tendencia de la vacunación de en un País."
                      // :::::::::::::::::::  PARAMS REP 9    :::::::::::::::::::
                      case 9:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de vacunacion</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                          </FormGroup>
                        )
                      // ** 10: "Ánalisis Comparativo de Vacunaciópn entre 2 paises."
                      // :::::::::::::::::::  PARAMS REP 10    :::::::::::::::::::
                      case 10:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país 1</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais 1 a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                  <label>Nombre del país 2</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValor2Change} className='bg-warning'>
                                        <option>Elige el pais 2 a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de vacunación</label>
                                  <UncontrolledDropdown>
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                          </FormGroup>
                        )
                      // ** 11: "Porcentaje de hombres infectados por covid-19 en un País desde el primer caso activo."
                      // :::::::::::::::::::  PARAMS REP 11    :::::::::::::::::::
                      case 11:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  {/* <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown> */}
                                <label>Columna genero</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                  <label>Genero</label>
                                  <UncontrolledDropdown>
                                  <select onChange={handleGenChange} className='bg-warning'>
                                      <option>Elige la columna genero</option>
                                      {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                          </FormGroup>
                        )
                      // ** 12: "Ánalisis Comparativo entres 2 o más paises o continentes."
                      // :::::::::::::::::::  PARAMS REP 12    :::::::::::::::::::
                      case 12:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país 1</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais 1 a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                  <label>Nombre del país 2</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValor2Change} className='bg-warning'>
                                        <option>Elige el pais 2 a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                  <label>Nombre del país 3</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValor3Change} className='bg-warning'>
                                        <option>Elige el pais 3 a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                            {/* <Row>
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
                            </Row> */}
                          </FormGroup>
                        )
                      // ** 13: "Muertes promedio por casos confirmados y edad de covid 19 en un País."
                      // :::::::::::::::::::  PARAMS REP 13    :::::::::::::::::::
                      case 13:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna region</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre de la region</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Muertes</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValor2Change} >
                                        <option>Elige la columna de muertes</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                  
                                </FormGroup>
                              </Col>
                              <Col></Col>
                              <Col className="px-md-1" md="4">
                                <FormGroup>
                                  <label>Edad</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValor3Change} >
                                        <option>Elige la columna de edad</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                            {/* <Row>
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
                            </Row> */}
                          </FormGroup>
                        )
                      // ** 14: "Muertes según regiones de un país - Covid 19."
                      // :::::::::::::::::::  PARAMS REP 14    :::::::::::::::::::
                      case 14:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de muertes</label>
                                  <UncontrolledDropdown>
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                            {/* <Row>
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
                            </Row> */}
                          </FormGroup>
                        )
                      // ** 15: "Tendencia de casos confirmados de Coronavirus en un departamento de un País."
                      // :::::::::::::::::::  PARAMS REP 15    :::::::::::::::::::
                      case 15:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna departamento</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del departamento</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el departamento a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                            {/* <Row>
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
                            </Row> */}
                          </FormGroup>
                        )
                      // ** 16: "Porcentaje de muertes frente al total de casos en un país, región o continente."
                      // :::::::::::::::::::  PARAMS REP 16    :::::::::::::::::::
                      case 16:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país, region o continente</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país, region o continente</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el valor a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de casos</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleYChange} >
                                        <option>Elige un eje Y</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                  <label>Elige la columna de muertes</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleGenChange} >
                                        <option>Elige la columna de muertes</option>
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                          </FormGroup>
                        )
                      // ** 17: "Tasa de comportamiento de casos activos en relación al número de muertes en un continente."
                      // :::::::::::::::::::  PARAMS REP 17    :::::::::::::::::::
                      case 17:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna continente</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del continente</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el continente a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                  <label>Casos activos</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValor2Change} className='bg-warning'>
                                        <option>Elige la columna de muertes</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                            {/* <Row>
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
                            </Row> */}
                          </FormGroup>
                        )
                      // ** 18: "Comportamiento y clasificación de personas infectadas por COVID-19 por municipio en un País."
                      // :::::::::::::::::::  PARAMS REP 18    :::::::::::::::::::
                      case 18:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                <label>Columna departamento</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                  <label>Nombre del departamento</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValor2Change} className='bg-warning'>
                                        <option>Elige el departamento a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
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
                          </FormGroup>
                        )
                      // ** 19: "Predicción de muertes en el último día del primer año de infecciones en un país."
                      // :::::::::::::::::::  PARAMS REP 19    :::::::::::::::::::
                      case 19:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de muertes</label>
                                  <UncontrolledDropdown>
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
                                  ¿Formato fecha?
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
                          </FormGroup>
                        )
                      // ** 20: "Tasa de crecimiento de casos de COVID-19 en relación con nuevos casos diarios y tasa de muerte por COVID-19."
                      // :::::::::::::::::::  PARAMS REP 20    :::::::::::::::::::
                      case 20:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna Muertes</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                {/* <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                </FormGroup> */}
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
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                            {/* <Row>
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
                            </Row> */}
                          </FormGroup>
                        )
                      // ** 21: "Predicciones de casos y muertes en todo el mundo - Neural Network MLPRegressor."
                      // :::::::::::::::::::  PARAMS REP 21    :::::::::::::::::::
                      case 21:
                        return(
                          <FormGroup>
                            {/* <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                            </Row> */}
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
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
                          </FormGroup>
                        )
                      // ** 22: "Tasa de mortalidad por coronavirus (COVID-19) en un país."
                      // :::::::::::::::::::  PARAMS REP 22    :::::::::::::::::::
                      case 22:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna muertes</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              {/* <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                </FormGroup>
                              </Col> */}
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
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                            {/* <Row>
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
                            </Row> */}
                          </FormGroup>
                        )
                      // ** 23: "Factores de muerte por COVID-19 en un país."
                      // :::::::::::::::::::  PARAMS REP 23    :::::::::::::::::::
                      case 23:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna factor de muerte</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
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
                          </FormGroup>
                        )
                      // ** 24: "Comparación entre el número de casos detectados y el número de pruebas de un país."
                      // :::::::::::::::::::  PARAMS REP 24    :::::::::::::::::::
                      case 24:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown>
                                  <label>Elige la columna de pruebas</label>
                                  <UncontrolledDropdown>
                                    
                                    <select onChange={handleValor2Change} >
                                        <option>Elige un eje Y</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de infectados</label>
                                  <UncontrolledDropdown>
                                    
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
                                  ¿Formato fecha?
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormGroup>
                                </FormGroup>
                              </Col>
                            </Row>
                            {/* <Row>
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
                            </Row> */}
                          </FormGroup>
                        )
                      // ** 25: "Predicción de casos confirmados por día."
                      // :::::::::::::::::::  PARAMS REP 25    :::::::::::::::::::
                      case 25:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  {/* <label>Columna resultados entregados</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown> */}
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  {/* <label>Nombre del país</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el pais a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                  </UncontrolledDropdown> */}
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
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  <label>Elige la columna de casos confirmados</label>
                                  <UncontrolledDropdown>
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
                                  ¿Formato fecha?
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
                          </FormGroup>
                        )
                      // :::::::::::::::::::  DEFAULT    :::::::::::::::::::
                      default:
                        return(
                          <FormGroup>
                            <Row>
                              <Col className="pr-md-1" md="6">
                                <FormGroup>
                                  <label>Columna a filtrar</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleColChange} className='bg-danger'>
                                        <option>Elige una columna</option>
                                        {headers_arr.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </UncontrolledDropdown>
                                </FormGroup>
                              </Col>
                              <Col className="pl-md-1" md="6">
                                <FormGroup>
                                  <label>Valor del filtro</label>
                                  <UncontrolledDropdown>
                                    <select onChange={handleValorChange} className='bg-warning'>
                                        <option>Elige el valor a filtrar</option>
                                        {colArr.map(option => <option key={option} value={option}>{option}</option>)}
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
                              <Col className="pr-md-1" md="4">
                                <FormGroup>
                                  <label>Eje X (Ej. "dias o fecha")</label>
                                  <UncontrolledDropdown>
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
                                  ¿Formato fecha?
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
                          </FormGroup>
                        )
                    }
                    // ************ END SWITCH
                  })()}
                  {/* ******  BEGINS FORM GROUP PARAM */}
                  {/* <MyForm1 /> */}
                  {/* ******  ENDs FORM GROUP PARAM */}
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
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
