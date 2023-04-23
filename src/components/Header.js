import React from "react";
import Logo from "../assets/Logo2.png";

/**
 * Header
 * Componente funcional que representa el header de la aplicacion
 * Se debe ver en todas las vistas
 * @returns
 */
export const Header = () => {
  return (
    <div className="header">
      <div className="header__content center">
        <div>
          <img src={Logo} alt="unirLogo" height="70px" />
        </div>
      </div>
    </div>
  );
};
