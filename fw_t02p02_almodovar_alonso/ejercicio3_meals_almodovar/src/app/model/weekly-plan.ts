// Representa un plan semanal de un usuario.
import { WeeklyPlanDay } from "./weekly-plan-day";
export interface WeeklyPlan {
  id: string; // (YYYY-WXX)
  userId: number;
  days: WeeklyPlanDay[];
}
