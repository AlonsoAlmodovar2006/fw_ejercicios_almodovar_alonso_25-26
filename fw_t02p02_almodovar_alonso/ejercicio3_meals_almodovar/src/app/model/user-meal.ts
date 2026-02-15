// Representa la relación entre un usuario y una receta guardada.
// Si una receta no está en UserMeal, el usuario no la ha guardado.
export enum Status {
  QUIERO_HACERLA,
  LA_HE_HECHO
}
export interface UserMeal {
  userId: number;
  mealId: number; // Debe Coincidir con el idMeal de la API
  saveDate: Date;
  status: Status;
  notes: string | null;
  rating: number | null;
}
