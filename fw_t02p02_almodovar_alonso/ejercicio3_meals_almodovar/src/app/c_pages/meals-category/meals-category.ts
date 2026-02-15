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
  selector: 'app-meals-category',
  imports: [NgOptimizedImage, RouterLink],
  standalone: true,
  templateUrl: './meals-category.html',
  styleUrl: './meals-category.css',
})
export class MealsCategory {
  private cdr = inject(ChangeDetectorRef);
  private api = inject(ApiService);
  private authService = inject(AuthService);
  isAuthenticated(): boolean { return this.authService.isAuthenticated() }
  private localStorage = inject(StorageService);

  opciones: string[] = [];
  async rellenarOpciones() {
    this.opciones = await this.api.obtenerCategorias();
    this.cdr.markForCheck();
  }

  recetas: MyMeal[] = [];
  usuario: User | undefined = this.authService.obtenerUsuarioAutenticado();
  categoriaFavorita: string = "0";
  categoriaSeleccionada: string = this.categoriaFavorita;
  recetasFavoritas: UserMeal[] = [];

  async pintarRecetas(valorSelect: string) {
    if (valorSelect !== "0") {
      const recetasCategoria: string[] = await this.api.filtrarRecetasPorCategoria(valorSelect);
      for (let i = 0; i < recetasCategoria.length && i < 8; i++) {
        const receta = await this.api.obtenerReceta(recetasCategoria[i]);
        if (receta) this.recetas.push(receta);
      }
    } else {
      for (let i = 0; i < 8; i++) {
        const receta = await this.api.obtenerRecetaAleatoria();
        if (receta) this.recetas.push(receta);
      }
    }
    this.cdr.markForCheck();
  }

  ngOnInit() {
    if (this.usuario?.id) {
      this.recetasFavoritas = this.localStorage.obtenerRecetasPorUsuario(this.usuario?.id);
      this.categoriaFavorita = this.localStorage.obtenerCategoriaFavorita(this.usuario.id) ?? "0";
      this.categoriaSeleccionada = this.categoriaFavorita;
    }
    this.rellenarOpciones();
    this.pintarRecetas(this.categoriaFavorita);
  }

  onCategoriasSelectChange(event: Event) {
    this.recetas = [];
    const select = event.target as HTMLSelectElement;
    this.categoriaSeleccionada = select.value;
    this.pintarRecetas(this.categoriaSeleccionada);
  }

  onFavorite() {
    if (!this.usuario?.id) return;
    if (this.categoriaSeleccionada === this.categoriaFavorita) {
      this.localStorage.eliminarCategoriaFavorita(this.usuario.id);
      this.categoriaFavorita = "0";
    } else {
      this.categoriaFavorita = this.categoriaSeleccionada;
      this.localStorage.guardarCategoriaFavorita(this.usuario.id, this.categoriaSeleccionada);
      this.usuario = this.authService.obtenerUsuarioAutenticado();
    }
  }

  onSave(receta: MyMeal) {
    if (!this.usuario?.id) return;
    const indice = this.recetasFavoritas.findIndex(r => r.mealId === receta.id && r.userId === this.usuario?.id);
    if (indice === -1) {
      const nueva: UserMeal = {
        userId: this.usuario.id,
        mealId: receta.id,
        saveDate: new Date(),
        status: Status.QUIERO_HACERLA,
        notes: null,
        rating: null,
      };
      this.recetasFavoritas.push(nueva);
    } else {
      this.recetasFavoritas.splice(indice, 1);
    }
    this.localStorage.guardarRecetasUsuarios(this.recetasFavoritas);
  }

  isSaved(recetaId: number): boolean {
    return this.recetasFavoritas.some(fav => fav.mealId === recetaId);
  }
}
