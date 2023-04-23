import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckoutView } from "../views/CheckoutView";
import { BuildView } from "../views/BuildView";

/**
 * PizzaRouter
 * Enrutador de la aplicacion
 * Definimos dentro de él las rutas que nuestra aplicacion va a manejar.
 * @returns
 */
export const PizzaRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/checkout" element={<CheckoutView />} />
        <Route path="/" element={<BuildView />} />
      </Routes>
    </BrowserRouter>
  );
};
