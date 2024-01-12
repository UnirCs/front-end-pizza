import React, { useContext } from "react";
import { PizzaContext } from "./PizzaContext";
import Vegan from "../assets/vegan-icon.png";
import Question from "../assets/question.png";
import Spicy from "../assets/spicy.png";

/**
 * BuildIngredientOption
 * Componente funcional encargado de representar una opción de una lista de selección de ingredientes para las pizzas.
 * @param {*} ingredient - Ingrediente para el que se quiere construir la opción.
 * @returns
 */
export const BuildIngredientOption = ({ ingredient }) => {

  //Obtenemos la lista de ingredientes activos (visibles) y el callBack de actualizacion de pizzas a traves del contexto.
  const { activeIngredients, updatePizzaComposition } =
    useContext(PizzaContext);

  //Este metodo se utiliza para mostrar un popup al hacer click
  const showDescription = () => {
    document
      .getElementById(ingredient.internalName + "-popup")
      .classList.toggle("show");
  };

  
  let checked = activeIngredients[ingredient.internalName] ? true : false;

  return (
    <>
      <div className="checkbox">
        <label className="container-checkbox">
          {ingredient.displayName + "(" + ingredient.price + " €)"}
          <input
            type="checkbox"
            checked={checked}
            name={ingredient.internalName}
            onChange={() => updatePizzaComposition(ingredient)}
          />
          <span className="checkmark"></span>
        </label>
        <div className="logos">
          {ingredient.vegan && (
            <div>
              <span>
                <img className="logo" src={Vegan} alt="Vegan logo"></img>
              </span>
            </div>
          )}
          {ingredient.spicy && (
            <div>
              <span>
                <img className="logo" src={Spicy} alt="Spicy logo"></img>
              </span>
            </div>
          )}
          <div className="popup" onClick={showDescription}>
            <img className="logo" src={Question} alt="Question logo"></img>
            <span className="popuptext" id={ingredient.internalName + "-popup"}>
              {ingredient.description}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
