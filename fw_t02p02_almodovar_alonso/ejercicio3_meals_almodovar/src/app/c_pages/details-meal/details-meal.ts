import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyMeal } from '../../model/my-meal';
import { ApiService } from '../../services/api-service';
import { AuthService } from '../../services/auth-service';
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-details-meal',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './details-meal.html',
  styleUrl: './details-meal.css',
})
export class DetailsMeal {
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private authService = inject(AuthService);
  isAuthenticated(): boolean { return this.authService.isAuthenticated() }

  recetaId: string | null = null;
  receta: MyMeal | null = null;

  async ngOnInit() {
    this.recetaId = this.route.snapshot.paramMap.get('id');
    if (this.recetaId) {
      this.receta = await this.api.obtenerReceta(this.recetaId);
      this.cdr.markForCheck();
    }
  }
}
