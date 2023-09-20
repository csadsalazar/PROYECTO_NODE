import React, { useEffect, useState } from 'react';
import APIInvoke from '../../utils/APIInvoke';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const TicketsViewer = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const cargarTickets = async () => {
            try {
                const response = await APIInvoke.invokeGET('/Tickets');

                if (Array.isArray(response)) {
                    setTickets(response);
                } else {
                    console.error('La respuesta de la API no contiene una lista de tickets válida.');
                }
            } catch (error) {
                console.error('Error al cargar los tickets:', error);
            }
        };

        cargarTickets();
    }, []);

    const handleEliminarTicket = async (ticketId) => {
        try {
            // Envía una solicitud DELETE para eliminar el ticket
            await APIInvoke.invokeDELETE(`/Tickets/${ticketId}`);

            // Actualiza la lista de tickets excluyendo el ticket eliminado
            const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
            setTickets(updatedTickets);

            // Muestra un mensaje de éxito con SweetAlert2
            const msg = "El ticket fue eliminado correctamente."
            swal({
                title: 'Información',
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
        } catch (error) {
            console.error('Error al eliminar el ticket:', error);
            const msg = "El ticket no fue eliminado correctamente."
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
        }
    };

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Listado de Tickets"}
                    breadCrumb1={"Listado de Tickets"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Listado de Tickets</h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>Id</th>
                                        <th style={{ width: '15%' }}>Nombre Ticket</th>
                                        <th style={{ width: '60%' }}>Información</th>
                                        <th style={{ width: '15%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map(ticket => (
                                        <tr key={ticket.id}>
                                            <td>{ticket.id}</td>
                                            <td>{ticket.nombre}</td>
                                            <td>{ticket.info}</td>
                                            <td className="d-flex justify-content-around">
                                                <Link to={`/ticketsver/${ticket.id}`} className="btn btn-sm btn-warning">Ver</Link>
                                                <Link to={`/ticketsresponder/${ticket.id}`} className="btn btn-sm btn-primary">Responder</Link>
                                                <button className="btn btn-sm btn-danger"onClick={() => handleEliminarTicket(ticket.id)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default TicketsViewer;
