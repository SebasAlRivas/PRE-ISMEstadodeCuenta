import './UserInfo.css'; // Importa los estilos de este componente

/**
 * @description
 * Componente que muestra la información del alumno en la cabecera.
 * @param {object} datosAlumno Objeto con los datos del alumno (nombre, dni).
 */
function UserInfo({ datosAlumno }) {
    return (
        <div className="info-usuario">
            <h1 className="titulo-app">Estado de Cuenta del Alumno</h1>
            <div className="info-alumno">
                <span>{datosAlumno.nombre}</span>
                <span>DNI: {datosAlumno.dni}</span>
            </div>
        </div>
    );
}

export default UserInfo;