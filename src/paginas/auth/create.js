import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import APIInvoke from "../../utils/APIInvoke";


const Create = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmar: ''
  });

  const { nombre, apellido, email, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    document.getElementById("nombre").focus();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmar) {
      showError("Las contraseñas son diferentes");
    } else if (password.length < 6) {
      showError("La contraseña debe tener al menos 6 caracteres");
    } else {
      const data = {
        nombre,
        apellido,
        email,
        password
      };

      const usuariosExistentes = await APIInvoke.invokeGET(`/Usuarios?email=${email}`);
      if (usuariosExistentes && usuariosExistentes.length > 0) {
        showError("El usuario ya está registrado.");
      } else {
        const response = await APIInvoke.invokePOST(`/Usuarios`, data);
        const mensaje = response.msg;
        if (mensaje === "el usuario ya existe") {
          showError("El usuario ya existe");
        } else {
          showSuccess("El usuario fue creado correctamente");
          resetForm();
        }
      }
    }
  };

  const showError = (msg) => {
    swal({
      title: "Error",
      text: msg,
      icon: "error",
      buttons: {
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          className: "btn btn-danger",
          closeModal: true
        }
      }
    });
  };

  const showSuccess = (msg) => {
    swal({
      title: "Información",
      text: msg,
      icon: "success",
      buttons: {
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          className: "btn btn-primary",
          closeModal: true
        }
      }
    });
  };

  const resetForm = () => {
    setUsuario({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      confirmar: ""
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            Volver
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
        </div>
        <div className="login-box">
          <div className="login-logo">
            <Link to="#">
              <b>Inicio</b> Sesión
            </Link>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Bienvenido, ingrese sus credenciales de acceso</p>
              <form onSubmit={onSubmit}>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Nombre" id="nombre" name="nombre" value={nombre} onChange={onChange} required />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Apellido" id="apellido" name="apellido" value={apellido} onChange={onChange} required />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="email" className="form-control" placeholder="Email" id="email" name="email" value={email} onChange={onChange} required />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="password" className="form-control" placeholder="Contraseña" id="password" name="password" value={password} onChange={onChange} required />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="password" className="form-control" placeholder="Confirmación de Contraseña" id="confirmar" name="confirmar" value={confirmar} onChange={onChange} required />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="social-auth-links text-center mb-3">
                  <button type="submit" className="btn btn-block btn-primary">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Create;
