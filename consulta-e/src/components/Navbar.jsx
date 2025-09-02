import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './Navbar.css';

const AppNavbar = ({ reporteActivo, onCambioReporte }) => {
    return (
        <>
            {/* Navbar lateral para pantallas grandes */}
            <div className="d-none d-md-block sidebar-wrapper p-0">
                <Navbar expand="md" className="custom-navbar flex-column">
                    <Navbar.Brand href="#" className="w-100 text-center py-3">
                        <span className="fw-bold">ISDM Pagos</span>
                    </Navbar.Brand>
                    <Nav className="flex-column w-100 mt-4">
                        <Nav.Link
                            onClick={() => onCambioReporte('Consulta Estado de cuenta')}
                            active={reporteActivo === 'Consulta Estado de cuenta'}
                        >
                            Consulta Estado de cuenta
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => onCambioReporte('Registro de Pagos')}
                            active={reporteActivo === 'Registro de Pagos'}
                        >
                            Registro de Pagos
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => onCambioReporte('Generación de Cupones')}
                            active={reporteActivo === 'Generación de Cupones'}
                        >
                            Generación de Cupones
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => onCambioReporte('Reportes Administrativos')}
                            active={reporteActivo === 'Reportes Administrativos'}
                        >
                            Reportes Administrativos
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </div>

            {/* Navbar superior para pantallas móviles */}
            <Navbar expand="md" className="d-md-none top-navbar">
                <Container fluid>
                    <Navbar.Brand href="#">ISDM Pagos</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar" />
                    <Navbar.Collapse id="responsive-navbar">
                        <Nav className="me-auto mt-2">
                            <Nav.Link
                                onClick={() => onCambioReporte('Consulta Estado de cuenta')}
                                active={reporteActivo === 'Consulta Estado de cuenta'}
                            >
                                Consulta Estado de cuenta
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => onCambioReporte('Registro de Pagos')}
                                active={reporteActivo === 'Registro de Pagos'}
                            >
                                Registro de Pagos
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => onCambioReporte('Generación de Cupones')}
                                active={reporteActivo === 'Generación de Cupones'}
                            >
                                Generación de Cupones
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => onCambioReporte('Reportes Administrativos')}
                                active={reporteActivo === 'Reportes Administrativos'}
                            >
                                Reportes Administrativos
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default AppNavbar;