import React, { useContext } from "react";
import { motion } from "framer-motion";
import { PizzaContext } from "./PizzaContext";

/**
 * BuildIngredientImage
 * Componente funcional encargado de representar la imagen asociada a un ingrediente de las pizzas.
 * Se usa framer-motion para las animaciones.
 * @param {*} ingredient - Ingrediente sobre el cual se va a construir la imagen.
 * @returns
 */
export const BuildIngredientImage = ({ ingredient }) => {

  //Obtenemos la lista de ingredientes activos (visibles) a traves del contexto.
  const { activeIngredients } = useContext(PizzaContext);

  let className = "ingredients";

  //Animacion por defecto
  let animationEffects = {
    y: activeIngredients[ingredient.internalName] ? 100 : -100,
    opacity: activeIngredients[ingredient.internalName] ? 1 : 0,
  };

  //Transicion por defecto
  let transition = {
    duration: 1,
    type: "spring",
  };

  //En caso de que el ingrediente sea una base, las animaciones son algo diferentes
  if (ingredient.internalName.includes("base")) {
    className += " base";
    animationEffects = {
      ...animationEffects,
      scale: activeIngredients[ingredient.internalName] ? 1 : 0,
    };
    transition = {
      ...transition,
      type: "spring",
      stiffness: 100,
    };
  }

  /**
   * Se crea el componente funcional usando framer-motion.
   * Obtenemos el id, imagen y texto del ingrediente recibido como argumento
   */
  return (
    <motion.div
      id={ingredient.internalName}
      initial={{ opacity: 0 }}
      animate={animationEffects}
      transition={transition}
      className={className}
    >
      <img
        src={ingredient.base64Img}
        alt={ingredient.internalName}
        height="100%"
        width="100%"
      ></img>
    </motion.div>
  );
};
