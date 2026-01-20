console.log("Tema 2 - Ejercicio 1 - My Meal");
// Representa la información de una receta que la aplicación necesita mostrar en la interfaz de usuario
// Esta interfaz no coincide con el JSON completo devuelto por la API, sino que es una versión reducida y adaptada a las necesidades de la aplicación
// Se utilizará para transformar los datos recibidos de la API y evitar trabajar directamente con estructuras externas complejas
// No se almacena en LocalStorage
interface MyMeal {
    id: number;
    name: string;
    category: string;
    area: string;
    image_medium: string;
    ingredients: { name: string, measure: string }[]; // Los ingredientes deben ir ordenados alfabéticamente por nombre
}
// El JSON recibido de la API debe transformarse a un objeto que cumpla la interfaz MyMeal antes de ser utilizado por la aplicación.