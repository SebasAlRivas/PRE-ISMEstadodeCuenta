import { useState } from 'react';
import './App.css';
import AppNavbar from './components/Navbar';
import UserInfo from './components/UserInfo';
import EstadoCuenta from './components/EstadoCuenta';

/**
 * @description
 * Este es el componente principal de la aplicación.
 * Muestra el estado de cuenta de un alumno, incluyendo un resumen,
 * las cuotas pendientes y un historial de pagos.
 */
function App() {
    const datosAlumno = {
        nombre: "Juan Pérez",
        dni: "34567890",
        cuotas: [
            { id: 1, nro: 1, periodo: 'Marzo 2024', importe: 20000, vencimiento: '2024-03-10', estado: 'Pagada', fechaPago: '2024-03-09', medioPago: 'Transferencia', comprobanteUrl: 'comprobante_1.pdf' },
            { id: 2, nro: 2, periodo: 'Abril 2024', importe: 20000, vencimiento: '2024-04-10', estado: 'Pagada', fechaPago: '2024-04-11', medioPago: 'Rapipago', comprobanteUrl: 'comprobante_2.pdf' },
            { id: 3, nro: 3, periodo: 'Mayo 2024', importe: 20000, vencimiento: '2024-05-10', estado: 'Pagada', fechaPago: '2024-05-10', medioPago: 'Tarjeta de Crédito', comprobanteUrl: 'comprobante_3.pdf' },
            { id: 4, nro: 4, periodo: 'Junio 2024', importe: 20000, vencimiento: '2024-06-10', estado: 'Pagada', fechaPago: '2024-06-10', medioPago: 'Transferencia', comprobanteUrl: 'comprobante_4.pdf' },
            { id: 5, nro: 5, periodo: 'Julio 2024', importe: 20000, vencimiento: '2024-07-10', estado: 'Vencida' },
            { id: 6, nro: 6, periodo: 'Agosto 2024', importe: 20000, vencimiento: '2024-08-10', estado: 'Vencida' },
            { id: 7, nro: 7, periodo: 'Septiembre 2024', importe: 20000, vencimiento: '2024-09-10', estado: 'Pendiente' },
            { id: 8, nro: 8, periodo: 'Octubre 2024', importe: 20000, vencimiento: '2024-10-10', estado: 'Pendiente' },
        ]
    };

    const [reporteActivo, setReporteActivo] = useState('Consulta Estado de cuenta');

    const cuotasImpagas = datosAlumno.cuotas.filter(c => c.estado !== 'Pagada');
    const cuotasPagadas = datosAlumno.cuotas.filter(c => c.estado === 'Pagada');
    const deudaTotal = cuotasImpagas.reduce((acc, cuota) => acc + cuota.importe, 0);
    const cuotasPendientesCount = cuotasImpagas.filter(c => c.estado === 'Pendiente').length;
    const cuotasVencidasCount = cuotasImpagas.filter(c => c.estado === 'Vencida').length;

    const manejarPago = (importe) => {
        alert(`Simulando pago de $${importe}. Redirigiendo a pasarela de pagos...`);
    };

    const manejarCambioReporte = (reporte) => {
        setReporteActivo(reporte);
    };

    return (
        <div className="app-layout">
            <div className="nav-col">
                <AppNavbar reporteActivo={reporteActivo} onCambioReporte={manejarCambioReporte} />
            </div>
            <div className="main-content">
                <header className="cabecera">
                    <UserInfo datosAlumno={datosAlumno} />
                </header>
                <main className="contenedor-principal">
                    {reporteActivo === 'Consulta Estado de cuenta' && (
                        <EstadoCuenta
                            deudaTotal={deudaTotal}
                            cuotasPendientesCount={cuotasPendientesCount}
                            cuotasVencidasCount={cuotasVencidasCount}
                            cuotasImpagas={cuotasImpagas}
                            cuotasPagadas={cuotasPagadas}
                            manejarPago={manejarPago}
                        />
                    )}
                    {reporteActivo === 'Registro de Pagos' && (
                        <section>
                            <h2>Registro de Pagos</h2>
                            <p>Contenido del reporte "Registro de Pagos"...</p>
                        </section>
                    )}
                    {reporteActivo === 'Generación de Cupones' && (
                        <section>
                            <h2>Generación de Cupones</h2>
                            <p>Contenido del reporte "Generación de Cupones"...</p>
                        </section>
                    )}
                    {reporteActivo === 'Reportes Administrativos' && (
                        <section>
                            <h2>Reportes Administrativos</h2>
                            <p>Contenido del reporte "Reportes Administrativos"...</p>
                        </section>
                    )}
                </main>
                <footer className="pie-de-pagina">
                    <p>&copy; 2024 Instituto Superior del Milagro. Todos los derechos reservados.</p>
                </footer>
            </div>
        </div>
    );
}

export default App;