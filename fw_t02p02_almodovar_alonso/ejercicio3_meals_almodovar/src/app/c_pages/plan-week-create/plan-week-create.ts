import { Component, Input, inject, signal } from '@angular/core';
import { AuthSession } from '../../model/auth-session';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage-service';
import { WeeklyPlan } from '../../model/weekly-plan';
import { ApiService } from '../../services/api-service';
import { UserMiniMeal } from '../../model/user-mini-meal';
import { NgOptimizedImage } from '@angular/common';
import { WeeklyPlanDay } from '../../model/weekly-plan-day';

@Component({
  selector: 'app-plan-week-create',
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './plan-week-create.html',
  styleUrl: './plan-week-create.css',
})
export class PlanWeekCreate {
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  private localStorage: StorageService = inject(StorageService);
  private api = inject(ApiService);

  @Input() usuario: AuthSession | null = null;
  existePlanSemanal: boolean = false;
  sinRecetas: boolean = false;
  resultados = signal<UserMiniMeal[]>([]);
  recetaSeleccionada: UserMiniMeal | null = null;
  planesDiarios: WeeklyPlanDay[] = this.generarPlanesDiarios();;

  planWeekForm = {
    fechaPlanSemanal: '',
    ingrediente: ""
  };

  private generarPlanesDiarios(): WeeklyPlanDay[] {
    return this.diasSemana.map(dia => ({
      day: dia,
      lunchMealId: null,
      dinnerMealId: null
    }));
  }

  getISOWeek(date: Date): string { // Generado por la IA
    const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));// Copiamos la fecha para no modificar la original
    const dayNumber = tempDate.getUTCDay() || 7; // ISO: lunes = 1, domingo = 7
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNumber); // Ajustamos al jueves de la misma semana (regla ISO)
    const year = tempDate.getUTCFullYear(); // Año ISO (puede diferir del año natural)
    const yearStart = new Date(Date.UTC(year, 0, 1)); // Primer día del año ISO
    const weekNumber = Math.ceil((((tempDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7); // Calculamos número de semana
    const weekFormatted = String(weekNumber).padStart(2, "0"); // Formateamos con dos dígitos
    return `${year}-W${weekFormatted}`;
  }

  tieneAlMenosUnaReceta(): boolean {
    return this.planesDiarios.some(d => d.lunchMealId !== null || d.dinnerMealId !== null);
  }

  crearPlanSemanal() {
    if (!this.usuario) return;
    this.sinRecetas = false;
    this.existePlanSemanal = false;

    if (!this.planWeekForm.fechaPlanSemanal) {
      return;
    }

    if (!this.tieneAlMenosUnaReceta()) {
      this.sinRecetas = true;
      return;
    }

    const planesUsuario: WeeklyPlan[] = this.localStorage.obtenerPlanesSemanalUsuario(this.usuario.userId);
    for (const plan of planesUsuario) {
      if (plan.id === this.getISOWeek(new Date(this.planWeekForm.fechaPlanSemanal))) {
        this.existePlanSemanal = true;
        return;
      }
    }
    if (!this.existePlanSemanal) {
      const fecha = new Date(this.planWeekForm.fechaPlanSemanal);
      const planId = this.getISOWeek(fecha);
      console.log(this.planesDiarios);
      const nuevoPlan: WeeklyPlan = {
        id: planId,
        userId: this.usuario!.userId,
        days: this.planesDiarios
      };
      this.localStorage.guardarPlanSemanal(nuevoPlan);
      this.limpiarPlan();
    }
  }

  onSearch() {
    if (this.planWeekForm.ingrediente === "") return;
    this.api.cogerIngredientes(this.planWeekForm.ingrediente).subscribe({
      next: (data) => {
        this.resultados.set(data);
      },
      error: (err) => {
        console.error(err);
        console.error('Error en la suscripción:', err);
        this.resultados.set([]);
      },
    });
  }

  seleccionarIngrediente(resultado: UserMiniMeal) {
    this.recetaSeleccionada = resultado;
  }

  seleccionarReceta(comidaCena: 'comida' | 'cena', dia: string) {
    if (!this.recetaSeleccionada) return;
    const diaPlan = this.planesDiarios.find(d => d.day === dia);
    if (diaPlan) {
      if (comidaCena === 'comida') {
        diaPlan.lunchMealId = this.recetaSeleccionada.id;
      } else {
        diaPlan.dinnerMealId = this.recetaSeleccionada.id;
      }
    };
  }

  limpiarPlan() {
    this.planesDiarios = this.generarPlanesDiarios();
    this.resultados.set([]);
    this.recetaSeleccionada = null;
  }

  tieneRecetaAsignada(comidaCena: 'comida' | 'cena', dia: string): boolean {
    const diaPlan = this.planesDiarios.find(d => d.day === dia);
    if (!diaPlan) return false;
    return comidaCena === 'comida' ? diaPlan.lunchMealId !== null : diaPlan.dinnerMealId !== null;
  }
}
