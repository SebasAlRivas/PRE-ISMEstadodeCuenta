import React, { useState, useMemo } from 'react';
import { Card, Table, Alert, Button, Form } from 'react-bootstrap';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'; // Mantenemos esta línea, aunque con la siguiente ya no sería estrictamente necesaria
import autoTable from 'jspdf-autotable'; // Importamos el plugin explícitamente

const HistorialDePagos = ({ cuotasPagadas }) => {
    const [filtro, setFiltro] = useState('');
    const [ordenarPor, setOrdenarPor] = useState(null);
    const [ordenDireccion, setOrdenDireccion] = useState('asc');

    const manejarFiltroChange = (e) => {
        setFiltro(e.target.value);
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

        if (filtro) {
            cuotasTrabajo = cuotasTrabajo.filter(cuota =>
                Object.values(cuota).some(valor =>
                    String(valor).toLowerCase().includes(filtro.toLowerCase())
                )
            );
        }

        if (ordenarPor) {
            cuotasTrabajo.sort((a, b) => {
                let valorA = a[ordenarPor];
                let valorB = b[ordenarPor];

                if (typeof valorA === 'number' && typeof valorB === 'number') {
                    return ordenDireccion === 'asc' ? valorA - valorB : valorB - valorA;
                }
                
                valorA = String(valorA).toLowerCase();
                valorB = String(valorB).toLowerCase();

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

    const renderSortIcon = (campo) => {
        if (ordenarPor !== campo) {
            return <FaSort className="ms-2" />;
        }
        if (ordenDireccion === 'asc') {
            return <FaSortUp className="ms-2" />;
        }
        return <FaSortDown className="ms-2" />;
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        
        // **LA LÍNEA CLAVE PARA VERSIONES MODERNAS**
        autoTable(doc, {
            startY: 55,
            head: [['Nro. Cuota', 'Período', 'Importe', 'Estado', 'Fecha de Pago', 'Medio de Pago']],
            body: cuotasFiltradasYOrdenadas.map(cuota => [
                cuota.nro,
                cuota.periodo,
                `$${cuota.importe.toLocaleString('es-AR')}`,
                cuota.estado,
                cuota.fechaPago,
                cuota.medioPago
            ]),
            theme: 'striped',
            headStyles: {
                fillColor: [93, 2, 28],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center'
            },
            bodyStyles: {
                textColor: [52, 58, 64],
                halign: 'center'
            },
            alternateRowStyles: {
                fillColor: [248, 249, 250]
            },
            didDrawPage: function (data) {
                doc.setFontSize(10);
                doc.text('Página ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
                doc.text('Generado por el Sistema de Gestión de Pagos', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
            }
        });

        doc.setFontSize(22);
        doc.setTextColor(93, 2, 28);
        doc.text("Historial de Pagos", 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 14, 30);
        doc.text(`Total de Cuotas Registradas: ${cuotasFiltradasYOrdenadas.length}`, 14, 35);
        if (filtro) {
            doc.text(`Filtro Aplicado: "${filtro}"`, 14, 40);
        }
        if (ordenarPor) {
            doc.text(`Ordenado por: ${ordenarPor} (${ordenDireccion === 'asc' ? 'Ascendente' : 'Descendente'})`, 14, 45);
        }

        doc.save('historial_pagos_detallado.pdf');
    };

    return (
        <Card className="shadow-sm">
            <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Historial de Pagos</h5>
                <div className="d-flex align-items-center">
                    <Form.Control
                        type="text"
                        placeholder="Buscar en historial..."
                        value={filtro}
                        onChange={manejarFiltroChange}
                        className="me-2"
                        style={{ width: 'auto' }}
                    />
                    <Button onClick={handleExportPDF} variant="light" className="ms-2">
                        Exportar a PDF
                    </Button>
                </div>
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