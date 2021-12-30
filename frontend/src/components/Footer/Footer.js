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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://github.com/harias25/olc2-diciembre-2021/tree/main/Proyecto%202">
            Proyecto 2 - Coronavirus Data Analysis With Machine Learning
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://portal.ingenieria.usac.edu.gt/">
              Universidad de San Carlos de Guatemala - Facultad de Ingenieria
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              Ingenieria en Ciencias y Sistemas
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          <a
            href="#"
            target="_blank"
          >
            Laboratorio de Organizacion de Lenguajes y Compiladores 2
          </a>{" "}
          - Vacaciones de diciembre 2021
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
