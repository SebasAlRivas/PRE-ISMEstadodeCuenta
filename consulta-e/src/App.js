import { useState } from 'react';
import './App.css';
import AppNavbar from './components/Navbar';
import EstadoCuenta from './components/EstadoCuenta';
import Footer from './components/Footer';
function App() {
    const alumnos = [
        {
            nombre: "Juan Perez",
            dni: "34567890",
            rol: "Alumno",
            cuotas: [
                // Nuevas cuotas del 2024 (todas pagadas)
                { id: 14, nro: 1, periodo: 'Febrero 2024', importe: 30000, vencimiento: '2024-02-10', estado: 'Pagada', fechaPago: '2024-02-09', medioPago: 'Transferencia', comprobanteUrl: 'comprobante_5.pdf' },
                { id: 15, nro: 2, periodo: 'Marzo 2024', importe: 35000, vencimiento: '2024-03-10', estado: 'Pagada', fechaPago: '2024-03-11', medioPago: 'Rapipago', comprobanteUrl: 'comprobante_6.pdf' },
                { id: 16, nro: 3, periodo: 'Abril 2024', importe: 40000, vencimiento: '2024-04-10', estado: 'Pagada', fechaPago: '2024-04-10', medioPago: 'Mercado Pago', comprobanteUrl: 'comprobante_7.pdf' },
                { id: 17, nro: 4, periodo: 'Mayo 2024', importe: 45000, vencimiento: '2024-05-10', estado: 'Pagada', fechaPago: '2024-05-09', medioPago: 'Transferencia', comprobanteUrl: 'comprobante_8.pdf' },
                { id: 18, nro: 5, periodo: 'Junio 2024', importe: 50000, vencimiento: '2024-06-10', estado: 'Pagada', fechaPago: '2024-06-12', medioPago: 'Transferencia', comprobanteUrl: 'comprobante_9.pdf' },
                { id: 19, nro: 6, periodo: 'Julio 2024', importe: 55000, vencimiento: '2024-07-10', estado: 'Pagada', fechaPago: '2024-07-10', medioPago: 'Rapipago', comprobanteUrl: 'comprobante_10.pdf' },
                { id: 20, nro: 7, periodo: 'Agosto 2024', importe: 60000, vencimiento: '2024-08-10', estado: 'Pagada', fechaPago: '2024-08-08', medioPago: 'Mercado Pago', comprobanteUrl: 'comprobante_11.pdf' },
                { id: 21, nro: 8, periodo: 'Septiembre 2024', importe: 65000, vencimiento: '2024-09-10', estado: 'Pagada', fechaPago: '2024-09-09', medioPago: 'Transferencia', comprobanteUrl: 'comprobante_12.pdf' },
                { id: 22, nro: 9, periodo: 'Octubre 2024', importe: 70000, vencimiento: '2024-10-10', estado: 'Pagada', fechaPago: '2024-10-09', medioPago: 'Mercado Pago', comprobanteUrl: 'comprobante_13.pdf' },
                
                // Cuotas del 2025
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
            nombre: "Maria Lopez",
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
        nombre: "Secretaria Administrativa",
        dni: "00000001",
        rol: "Administrativo",
        cuotas: [] 
    };

    // Para ver como alumno:
    const [usuario] = useState(alumnos[0]);
    // Para ver como Administrativo, descomenta la línea de abajo y comenta la de arriba:
    //const [usuario] = useState(administrativa);

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
                <Footer />
            </div>
        </div>
    );
}

export default App;