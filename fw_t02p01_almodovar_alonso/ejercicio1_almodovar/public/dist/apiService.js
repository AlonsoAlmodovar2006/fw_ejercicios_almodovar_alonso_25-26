"use strict";
console.log("Tema 2 - Ejercicio 1 - Api Service");
// Centraliza todas las peticiones a TheMealDB.
// Esta clase es la única que usa fetch. El resto de la aplicación consume Promesas, pero no hace fetch.
class ApiService {
    constructor() {
        this.API_KEY = "1";
        this.API_URL = `https://www.themealdb.com/api/json/v1/${this.API_KEY}`;
        // Obtener recetas por ingrediente
        // Obtener detalles completos de una receta
        // Obtener categorías disponibles
        // …
        // Todas las funciones: Son asíncronas y devuelven datos en formato JSON o modelos internos. Nunca toca el DOM.
    }
    // Responsabilidades
    async obtenerRecetasAleatorias() {
        let recetas = [];
        try {
            const myObject = await fetch(`${this.API_URL}/random.php`);
            const data = await myObject.json();
            if (data.length != 0) {
                recetas.push(data);
            }
        }
        catch (error) {
            console.error("Error en la petición:", error);
        }
        return recetas;
    }
}
//# sourceMappingURL=apiService.js.map