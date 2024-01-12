import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PizzaContext } from "../components/PizzaContext";
import PedidoOK from "../assets/pedidoOk.png";

/**
 * CheckoutView
 * Vista de checkout de la aplicacion
 * Muestra los ingredientes seleccionados para la pizza y la opcion de confirmar o anular el pedido.
 *
 * @returns
 */
export const CheckoutView = () => {
  //Hook de navegacion para poder saltar a otras vistas.
  const navigate = useNavigate();

  //Hook de estado para poder re-renderizar en caso de pedido exitoso.
  const [success, setSuccess] = useState(false);

  //Hook de contexto para acceder a los ingredientes seleccionados por el usuario.
  const { activeIngredients } = useContext(PizzaContext);

  /**
   * getPrice
   * A partir de los ingredientes activos y seleccionados por el usuario
   * obtiene el precio de la pizza en €.
   * @returns precio de la pizza.
   */
  const getPrice = () => {
    console.log(activeIngredients);
    let price = 8.5;
    Object.keys(activeIngredients).forEach((element) => {
      price += activeIngredients[element].price;
    });
    return price;
  };

  return (
    <div className="checkbox">
      <div className="checkout-report">
        <h1>Pizza Personalizada</h1>
        {Object.keys(activeIngredients).length > 0 && (
          <>
            <ul>
              {
                /**
                 * Por cada uno de los elementos activos (seleccionados) del usuario
                 * Se crea un ListItem con su nombre y precio
                 */
                Object.keys(activeIngredients).map((element) => {
                  return (
                    <li key={element + "-li"}>
                      {activeIngredients[element].displayName +
                        ". Coste: " +
                        activeIngredients[element].price +
                        " €."}
                    </li>
                  );
                })
              }
              <li>Masa. Coste: 8.50 €</li>
            </ul>
            <p>
              <b>Precio total: </b>
              {getPrice() + " €."}
            </p>
          </>
        )}

        <div className="buttons">
          <button
            className="button-53"
            onClick={() => setSuccess(true)}
          >
            Confirmar
          </button>
          <button
            className="button-53"
            onClick={() => navigate("/")}
          >
            Volver
          </button>
        </div>
        {success && (
          <div>
            <img src={PedidoOK} height="400px" alt="PedidoOK"></img>
            <p>Pedido confirmado!</p>
          </div>
        )}
      </div>
    </div>
  );
};
