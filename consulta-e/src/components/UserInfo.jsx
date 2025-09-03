import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './UserInfo.css';

const UserInfo = ({ datosAlumno }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleToggle = () => setShowDropdown(!showDropdown);
    const handleSignOut = () => {
        alert("Cerrando sesión...");
    };

    return (
        <div className="info-usuario-container">
            {/* Div para el espaciador izquierdo */}
            <div className="header-left-spacer"></div>

            {/* Título de la aplicación, ahora en el centro */}
            <h1 className="titulo-app">Portal Alumno</h1>

            {/* Div contenedor para el menú de usuario */}
            <div className="header-right-container">
                <Dropdown show={showDropdown} onToggle={handleToggle} drop="start">
                    <Dropdown.Toggle as="div" className="user-avatar-toggle" id="dropdown-custom-components">
                        <FontAwesomeIcon icon={faUser} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="user-dropdown-menu">
                        <div className="user-info-header">
                            <p className="mb-0">
                                <strong>{datosAlumno.nombre}</strong>
                            </p>
                            <small className="text-muted">DNI: {datosAlumno.dni}</small>
                        </div>
                        <Dropdown.Item onClick={handleSignOut}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                            Cerrar sesión
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default UserInfo;
