import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-meals-category',
  imports: [],
  standalone: true,
  templateUrl: './meals-category.html',
  styleUrl: './meals-category.css',
})
export class MealsCategory {
  private api = inject(ApiService);
  datos = this.api.obtenerReceta("1");
  ngOnInit() {
    console.log(this.datos);
  }
}
