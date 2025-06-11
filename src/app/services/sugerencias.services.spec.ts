import { TestBed } from '@angular/core/testing';
import { SugerenciasService } from './sugerencias.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SugerenciasService', () => {
  let service: SugerenciasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SugerenciasService]
    });
    service = TestBed.inject(SugerenciasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería listar todos los consejos', () => {
    const mockResponse = { sugerencias: {}, status: 200 };
    service.listarConsejos().subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/sugerencias/listar');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería listar consejos por edad y categoría', () => {
    const mockResponse = { consejos: ['consejo1', 'consejo2'], status: 200 };
    service.listarConsejosPorEdadYCategoria('0-6 meses', 'Consejo de alimentacion').subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/sugerencias/por_edad_categoria');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ edad: '0-6 meses', categoria: 'Consejo de alimentacion' });
    req.flush(mockResponse);
  });

  it('debería listar consejos por edad', () => {
    const mockResponse = { consejos: {}, status: 200 };
    service.listarConsejosPorEdad('0-6 meses').subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/sugerencias/por_edad');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ edad: '0-6 meses' });
    req.flush(mockResponse);
  });
});
