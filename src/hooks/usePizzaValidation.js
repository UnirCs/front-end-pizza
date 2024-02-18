import {useEffect, useState} from "react";

/**
 * usePizzaValidation
 * Hook personalizado que permite gestionar la validación de los ingredientes de la pizza.
 * @param ingredients ingredientes activos y seleccionados por el usuario.
 * @returns {{validated: boolean}}
 */
export const usePizzaValidation = (ingredients) => {

    const [validated, setValidated] = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_GW_URL + "/ms-pizza-orders/validations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ingredients: Object.keys(ingredients)
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setValidated(data.valid);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [ingredients]);

    return {validated}

}