import { TestBed } from '@angular/core/testing';
import { ContactosService, Contacto } from './contactos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ContactosService', () => {
  let service: ContactosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactosService]
    });
    service = TestBed.inject(ContactosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de contactos', () => {
    const mockContactos: Contacto[] = [
      { nombre: 'Fono infantil', telefono: '800 200 818', descripcion: 'Responde dudas relacionadas con la crianza y desarrollo de niños y niñas: pataletas, agresividad, retraimiento, pesadillas, control de esfínteres, etc.' }
    ];
    service.obtenerContactos().subscribe(contactos => {
      expect(contactos).toEqual(mockContactos);
    });
    const req = httpMock.expectOne('/v1/contactos');
    expect(req.request.method).toBe('GET');
    req.flush(mockContactos);
  });
});
