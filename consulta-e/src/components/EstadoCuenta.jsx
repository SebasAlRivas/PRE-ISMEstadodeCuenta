import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import CuotasPendientes from './CuotasPendientes';
import HistorialDePagos from './HistorialDePagos';
import UserInfo from './UserInfo';
import './EstadoCuenta.css';

const EstadoCuenta = ({ usuario, alumnos, manejarPago }) => {
    // Estados para la vista de administrativo
    const [busqueda, setBusqueda] = useState('');
    const [alumnoEncontrado, setAlumnoEncontrado] = useState(null);
    const [mensajeError, setMensajeError] = useState('');

    const manejarBusqueda = (event) => {
        event.preventDefault(); // Evita que la página se recargue
        setMensajeError('');
        setAlumnoEncontrado(null);

        // Buscar el alumno en la lista por DNI o nombre exacto
        const alumnoBuscado = alumnos.find(a =>
            a.dni === busqueda || a.nombre.toLowerCase() === busqueda.toLowerCase()
        );

        if (alumnoBuscado) {
            setAlumnoEncontrado(alumnoBuscado);
        } else {
            setMensajeError('No se encontró un alumno con ese DNI o nombre.');
        }
    };

    // Si el rol es 'Administrativo', muestra la vista de secretaria
    if (usuario.rol === 'Administrativo') {
        return (
            <Container fluid>
                <Row className="mb-4 text-center">
                    <Col md={12}>
                        <h2 className="titulo-seccion mb-4">Vista Administrativa</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Card className="shadow-sm p-4">
                            <Card.Body>
                                <h5 className="mb-3">Filtrar Alumnos</h5>
                                <Form onSubmit={manejarBusqueda}>
                                    <Form.Group className="mb-3" controlId="formDni">
                                        <Form.Label>Buscar Alumno por DNI o Nombre</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Ingresa DNI (ej: 34567890) o nombre completo (ej: Juan Pérez)" 
                                            value={busqueda}
                                            onChange={(e) => setBusqueda(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Buscar
                                    </Button>
                                </Form>
                                {mensajeError && <Alert variant="danger" className="mt-3">{mensajeError}</Alert>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Si se encontró un alumno, muestra su vista de estado de cuenta */}
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
    }

    // Si el rol es 'Alumno', muestra la vista de alumno
    const cuotasImpagas = usuario.cuotas.filter(cuota => cuota.estado === 'Vencida' || cuota.estado === 'Pendiente');
    const cuotasPagadas = usuario.cuotas.filter(cuota => cuota.estado === 'Pagada');
    const deudaTotal = cuotasImpagas.reduce((total, cuota) => total + cuota.importe, 0);
    const cuotasVencidasCount = usuario.cuotas.filter(cuota => cuota.estado === 'Vencida').length;

    return (
        <Container fluid>
            <UserInfo datosAlumno={usuario} />
            <Row className="mb-4 text-center">
                <Col md={12}>
                    <h2 className="titulo-seccion mb-4">Estado de Cuenta del Alumno</h2>
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

// Componente auxiliar para mostrar el estado de cuenta del alumno buscado
const EstadoDeCuentaAlumnoEncontrado = ({ usuario, manejarPago }) => {
    const cuotasImpagas = usuario.cuotas.filter(cuota => cuota.estado === 'Vencida' || cuota.estado === 'Pendiente');
    const cuotasPagadas = usuario.cuotas.filter(cuota => cuota.estado === 'Pagada');
    const deudaTotal = cuotasImpagas.reduce((total, cuota) => total + cuota.importe, 0);
    const cuotasVencidasCount = usuario.cuotas.filter(cuota => cuota.estado === 'Vencida').length;

    return (
        <Container fluid>
            <UserInfo datosAlumno={usuario} />
            <Row className="mb-4 text-center">
                <Col md={12}>
                    <h2 className="titulo-seccion mb-4">Estado de Cuenta del Alumno</h2>
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

export default EstadoCuenta;
