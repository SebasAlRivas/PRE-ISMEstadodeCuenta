import React from 'react';
import './CuotasPendientes.css';

const CuotasPendientes = ({ cuotas, onPagar }) => {
    return (
        <section className="seccion-tabla">
            <h2>Cuotas Pendientes e Impagas</h2>
            <table id="tabla-pendientes">
                <thead>
                    <tr>
                        <th>N° Cuota</th>
                        <th>Período</th>
                        <th>Importe</th>
                        <th>Vencimiento</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cuotas.map(cuota => (
                        <tr key={cuota.id}>
                            <td>{cuota.nro}</td>
                            <td>{cuota.periodo}</td>
                            <td>${cuota.importe.toLocaleString('es-AR')}</td>
                            <td>{cuota.vencimiento}</td>
                            <td className={cuota.estado === 'Vencida' ? 'estado-vencida' : 'estado-pendiente'}>{cuota.estado}</td>
                            <td><button className="btn btn-pagar" onClick={() => onPagar(cuota.importe)}>Pagar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default CuotasPendientes;