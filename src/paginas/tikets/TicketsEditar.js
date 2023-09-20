import React, { useEffect, useState } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const TicketsEditar = () => {

    const navigate = useNavigate();

    const { idticket } = useParams();
    let arreglo = idticket.split('@');
    const nombreTicket = arreglo[1];
    const asuntoTicket = arreglo[2]
    const infoTicket = arreglo[3];

    const [ticket, setTicket] = useState({
        nombre: nombreTicket,
        asunto: asuntoTicket,
        info: infoTicket
    });

    const { nombre, asunto ,info } = ticket

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, []);

    const onChange = (e) => {
        setTicket({
            ...ticket,
            [e.target.name]: e.target.value
        })
    }

    const editarTicket = async () => {
        let arreglo = idticket.split('@');
        const idTicket = arreglo[0];

        const data = {
            nombre: ticket.nombre,
            asunto: ticket.asunto,
            info: ticket.info

        }

        const response = await APIInvoke.invokePUT(`/Tickets/${idTicket}`, data);
        const idTicketEditado = response.ticket.id;

        if (idTicketEditado !== idTicket) {
            const msg = "El ticket no fue editado correctamente."
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else {
            navigate("/ticketsadmin")
            const msg = "El ticket fue creado correctamente."
            swal({
                title: 'Informacion',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editarTicket();
    }

    return (

        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Creacion de Tickets"}
                    breadCrumb1={"Listado de Ticket"}
                    breadCrumb2={"Creacion"}
                    ruta1={"/ticketsadmin"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">

                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre</label>
                                        <input type="text"
                                            className="form-control"
                                            id="nombre"
                                            name="nombre"
                                            value={nombre}
                                            onChange={onChange}
                                            required
                                            placeholder="Ingrese un nombre respectivo" />
                                        <div className="form-group">
                                            <label htmlFor="info">Asunto</label>
                                            <input type="text"
                                                className="form-control"
                                                id="asunto"
                                                placeholder="Ingrese el asunto respectiva"
                                                value={asunto}
                                                onChange={onChange}
                                                required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="info">Informacion</label>
                                        <input type="text"
                                            className="form-control"
                                            id="info"
                                            placeholder="Ingrese la informacion respectiva"
                                            value={info}
                                            onChange={onChange}
                                            required />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Editar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>

    );
}

export default TicketsEditar;