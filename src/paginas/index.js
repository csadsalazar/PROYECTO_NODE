import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import SidebarContainer from "../componentes/SidebarContainer";
import ContentHeader from "../componentes/ContentHeader";
import Footer from "../componentes/Footer";

const Index = () => {
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
      <ContentHeader
          titulo={"DashBoard"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"DashBoard"}
          ruta1={"/index"}
      />
      <section className="content">
        <div className="container-fluid">
          <div className="row">

            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>Tikets</h3>
                  <p>&nbsp;</p>
                </div>
                <div className="icon">
                  <i className="fa fa-edit"/>
                </div>
                <Link to={"/ticketsadmin"} className="small-box-footer">Ver Tikets<i className="fas fa-arrow-circle-right"/></Link>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>Respuestas</h3>
                  <p>&nbsp;</p>
                </div>
                <div className="icon">
                  <i className="fa fa-user"/>
                </div>
                <Link to={"/ticketsrespuesta"} className="small-box-footer">Ver Respuestas<i className="fas fa-arrow-circle-right"/></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      <Footer></Footer>
    </div>

  );
};

export default Index;
