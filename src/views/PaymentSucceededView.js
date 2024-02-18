import React from "react";
import PedidoOK from "../assets/pedidoOk.png";
import useRedirection from "../hooks/useRedirection";

/**
 * CheckoutView
 * Vista de checkout de la aplicacion
 * Muestra los ingredientes seleccionados para la pizza y la opcion de confirmar o anular el pedido.
 *
 * @returns
 */
export const PaymentSucceededView = () => {

    useRedirection("/", 5000);

    return (
        <div className="checkbox">
            <div className="checkout-report">
                <div>
                    <img src={PedidoOK} height="400px" alt="PedidoOK"></img>
                    <p>Pedido confirmado!</p>
                </div>
            </div>
        </div>
    );
};
