import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Navbar.css';

const AppNavbar = ({ reporteActivo, onCambioReporte }) => {
    return (
        <Navbar expand="lg" variant="dark" className="app-navbar flex-column align-items-center">
            <Navbar.Brand className="text-center w-100 mb-3">
                <i className="bi bi-bank me-2"></i>
                Gestión ISM
            </Navbar.Brand>
            <Nav className="flex-column text-center w-100">
                <Nav.Link
                    className={`nav-link ${reporteActivo === 'Consulta Estado de cuenta' ? 'active' : ''}`}
                    onClick={() => onCambioReporte('Consulta Estado de cuenta')}
                >
                    <i className="bi bi-file-earmark-text-fill me-2"></i>
                    Estado de cuenta
                </Nav.Link>
                <Nav.Link
                    className={`nav-link ${reporteActivo === 'Registro de Pagos' ? 'active' : ''}`}
                    onClick={() => onCambioReporte('Registro de Pagos')}
                >
                    <i className="bi bi-journal-check me-2"></i>
                    Registro de Pagos
                </Nav.Link>
                <Nav.Link
                    className={`nav-link ${reporteActivo === 'Generación de Cupones' ? 'active' : ''}`}
                    onClick={() => onCambioReporte('Generación de Cupones')}
                >
                    <i className="bi bi-printer-fill me-2"></i>
                    Generación de Cupones
                </Nav.Link>
                <Nav.Link
                    className={`nav-link ${reporteActivo === 'Reportes Administrativos' ? 'active' : ''}`}
                    onClick={() => onCambioReporte('Reportes Administrativos')}
                >
                    <i className="bi bi-file-earmark-bar-graph-fill me-2"></i>
                    Reportes Administrativos
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default AppNavbar;