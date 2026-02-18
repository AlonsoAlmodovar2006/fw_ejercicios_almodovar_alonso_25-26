import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MyMeal } from '../../model/my-meal';
import { AuthService } from '../../services/auth-service';
import { StorageService } from '../../services/storage-service';
import { UserMeal, Status } from '../../model/user-meal';
import { NgOptimizedImage } from "@angular/common";
@Component({
  selector: 'app-details-meal',
  imports: [NgOptimizedImage], // RouterLink
  templateUrl: './details-meal.html',
  styleUrl: './details-meal.css',
})
export class DetailsMeal implements OnChanges {
  private authService = inject(AuthService);
  private localStorage = inject(StorageService);

  @Input() receta: MyMeal | null = null;
  @Output() guardadoChange = new EventEmitter<boolean>();
  estaGuardada: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['receta'] && this.receta) {
      this.comprobarSiGuardada();
    }
  }

  private comprobarSiGuardada(): void {
    const sesion = this.authService.obtenerSesion();
    if (sesion && this.receta) {
      const guardada: UserMeal | undefined = this.localStorage.obtenerRecetaPorUsuario(sesion.userId, this.receta.id);
      this.estaGuardada = guardada ? true : false;
      this.guardadoChange.emit(this.estaGuardada);
    }
  }

  onGuardar(): void {
    const sesion = this.authService.obtenerSesion();
    if (!sesion || !this.receta) return;
    if (this.estaGuardada) {
      this.localStorage.eliminarRecetaUsuario(sesion.userId, this.receta.id);
      this.estaGuardada = false;
    } else {
      const recetasUsuario: UserMeal[] = this.localStorage.obtenerRecetasPorUsuario(sesion.userId);
      const nueva: UserMeal = {
        userId: sesion.userId,
        mealId: this.receta.id,
        saveDate: new Date(),
        status: Status.QUIERO_HACERLA,
        notes: null,
        rating: null
      };
      recetasUsuario.push(nueva);
      this.localStorage.guardarRecetasUsuarios(recetasUsuario);
      this.estaGuardada = true;
    }
    this.guardadoChange.emit(this.estaGuardada);
  }
}
