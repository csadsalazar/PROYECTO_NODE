import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
                <b>Version</b> 3.2.0
            </div>
            <strong>Copyright © 2022-2023 <Link to={"https://www.google.com/aclk?sa=l&ai=DChcSEwjbr4G9irWBAxWypFoFHeq9D58YABAAGgJ2dQ&ae=2&gclid=CjwKCAjw6p-oBhAYEiwAgg2PgqdsdjZz1e5IjNiHjjhCJtvJfvFIQiqe8q7dy4p70oIBPTLNWT4iiRoC3OgQAvD_BwE&sig=AOD64_3abY0EvMl2tEklG1cD_wrblED9UQ&q&adurl&ved=2ahUKEwiP3_y8irWBAxX1TDABHbJFD7kQ0Qx6BAgNEAE"}>Serviplus.io</Link>.</strong> All rights reserved.
        </footer>

    );
}

export default Footer;