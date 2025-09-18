import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Navbar.css';

const AppNavbar = ({ reporteActivo, onCambioReporte }) => {
    return (
        <Navbar expand="lg" variant="dark" className="barra-navegacion flex-column align-items-center">
            <Navbar.Brand className="texto-centrado ancho-completo mb-3">
                <i className="bi bi-bank me-2"></i>
                Gestión ISM
            </Navbar.Brand>
            <Nav className="flex-column texto-centrado ancho-completo">
                <Nav.Link
                    className={`enlace-nav ${reporteActivo === 'Consulta Estado de cuenta' ? 'activo' : ''}`}
                    onClick={() => onCambioReporte('Consulta Estado de cuenta')}
                >
                    <i className="bi bi-file-earmark-text-fill me-2"></i>
                    Estado de cuenta
                </Nav.Link>
                <Nav.Link
                    className={`enlace-nav ${reporteActivo === 'Registro de Pagos' ? 'activo' : ''}`}
                    onClick={() => onCambioReporte('Registro de Pagos')}
                >
                    <i className="bi bi-journal-check me-2"></i>
                    Registro de Pagos
                </Nav.Link>
                <Nav.Link
                    className={`enlace-nav ${reporteActivo === 'Generación de Cupones' ? 'activo' : ''}`}
                    onClick={() => onCambioReporte('Generación de Cupones')}
                >
                    <i className="bi bi-printer-fill me-2"></i>
                    Generación de Cupones
                </Nav.Link>
                <Nav.Link
                    className={`enlace-nav ${reporteActivo === 'Reportes Administrativos' ? 'activo' : ''}`}
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