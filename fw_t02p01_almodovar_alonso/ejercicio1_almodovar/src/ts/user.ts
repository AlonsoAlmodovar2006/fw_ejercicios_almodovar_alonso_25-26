console.log("Tema 2 - Ejercicio 1 - User");
// Representa un usuario registrado en la aplicación.
interface User {
    id: number; // Incremental
    name: string;
    email: string;
    password: string; // Texto Plano y en localStorage
    favoriteCategory?: string; // No es Obligatorio
}