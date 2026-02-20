import { Injectable, inject, signal, WritableSignal, computed, effect } from '@angular/core';
import { StorageService } from './storage-service';
import { Status, UserMeal } from '../model/user-meal';
import { MyMeal } from '../model/my-meal';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class RecetasFavoritasService {
  private localStorage = inject(StorageService);
  private auth = inject(AuthService);

  // 1. Cargamos TODOS los datos existentes para no machacar a otros usuarios
  recetasFavoritas = signal<UserMeal[]>(this.localStorage.obtenerTodasLasRecetas());

  // 2. Creamos una Signal computada solo para los favoritos del usuario logueado
  misFavoritos = computed(() => {
    const idUsuarioActual = this.auth.obtenerSesion()?.userId; // Ajusta según tu AuthService
    return this.recetasFavoritas().filter(r => r.userId === idUsuarioActual);
  });

  // 3. Las últimas 4 del usuario actual
  ultimasCuatro = computed(() => [...this.misFavoritos()].reverse().slice(0, 4));

  constructor() {
    effect(() => {
      this.localStorage.guardarRecetasUsuarios(this.recetasFavoritas());
    });
  }

  alternarFavorito(receta: MyMeal, userId: number) {
    const indice = this.recetasFavoritas().findIndex(r => r.mealId === receta.id && r.userId === userId);
    if (indice === -1) {
      const nueva: UserMeal = {
        userId: userId,
        mealId: receta.id,
        saveDate: new Date(),
        status: Status.QUIERO_HACERLA,
        notes: null,
        rating: null,
      };
      this.recetasFavoritas.update(recetasActuales => [...recetasActuales, nueva]);
    } else {
      this.recetasFavoritas.update(recetasActuales => recetasActuales.filter((_, i) => i !== indice));
    }
  }
}
