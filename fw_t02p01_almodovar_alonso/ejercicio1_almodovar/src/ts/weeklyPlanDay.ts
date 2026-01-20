console.log("Tema 2 - Ejercicio 1 - Weekly Plan Day");
// Representa un día concreto dentro de un plan semanal
interface WeeklyPlanDay {
    day:string // Lunes, Martes, Miércoles...
    lunchMealId?: number; // Debe Coincidir con el idMeal de la API
    dinnerMealId?: number; // Debe Coincidir con el idMeal de la API
}