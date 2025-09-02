import React from 'react';
import './HistorialDePagos.css';

const HistorialDePagos = ({
    cuotas,
    filtroAnio,
    setFiltroAnio,
    criterioOrden,
    setCriterioOrden,
    filtroNroCuota,
    setFiltroNroCuota,
    filtroPeriodo,
    setFiltroPeriodo,
    filtroImporte,
    setFiltroImporte,
    filtroFechaPago,
    setFiltroFechaPago,
    filtroMedioPago,
    setFiltroMedioPago,
    mediosDePagoDisponibles
}) => {
    return (
        <section className="seccion-tabla">
            <h2>Historial de Pagos (Cuotas Pagadas)</h2>
            <div className="controles-tabla">
                <label>
                    Filtrar por año:
                    <select onChange={(e) => setFiltroAnio(e.target.value)} value={filtroAnio}>
                        <option value="">Todos</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                </label>
                <label>
                    Ordenar por:
                    <select onChange={(e) => setCriterioOrden(e.target.value)} value={criterioOrden}>
                        <option value="fecha">Fecha de Pago</option>
                        <option value="monto">Monto</option>
                    </select>
                </label>
            </div>
            <table id="tabla-pagadas">
                <thead>
                    <tr>
                        <th>N° Cuota</th>
                        <th>Período</th>
                        <th>Importe</th>
                        <th>Fecha de Pago</th>
                        <th>Medio de Pago</th>
                        <th>Comprobante</th>
                    </tr>
                    <tr>
                        <td><input type="text" placeholder="Buscar..." value={filtroNroCuota} onChange={(e) => setFiltroNroCuota(e.target.value)} /></td>
                        <td><input type="text" placeholder="Buscar..." value={filtroPeriodo} onChange={(e) => setFiltroPeriodo(e.target.value)} /></td>
                        <td><input type="text" placeholder="Buscar..." value={filtroImporte} onChange={(e) => setFiltroImporte(e.target.value)} /></td>
                        <td><input type="text" placeholder="Buscar..." value={filtroFechaPago} onChange={(e) => setFiltroFechaPago(e.target.value)} /></td>
                        <td>
                            <select value={filtroMedioPago} onChange={(e) => setFiltroMedioPago(e.target.value)}>
                                <option value="">Todos</option>
                                {mediosDePagoDisponibles.map((medio, index) => (
                                    <option key={index} value={medio}>{medio}</option>
                                ))}
                            </select>
                        </td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {cuotas.map(cuota => (
                        <tr key={cuota.id}>
                            <td>{cuota.nro}</td>
                            <td>{cuota.periodo}</td>
                            <td>${cuota.importe.toLocaleString('es-AR')}</td>
                            <td>{cuota.fechaPago}</td>
                            <td>{cuota.medioPago}</td>
                            <td><a href={cuota.comprobanteUrl} target="_blank" rel="noopener noreferrer" className="btn">Descargar</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default HistorialDePagos;