import React, { useState, useEffect } from 'react';
import APIInvoke from '../../utils/APIInvoke';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import { useParams, Link } from 'react-router-dom';
import swal from 'sweetalert';

const TicketResponse = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [respuesta, setRespuesta] = useState('');
    const [fechaC, setfechaC] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarTicket = async () => {
            try {
                const response = await APIInvoke.invokeGET(`/Tickets/${ticketId}`);

                if (response && typeof response === 'object') {
                    setTicket(response);
                } else {
                    console.error('La respuesta de la API no contiene detalles válidos para el ticket.');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los detalles del ticket:', error);
            }
        };

        cargarTicket();
    }, [ticketId]);

    const handleGuardarRespuesta = async () => {
        try {
            // Enviar la respuesta a la API
            await APIInvoke.invokePOST('/Respuesta', {
                ticketId,
                respuesta,
                fechaC,
                nombreU: ticket.nombreU,
                correo: ticket.correo,
                nombre: ticket.nombre,
                fecha: ticket.fecha,
                estado: "Respondido"
            });

            // Eliminar el ticket después de responderlo
            await APIInvoke.invokeDELETE(`/Tickets/${ticketId}`);

            // Mostrar un mensaje de éxito con SweetAlert
            swal('Ticket Respondido', 'La respuesta se guardó exitosamente.', 'success').then(() => {
                // Redirigir de regreso a la vista de detalles del ticket
                window.location.href = `/ticketsadmin`;
            });
        } catch (error) {
            console.error('Error al guardar la respuesta:', error);
        }
    };

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Responder al Ticket"}
                    breadCrumb1={"Listado de Tickets"}
                    breadCrumb2={"Responder"}
                    ruta1={"/ticketsadmin"}

                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Responder al Ticket</h3>
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <p>Cargando detalles del ticket...</p>
                            ) : (
                                <div>
                                    <h1 className="mb-4">Nombre del Ticket: {ticket.nombre}</h1>
                                    <p><strong>ID del Ticket:</strong> {ticket.id}</p>
                                    <p><strong>Dueño del ticket:</strong> {ticket.nombreU}</p>
                                    <p><strong>Correo:</strong> {ticket.correo}</p>
                                    <p><strong>Fecha:</strong> {ticket.fecha}</p>
                                    <hr />
                                    <p className="mt-4"><strong>Información:</strong></p>
                                    <p>{ticket.info}</p>
                                    <hr />
                                    <div className="form-group">
                                        <label htmlFor="respuesta">Respuesta</label>
                                        <input
                                            type='date'
                                            id="fechaC"
                                            className="form-control"
                                            value={fechaC}
                                            onChange={(e) => setfechaC(e.target.value)}
                                            required
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="respuesta">Respuesta</label>
                                        <textarea
                                            id="respuesta"
                                            className="form-control"
                                            rows="5"
                                            value={respuesta}
                                            onChange={(e) => setRespuesta(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleGuardarRespuesta}
                                    >
                                        Guardar Respuesta
                                    </button>
                                    <Link to={`/ticketsadmin`} className="btn btn-secondary ml-3">
                                        Cancelar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default TicketResponse;
