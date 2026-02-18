import { Component, inject, Input } from '@angular/core';
import { MyMeal } from '../../model/my-meal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserMeal, Status } from '../../model/user-meal';
import { StorageService } from '../../services/storage-service';
import { AuthService } from '../../services/auth-service';
import { AuthSession } from '../../model/auth-session';
@Component({
  selector: 'app-details-save',
  imports: [FormsModule, CommonModule],
  templateUrl: './details-save.html',
  styleUrl: './details-save.css',
})
export class DetailsSave {
  private localStorage = inject(StorageService);
  private AuthService = inject(AuthService);

  @Input() receta: MyMeal | null = null;
  usuario: AuthSession | null = this.AuthService.obtenerSesion();
  recetaUsuario: UserMeal | undefined = undefined;
  dateFormatted: string | undefined = undefined;

  saveForm = {
    status: Status.QUIERO_HACERLA,
    notes: "",
    rating: null as number | null,
  };

  ngOnInit() {
    if (this.usuario && this.receta) {
      this.recetaUsuario = this.localStorage.obtenerRecetaPorUsuario(this.usuario.userId, this.receta.id);
      this.dateFormatted = this.recetaUsuario?.saveDate.toString().split("T")[0];
      if (this.recetaUsuario) {
        this.saveForm.status = this.recetaUsuario.status;
        this.saveForm.notes = this.recetaUsuario.notes ?? "";
        this.saveForm.rating = this.recetaUsuario.rating ?? null;
      }
    }
  }

  submitSave() {
    if (!this.usuario || !this.receta) return;
    if (this.saveForm.status === Status.LA_HE_HECHO && (this.saveForm.rating === null || this.saveForm.rating < 1 || this.saveForm.rating > 5)) return;
    if (this.recetaUsuario) {
      this.localStorage.agregarDatosGuardado(this.saveForm.status, this.saveForm.notes, this.saveForm.rating, this.recetaUsuario?.userId, this.recetaUsuario?.mealId);
    }
  }
}
