import { useState } from 'react';
import './App.css';
import AppNavbar from './components/Navbar';
import EstadoCuenta from './components/EstadoCuenta';

function App() {
    const alumnos = [
        {
            nombre: "Juan Pérez",
            dni: "34567890",
            rol: "Alumno",
            cuotas: [
                { id: 1, nro: 1, periodo: 'Marzo 2025', importe: 20000, vencimiento: '2025-03-10', estado: 'Pagada', fechaPago: '2025-03-09', medioPago: 'Transferencia', comprobanteUrl: 'comprobante_1.pdf' },
                { id: 2, nro: 2, periodo: 'Abril 2025', importe: 20000, vencimiento: '2025-04-10', estado: 'Pagada', fechaPago: '2025-04-11', medioPago: 'Rapipago', comprobanteUrl: 'comprobante_2.pdf' },
                { id: 3, nro: 3, periodo: 'Mayo 2025', importe: 20000, vencimiento: '2025-05-10', estado: 'Vencida', fechaPago: null, medioPago: null, comprobanteUrl: null },
                { id: 4, nro: 4, periodo: 'Junio 2025', importe: 20000, vencimiento: '2025-06-10', estado: 'Vencida', fechaPago: null, medioPago: null, comprobanteUrl: null },
                { id: 5, nro: 5, periodo: 'Julio 2025', importe: 20000, vencimiento: '2025-07-10', estado: 'Vencida', fechaPago: null, medioPago: null, comprobanteUrl: null },
                { id: 6, nro: 6, periodo: 'Agosto 2025', importe: 20000, vencimiento: '2025-08-10', estado: 'Vencida', fechaPago: null, medioPago: null, comprobanteUrl: null },
                { id: 7, nro: 7, periodo: 'Septiembre 2025', importe: 20000, vencimiento: '2025-09-10', estado: 'Pendiente', fechaPago: null, medioPago: null, comprobanteUrl: null },
                { id: 8, nro: 8, periodo: 'Octubre 2025', importe: 20000, vencimiento: '2025-10-10', estado: 'Pendiente', fechaPago: null, medioPago: null, comprobanteUrl: null },
            ]
        },
        {
            nombre: "María Lopez",
            dni: "12345678",
            rol: "Alumno",
            cuotas: [
                { id: 9, nro: 1, periodo: 'Marzo 2025', importe: 18000, vencimiento: '2025-03-10', estado: 'Pagada', fechaPago: '2025-03-08', medioPago: 'Transferencia', comprobanteUrl: 'comprobante_3.pdf' },
                { id: 10, nro: 2, periodo: 'Abril 2025', importe: 18000, vencimiento: '2025-04-10', estado: 'Pagada', fechaPago: '2025-04-09', medioPago: 'Mercado Pago', comprobanteUrl: 'comprobante_4.pdf' },
                { id: 11, nro: 3, periodo: 'Mayo 2025', importe: 18000, vencimiento: '2025-05-10', estado: 'Vencida', fechaPago: null, medioPago: null, comprobanteUrl: null },
                { id: 12, nro: 4, periodo: 'Junio 2025', importe: 18000, vencimiento: '2025-06-10', estado: 'Vencida', fechaPago: null, medioPago: null, comprobanteUrl: null },
                { id: 13, nro: 5, periodo: 'Julio 2025', importe: 18000, vencimiento: '2025-07-10', estado: 'Vencida', fechaPago: null, medioPago: null, comprobanteUrl: null },
            ]
        }
    ];

    const administrativa = {
        nombre: "Secretaría Administrativa",
        dni: "00000001",
        rol: "Administrativo",
        cuotas: [] 
    };

    // Para ver como alumno:
    // const [usuario, setUsuario] = useState(alumnos[0]);
    // Para ver como Administrativo, descomenta la línea de abajo y comenta la de arriba:
    const [usuario, setUsuario] = useState(administrativa);

    const manejarPago = (importePagado) => {
        alert(`Se ha intentado realizar un pago por $${importePagado.toLocaleString('es-AR')}`);
    };

    const [reporteActivo, setReporteActivo] = useState('Estado de Cuenta');

    const renderMainContent = () => {
        if (reporteActivo === 'Estado de Cuenta') {
            return <EstadoCuenta usuario={usuario} alumnos={alumnos} manejarPago={manejarPago} />;
        }
    };

    return (
        <div className="contenedor-app">
            <div className="columna-navegador">
                <AppNavbar setReporteActivo={setReporteActivo} />
            </div>
            <div className="contenido-principal">
                <main className="flex-grow-1 p-4">
                    {renderMainContent()}
                </main>
                <footer className="pie-de-pagina">
                    <p>&copy; 2025 Instituto Superior del Milagro. Todos los derechos reservados.</p>
                </footer>
            </div>
        </div>
    );
}

export default App;