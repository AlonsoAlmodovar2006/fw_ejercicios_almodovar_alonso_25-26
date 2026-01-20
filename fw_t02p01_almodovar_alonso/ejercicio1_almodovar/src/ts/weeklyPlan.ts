console.log("Tema 2 - Ejercicio 1 - Weekly Plan");
// Representa un plan semanal de un usuario.
interface WeeklyPlan {
    id:string; // (YYYY-WXX)
    userId: number;
    days: WeeklyPlanDay[];
}
