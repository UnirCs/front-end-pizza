import {useEffect, useState} from "react";

/**
 * useCheckout
 * Hook personalizado que permite gestionar el proceso de pago de la pizza.
 * @param paymentPlatform plataforma de pago seleccionada por el usuario.
 * @param ingredients ingredientes activos y seleccionados por el usuario.
 * @returns {{clientSecret: string, checkout: checkout, getPrice: (function(): number)}}
 */
export const useCheckout = (paymentPlatform, ingredients, ) => {

    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if(paymentPlatform === "EMBED")
            checkout();
    }, [paymentPlatform]);

    /**
     * getPrice
     * A partir de los ingredientes activos y seleccionados por el usuario
     * obtiene el precio de la pizza en €.
     * @returns precio de la pizza.
     */
    const getPrice = () => {
        let price = 8.5;
        Object.keys(ingredients).forEach((element) => {
            price += ingredients[element].price;
        });
        return price;
    };

    /**
     * checkout
     * Realiza la petición al backend para obtener el clientSecret en caso de ser pago embed.
     * En caso de ser pago redireccionado, redirige al usuario a la pasarela de pago.
     */
    const checkout = () => {
        fetch(process.env.REACT_APP_GW_URL + "/ms-pizza-orders/payments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ingredients: Object.keys(ingredients),
                price: getPrice(),
                product: "prod_Pa2CTaagFh4Brw",
                checkoutType: paymentPlatform
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (paymentPlatform === "EMBED") {
                    setClientSecret(data.clientSecret);
                } else {
                    window.alert("A continuación será redirigido a la pasarela de pago. Introduzca los datos de su tarjeta para completar el pedido.");
                    window.location.href = data.url;
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    return {clientSecret, getPrice, checkout}
}