import React from 'react';
import { Card, Table, Alert, Button } from 'react-bootstrap';

const CuotasPendientes = ({ cuotasImpagas, manejarPago }) => {
  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">Cuotas Pendientes</h5>
      </Card.Header>
      <Card.Body>
        {cuotasImpagas.length === 0 ? (
          <Alert variant="success">No tenés cuotas pendientes. ¡Excelente!</Alert>
        ) : (
          <Table striped bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>Nro. Cuota</th>
                <th>Período</th>
                <th>Importe</th>
                <th>Estado</th>
                <th>Vencimiento</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cuotasImpagas.map((cuota) => (
                <tr key={cuota.id}>
                  <td>{cuota.nro}</td>
                  <td>{cuota.periodo}</td>
                  <td>${cuota.importe.toLocaleString('es-AR')}</td>
                  <td><span className="badge bg-danger">{cuota.estado}</span></td>
                  <td>{cuota.vencimiento}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => manejarPago(cuota.importe)}
                    >
                      Pagar
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

export default CuotasPendientes;