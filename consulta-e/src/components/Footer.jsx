import React, { useState } from 'react';
// ----------------------------------------------------
// ✅ RUTA CORREGIDA: Subir de 'components' (..) y entrar a 'assets'.
import LogoISDM from '../assets/logo_isdm.png'; 
// ----------------------------------------------------

/**
 * Componente funcional para el pie de página.
 * Incluye el logo y muestra el año actual de forma dinámica.
 */
const Footer = () => {
  // Estado para almacenar el año actual.
  const [currentYear] = useState(new Date().getFullYear());

  // Estilos del contenedor principal del footer
  const footerStyle = {
    backgroundColor: '#282c34', 
    color: 'white',
    padding: '15px 0',
    textAlign: 'center',
    position: 'fixed', // Fija el footer en la parte inferior de la ventana
    bottom: 0,
    width: '100%',
    boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.2)',
    fontSize: '0.85em',
    zIndex: 100,
    // Estilos Flexbox para centrar el contenido principal
    display: 'flex',
    flexDirection: 'column', // Apila el copyright/logo sobre los enlaces
    alignItems: 'center',
    gap: '5px', 
  };
  
  // Estilos del contenedor del logo y texto de copyright
  const copyrightContainerStyle = {
    display: 'flex',
    alignItems: 'center', // Alinea verticalmente el logo y el texto
    gap: '10px', // Espacio entre el logo y el texto
  };

  // Estilo específico para la imagen del logo
  const logoStyle = {
    height: '30px', // Tamaño del logo (ajusta este valor si es muy pequeño/grande)
    width: 'auto',
  };

  // Estilos para los enlaces de texto
  const linkStyle = {
    color: '#61dafb', 
    textDecoration: 'none',
    margin: '0 15px',
    fontWeight: 'bold'
  };

  return (
    <footer style={footerStyle}>
      
      {/* Contenedor del Logo y Texto de Copyright */}
      <div style={copyrightContainerStyle}>
          <img 
              src={LogoISDM} // Fuente de la imagen importada
              alt="Logo ISDM" 
              style={logoStyle} // Estilos para el tamaño
          />
          <p style={{ margin: 0 }}>
            © {currentYear} Consulta-E. Todos los derechos reservados.
          </p>
      </div>

      {/* Contenedor de Enlaces Legales/Contacto */}
      <div>
        <a href="#politica" style={linkStyle}>
          Política de Privacidad
        </a>
        &nbsp;|&nbsp;
        <a href="#terminos" style={linkStyle}>
          Términos de Servicio
        </a>
        &nbsp;|&nbsp;
        <a href="mailto:contacto@consulta-e.com" style={linkStyle}>
          Contáctanos
        </a>
      </div>
    </footer>
  );
};

export default Footer;