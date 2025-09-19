import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import CuotasPendientes from './CuotasPendientes';
import HistorialDePagos from './HistorialDePagos';
import UserInfo from './UserInfo';
import './EstadoCuenta.css';

// Componente principal de la vista administrativa
const VistaAdministrativa = ({ alumnos, manejarPago }) => {
    const [busqueda, setBusqueda] = useState('');
    const [alumnoEncontrado, setAlumnoEncontrado] = useState(null);
    const [mensajeError, setMensajeError] = useState(null);

    const manejarBusqueda = (event) => {
        event.preventDefault();
        setMensajeError(null);
        setAlumnoEncontrado(null);

        const alumnoBuscado = alumnos.find(a =>
            a.dni === busqueda || a.nombre.toLowerCase() === busqueda.toLowerCase()
        );

        if (alumnoBuscado) {
            setAlumnoEncontrado(alumnoBuscado);
        } else {
            setMensajeError('No se encontró un alumno con ese DNI o nombre.');
        }
    };

    return (
        <Container fluid>
            <Row className="mb-4 text-center">
                <Col md={12}>
                    <h2 className="titulo-seccion mb-4">Buscador de Alumnos</h2>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                    <Card className="card-buscador-admin shadow-lg p-4">
                        <Card.Body>
                            <h5 className="mb-4 text-center">Consulta de Estado de Cuenta por Alumno</h5>
                            <Form onSubmit={manejarBusqueda}>
                                <Form.Group className="mb-4" controlId="formDni">
                                    <Form.Label>Ingresa DNI o Nombre Completo del Alumno</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Ej: 34567890 o Juan Pérez" 
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit">
                                        Buscar
                                    </Button>
                                </div>
                            </Form>
                            {mensajeError && <Alert variant="danger" className="mt-4">{mensajeError}</Alert>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {alumnoEncontrado && (
                <div className="mt-5">
                    <EstadoDeCuentaAlumnoEncontrado 
                        usuario={alumnoEncontrado} 
                        manejarPago={manejarPago} 
                    />
                </div>
            )}
        </Container>
    );
};

// Componente auxiliar para mostrar el estado de cuenta del alumno buscado
const EstadoDeCuentaAlumnoEncontrado = ({ usuario, manejarPago }) => {
    const cuotasImpagas = usuario.cuotas.filter(cuota => cuota.estado === 'Vencida' || cuota.estado === 'Pendiente');
    const cuotasPagadas = usuario.cuotas.filter(cuota => cuota.estado === 'Pagada');
    const deudaTotal = cuotasImpagas.reduce((total, cuota) => total + cuota.importe, 0);
    const cuotasVencidasCount = usuario.cuotas.filter(cuota => cuota.estado === 'Vencida').length;

    return (
        <Container fluid>
            <Row className="mb-4 text-center">
                <Col md={12}>
                    <h2 className="titulo-seccion mb-2">Estado de Cuenta</h2>
                    <h4 className="subtitulo-seccion mb-4">{usuario.nombre}</h4> 
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <Card className="resumen-card tarjeta-deuda shadow-sm text-center">
                        <Card.Body>
                            <h5 className="mb-0">Deuda Total</h5>
                            <h3 className="mb-0">${deudaTotal.toLocaleString('es-AR')}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className={`resumen-card shadow-sm text-center ${
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

export default VistaAdministrativa;