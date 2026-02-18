import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AuthSession } from '../model/auth-session';
import { MyMeal } from '../model/my-meal';
import { Status, UserMeal } from '../model/user-meal';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly USER_KEY_ITEM = "usuarios";
  private readonly SESSION_KEY_ITEM = "session";
  private readonly RECIPES_KEY_ITEM = "recipesUser";

  // USUARIOS
  guardarUsuarios(users: User[]): void {
    localStorage.setItem(this.USER_KEY_ITEM, JSON.stringify(users));
  }

  obtenerUsuarios(): User[] {
    const usuarios: string | null = localStorage.getItem(this.USER_KEY_ITEM);
    if (!usuarios) return [];
    return JSON.parse(usuarios) as User[];
  }

  obtenerUsuarioPorCorreo(correoAFiltrar: string): User | undefined {
    const usuarios: User[] = this.obtenerUsuarios();
    const usuario: User | undefined = usuarios.find(user => user.email.toLowerCase() === correoAFiltrar.toLowerCase());
    return usuario;
  }

  obtenerUsuarioPorId(idAFiltrar: number): User | undefined {
    const usuarios: User[] = this.obtenerUsuarios();
    const usuario: User | undefined = usuarios.find(user => user.id === idAFiltrar);
    return usuario;
  }

  registrarNuevoUsuario(nuevoUsuario: User): boolean {
    const usuarios: User[] = this.obtenerUsuarios();
    usuarios.push(nuevoUsuario);
    this.guardarUsuarios(usuarios);
    return this.obtenerUltimoID() === nuevoUsuario.id;
  }

  obtenerUltimoID(): number {
    const usuarios: User[] = this.obtenerUsuarios();
    if (usuarios.length == 0) {
      return 0;
    } else {
      const ultimoUsuario = usuarios[usuarios.length - 1];
      return ultimoUsuario.id;
    }
  }

  obtenerEmails(): string[] {
    const usuarios: User[] = this.obtenerUsuarios();
    return usuarios.map(usuario => usuario.email);
  }

  // SESIONES
  crearSesion(usuario: AuthSession): void {
    localStorage.setItem(this.SESSION_KEY_ITEM, JSON.stringify(usuario));
  }

  obtenerSesion(): AuthSession | null {
    const user = localStorage.getItem(this.SESSION_KEY_ITEM);
    return user ? JSON.parse(user) : null;
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.SESSION_KEY_ITEM);
  }

  // CATEGORÍA FAVORITA
  guardarCategoriaFavorita(id: number, categoria: string): void {
    const usuarios: User[] = this.obtenerUsuarios();
    const index = usuarios.findIndex(u => u.id === id);

    if (index !== -1) {
      usuarios[index].favoriteCategory = categoria;
      this.guardarUsuarios(usuarios);
    }
  }

  obtenerCategoriaFavorita(id: number): string | null {
    const usuario: User | undefined = this.obtenerUsuarioPorId(id);
    return usuario?.favoriteCategory ? usuario.favoriteCategory : null;
  }

  eliminarCategoriaFavorita(id: number): void {
    const usuarios: User[] = this.obtenerUsuarios();
    const index: number = usuarios.findIndex(u => u.id === id);

    if (index !== -1) {
      usuarios[index].favoriteCategory = null;
      this.guardarUsuarios(usuarios);
    }
  }

  // Guardar y recuperar recetas del usuario
  guardarRecetasUsuarios(recetas: UserMeal[]): void {
    localStorage.setItem(this.RECIPES_KEY_ITEM, JSON.stringify(recetas));
  }

  obtenerRecetasPorUsuario(idUsuario: number): UserMeal[] {
    const recetasLS: string | null = localStorage.getItem(this.RECIPES_KEY_ITEM);
    if (!recetasLS) return [];
    const recetas = JSON.parse(recetasLS) as UserMeal[];
    const recetasUsuario = recetas.filter(recipe => recipe.userId === idUsuario);
    return recetasUsuario;
  }

  obtenerRecetaPorUsuario(idUsuario: number, idReceta: number): UserMeal | undefined {
    const recetas: UserMeal[] = this.obtenerRecetasPorUsuario(idUsuario);
    const receta: UserMeal | undefined = recetas.find(recipe => recipe.userId === idUsuario && recipe.mealId === idReceta);
    return receta;
  }

  eliminarRecetaUsuario(idUsuario: number, idReceta: number): boolean {
    const recetasLS: string | null = localStorage.getItem(this.RECIPES_KEY_ITEM);
    if (!recetasLS) return false;
    const recetas = JSON.parse(recetasLS) as UserMeal[];
    const indiceReceta: number = recetas.findIndex(recipe => recipe.mealId === idReceta && recipe.userId === idUsuario);
    if (indiceReceta !== -1) {
      recetas.splice(indiceReceta, 1);
      this.guardarRecetasUsuarios(recetas);
      return true;
    } else {
      return false;
    }
  }

  agregarDatosGuardado(estado: Status, notas: string, calificacion: number | null, idUsuario: number, idReceta: number) {
    const recetasLS: string | null = localStorage.getItem(this.RECIPES_KEY_ITEM);
    if (recetasLS) {
      const recetas = JSON.parse(recetasLS) as UserMeal[];
      const recetaUsuarioIndex = recetas.findIndex(recipeUser => recipeUser.mealId === idReceta && recipeUser.userId === idUsuario);
      if (recetaUsuarioIndex !== -1) {
        recetas[recetaUsuarioIndex].status = estado;
        recetas[recetaUsuarioIndex].notes = notas;
        recetas[recetaUsuarioIndex].rating = calificacion;
      }
      this.guardarRecetasUsuarios(recetas);
    }
  }

  // ¿Constructor?
  // Guardar y recuperar planes semanales
  // Guardar preferencias del usuario
  // …
}
