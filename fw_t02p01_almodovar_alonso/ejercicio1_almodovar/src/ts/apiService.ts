console.log("Tema 2 - Ejercicio 1 - Api Service");
// Centraliza todas las peticiones a TheMealDB.
// Esta clase es la única que usa fetch. El resto de la aplicación consume Promesas, pero no hace fetch.
class ApiService {
    API_KEY: string = "1";
    API_URL: string = `https://www.themealdb.com/api/json/v1/${this.API_KEY}`;

    // Responsabilidades
    async obtenerRecetasAleatorias(): Promise<MyMeal[]> {
        let recetas: MyMeal[] = [];
        try {
            const myObject: Response = await fetch(`${this.API_URL}/random.php`);
            const data = await myObject.json();
            if (data.length != 0) {
                let arrayIngredientes: { name: string; measure: string }[] = [];
                for (let i = 1; i < 20; i++) {
                    const ingrediente = data.meals[0][`strIngredient${i}`];
                    const medida = data.meals[0][`strMeasure${i}`];
                    if (ingrediente && ingrediente.trim() !== "") {
                        const objeto = {
                            name: ingrediente,
                            measure: medida,
                        }
                        arrayIngredientes.push(objeto);
                    } else {
                        break;
                    }
                }
                const receta: MyMeal = {
                    id: data.meals[0].idMeal,
                    name: data.meals[0].strMeal,
                    category: data.meals[0].strCategory,
                    area: data.meals[0].strArea,
                    image_medium: data.meals[0].strMealThumb,
                    ingredients: arrayIngredientes,
                };
                recetas.push(receta);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
        return recetas;
    }

    async obtenerCategorias(): Promise<{ id: string; name: string }[]> {
        const categorias: { id: string; name: string }[] = [];
        try {
            const response = await fetch(`${this.API_URL}/categories.php`);
            const data = await response.json();
            if (data.categories && data.categories.length > 0) {
                data.categories.forEach((categoria: { strCategory: string; idCategory: string }) => {
                    categorias.push({
                        id: categoria.idCategory,
                        name: categoria.strCategory
                    });
                });
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
        return categorias;
    }


    // Obtener recetas por ingrediente
    // Obtener detalles completos de una receta
    // Obtener categorías disponibles
    // …
    // Todas las funciones: Son asíncronas y devuelven datos en formato JSON o modelos internos. Nunca toca el DOM.
}
