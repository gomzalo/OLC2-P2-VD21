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
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input,
} from "reactstrap";

function Tables() {
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);
  const [head, setHead] = useState([]);
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
  }
  // ::::::::::   SUBMIT  ::::::::::
  const submit = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function(e) {
        const text = e.target.result;
        // console.table(text);
        const delim = CSV.detect(text);
        console.log(delim)
        processCSV(text, delim);
    }

    reader.readAsText(file);
  }
  // console.log("csvArray")
  // console.log(csvArray)
  // console.log("headers")
  // console.log(head)
  localStorage.setItem("contenido_archivo", JSON.stringify(csvArray));
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
                <Table className="tablesorter" responsive>
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
                      {/* <th>Date</th>
                      <th>Days</th>
                      <th>Cases</th>
                      <th>Deaths</th> */}
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
                          {/* <td> {item.Date} </td>
                          <td> {item.Days} </td>
                          <td> {item.Cases} </td>
                          <td> {item.Deaths} </td> */}
                        </tr>
                        )
                      return null
                    })
                  }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
