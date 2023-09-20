import React, { useState, useEffect } from 'react';
import APIInvoke from '../../utils/APIInvoke';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import { useParams } from 'react-router-dom';

const TicketDetails = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const cargarTicket = async () => {
            try {
                const response = await APIInvoke.invokeGET(`/Tickets/${ticketId}`);

                if (response && typeof response === 'object') {
                    setTicket(response);
                } else {
                    console.error('La respuesta de la API no contiene detalles válidos para el ticket.');
                }
            } catch (error) {
                console.error('Error al cargar los detalles del ticket:', error);
            }
        };

        cargarTicket();
    }, [ticketId]);

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Detalles del Ticket"}
                    breadCrumb1={"Listado de Tickets"}
                    breadCrumb2={"Detalles"}
                    ruta1={"/ticketsadmin"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h3 className="card-title text-white">Detalles del Ticket</h3>
                        </div>
                        <div className="card-body">
                            {ticket ? (
                                <div>
                                    <h1>{ticket.nombre}</h1>
                                    <p><strong>ID del Ticket:</strong> {ticket.id}</p>
                                    <p><strong>Dueño Ticket:</strong> {ticket.nombreU}</p>
                                    <p><strong>Correo:</strong> {ticket.correo}</p>
                                    <p><strong>Fecha de Creación:</strong> {ticket.fecha}</p>
                                    <hr />
                                    <p className="mt-4"><strong>Información:</strong></p>
                                    <p>{ticket.info}</p>
                                </div>
                            ) : (
                                <p>Cargando detalles del ticket...</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default TicketDetails;
