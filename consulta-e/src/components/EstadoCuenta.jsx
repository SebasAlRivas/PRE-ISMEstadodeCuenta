import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CuotasPendientes from './CuotasPendientes';
import HistorialDePagos from './HistorialDePagos';
import UserInfo from './UserInfo';
import VistaAdministrativa from './VistaAdministrativa';
import './EstadoCuenta.css';

const EstadoCuenta = ({ usuario, alumnos, manejarPago }) => {
    // Si el rol es 'Administrativo', muestra la vista del buscador
    if (usuario.rol === 'Administrativo') {
        return (
            <Container fluid>
                <UserInfo datosAlumno={usuario} />
                <VistaAdministrativa alumnos={alumnos} manejarPago={manejarPago} />
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

export default EstadoCuenta;
