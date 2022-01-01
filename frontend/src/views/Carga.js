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
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  FormGroup,
  Row,
  Col,
  Input,
} from "reactstrap";


function Tables() {
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);
  const [head, setHead] = useState([]);
  const [datos, setDatos] = useState()
  
  // ::::::::::   Procesar CSV  ::::::::::
  const processCSV = (str, delim) => {
    const headers = str.slice(0,str.indexOf('\n')).split(delim);
    // console.log(headers)
    const rows = str.slice(str.indexOf('\n')+1).split('\n');

    const newArray = rows.map( (row, i) => {
        const values = row.split(delim);
        const obj = Object.assign({}, ...Object.entries({...headers}).map(([e, a]) => values[e]?({[JSON.parse(a)]: values[e]}):null));
        // console.log("obj");
        // console.log(obj);
        return obj;
        // return {Date: values[0], Days: values[1], Cases: values[2], Deaths: values[3]};
    })
    setHead(...[headers]);
    setCsvArray([...newArray]);
    // makeRequest();
  }
  // ::::::::::   B64  ::::::::::
  
  // ::::::::::   SUBMIT  ::::::::::
  const submit = () => {
    const file = csvFile;
    const reader = new FileReader();
    // Obteniendo B64 csv
    // toBase64(file).then(
    //   data => 
    //   // console.log(data)
    //   // ========  axios  ========
    //   axios({
    //     method: "post",
    //     url: 'http://0.0.0.0:5000/get_file',
    //     data: data,
    //   })
    //   .then(function (response) {
    //     //handle success
    //     console.log(response);
    //   })
    //   .catch(function (response) {
    //     //handle error
    //     console.log(response);
    //   })
    //   // ========   end axios   ========
    // );
    // console.log(datos);
    Papa.parse(csvFile, {
      complete: function(results){
        // console.log(results.data);
        let data = results.data;
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
    // let formData = new FormData();
    // formData.append("file", file);
    // // console.log(file);
    // console.log(formData);
    reader.onload = function(e) {
        const text = e.target.result;
        // console.log(text);
        // // ========  axios  ========
        // axios({
        //   method: "post",
        //   url: 'http://0.0.0.0:5000/get_file',
        //   data: text,
        // })
        // .then(function (response) {
        //   //handle success
        //   console.log(response);
        // })
        // .catch(function (response) {
        //   //handle error
        //   console.log(response);
        // })
        // // ========   end axios   ========
        // console.table(text);
        const delim = CSV.detect(text);
        console.log("delim:");
        console.log(delim);
        setDatos(text);
        const headers = text.slice(0,text.indexOf('\n')).split(delim);
        setHead(headers);
        // processCSV(text, delim);
    }

    reader.readAsText(file);
    // setContent(file);
  }
  // ::::::::::   MAKE POST  ::::::::::
  // const makeRequest = async () => {
  //   var formData = new FormData();
  //   const file = csvFile;
  //   formData.append("file", file.files[0]);
  //   console.log(file);
  //   console.log(formData);
  //   //--- Axios
  //   axios({
  //     method: "post",
  //     url: 'http://0.0.0.0:5000/get_file',
  //     data: formData,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   })
  //   .then(function (response) {
  //     //handle success
  //     console.log(response);
  //   })
  //   .catch(function (response) {
  //     //handle error
  //     console.log(response);
  //   });
  //   //--- Fetch
  //   // try {
  //   //   const response = await fetch('http://0.0.0.0:5000/get_file', {
  //   //     mode:'cors',
  //   //     method: 'POST',
  //   //     headers: {"Content-Type": "multipart/form-data"},
  //   //     data: csvFile,
  //   //   });
  //   //   const data = await response.json();
  //   //   console.log({ data })
  //   // }
  //   // catch (e) {
  //   //   console.log(e)
  //   // }
  // }
  // useEffect(()=>{
  //   makeRequest();
  // }, []);
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
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
            >
            </Input>
            <br/>
            <Button
                color="primary"
                className="animation-on-hover"
                onClick={(e) => {
                  e.preventDefault()
                  if(csvFile)submit()
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
