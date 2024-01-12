import React, { useContext } from "react";
import Base from "../assets/PizzaBase.png";
import { useNavigate } from "react-router-dom";
import { BuildIngredientImage } from "../components/BuildIngredientImage";
import { BuildIngredientOption } from "../components/BuildIngredientOption";
import { PizzaContext } from "../components/PizzaContext";
import Spinner from "react-spinner-material";

/**
 * BuildView
 * Vista de composicion de pizza de la aplicacion
 * Muestra una imagen con la base de la pizza y todos los ingredientes disponibles.
 * El usuario va eligiendo los ingredientes de su pizza.
 *
 * @returns
 */
export const BuildView = () => {
  //Hook de navegacion para poder ir a otras vistas.
  let navigate = useNavigate();

  //Hook de contexto para acceder a todos los ingredientes que la aplicacion conoce.
  const { ingredientsData } = useContext(PizzaContext);

  return (
    <>
      <div id="container" className="container">
        <div className="container__images-list">
          <div className="container__images-list__items">
            {
              /**
               * Por cada ingrediente conocido
               * Se crea un BuildIngredientImage con la informacion del ingrediente
               */
              ingredientsData.length > 0 &&
                ingredientsData.map((element) => {
                  return (
                    <BuildIngredientImage
                      key={element.internalName}
                      ingredient={element}
                    ></BuildIngredientImage>
                  );
                })
            }
            <img src={Base} alt="Pizza base" height="100%" width="100%"></img>
          </div>
        </div>

        <div className="container__images-list">
          {
            /**
             * Por cada ingrediente conocido
             * Se crea un BuildIngredientOption con la informacion del ingrediente
             *
             * Si los datos aun no se han recogido (lista de size 0) del back-end, se muestra un Spinner.
             */
            ingredientsData.length > 0 ? (
              ingredientsData.map((element) => {
                return (
                  <BuildIngredientOption
                    key={element.internalName}
                    ingredient={element}
                  ></BuildIngredientOption>
                );
              })
            ) : (
              <Spinner
                radius={100}
                color={"#654321"}
                stroke={15}
                visible={true}
              />
            )
          }
        </div>
      </div>
      <div className="center">
        <button
          className="button-53"
          onClick={() => navigate("/checkout")}
        >
          Ir a Checkout
        </button>
      </div>
    </>
  );
};
