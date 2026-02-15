// Representa un día concreto dentro de un plan semanal
export interface WeeklyPlanDay {
    day:string // Lunes, Martes, Miércoles...
    lunchMealId?: number; // Debe Coincidir con el idMeal de la API
    dinnerMealId?: number; // Debe Coincidir con el idMeal de la API
}
