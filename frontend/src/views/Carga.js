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
import {React, useState} from "react";
import {Button} from 'reactstrap';
import * as CSV from 'csv-string';
import axios from 'axios';
import Swal from "sweetalert2";
import Papa from 'papaparse';
import XLSX from 'xlsx';
import fs from 'fs';
// import Proptypes from 'prop-types';
// import { CSVLink } from 'react-csv';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  // Table,
  // FormGroup,
  Row,
  Col,
  Input,
} from "reactstrap";

function Tables() {
  const [archivo, setArchivo] = useState();
  const [tipoArchivo, setTipoArchivo] = useState();
  const [nombreArchivo, setNombreArchivo] = useState();
  const [head, setHead] = useState([]);
  const [datos, setDatos] = useState()
  
  const getFileNameWithExt = (event) => {
    const name = event.name;
    const lastDot = name.lastIndexOf('.');
  
    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);
    console.log("ext: ", ext);
    setTipoArchivo(ext);
    setNombreArchivo(fileName);
    return ext;
  }

  const inputHandler = (e) => {
    console.log(e);
    const ext = getFileNameWithExt(e);
    if(ext == 'xlsx'){
      console.log("Tipo Excel");
      // ========  API REQ  ========
      e.arrayBuffer().then((res) => {
        let data = new Uint8Array(res);
        let workbook = XLSX.read(data, {type: "array"});
        let first_sheet_name = workbook.SheetNames[0];
        // console.log("sheet Name", first_sheet_name);
        let worksheet = workbook.Sheets[first_sheet_name]
        let jsonData = XLSX.utils.sheet_to_json(worksheet, {raw: true});
        // console.log("JSON", jsondata);
        let json = jsonData.map((x) =>({
          ...x,
          ColumnName:"Value2"
        }))
        let fileNameWithoutExtension = e.name.substring(0, e.name.i);
        let nombre_arch = "other\\" + fileNameWithoutExtension + ".csv";
        let new_worksheet = XLSX.utils.json_to_sheet(json);
        let new_workbook = XLSX.utils.book_new();
        console.log(new_workbook);
        XLSX.utils.book_append_sheet(new_workbook, new_worksheet, "CSV_Sheet");
        XLSX.writeFile(new_workbook, nombre_arch);
      })
      // ========   end API REQ   ========
    }else{
      console.log("Tipo csv");
      setArchivo(e)
    }
  }
  // ::::::::::   Procesar CSV  ::::::::::
    // const processCSV = (str, delim) => {
    //   const headers = str.slice(0,str.indexOf('\n')).split(delim);
    //   // console.log(headers)
    //   const rows = str.slice(str.indexOf('\n')+1).split('\n');

    //   const newArray = rows.map( (row, i) => {
    //       const values = row.split(delim);
    //       const obj = Object.assign({}, ...Object.entries({...headers}).map(([e, a]) => values[e]?({[JSON.parse(a)]: values[e]}):null));
    //       // console.log("obj");
    //       // console.log(obj);
    //       return obj;
    //       // return {Date: values[0], Days: values[1], Cases: values[2], Deaths: values[3]};
    //   })
    //   setHead(...[headers]);
    //   setCsvArray([...newArray]);
    //   // makeRequest();
    // }
    // ::::::::::   B64  ::::::::::
  
  // ::::::::::   SUBMIT  ::::::::::
  const submit = () => {
    const file = archivo;

    const reader = new FileReader();
    Papa.parse(archivo, {
      complete: function(results){
        // console.log(results.data);
        let data = results.data;
        // data = data.replace(/^\s*(\r)/gm, "");
        let temp = [];
        for(let i of data)
          i && temp.push(i)
        data = temp;
        // console.log(data);
        // ========  axios  ========
        axios({
          method: "post",
          url: 'http://0.0.0.0:5000/get_file',
          data: JSON.stringify(data),
        })
        .then(function (response) {
          //handle success
          Swal.fire(
            '¡Muy bien!',
            'Se ha cargado el archivo correctamente.',
            'success'
          )
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrio un error al realizar la peticion: ' + response
          });
        })
        // ========   end axios   ========
      }
    });

    reader.onload = function(e) {
        let text = e.target.result.replace(/^\s*(\r)/gm, "");
        const delim = CSV.detect(text);
        console.log("delim:");
        console.log(delim);
        text = text.replace(/^\s*(\r)/gm, "");
        setDatos(text);
        let headers = text.slice(0,text.indexOf('\n'))
        headers = headers.replace(/^\s*(\r)/gm, "");
        // headers = headers.replace(/^(\r)/gm, "");
        let headers_arr = headers.split(delim);
        for (let i = 0; i < headers_arr.length; i++) {
          headers_arr[i] = headers_arr[i].replace(/\r/g, "");
        }
        console.log(headers_arr);
        setHead(headers_arr);
        // processCSV(text, delim);
    }

    reader.readAsText(file);
    // setContent(file);
  }
  
  // console.log("csvArray")
  // console.log(csvArray)
  console.log("headers")
  console.log(head)
  localStorage.setItem("headers", JSON.stringify(head));
  return (
    <>
      {/* Muestra del archivo */}
      <div className="content">
        {/* Carga del archivo */}
        <form id='csv-form'>
            <Input
                type='file'
                accept='.csv, .xlsx, .json'
                id='archivo'
                onChange={(e) => {
                  getFileNameWithExt(e.target.files[0])
                  inputHandler(e.target.files[0])
                }}
            >
            </Input>
            <br/>
            <Button
                color="primary"
                className="animation-on-hover"
                onClick={(e) => {
                  e.preventDefault()
                  if(archivo)submit()
              }}>
                Cargar
            </Button>
        <br/>
        <br/>
        </form>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Previsualización de datos</CardTitle>
              </CardHeader>
              <CardBody>
                {/* <Row>
                  <Col md="8">
                    <FormGroup> */}
                      <Input
                        height="auto"
                        width="auto"
                        cols="150"
                        defaultValue={datos}
                        placeholder="Contenido del archivo a analizar"
                        rows="500"
                        type="textarea"
                      />
                    {/* </FormGroup>
                  </Col>
                </Row> */}
                {/* <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      {
                        head.map((item, i) => { 
                          if(item != null)
                            return(
                              <th> {JSON.parse(item)} </th>
                            )
                          return null
                        })
                      }
                    </tr>
                  </thead>
                  <tbody>
                  {
                    csvArray.map((item, i) => { 
                      if(item != null)
                        return(
                        <tr key={i}>
                          {
                            Object.entries(item).map(([key, value], ii) => { 
                              if(value != null)
                                return(
                                  <td> {value} </td>
                                )
                              return null
                            })
                          }
                        </tr>
                        )
                      return null
                    })
                  }
                  </tbody>
                </Table> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
