import { TestBed } from '@angular/core/testing';
import { CentrosService, Centro, PhoneNumber } from './centros.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Esta parte es para definir el servicio de centros (servicio de centros)
describe('CentrosService', () => {
  let service: CentrosService;
  let httpMock: HttpTestingController;

  // Esta parte es para configurar el módulo de pruebas (configurar el módulo de pruebas)   
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CentrosService]
    });
    service = TestBed.inject(CentrosService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  // Esta parte es para verificar si el servicio se ha creado correctamente (verificar si el servicio se ha creado correctamente)
  afterEach(() => {
    httpMock.verify();
  });
  // Esta parte es para verificar si el servicio se ha creado correctamente (verificar si el servicio se ha creado correctamente)
  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });
  // Esta parte es para verificar si la lista de centros se ha obtenido correctamente (verificar si la lista de centros se ha obtenido correctamente)
  it('debería obtener la lista de centros', () => {
    // Esta parte es para definir los centros (definir los centros)
    const mockCentros: Centro[] = [
      {
        nombre: 'Centro 1',
        direccion: 'Dirección 1',
        horario: 'Horario 1',
        telefono: {
          numero: '123456',
          horario: '8:00-17:00',
          poblacion_preferente: ''
        }
      }
    ];
    // Esta parte es para obtener la lista de centros (obtener la lista de centros)
    service.obtenerCentros().subscribe(centros => {
      expect(centros).toEqual(mockCentros);
    });
    // Esta parte es para obtener la lista de centros (obtener la lista de centros)
    const req = httpMock.expectOne('/v1/centros_de_salud');
    // Esta parte es para verificar si el método de la petición es GET (verificar si el método de la petición es GET)
    expect(req.request.method).toBe('GET');
    // Esta parte es para verificar si la lista de centros se ha obtenido correctamente (verificar si la lista de centros se ha obtenido correctamente)
    req.flush(mockCentros);
  });
});
