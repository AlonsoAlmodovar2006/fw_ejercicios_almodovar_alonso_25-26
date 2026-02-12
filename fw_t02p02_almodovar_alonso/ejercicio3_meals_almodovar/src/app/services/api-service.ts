import { Injectable } from '@angular/core';
import { MyMeal } from '../model/my-meal';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() { }
  API_KEY: string = "1";
  API_URL: string = `https://www.themealdb.com/api/json/v1/${this.API_KEY}`;

  async obtenerRecetaAleatoria(): Promise<MyMeal | null> {
    let receta = null as MyMeal | null;
    try {
      const myObject: Response = await fetch(`${this.API_URL}/random.php`);
      const data = await myObject.json();
      if (data.length != 0) {
        let arrayIngredientes: { name: string; measure: string }[] = [];
        for (let i = 1; i < 20; i++) {
          const ingrediente = data.meals[0][`strIngredient${i}`];
          const medida = data.meals[0][`strMeasure${i}`];
          if (ingrediente && ingrediente.trim() !== "") {
            const objeto = {
              name: ingrediente,
              measure: medida,
            }
            arrayIngredientes.push(objeto);
          } else {
            break;
          }
        }
        receta = {
          id: data.meals[0].idMeal,
          name: data.meals[0].strMeal,
          category: data.meals[0].strCategory,
          area: data.meals[0].strArea,
          image_medium: data.meals[0].strMealThumb,
          ingredients: arrayIngredientes,
        };
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
    return receta;
  }

  async obtenerCategorias(): Promise<string[]> {
    const categorias: string[] = [];
    try {
      const response = await fetch(`${this.API_URL}/categories.php`);
      if (!response.ok) {
        throw new Error('Respuesta no válida');
      }
      const data = await response.json();
      if (data.categories && data.categories.length > 0) {
        data.categories.forEach((categoria: { strCategory: string; }) => {
          categorias.push(categoria.strCategory);
        });
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      return [];
    }
    return categorias;
  }

  async filtrarRecetasPorCategoria(categoria: string): Promise<string[]> {
    const comidasCategoria: string[] = [];
    try {
      const response = await fetch(`${this.API_URL}/filter.php?c=${categoria}`);
      if (!response.ok) {
        throw new Error('Respuesta no válida');
      }
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        const desordenadas = data.meals.sort(() => Math.random() - 0.5); // Desordenar el Array
        desordenadas.forEach((categoria: { idMeal: string; }) => {
          comidasCategoria.push(categoria.idMeal);
        });
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      return [];
    }
    return comidasCategoria;
  }

  async obtenerReceta(id: string): Promise<MyMeal | null> {
    let receta = null as MyMeal | null;
    try {
      const response = await fetch(`${this.API_URL}/lookup.php?i=${id}`);
      if (!response.ok) {
        throw new Error('Respuesta no válida');
      }
      const data = await response.json();
      if (data.length != 0) {
        let arrayIngredientes: { name: string; measure: string }[] = [];
        for (let i = 1; i < 20; i++) {
          const ingrediente = data.meals[0][`strIngredient${i}`];
          const medida = data.meals[0][`strMeasure${i}`];
          if (ingrediente && ingrediente.trim() !== "") {
            const objeto = {
              name: ingrediente,
              measure: medida,
            }
            arrayIngredientes.push(objeto);
          } else {
            break;
          }
        }
        receta = {
          id: data.meals[0].idMeal,
          name: data.meals[0].strMeal,
          category: data.meals[0].strCategory,
          area: data.meals[0].strArea,
          image_medium: data.meals[0].strMealThumb,
          ingredients: arrayIngredientes,
        };
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
    return receta;
  }
}
