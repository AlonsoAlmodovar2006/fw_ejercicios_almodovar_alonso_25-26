import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';

import { StorageService } from './storage-service';
import { WeeklyPlan } from '../model/weekly-plan';
import { WeeklyPlanDay } from '../model/weekly-plan-day';

// Mock seguro de localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    get store() { return store; }
  };
})();

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    mockLocalStorage.clear();
    vi.stubGlobal('localStorage', mockLocalStorage);

    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('guardarPlanSemanal', () => {
    const planMock: WeeklyPlan = {
      id: '2025-W12',
      userId: 1,
      days: [
        { day: 'Lunes', lunchMealId: 52772, dinnerMealId: null },
        { day: 'Martes', lunchMealId: null, dinnerMealId: 52773 },
        { day: 'Miércoles', lunchMealId: 52774, dinnerMealId: 52775 },
      ] as WeeklyPlanDay[],
    };

    it('debe guardar un plan nuevo cuando localStorage está vacío', () => {
      service.guardarPlanSemanal(planMock);

      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
      const saved = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]) as WeeklyPlan[];

      expect(saved).toHaveLength(1);
      expect(saved[0]).toEqual(planMock);
      expect(saved[0].days[0]).toEqual({ day: 'Lunes', lunchMealId: 52772, dinnerMealId: null });
    });

    it('debe serializar correctamente los mealId como números o null', () => {
      service.guardarPlanSemanal(planMock);

      const raw = mockLocalStorage.setItem.mock.calls[0][1];
      expect(raw).toContain('"lunchMealId":52772');
      expect(raw).toContain('"dinnerMealId":null');
    });
  });

  describe('obtenerPlanesSemanalUsuario', () => {
    const planesMock: WeeklyPlan[] = [
      {
        id: '2025-W10',
        userId: 1,
        days: [{ day: 'Lunes', lunchMealId: 100, dinnerMealId: null }]
      },
      {
        id: '2025-W11',
        userId: 1,
        days: [{ day: 'Martes', lunchMealId: null, dinnerMealId: 200 }]
      },
      {
        id: '2025-W12',
        userId: 2,
        days: [{ day: 'Miércoles', lunchMealId: 300, dinnerMealId: 400 }]
      },
    ];

    it('debe devolver array vacío si no hay datos en localStorage', () => {
      const result = service.obtenerPlanesSemanalUsuario(1);
      expect(result).toEqual([]);
    });

    it('debe filtrar y devolver solo los planes del usuario solicitado', () => {
      mockLocalStorage.setItem('weeklyPlans', JSON.stringify(planesMock));

      const result = service.obtenerPlanesSemanalUsuario(1);

      expect(result).toHaveLength(2);
      expect(result.every(p => p.userId === 1)).toBe(true);
      expect(result.map(p => p.id)).toEqual(['2025-W10', '2025-W11']);
    });

    it('debe preservar la estructura de WeeklyPlanDay al retornar', () => {
      mockLocalStorage.setItem('weeklyPlans', JSON.stringify(planesMock));

      const result = service.obtenerPlanesSemanalUsuario(1);
      const lunes = result[0]?.days[0];

      expect(lunes?.day).toBe('Lunes');
      expect(lunes?.lunchMealId).toBe(100);
      expect(lunes?.dinnerMealId).toBeNull();
    });

    it('debe devolver array vacío si el usuario no tiene planes', () => {
      mockLocalStorage.setItem('weeklyPlans', JSON.stringify(planesMock));

      const result = service.obtenerPlanesSemanalUsuario(999);
      expect(result).toEqual([]);
    });

    it('debe manejar JSON inválido retornando array vacío', () => {
      mockLocalStorage.setItem('weeklyPlans', 'json-invalido{');

      // Si tu servicio usa try/catch:
      const result = service.obtenerPlanesSemanalUsuario(1);
      expect(result).toEqual([]);

      // Si NO lo maneja y lanza error, usa esta expectativa en su lugar:
      // expect(() => service.obtenerPlanesSemanalUsuario(1)).toThrow();
    });
  });

  describe('Integración: guardar + obtener', () => {
    it('debe permitir recuperar un plan completo después de guardarlo', () => {
      const plan: WeeklyPlan = {
        id: '2025-W15',
        userId: 42,
        days: [
          { day: 'Lunes', lunchMealId: 123, dinnerMealId: 456 },
          { day: 'Martes', lunchMealId: null, dinnerMealId: 789 },
        ] as WeeklyPlanDay[],
      };

      service.guardarPlanSemanal(plan);
      const result = service.obtenerPlanesSemanalUsuario(42);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2025-W15');
      expect(result[0].days[0]).toEqual({ day: 'Lunes', lunchMealId: 123, dinnerMealId: 456 });
      expect(result[0].days[1].dinnerMealId).toBe(789);
    });

    it('no debe mezclar planes de diferentes usuarios', () => {
      const planUser1: WeeklyPlan = {
        id: '2025-W1',
        userId: 1,
        days: [{ day: 'Lunes', lunchMealId: 1, dinnerMealId: 2 }]
      };
      const planUser2: WeeklyPlan = {
        id: '2025-W2',
        userId: 2,
        days: [{ day: 'Martes', lunchMealId: 3, dinnerMealId: 4 }]
      };

      service.guardarPlanSemanal(planUser1);
      service.guardarPlanSemanal(planUser2);

      expect(service.obtenerPlanesSemanalUsuario(1).map(p => p.id)).toEqual(['2025-W1']);
      expect(service.obtenerPlanesSemanalUsuario(2).map(p => p.id)).toEqual(['2025-W2']);
    });
  });
});
