console.log("Tema 2 - Ejercicio 1 - User Mini Meal");
// Representa la mínima información de una receta obtenida de la API en algún momento y que el usuario ha usado en un plan semanal
// No es necesario que las recetas del plan semanal estén guardadas por ese usuario
// Así evitamos tener que estar haciendo peticiones constantes a la API en la sección de planes semanales
// Es una especie de caché
// Cuando se borra un plan semanal, no es necesario refrescar la caché
interface UserMiniMeal {
    id: number; // Debe Coincidir con el idMeal de la API
    name: string;
    image_small: string;
}
// Si falta información en algún momento, se consulta a la API y se cachea.