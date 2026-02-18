import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MyMeal } from '../../model/my-meal';
import { ApiService } from '../../services/api-service';
import { ActivatedRoute } from '@angular/router';
import { DetailsMeal } from "../details-meal/details-meal";
import { DetailsSave } from "../details-save/details-save";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-details',
  imports: [RouterLink, DetailsMeal, DetailsSave],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  isAuthenticated(): boolean { return this.authService.isAuthenticated(); }

  recetaId: string | null = null;
  receta: MyMeal | null = null;
  recetaGuardada: boolean = false;

  async ngOnInit() {
    this.recetaId = this.route.snapshot.paramMap.get('id');
    if (this.recetaId) {
      this.receta = await this.api.obtenerReceta(this.recetaId);
      this.cdr.markForCheck();
    }
  }

  actualizarEstadoGuardado(estado: boolean) {
    this.recetaGuardada = estado;
    this.cdr.markForCheck();
  }
}
