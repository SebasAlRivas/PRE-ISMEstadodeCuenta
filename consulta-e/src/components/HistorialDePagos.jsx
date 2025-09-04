import React, { useState, useMemo } from 'react';
import { Card, Table, Alert, Button, Form } from 'react-bootstrap';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const HistorialDePagos = ({ cuotasPagadas }) => {
    // 1. Estado para los filtros y la ordenación
    const [filtro, setFiltro] = useState('');
    const [ordenarPor, setOrdenarPor] = useState(null);
    const [ordenDireccion, setOrdenDireccion] = useState('asc');

    // 2. Función para manejar los cambios en el input de búsqueda
    const manejarFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    // 3. Función para manejar el clic en los encabezados de la tabla para ordenar
    const manejarOrdenacion = (campo) => {
        if (ordenarPor === campo) {
            setOrdenDireccion(ordenDireccion === 'asc' ? 'desc' : 'asc');
        } else {
            setOrdenarPor(campo);
            setOrdenDireccion('asc');
        }
    };

    // 4. Lógica de filtrado y ordenación de los datos (optimizada con useMemo)
    const cuotasFiltradasYOrdenadas = useMemo(() => {
        let cuotasTrabajo = [...cuotasPagadas];

        // Aplicar filtro de búsqueda
        if (filtro) {
            cuotasTrabajo = cuotasTrabajo.filter(cuota =>
                Object.values(cuota).some(valor =>
                    String(valor).toLowerCase().includes(filtro.toLowerCase())
                )
            );
        }

        // Aplicar ordenación
        if (ordenarPor) {
            cuotasTrabajo.sort((a, b) => {
                let valorA = a[ordenarPor];
                let valorB = b[ordenarPor];

                if (typeof valorA === 'string') {
                    valorA = valorA.toLowerCase();
                    valorB = valorB.toLowerCase();
                }

                if (valorA < valorB) {
                    return ordenDireccion === 'asc' ? -1 : 1;
                }
                if (valorA > valorB) {
                    return ordenDireccion === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return cuotasTrabajo;
    }, [cuotasPagadas, filtro, ordenarPor, ordenDireccion]);

    // 5. Función auxiliar para mostrar el ícono de ordenación
    const renderSortIcon = (campo) => {
        if (ordenarPor !== campo) {
            return <FaSort className="ms-2" />;
        }
        if (ordenDireccion === 'asc') {
            return <FaSortUp className="ms-2" />;
        }
        return <FaSortDown className="ms-2" />;
    };

    return (
        <Card className="shadow-sm">
            <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Historial de Pagos</h5>
                <Form.Control
                    type="text"
                    placeholder="Buscar en historial..."
                    value={filtro}
                    onChange={manejarFiltroChange}
                    className="w-auto"
                />
            </Card.Header>
            <Card.Body>
                {cuotasFiltradasYOrdenadas.length === 0 && cuotasPagadas.length > 0 ? (
                    <Alert variant="warning">No se encontraron resultados para su búsqueda.</Alert>
                ) : cuotasPagadas.length === 0 ? (
                    <Alert variant="info">No tenés pagos registrados.</Alert>
                ) : (
                    <Table striped bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th onClick={() => manejarOrdenacion('nro')} style={{ cursor: 'pointer' }}>
                                    Nro. Cuota {renderSortIcon('nro')}
                                </th>
                                <th onClick={() => manejarOrdenacion('periodo')} style={{ cursor: 'pointer' }}>
                                    Período {renderSortIcon('periodo')}
                                </th>
                                <th onClick={() => manejarOrdenacion('importe')} style={{ cursor: 'pointer' }}>
                                    Importe {renderSortIcon('importe')}
                                </th>
                                <th onClick={() => manejarOrdenacion('estado')} style={{ cursor: 'pointer' }}>
                                    Estado {renderSortIcon('estado')}
                                </th>
                                <th onClick={() => manejarOrdenacion('fechaPago')} style={{ cursor: 'pointer' }}>
                                    Fecha de Pago {renderSortIcon('fechaPago')}
                                </th>
                                <th onClick={() => manejarOrdenacion('medioPago')} style={{ cursor: 'pointer' }}>
                                    Medio de Pago {renderSortIcon('medioPago')}
                                </th>
                                <th>Comprobante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuotasFiltradasYOrdenadas.map((cuota) => (
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