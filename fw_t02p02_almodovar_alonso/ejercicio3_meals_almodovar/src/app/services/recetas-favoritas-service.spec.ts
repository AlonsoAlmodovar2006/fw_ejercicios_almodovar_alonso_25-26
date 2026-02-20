import { TestBed } from '@angular/core/testing';

import { RecetasFavoritasService } from './recetas-favoritas-service';

describe('RecetasFavoritasService', () => {
  let service: RecetasFavoritasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetasFavoritasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
