import { TestBed } from '@angular/core/testing';
import { HitoService } from './hitos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HitoService', () => {
  let service: HitoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HitoService]
    });
    service = TestBed.inject(HitoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería listar hitos por edad', () => {
    const mockResponse = [
      'Hito 1',
      'Hito 2'
    ];
    service.listarHitosPorEdad('0-6 meses').subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/v1/hitos_por_edad');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ hito: '0-6 meses' });
    req.flush(mockResponse);
  });
});