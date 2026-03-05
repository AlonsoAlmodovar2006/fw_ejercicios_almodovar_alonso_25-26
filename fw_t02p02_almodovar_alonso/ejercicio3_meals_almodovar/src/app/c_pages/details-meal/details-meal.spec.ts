import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMeal } from './details-meal';
import { MyMeal } from '../../model/my-meal';
import { AuthService } from '../../services/auth-service';
import { StorageService } from '../../services/storage-service';

// Mocks mínimos
const mockAuthService = { obtenerSesion: () => null };
const mockStorageService = {};

describe('DetailsMeal - Carga de imagen', () => {
  let fixture: ComponentFixture<DetailsMeal>;
  let component: DetailsMeal;

  const recetaConImagen: MyMeal = {
    id: 1,
    name: 'Paella',
    category: 'Arroz',
    area: 'Spanish',
    image_medium: 'https://example.com/paella.jpg',
    ingredients: [],
  };

  const recetaImagenVacia: MyMeal = {
    ...recetaConImagen,
    id: 2,
    name: 'Tortilla',
    image_medium: '',
  };

  const recetaConIngredientes: MyMeal = {
    id: 1,
    name: 'Paella',
    category: 'Arroz',
    area: 'Spanish',
    image_medium: 'https://example.com/paella.jpg',
    ingredients: [
      { name: 'arroz', measure: '200g' },
      { name: 'azafrán', measure: '1 pizca' },
      { name: 'pollo', measure: '2 piezas' },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsMeal],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: StorageService, useValue: mockStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsMeal);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar la imagen con src y alt correctos', async () => {
    component.receta = recetaConImagen;
    fixture.detectChanges();
    await fixture.whenStable();

    const img = fixture.nativeElement.querySelector('img');

    expect(img).toBeTruthy();
    // ✅ Usar img.src (URL absoluta en jsdom)
    expect(img?.src).toContain('paella.jpg');
    expect(img?.getAttribute('alt')).toBe('Paella');
  });

  it('debe usar la imagen por defecto si image_medium está vacío', async () => {
    component.receta = recetaImagenVacia;
    fixture.detectChanges();
    await fixture.whenStable();

    const img = fixture.nativeElement.querySelector('img');

    // ✅ Verificar que contiene el fallback
    expect(img?.src).toContain('default.jpg');
    expect(img?.getAttribute('alt')).toBe('Tortilla');
  });

  it('no debe mostrar imagen si no hay receta', () => {
    component.receta = null;
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeFalsy();
  });


  it('debe renderizar la lista de ingredientes cuando existen', async () => {
    component.receta = recetaConIngredientes;
    fixture.detectChanges();
    await fixture.whenStable();

    const list = fixture.nativeElement.querySelector('ol.list-group');
    const items = fixture.nativeElement.querySelectorAll('ol.list-group li.list-group-item');

    expect(list).toBeTruthy();
    expect(items.length).toBe(3);
  });

  it('debe mostrar el nombre de cada ingrediente en el DOM', async () => {
    component.receta = recetaConIngredientes;
    fixture.detectChanges();
    await fixture.whenStable();

    const items = fixture.nativeElement.querySelectorAll('ol.list-group li.list-group-item');

    // Verificar que los nombres están presentes (text-capitalize se aplica por CSS)
    expect(items[0]?.textContent).toContain('arroz');
    expect(items[1]?.textContent).toContain('azafrán');
    expect(items[2]?.textContent).toContain('pollo');
  });

  it('debe mostrar la cantidad/medida de cada ingrediente en un badge', async () => {
    component.receta = recetaConIngredientes;
    fixture.detectChanges();
    await fixture.whenStable();

    const badges = fixture.nativeElement.querySelectorAll(
      'ol.list-group li.list-group-item span.badge'
    );

    expect(badges.length).toBe(3);
    expect(badges[0]?.textContent?.trim()).toBe('200g');
    expect(badges[1]?.textContent?.trim()).toBe('1 pizca');
    expect(badges[2]?.textContent?.trim()).toBe('2 piezas');
  });

  it('debe aplicar la clase badge correcta a las medidas', async () => {
    component.receta = recetaConIngredientes;
    fixture.detectChanges();
    await fixture.whenStable();

    const badge = fixture.nativeElement.querySelector(
      'ol.list-group li.list-group-item span.badge'
    );

    expect(badge?.classList).toContain('badge');
    expect(badge?.classList).toContain('text-bg-warning');
    expect(badge?.classList).toContain('rounded-pill');
  });
});

