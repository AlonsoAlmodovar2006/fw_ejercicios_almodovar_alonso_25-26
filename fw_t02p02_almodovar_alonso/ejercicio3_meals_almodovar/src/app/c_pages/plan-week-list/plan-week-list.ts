import { Component, Input, inject } from '@angular/core';
import { AuthSession } from '../../model/auth-session';
import { WeeklyPlan } from '../../model/weekly-plan';
import { StorageService } from '../../services/storage-service';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-plan-week-list',
  imports: [],
  templateUrl: './plan-week-list.html',
  styleUrl: './plan-week-list.css',
})
export class PlanWeekList {
  private localStorage: StorageService = inject(StorageService);
  private api = inject(ApiService);

  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  @Input() usuario: AuthSession | null = null;

  planesSemanales: WeeklyPlan[] = [];
  semanaActual: string = '';

  ngOnInit() {
    this.semanaActual = this.getISOWeek(new Date());

    if (this.usuario) {
      this.planesSemanales = this.localStorage
        .obtenerPlanesSemanalUsuario(this.usuario.userId)
        .sort((a, b) => b.id.localeCompare(a.id));
    }
  }

  esSemanaActual(planId: string): boolean {
    return planId === this.semanaActual;
  }

  private getISOWeek(date: Date): string {
    const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNumber = tempDate.getUTCDay() || 7;
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNumber);
    const year = tempDate.getUTCFullYear();
    const yearStart = new Date(Date.UTC(year, 0, 1));
    const weekNumber = Math.ceil((((tempDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    const weekFormatted = String(weekNumber).padStart(2, '0');
    return `${year}-W${weekFormatted}`;
  }
}
