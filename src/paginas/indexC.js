import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../componentesC/Navbar";
import SidebarContainer from "../componentesC/SidebarContainer";
import ContentHeader from "../componentesC/ContentHeader";
import Footer from "../componentesC/Footer";

const IndexC = () => {
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
      <ContentHeader
          titulo={"DashBoard"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"DashBoard"}
          ruta1={"/indexC"}
      />
      <section className="content">
        <div className="container-fluid">
          <div className="row">

            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>Respuestas</h3>
                  <p>&nbsp;</p>
                </div>
                <div className="icon">
                  <i className="fa fa-envelope"/>
                </div>
                <Link to={"/respuestaver"} className="small-box-footer">Ver Respuestas<i className="fas fa-arrow-circle-right"/></Link>
              </div>
            </div>
            
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>Crear Tickets</h3>
                  <p>&nbsp;</p>
                </div>
                <div className="icon">
                  <i className="fa fa-user"/>
                </div>
                <Link to={"/ticketscrear"} className="small-box-footer">Crear Tickets<i className="fas fa-arrow-circle-right"/></Link>
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

export default IndexC;
