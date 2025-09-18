import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './UserInfo.css';

const UserInfo = ({ datosAlumno }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleToggle = (isOpen, event) => {
        setShowDropdown(isOpen);
    };

    const handleSignOut = () => {
        alert('Cerrando sesión...');
        // Aquí iría la lógica para cerrar la sesión del usuario.
    };

    return (
        <div className="contenedor-info-usuario">
            <Dropdown show={showDropdown} onToggle={handleToggle} drop="start">
                <Dropdown.Toggle as="div" className="alternador-avatar-usuario" id="dropdown-custom-components">
                    <FontAwesomeIcon icon={faUser} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="menu-desplegable-usuario">
                    <div className="cabecera-info-usuario">
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
    );
};

export default UserInfo;
