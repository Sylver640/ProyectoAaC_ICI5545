import { TestBed } from '@angular/core/testing';
import { ActividadesService, Actividad } from './actividades.services';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ActividadesService', () => {
  let service: ActividadesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActividadesService]
    });
    service = TestBed.inject(ActividadesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería listar actividades', () => {
    const mockResponse = { actividades: [], status: 200 };
    service.listarActividades('idDefault').subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/actividades/listar');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ idInfante: 'idDefault' });
    req.flush(mockResponse);
  });

  it('debería crear una actividad', () => {
    const actividad: Actividad = {
      idactividad: 'id1',
      titulo: 'Actividad',
      tipo: 'Personalizada',
      fecha: '01-01-2025',
      rango_inicio: '01-01-2025',
      rango_final: '02-01-2025',
      locación: 'Lugar',
      recordatorio: 'Recordar',
      fecha_recordatorio: '31-12-2024',
      esta_completada: 0,
      idInfante: 'idDefault'
    };
    const mockResponse = { mensaje: 'Actividad creada', status: 200 };
    service.crearActividad(actividad).subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/actividades/crear');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(actividad);
    req.flush(mockResponse);
  });

  it('debería editar una actividad', () => {
    const actividadEdit = { idactividad: 'id1', titulo: 'Nuevo título' };
    const mockResponse = { mensaje: 'Actividad actualizada', status: 200 };
    service.editarActividad(actividadEdit).subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/actividades/editar');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(actividadEdit);
    req.flush(mockResponse);
  });

  it('debería eliminar una actividad', () => {
    const mockResponse = { mensaje: 'Actividad eliminada', status: 200 };
    service.eliminarActividad('id1').subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/actividades/eliminar');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ idActividad: 'id1' });
    req.flush(mockResponse);
  });

  it('debería marcar una actividad como completada', () => {
    const mockResponse = { mensaje: 'Actividad marcada como completada', status: 200 };
    service.marcarCompletada('id1').subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/actividades/completar');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ idActividad: 'id1' });
    req.flush(mockResponse);
  });
});
