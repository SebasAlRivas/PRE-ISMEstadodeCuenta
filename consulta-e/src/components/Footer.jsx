import React, { useState } from 'react';

import LogoISDM from '../assets/logo_isdm.png'; 

/**
 * Componente funcional para el pie de página.
 * Incluye el logo y muestra el año actual de forma dinámica.
 */
const Footer = () => {
  // Estado para almacenar el año actual.
  const [currentYear] = useState(new Date().getFullYear());

  // Estilos del contenedor principal del footer
  const footerStyle = {
    backgroundColor: '#970021ff', 
    color: 'white',
    padding: '15px 0',
    textAlign: 'center',
    width: '100%',
    boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.2)',
    fontSize: '0.85em',
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    gap: '5px', 
    marginTop: 'auto',  
  };
  
  // Estilos del contenedor del logo y texto de copyright
  const copyrightContainerStyle = {
    display: 'flex',
    alignItems: 'center', 
    gap: '10px', 
  };

  // Estilo específico para la imagen del logo
  const logoStyle = {
    height: '50px', 
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
              src={LogoISDM} 
              alt="Logo ISDM" 
              style={logoStyle} 
          />
          <p style={{ margin: 0 }}>
            © {currentYear} Instituo Superior del Milagro.
          </p>
      </div>

      {/* Contenedor de Enlaces Legales/Contacto */}
      <div>
        <a href="https://www.facebook.com/InstitutoSuperiorMilagrotica" style={linkStyle}>
          Facebook
        </a>
        &nbsp;|&nbsp;
        <a href="https://www.instagram.com/institutosuperiormilagro/" style={linkStyle}>
          Instagram
        </a>
        <p>
          Alvarado 951, Salta Capital
        </p>
      </div>
    </footer>
  );
};

export default Footer;