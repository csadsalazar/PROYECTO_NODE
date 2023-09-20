import React, { useState, useEffect } from 'react';
import APIInvoke from '../../utils/APIInvoke';
import Navbar from '../../componentesC/Navbar';
import SidebarContainer from '../../componentesC/SidebarContainer';
import ContentHeader from '../../componentesC/ContentHeader';
import Footer from '../../componentesC/Footer';
import { Link } from 'react-router-dom';

const ResponsesViewer = () => {
    const [respuestas, setRespuestas] = useState([]);

    useEffect(() => {
        const cargarRespuestas = async () => {
            try {
                // Realiza una solicitud GET a la API para obtener las respuestas
                const response = await APIInvoke.invokeGET('/Respuesta');

                if (Array.isArray(response)) {
                    setRespuestas(response);
                } else {
                    console.error('La respuesta de la API no contiene una lista de respuestas válida.');
                }
            } catch (error) {
                console.error('Error al cargar las respuestas:', error);
            }
        };

        cargarRespuestas();
    }, []);

    return (
        <div className="wrapper">
            <Navbar />
            <SidebarContainer />
            <div className="content-wrapper">
                <ContentHeader
                    titulo={"Respuestas Tickets"}
                    breadCrumb1={"Respuestas"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Respuestas Tickets</h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }}>Dueño Ticket</th>
                                        <th style={{ width: '10%' }}>Correo</th>
                                        <th style={{ width: '10%' }}>Fecha de creacion</th>
                                        <th style={{ width: '10%' }}>Fecha de respuesta</th>
                                        <th style={{ width: '10%' }}>Estado</th>
                                        <th style={{ width: '15%' }}>Acciones</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {respuestas.map(respuesta => (
                                        <tr key={respuesta.id}>
                                            <td>{respuesta.nombreU}</td>
                                            <td>{respuesta.correo}</td>
                                            <td>{respuesta.fecha}</td>
                                            <td>{respuesta.fechaC}</td>
                                            <td>{respuesta.estado}</td>
                                            <td className="d-flex justify-content-around">
                                            <Link to={`/respuestaver/${respuesta.id}`} className="btn btn-sm btn-success">Ver Respuesta</Link>                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default ResponsesViewer;
