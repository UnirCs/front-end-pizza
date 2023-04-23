import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { PizzaContext } from "./components/PizzaContext";
import { PizzaRouter } from "./router/PizzaRouter";

/**
 * App
 *
 * Componente funcional principal de la aplicacion
 * Se encarga de definir la estructura basica de la aplicacion
 * Header
 *  -> Router
 *
 * Hace uso de LocalStorage (almacenamiento del navegador) para guardar el estado de la pizza
 * que esta siendo creada por el usuario.
 * De esta forma se puede recuperar las preferencias del usuario entre cargas del sitio.
 *
 * @returns
 */
function App() {
  //Clave de localstorage de esta aplicacion
  const LOCAL_STORAGE_DATA = "unir-pizzas-ingredients";

  /**
   * Intentamos recuperar informacion del localStorage.
   * Si la encontramos, asignamos dicha informacion a los ingredientes activos del usuario.
   * Si no, los ingredientes activos es un objeto vacio
   */
  const storedIngredients = localStorage.getItem(LOCAL_STORAGE_DATA);

  /**
   * El estado de este componente se define por:
   * - Los ingredientes que la aplicacion maneja.
   * - Los ingredientes que el usuario ha marcado para incluir en su pizza
   */
  const [activeIngredients, setActiveIngredients] = useState(
    storedIngredients ? JSON.parse(storedIngredients) : {}
  );
  const [ingredientsData, setIngredientsData] = useState([]);

  /**
   * Se hace uso de useEffect para definir un efecto de montaje que traerá la información de ingredientes
   * del back-end en el primer renderizado.
   */
  useEffect(() => {
    fetch(process.env.REACT_APP_GW_URL)
      .then((res) => res.json())
      .then((res) => setIngredientsData(res));
  }, []);

  /**
   * updatePizzaComposition
   * Funcion que dado un ingrediente se encarga de actualizar el estado del componente.
   * Si el ingrediente esta en la lista de activos se elimina
   * Si no, se incluye.
   * En cualquier caso se actualiza el localStorage.
   * Se hace uso del hook de estado para desencadenar un re-renderizado.
   * @param {*} ingredient
   */
  const updatePizzaComposition = (ingredient) => {
    let newIngredients = JSON.parse(JSON.stringify(activeIngredients));
    if (newIngredients[ingredient.internalName]) {
      delete newIngredients[ingredient.internalName];
    } else {
      newIngredients[ingredient.internalName] = ingredient;
    }
    localStorage.setItem(LOCAL_STORAGE_DATA, JSON.stringify(newIngredients));
    setActiveIngredients(newIngredients);
  };

  return (
    /**
     * El componente como tal esta formado unicamente por el Header y el Router. Cualquier componente
     * que se renderice a través del Router será mostrado siempre a continuación del Header.
     *
     * El Router se encuentra dentro de PizzaContext.
     * Esto quiere decir que cualquier componente por debajo de PizzaRouter (e incluso el mismo PizzaRouter)
     * tiene acceso al valor del contexto.
     *
     * En este caso el contexto se inicializa con:
     * - activeIngredients
     * - ingredientsData
     * - updatePizzaComposition
     */
    <div>
      <Header></Header>
      <PizzaContext.Provider
        value={{
          activeIngredients,
          ingredientsData,
          updatePizzaComposition,
        }}
      >
        <PizzaRouter></PizzaRouter>
      </PizzaContext.Provider>
    </div>
  );
}

export default App;
