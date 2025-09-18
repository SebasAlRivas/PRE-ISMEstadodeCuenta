import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import CuotasPendientes from './CuotasPendientes';
import HistorialDePagos from './HistorialDePagos';
import UserInfo from './UserInfo';
import './EstadoCuenta.css';

const EstadoCuenta = ({ usuario, otroAlumno, manejarPago }) => {
    const [busquedaDNI, setBusquedaDNI] = useState('');
    const [alumnoActual, setAlumnoActual] = useState(usuario);
    const [mensajeBusqueda, setMensajeBusqueda] = useState('');

    const cuotasPagadas = useMemo(() => alumnoActual?.cuotas.filter(cuota => cuota.estado === 'Pagada') || [], [alumnoActual]);
    const cuotasImpagas = useMemo(() => alumnoActual?.cuotas.filter(cuota => cuota.estado === 'Pendiente' || cuota.estado === 'Vencida') || [], [alumnoActual]);
    const cuotasVencidasCount = useMemo(() => cuotasImpagas.filter(cuota => cuota.estado === 'Vencida').length, [cuotasImpagas]);
    const deudaTotal = useMemo(() => cuotasImpagas.reduce((total, cuota) => total + cuota.importe, 0), [cuotasImpagas]);

    useEffect(() => {
        if (usuario.rol === 'Secretaría Administrativa') {
            if (busquedaDNI === otroAlumno.dni) {
                setAlumnoActual(otroAlumno);
                setMensajeBusqueda('');
            } else if (busquedaDNI === usuario.dni) {
                setAlumnoActual(usuario);
                setMensajeBusqueda('');
            } else if (busquedaDNI) {
                setAlumnoActual(null);
                setMensajeBusqueda('No se encontró un alumno con ese DNI/Legajo.');
            } else {
                setAlumnoActual(usuario);
                setMensajeBusqueda('');
            }
        }
    }, [busquedaDNI, usuario, otroAlumno]);
    
    if (!alumnoActual && usuario.rol === 'Secretaría Administrativa') {
        return (
            <Container fluid className="texto-centrado mt-5">
                <Alert variant="danger">{mensajeBusqueda}</Alert>
            </Container>
        );
    }

    return (
        <Container fluid>
            {/* Cabecera con títulos centrados y UserInfo alineado a la derecha en la parte superior */}
            <Row className="mb-4 cabecera-estado-cuenta align-items-start">
                <Col md={3}></Col> {/* Columna vacía para centrar el contenido */}
                <Col md={6} className="text-center">
                    <h2 className="titulo-seccion-blanco mb-0">
                        Estado de Cuenta de {alumnoActual?.nombre}
                    </h2>
                    <p className="portal-alumno-texto">Portal Alumno</p>
                </Col>
                <Col md={3} className="text-end">
                    {usuario.rol === 'Alumno' && (
                        <UserInfo datosAlumno={alumnoActual} />
                    )}
                </Col>
            </Row>

            {usuario.rol === 'Secretaría Administrativa' && (
                <Row className="mb-4 d-flex justify-content-center">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Buscar por DNI o Legajo del alumno..."
                                value={busquedaDNI}
                                onChange={(e) => setBusquedaDNI(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            )}

            {/* Tarjetas de resumen ajustadas al contenido */}
            <Row className="mb-4 justify-content-center">
                <Col xs="auto">
                    <Card className="tarjeta-resumen tarjeta-deuda sombra-pequena">
                        <Card.Body>
                            <h5 className="mb-0">Deuda Total</h5>
                            <h3 className="mb-0">${deudaTotal.toLocaleString('es-AR')}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="auto">
                    <Card className={`tarjeta-resumen sombra-pequena ${
                        cuotasVencidasCount === 0 ? 'tarjeta-sin-vencidas' : 
                        cuotasVencidasCount === 1 ? 'tarjeta-una-vencida' : 'tarjeta-mas-de-una-vencida'
                    }`}>
                        <Card.Body>
                            <h5 className="mb-0">Cuotas Vencidas</h5>
                            <h3 className="mb-0">{cuotasVencidasCount}</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Row className="mt-5">
                <Col md={12}>
                    <CuotasPendientes cuotasImpagas={cuotasImpagas} manejarPago={manejarPago} />
                </Col>
            </Row>
            
            <Row className="mt-5">
                <Col md={12}>
                    <HistorialDePagos cuotasPagadas={cuotasPagadas} />
                </Col>
            </Row>
        </Container>
    );
};

export default EstadoCuenta;
