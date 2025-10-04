import React from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { FaMoneyBillWave } from 'react-icons/fa';

const CuotasPendientes = ({ cuotasImpagas, manejarPago }) => {
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <h4 className="mb-4">Cuotas Pendientes</h4>
                {cuotasImpagas.length === 0 ? (
                    <p className="text-center text-muted">No tienes cuotas pendientes. ¡Estás al día!</p>
                ) : (
                    <Table responsive hover className="tabla-cuotas">
                        <thead>
                            <tr>
                                <th>Nro</th>
                                <th>Período</th>
                                <th>Importe</th>
                                <th>Recargo</th> {/* ⬅️ COLUMNA AGREGADA */}
                                <th>Vencimiento</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuotasImpagas.map(cuota => (
                                <tr key={cuota.id}>
                                    <td>{cuota.nro}</td>
                                    <td>{cuota.periodo}</td>
                                    <td>${cuota.importe.toLocaleString('es-AR')}</td>
                                    {/* ⬅️ CAMPO DEL RECARGO con formato de pesos (es-AR) */}
                                    <td>${cuota.recargo ? cuota.recargo.toLocaleString('es-AR') : '0,00'}</td> 
                                    <td>{cuota.vencimiento}</td>
                                    <td>
                                        <Badge 
                                            bg={cuota.estado === 'Vencida' ? 'danger' : 'warning'}
                                            className="etiqueta-estado"
                                        >
                                            {cuota.estado}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Button 
                                            variant="primary" 
                                            size="sm" 
                                            // Se suma el importe más el recargo (si existe) para la función manejarPago
                                            onClick={() => manejarPago(cuota.importe + (cuota.recargo || 0))}
                                        >
                                            <FaMoneyBillWave /> Pagar
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