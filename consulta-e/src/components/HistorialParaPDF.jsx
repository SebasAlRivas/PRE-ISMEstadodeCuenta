import React from 'react';
import { Table, Alert } from 'react-bootstrap';

const HistorialParaPDF = ({ cuotas }) => {
    return (
        <div id="historial-para-pdf" style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', color: '#5d021c' }}>Historial de Pagos</h2>
            {cuotas.length === 0 ? (
                <Alert variant="info" style={{ textAlign: 'center' }}>No hay pagos registrados.</Alert>
            ) : (
                <Table striped bordered hover responsive style={{ textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>Nro. Cuota</th>
                            <th>Período</th>
                            <th>Importe</th>
                            <th>Estado</th>
                            <th>Fecha de Pago</th>
                            <th>Medio de Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cuotas.map((cuota) => (
                            <tr key={cuota.id}>
                                <td>{cuota.nro}</td>
                                <td>{cuota.periodo}</td>
                                <td>${cuota.importe.toLocaleString('es-AR')}</td>
                                <td><span style={{ backgroundColor: '#28a745', color: 'white', padding: '5px', borderRadius: '5px' }}>{cuota.estado}</span></td>
                                <td>{cuota.fechaPago}</td>
                                <td>{cuota.medioPago}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default HistorialParaPDF;