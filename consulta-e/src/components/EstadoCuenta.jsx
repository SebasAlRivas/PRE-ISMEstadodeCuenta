import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CuotasPendientes from './CuotasPendientes';
import HistorialDePagos from './HistorialDePagos';
import './EstadoCuenta.css';

const EstadoCuenta = ({
    deudaTotal,
    cuotasVencidasCount,
    cuotasImpagas,
    cuotasPagadas,
    manejarPago,
}) => {
    return (
        <Container fluid>
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
