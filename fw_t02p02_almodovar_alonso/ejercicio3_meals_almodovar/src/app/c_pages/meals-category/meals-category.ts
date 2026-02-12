import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { MyMeal } from '../../model/my-meal';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-meals-category',
  imports: [NgOptimizedImage],
  standalone: true,
  templateUrl: './meals-category.html',
  styleUrl: './meals-category.css',
})
export class MealsCategory {
  private cdr = inject(ChangeDetectorRef);

  private api = inject(ApiService);
  opciones: string[] = [];
  recetas: MyMeal[] = [];

  async rellenarOpciones() {
    this.opciones = await this.api.obtenerCategorias();
    this.cdr.markForCheck();
  }

  async pintarRecetas(valorSelect: string) {
    if (valorSelect !== "0") {
      const categoriaSeleccionada: string = valorSelect;
      const recetasCategoria: string[] = await this.api.filtrarRecetasPorCategoria(categoriaSeleccionada);
      for (let i = 0; i < recetasCategoria.length && i < 8; i++) {
        const receta = await this.api.obtenerReceta(recetasCategoria[i]);
        if (receta) this.recetas.push(receta);
        console.log(this.recetas);
      }
    } else {
      for (let i = 0; i < 8; i++) {
        const receta = await this.api.obtenerRecetaAleatoria();
        if (receta) this.recetas.push(receta);
      }
    }
    this.cdr.markForCheck();
  }

  onCategoriasSelectChange(event: Event) {
    this.recetas = [];
    const select = event.target as HTMLSelectElement;
    this.pintarRecetas(select.value);
  }

  ngOnInit() {
    this.rellenarOpciones();
    this.pintarRecetas("0");
  }
}
