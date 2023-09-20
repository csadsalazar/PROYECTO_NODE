import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import Navbar from '../../componentesC/Navbar';
import SidebarContainer from '../../componentesC/SidebarContainer';
import ContentHeader from '../../componentesC/ContentHeader';
import Footer from '../../componentesC/Footer';


const ResponseDetails = () => {
    const { responseId } = useParams();
    const [respuesta, setRespuesta] = useState(null);

    useEffect(() => {
        const cargarRespuesta = async () => {
            try {
                // Realiza una solicitud GET a la API para obtener los detalles de la respuesta
                const response = await APIInvoke.invokeGET(`/Respuesta/${responseId}`);

                if (response && typeof response === 'object') {
                    setRespuesta(response);
                } else {
                    console.error('La respuesta de la API no contiene detalles válidos para la respuesta.');
                }
            } catch (error) {
                console.error('Error al cargar los detalles de la respuesta:', error);
            }
        };

        cargarRespuesta();
    }, [responseId]);

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Detalles de la Respuesta"}
                    breadCrumb1={"Respuestas Tickets"}
                    breadCrumb2={"Detalles"}
                    ruta1={"/respuestaver"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Detalles de la Respuesta</h3>
                        </div>
                        <div className="card-body">
                            {respuesta ? (
                                <div>
                                    <p><strong>Nombre del Ticket:</strong> {respuesta.nombre}</p>
                                    <p><strong>Dueño del Ticket:</strong> {respuesta.nombreU}</p>
                                    <p><strong>Correo:</strong> {respuesta.correo}</p>
                                    <p><strong>Fecha de creacion:</strong> {respuesta.fecha}</p>
                                    <p><strong>Fecha de respuesta:</strong> {respuesta.fechaC}</p>
                                    <p><strong>Estado:</strong> {respuesta.estado}</p>
                                    <p><strong>Contenido de la Respuesta:</strong></p>
                                    <p>{respuesta.respuesta}</p>
                                </div>
                            ) : (
                                <p>Cargando detalles de la respuesta...</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default ResponseDetails;
