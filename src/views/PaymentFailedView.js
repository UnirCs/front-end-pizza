import React from "react";
import PedidoKO from "../assets/pedidoKo.png";
import useRedirection from "../hooks/useRedirection";

/**
 * CheckoutView
 * Vista de checkout de la aplicacion
 * Muestra los ingredientes seleccionados para la pizza y la opcion de confirmar o anular el pedido.
 *
 * @returns
 */
export const PaymentFailedView = () => {

    useRedirection("/", 5000);

    return (
        <div className="checkbox">
            <div className="checkout-report">
                <div>
                    <img src={PedidoKO} height="400px" alt="PedidoOK"></img>
                    <p>Ha habido algún error en el pago :(</p>
                    <p>Será redirigido a la página principal en unos segundos</p>
                </div>
            </div>
        </div>
    );
};
