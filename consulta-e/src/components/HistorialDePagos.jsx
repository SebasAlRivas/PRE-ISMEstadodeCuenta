import React from 'react';
import { Card, Table, Alert, Button } from 'react-bootstrap';

const HistorialDePagos = ({ cuotasPagadas }) => {
  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-success text-white">
        <h5 className="mb-0">Historial de Pagos</h5>
      </Card.Header>
      <Card.Body>
        {cuotasPagadas.length === 0 ? (
          <Alert variant="info">No tenés pagos registrados.</Alert>
        ) : (
          <Table striped bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>Nro. Cuota</th>
                <th>Período</th>
                <th>Importe</th>
                <th>Estado</th>
                <th>Fecha de Pago</th>
                <th>Medio de Pago</th>
                <th>Comprobante</th>
              </tr>
            </thead>
            <tbody>
              {cuotasPagadas.map((cuota) => (
                <tr key={cuota.id}>
                  <td>{cuota.nro}</td>
                  <td>{cuota.periodo}</td>
                  <td>${cuota.importe.toLocaleString('es-AR')}</td>
                  <td><span className="badge bg-success">{cuota.estado}</span></td>
                  <td>{cuota.fechaPago}</td>
                  <td>{cuota.medioPago}</td>
                  <td>
                    <Button variant="link" href={cuota.comprobanteUrl} target="_blank">
                      Ver
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default HistorialDePagos;