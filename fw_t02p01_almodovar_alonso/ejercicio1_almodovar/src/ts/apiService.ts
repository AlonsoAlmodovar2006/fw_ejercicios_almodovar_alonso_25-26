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
            const myObject:Response = await fetch(`${this.API_URL}/random.php`);
            const data = await myObject.json();
            if (data.length != 0) {
                recetas.push(data);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
        return recetas;
    }
    // Obtener recetas por ingrediente
    // Obtener detalles completos de una receta
    // Obtener categorías disponibles
    // …
    // Todas las funciones: Son asíncronas y devuelven datos en formato JSON o modelos internos. Nunca toca el DOM.
}
