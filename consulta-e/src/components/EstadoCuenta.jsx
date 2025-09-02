import React from 'react';
import CuotasPendientes from './CuotasPendientes';
import HistorialDePagos from './HistorialDePagos';
import './EstadoCuenta.css';

const EstadoCuenta = ({
    deudaTotal,
    cuotasPendientesCount,
    cuotasVencidasCount,
    cuotasImpagas,
    cuotasPagadas,
    manejarPago,
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
        <>
            <section className="seccion-resumen">
                <h2>Estado Cuenta</h2>
                <div className="tarjetas-resumen">
                    <div className="tarjeta tarjeta-total">
                        <h3>Deuda Total</h3>
                        <p>${deudaTotal.toLocaleString('es-AR')}</p>
                    </div>
                    <div className="tarjeta tarjeta-pendientes">
                        <h3>Cuotas Pendientes</h3>
                        <p>{cuotasPendientesCount}</p>
                    </div>
                    <div className="tarjeta tarjeta-vencidas">
                        <h3>Cuotas Vencidas</h3>
                        <p>{cuotasVencidasCount}</p>
                    </div>
                </div>
            </section>

            <CuotasPendientes cuotas={cuotasImpagas} onPagar={manejarPago} />

            <HistorialDePagos
                cuotas={cuotasPagadas}
                filtroAnio={filtroAnio}
                setFiltroAnio={setFiltroAnio}
                criterioOrden={criterioOrden}
                setCriterioOrden={setCriterioOrden}
                filtroNroCuota={filtroNroCuota}
                setFiltroNroCuota={setFiltroNroCuota}
                filtroPeriodo={filtroPeriodo}
                setFiltroPeriodo={setFiltroPeriodo}
                filtroImporte={filtroImporte}
                setFiltroImporte={setFiltroImporte}
                filtroFechaPago={filtroFechaPago}
                setFiltroFechaPago={setFiltroFechaPago}
                filtroMedioPago={filtroMedioPago}
                setFiltroMedioPago={setFiltroMedioPago}
                mediosDePagoDisponibles={mediosDePagoDisponibles}
            />
        </>
    );
};

export default EstadoCuenta;