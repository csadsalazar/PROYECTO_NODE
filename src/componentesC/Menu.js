import React from "react";
import { Link } from "react-router-dom";
const Menu = () => {
    return (
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                    <Link to={"/indexC"} className="nav-link">
                        <i className="nav-icon fas fa-th" />
                        <p>
                            Inicio
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/respuestaver"} className="nav-link">
                        <i className="nav-icon fas fa-edit" />
                        <p>
                            Respuestas
                        </p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/ticketscrear"} className="nav-link">
                        <i className="nav-icon fas fa-edit" />
                        <p>
                            Crear Tickets
                        </p>
                    </Link>
                </li>
            </ul>
        </nav>

    );
}

export default Menu;