import { useState } from 'react'; 
import './App.css';

/**
 * @description
 * Este es el componente principal de la aplicación.
 * Muestra el estado de cuenta de un alumno, incluyendo un resumen,
 * las cuotas pendientes y un historial de pagos.
 */
function App() {
    // === SECCIÓN DE DATOS ===
    // Datos ficticios del alumno y sus cuotas.
    // En una aplicación real, esta información vendría de un backend (como Django) a través de una API.
    const datosAlumno = {
        nombre: "Juan Pérez",
        legajo: "123456",
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

    // === GESTIÓN DE ESTADO PARA FILTRADO Y ORDENAMIENTO ===
    const [filtroAnio, setFiltroAnio] = useState('');
    const [criterioOrden, setCriterioOrden] = useState('fecha');

    // Lógica para filtrar y calcular datos a mostrar en la interfaz.
    const cuotasPagadas = datosAlumno.cuotas
        .filter(c => c.estado === 'Pagada')
        .filter(c => filtroAnio ? c.fechaPago.startsWith(filtroAnio) : true)
        .sort((a, b) => {
            if (criterioOrden === 'fecha') {
                return new Date(a.fechaPago) - new Date(b.fechaPago);
            }
            if (criterioOrden === 'monto') {
                return a.importe - b.importe;
            }
            return 0;
        });

    const cuotasImpagas = datosAlumno.cuotas.filter(c => c.estado !== 'Pagada');
    const deudaTotal = cuotasImpagas.reduce((acc, cuota) => acc + cuota.importe, 0);
    const cuotasPendientesCount = cuotasImpagas.filter(c => c.estado === 'Pendiente').length;
    const cuotasVencidasCount = cuotasImpagas.filter(c => c.estado === 'Vencida').length;

    /**
     * @description
     * Función de manejo de eventos para simular el pago.
     * En una implementación real, esto interactuaría con una pasarela de pagos.
     * @param {number} importe El monto de la cuota a pagar.
     */
    const manejarPago = (importe) => {
        alert(`Simulando pago de $${importe}. Redirigiendo a pasarela de pagos...`);
    };

    // === SECCIÓN DE RENDERIZADO (JSX) ===
    return (
        <div className="contenedor-app">
            <header className="cabecera">
                <h1>Estado de Cuenta del Alumno</h1>
                <div className="info-alumno">
                    <span>{datosAlumno.nombre}</span>
                    <span>Legajo: {datosAlumno.legajo}</span>
                </div>
            </header>

            <main className="contenedor-principal">
                {/* Sección de resumen financiero con tarjetas informativas */}
                <section className="seccion-resumen">
                    <h2>Resumen Financiero</h2>
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

                {/* Tabla de cuotas pendientes e impagas */}
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
                            {/* Mapea las cuotas impagas para crear una fila por cada una */}
                            {cuotasImpagas.map(cuota => (
                                <tr key={cuota.id}>
                                    <td>{cuota.nro}</td>
                                    <td>{cuota.periodo}</td>
                                    <td>${cuota.importe.toLocaleString('es-AR')}</td>
                                    <td>{cuota.vencimiento}</td>
                                    <td className={cuota.estado === 'Vencida' ? 'estado-vencida' : 'estado-pendiente'}>{cuota.estado}</td>
                                    <td><button className="btn btn-pagar" onClick={() => manejarPago(cuota.importe)}>Pagar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Tabla del historial de pagos con controles de filtrado y ordenamiento */}
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
                        </thead>
                        <tbody>
                            {/* Mapea las cuotas pagadas filtradas y ordenadas */}
                            {cuotasPagadas.map(cuota => (
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
            </main>

            <footer className="pie-de-pagina">
                <p>&copy; 2024 Instituto Superior del Milagro. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default App;