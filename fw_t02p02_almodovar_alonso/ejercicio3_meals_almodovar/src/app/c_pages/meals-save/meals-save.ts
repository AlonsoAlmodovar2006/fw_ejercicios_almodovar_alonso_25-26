import { Component, inject, effect, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { MyMeal } from '../../model/my-meal';
import { NgOptimizedImage } from "@angular/common";
import { AuthService } from '../../services/auth-service';
import { RouterLink } from "@angular/router";
import { RecetasFavoritasService } from '../../services/recetas-favoritas-service';
@Component({
  selector: 'app-meals-save',
  imports: [NgOptimizedImage, RouterLink],
  standalone: true,
  templateUrl: './meals-save.html',
  styleUrl: './meals-save.css',
})
export class MealsSave {
  private authService = inject(AuthService);
  isAuthenticated(): boolean { return this.authService.isAuthenticated() }
  private api = inject(ApiService);
  private favoritosService = inject(RecetasFavoritasService);

  recetasVisualizar = this.favoritosService.ultimasCuatro;
  recetasDetalladas = signal<MyMeal[]>([]);

  constructor() {
    effect(async () => { 
      const ids = this.favoritosService.ultimasCuatro();
      const detalles: MyMeal[] = [];

      for (const fav of ids) {
        const data = await this.api.obtenerReceta(`${fav.mealId}`);
        if (data) detalles.push(data);
      }

      this.recetasDetalladas.set(detalles);
    }, { allowSignalWrites: true });
  }
}
