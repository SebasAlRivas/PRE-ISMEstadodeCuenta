import React, { useState, useMemo } from 'react';
import { Card, Table, Alert, Button, Form } from 'react-bootstrap';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import './HistorialDePagos.css';

const HistorialDePagos = ({ cuotasPagadas }) => {
    const [filtroTexto, setFiltroTexto] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('Todos');
    const [filtroAnio, setFiltroAnio] = useState('Todos');
    const [ordenarPor, setOrdenarPor] = useState(null);
    const [ordenDireccion, setOrdenDireccion] = useState('asc');

    const manejarFiltroTextoChange = (e) => {
        setFiltroTexto(e.target.value);
    };

    const manejarFiltroEstadoChange = (e) => {
        setFiltroEstado(e.target.value);
    };

    const manejarFiltroAnioChange = (e) => {
        setFiltroAnio(e.target.value);
    };

    const manejarOrdenacion = (campo) => {
        if (ordenarPor === campo) {
            setOrdenDireccion(ordenDireccion === 'asc' ? 'desc' : 'asc');
        } else {
            setOrdenarPor(campo);
            setOrdenDireccion('asc');
        }
    };

    const cuotasFiltradasYOrdenadas = useMemo(() => {
        let cuotasTrabajo = [...cuotasPagadas];

        // Filtrar por estado
        if (filtroEstado !== 'Todos') {
            cuotasTrabajo = cuotasTrabajo.filter(cuota => cuota.estado === filtroEstado);
        }

        // Filtrar por año
        if (filtroAnio !== 'Todos') {
            cuotasTrabajo = cuotasTrabajo.filter(cuota => {
                const anioCuota = cuota.periodo.split(' ')[1];
                return anioCuota === filtroAnio;
            });
        }
        
        // Filtrar por texto
        if (filtroTexto) {
            cuotasTrabajo = cuotasTrabajo.filter(cuota =>
                Object.values(cuota).some(valor =>
                    String(valor).toLowerCase().includes(filtroTexto.toLowerCase())
                )
            );
        }

        // Ordenar los resultados
        if (ordenarPor) {
            cuotasTrabajo.sort((a, b) => {
                const aValue = a[ordenarPor];
                const bValue = b[ordenarPor];

                if (aValue < bValue) return ordenDireccion === 'asc' ? -1 : 1;
                if (aValue > bValue) return ordenDireccion === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return cuotasTrabajo;
    }, [cuotasPagadas, filtroTexto, filtroEstado, filtroAnio, ordenarPor, ordenDireccion]);

    const aniosDisponibles = useMemo(() => {
        const anios = [...new Set(cuotasPagadas.map(cuota => cuota.periodo.split(' ')[1]))];
        return ['Todos', ...anios.sort()];
    }, [cuotasPagadas]);

    const renderSortIcon = (campo) => {
        if (ordenarPor === campo) {
            return ordenDireccion === 'asc' ? <FaSortUp /> : <FaSortDown />;
        }
        return <FaSort />;
    };

    const generarPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Nro. Cuota', 'Período', 'Importe', 'Estado', 'Fecha de Pago', 'Medio de Pago']],
            body: cuotasFiltradasYOrdenadas.map(cuota => [
                cuota.nro,
                cuota.periodo,
                `$${cuota.importe.toLocaleString('es-AR')}`,
                cuota.estado,
                cuota.fechaPago,
                cuota.medioPago,
            ]),
            styles: { fontSize: 10, cellPadding: 2, overflow: 'linebreak' },
            columnStyles: {
                0: { cellWidth: 15 },
                1: { cellWidth: 20 },
                2: { cellWidth: 25 },
                3: { cellWidth: 20 },
                4: { cellWidth: 25 },
                5: { cellWidth: 'auto' },
            },
            headStyles: { fillColor: [93, 2, 28] },
            margin: { top: 15 },
        });
        doc.save('historial_pagos.pdf');
    };

    return (
        <Card className="sombra-pequena seccion-tabla">
            <Card.Header className="bg-success text-white">
                <h5 className="mb-0">Historial de Pagos</h5>
            </Card.Header>
            <Card.Body>
                <div className="controles-tabla">
                    <Form.Group className="mb-2 grupo-filtro">
                        <Form.Label>Filtrar por Período:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Buscar..."
                            value={filtroTexto}
                            onChange={manejarFiltroTextoChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2 grupo-filtro">
                        <Form.Label>Filtrar por Estado:</Form.Label>
                        <Form.Select value={filtroEstado} onChange={manejarFiltroEstadoChange}>
                            <option value="Todos">Todos</option>
                            <option value="Pagada">Pagada</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Vencida">Vencida</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-2 grupo-filtro">
                        <Form.Label>Filtrar por Año:</Form.Label>
                        <Form.Select value={filtroAnio} onChange={manejarFiltroAnioChange}>
                            {aniosDisponibles.map(anio => (
                                <option key={anio} value={anio}>{anio}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </div>
                {cuotasPagadas.length === 0 ? (
                    <Alert variant="info" className="texto-centrado">No hay pagos registrados.</Alert>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th onClick={() => manejarOrdenacion('nro')} style={{ cursor: 'pointer' }}>
                                    Nro. Cuota {renderSortIcon('nro')}
                                </th>
                                <th onClick={() => manejarOrdenacion('periodo')} style={{ cursor: 'pointer' }}>
                                    Período {renderSortIcon('periodo')}
                                </th>
                                <th>Importe</th>
                                <th>Estado</th>
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
                {cuotasPagadas.length > 0 && (
                    <div className="d-flex justify-content-end mt-3">
                        <Button onClick={generarPDF} variant="success">
                            Generar PDF
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default HistorialDePagos;