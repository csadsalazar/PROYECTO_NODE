import React, { useEffect, useState } from "react";
import Navbar from "../../componentesC/Navbar";
import SidebarContainer from "../../componentesC/SidebarContainer";
import ContentHeader from "../../componentesC/ContentHeader";
import Footer from "../../componentesC/Footer";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const TicketsCrear = () => {
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    nombre: "",
    asunto: "",
    info: "",
    fecha: "",
    correo: "",
    nombreU: "",
  });

  const { nombre, asunto, info, fecha, correo, nombreU } = ticket;

  useEffect(() => {
    document.getElementById("nombre").focus();
  }, []);

  const onChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  const crearTicket = async () => {
    // Obtener el ID de usuario autenticado desde el almacenamiento local o el estado
    const userId = localStorage.getItem("userId"); // Asegúrate de almacenar el ID del usuario durante el inicio de sesión

    const data = {
      nombre: ticket.nombre,
      asunto: ticket.asunto,
      info: ticket.info,
      fecha: ticket.fecha,
      correo: ticket.correo,
      nombreU: ticket.nombreU,
      userId: userId, // Agregar el ID de usuario al objeto de datos del ticket
    };

    const response = await APIInvoke.invokePOST(`/Tickets`, data);
    const idTicket = response.id;

    if (idTicket === "") {
      const msg = "El ticket no fue creado correctamente.";
      swal({
        title: "Error",
        text: msg,
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
    } else {
      navigate("/indexC");
      const msg = "El ticket fue creado correctamente.";
      swal({
        title: "Informacion",
        text: msg,
        icon: "success",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-primary",
            closeModal: true,
          },
        },
      });

      setTicket({
        nombre: "",
        asunto: "",
        info: "",
        fecha: "",
        correo: "",
        nombreU: "",
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    crearTicket();
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Creacion de Tickets"}
          breadCrumb1={"Listado de Ticket"}
          breadCrumb2={"Creacion"}
          ruta1={"/indexC"}
        />
        <section className="content">
          <div className="card">
            <div className="card-header">
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i className="fas fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                  title="Remove"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre del Ticket</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={nombre}
                      onChange={onChange}
                      required
                      placeholder="Ingrese un nombre para el ticket."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre dueño del ticket</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombreU"
                      name="nombreU"
                      value={nombreU}
                      onChange={onChange}
                      required
                      placeholder="Ingrese el nombre del dueño del ticket."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nombre">Correo dueño del ticket</label>
                    <input
                      type="email"
                      className="form-control"
                      id="correo"
                      name="correo"
                      value={correo}
                      onChange={onChange}
                      required
                      placeholder="Ingrese el correo del dueño del ticket."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nombre">Asunto</label>
                    <input
                      type="text"
                      className="form-control"
                      id="asunto"
                      name="asunto"
                      value={asunto}
                      onChange={onChange}
                      required
                      placeholder="Ingrese un asunto para el ticket."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="info">Informacion</label>
                    <textarea
                      id="info"
                      name="info"
                      className="form-control"
                      rows="5"
                      value={info}
                      onChange={onChange}
                      required
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="fecha">Fecha</label>
                    <input
                      type="date"
                      class="form-control"
                      id="fecha"
                      name="fecha"
                      placeholder="Fecha"
                      onChange={onChange}
                      value={fecha}
                      required
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default TicketsCrear;
