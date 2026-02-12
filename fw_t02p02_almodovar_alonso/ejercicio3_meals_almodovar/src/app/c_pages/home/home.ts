import { Component, inject } from '@angular/core';
import { MealsCategory } from '../meals-category/meals-category';
import { MealsSave } from '../meals-save/meals-save';
@Component({
  selector: 'app-home',
  imports: [MealsCategory, MealsSave],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public isAuthenticated = false;

  public showRegisterAlert = false;
  public showLoginAlert = false;

  ngOnInit(): void {
    const state = history.state as { message?: string };

    if (state?.message === 'register_ok') {
      this.showRegisterAlert = true;
      this.showLoginAlert = false;
    }
    if (state?.message === 'login_ok') {
      this.showLoginAlert = true;
      this.showRegisterAlert = false;
    }

    if (state?.message) {
      history.replaceState({}, '');
    }
  }
}

