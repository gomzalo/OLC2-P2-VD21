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
import Inicio from "views/Inicio";
import Carga from "views/Carga.js";
import Param from "views/Param.js";
import Dashboard from "views/Dashboard.js";

var routes = [
  {
    path: "/inicio",
    name: "Inicio",
    rtlName: "طباعة",
    icon: "tim-icons icon-spaceship",
    component: Inicio,
    layout: "/admin",
  },
  {
    path: "/carga",
    name: "Carga",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-upload",
    component: Carga,
    layout: "/admin",
  },
  {
    path: "/param",
    name: "Parametrizacion",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-chart-bar-32",
    component: Param,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
];
export default routes;
