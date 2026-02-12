export interface User {
  id: number; // Incremental
  name: string;
  email: string;
  password: string; // Texto Plano y en localStorage
  favoriteCategory?: string; // No es Obligatorio
}
