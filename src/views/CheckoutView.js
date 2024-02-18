import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PizzaContext} from "../components/PizzaContext";
import {usePizzaValidation} from "../hooks/usePizzaValidation";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {loadStripe} from "@stripe/stripe-js";
import {EmbeddedCheckout, EmbeddedCheckoutProvider} from "@stripe/react-stripe-js";
import {useCheckout} from "../hooks/useCheckout";

/**
 * CheckoutView
 * Vista de checkout de la aplicacion
 * Muestra los ingredientes seleccionados para la pizza y la opcion de confirmar o anular el pedido.
 *
 * @returns
 */
export const CheckoutView = () => {

    // Carga de la clave publica de Stripe
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const navigate = useNavigate();
    const {activeIngredients} = useContext(PizzaContext);

    // Validacion de los ingredientes seleccionados
    const [validated] = useState(usePizzaValidation(activeIngredients));
    const [paymentPlatform, setPaymentPlatform] = useState("DELEGATED");

    // Hook de checkout
    const {clientSecret, getPrice, checkout} = useCheckout(paymentPlatform, activeIngredients);

    const handlePaymentPlatformChange = (event, newAlignment) => {
        setPaymentPlatform(newAlignment);
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

                <div>
                    <p>Elige la plataforma de pago</p>
                    <Select defaultValue="DELEGATED" onChange={handlePaymentPlatformChange}>
                        <Option value="DELEGATED">Stripe - Checkout Delegado</Option>
                        <Option value="EMBED">Stripe - Checkout Integrado</Option>
                    </Select>
                </div>
                <br/>

                {
                    paymentPlatform === "DELEGATED" && (
                        <div className="buttons">
                            <button
                                className="button-53"
                                onClick={() => checkout()}
                                disabled={!validated}
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
                    )
                }

                {
                    paymentPlatform === "EMBED" && (
                        <div id="checkout">
                            {clientSecret && (
                                <EmbeddedCheckoutProvider
                                    stripe={stripePromise}
                                    options={{clientSecret}}
                                >
                                    <EmbeddedCheckout/>
                                </EmbeddedCheckoutProvider>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    );
};
