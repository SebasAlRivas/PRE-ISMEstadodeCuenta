import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './UserInfo.css'; // Asegúrate de tener este archivo CSS

const UserInfo = ({ datosAlumno }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleToggle = () => setShowDropdown(!showDropdown);

    return (
        <div className="info-usuario-container">
            <h1 className="titulo-app">Estado de Cuenta Alumno</h1>
            <Dropdown show={showDropdown} onToggle={handleToggle} align="end">
                <Dropdown.Toggle as="div" className="user-avatar-toggle">
                    {/* Puedes reemplazar faUserCircle con una imagen real del usuario si la tienes */}
                    <FontAwesomeIcon icon={faUserCircle} className="user-avatar-icon" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="user-dropdown-menu">
                    <Dropdown.Header className="user-info-header">
                        <p className="mb-0 fw-bold">{datosAlumno.nombre}</p>
                        <small className="text-muted">DNI: {datosAlumno.dni}</small>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/perfil">
                        <FontAwesomeIcon icon={faUserCircle} className="me-2" /> Perfil
                    </Dropdown.Item>
                    <Dropdown.Item href="#/configuracion">
                        <FontAwesomeIcon icon={faCog} className="me-2" /> Configuración
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/logout">
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Cerrar Sesión
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default UserInfo;