console.log("Tema 2 - Ejercicio 1 - Api Service");
// Centraliza todas las peticiones a TheMealDB.
// Esta clase es la única que usa fetch. El resto de la aplicación consume Promesas, pero no hace fetch.
class ApiService {
    API_KEY: string = "1";
    API_URL: string = `https://www.themealdb.com/api/json/v1/${this.API_KEY}`;

    // Responsabilidades
    async obtenerRecetaAleatoria(): Promise<MyMeal> {
        let receta = {} as MyMeal;
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
                receta = {
                    id: data.meals[0].idMeal,
                    name: data.meals[0].strMeal,
                    category: data.meals[0].strCategory,
                    area: data.meals[0].strArea,
                    image_medium: data.meals[0].strMealThumb,
                    ingredients: arrayIngredientes,
                };
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
        return receta;
    }

    async obtenerCategorias(): Promise<string[]> {
        const categorias: string[] = [];
        try {
            const response = await fetch(`${this.API_URL}/categories.php`);
            const data = await response.json();
            if (data.categories && data.categories.length > 0) {
                data.categories.forEach((categoria: { strCategory: string; }) => {
                    categorias.push(categoria.strCategory);
                });
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
        return categorias;
    }

    async filtrarRecetasPorCategoria(categoria: string): Promise<string[]> {
        const comidasCategoria: string[] = [];
        try {
            const response = await fetch(`${this.API_URL}/filter.php?c=${categoria}`);
            const data = await response.json();
            if (data.meals && data.meals.length > 0) {
                const desordenadas = data.meals.sort(() => Math.random() - 0.5); // Desordenar el Array
                desordenadas.forEach((categoria: { idMeal: string; }) => {
                    comidasCategoria.push(categoria.idMeal);
                });
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
        return comidasCategoria;
    }

    async obtenerReceta(id: string): Promise<MyMeal> {
        let receta = {} as MyMeal;
        try {
            const response = await fetch(`${this.API_URL}/lookup.php?i=${id}`);
            const data = await response.json();
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
                receta = {
                    id: data.meals[0].idMeal,
                    name: data.meals[0].strMeal,
                    category: data.meals[0].strCategory,
                    area: data.meals[0].strArea,
                    image_medium: data.meals[0].strMealThumb,
                    ingredients: arrayIngredientes,
                };
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
        return receta;
    }
}

// Obtener recetas por ingrediente
// Obtener detalles completos de una receta
// …
// Todas las funciones: Son asíncronas y devuelven datos en formato JSON o modelos internos. Nunca toca el DOM.

