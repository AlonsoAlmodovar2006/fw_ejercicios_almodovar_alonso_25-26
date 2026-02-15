import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { MyMeal } from '../../model/my-meal';
import { User } from '../../model/user';
import { NgOptimizedImage } from "@angular/common";
import { AuthService } from '../../services/auth-service';
import { StorageService } from '../../services/storage-service';
import { UserMeal, Status } from '../../model/user-meal';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-meals-save',
  imports: [NgOptimizedImage, RouterLink],
  standalone: true,
  templateUrl: './meals-save.html',
  styleUrl: './meals-save.css',
})
export class MealsSave {
  private cdr = inject(ChangeDetectorRef);
  private localStorage = inject(StorageService);
  private authService = inject(AuthService);
  isAuthenticated(): boolean { return this.authService.isAuthenticated() }
  private api = inject(ApiService);

  recetasGuardadas: UserMeal[] = [];
  recetasGuardadasUsuario: MyMeal[] = [];
  usuario: User | undefined;

  async ngOnInit() {
    this.usuario = this.authService.obtenerUsuarioAutenticado();
    if (this.usuario?.id) {
      this.recetasGuardadas = this.localStorage.obtenerRecetasPorUsuario(this.usuario.id)
        .sort((a, b) => new Date(b.saveDate).getTime() - new Date(a.saveDate).getTime()).slice(0, 4); // Sacar solo las 4 últimas
      for (const recetaGuardada of this.recetasGuardadas) {
        const receta: MyMeal | null = await this.api.obtenerReceta(`${recetaGuardada.mealId}`);
        this.cdr.markForCheck();
        if (receta) {
          this.recetasGuardadasUsuario.push(receta);
        }
      }
    }
  }
}
