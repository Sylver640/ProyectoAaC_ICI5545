import { TestBed } from '@angular/core/testing';
import { ProfileService, Usuario } from './profile.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Esta parte es para definir el servicio de perfil (servicio de perfil)
describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;
  
  // Esta parte es para configurar el módulo de pruebas
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  // Esta parte es para verificar si el servicio se ha creado correctamente
  afterEach(() => {
    httpMock.verify();
  });
  // Esta parte es para verificar si el servicio se ha creado correctamente
  it('Verificar si el servicio se ha creado correctamente', () => {
    expect(service).toBeTruthy();
  });
  // Esta parte es para verificar si la lista de usuarios se ha obtenido correctamente
  it('Verificar si la lista de usuarios se ha obtenido correctamente', () => {
    const mockUsuarios: Usuario[] = [
      { id: '1', nombre: 'Juan', fecha_nacimiento: '01/01/2000', genero: 'Masculino' }
    ];
    service.listarUsuarios().subscribe(usuarios => {
      expect(usuarios).toEqual(mockUsuarios);
    });
    const req = httpMock.expectOne('/v1/usuarios/listar');
    expect(req.request.method).toBe('POST');
    req.flush(mockUsuarios);
  });
  // Esta parte es para verificar si el usuario se ha creado correctamente
  it('Verificar si el usuario se ha creado correctamente', () => {
    const mockResponse = { id: '1', status: 200 };
    service.crearUsuario('Juan', '01/01/2000', 'Masculino').subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/usuarios/crear');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ nombre: 'Juan', fecha_nacimiento: '01/01/2000', genero: 'Masculino' });
    req.flush(mockResponse);
  });
  // Esta parte es para verificar si el usuario se ha buscado correctamente
  it('Verificar si el usuario se ha buscado correctamente', () => {
    const mockResponse = { usuario: { id: '1', nombre: 'Juan', fecha_nacimiento: '01/01/2000', genero: 'Masculino' }, status: 200 };
    service.buscarUsuario('1').subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/usuarios/buscar');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ id: '1' });
    req.flush(mockResponse);
  });
  // Esta parte es para verificar si el usuario se ha editado correctamente
  it('Verificar si el usuario se ha editado correctamente', () => {
    const mockResponse = { mensaje: 'Usuario actualizado', status: 200 };
    service.editarUsuario('1', 'Juan', '01/01/2000', 'Masculino').subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/usuarios/editar');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ id: '1', nombre: 'Juan', fecha_nacimiento: '01/01/2000', genero: 'Masculino' });
    req.flush(mockResponse);
  });
  // Esta parte es para verificar si el usuario se ha eliminado correctamente
  it('Verificar si el usuario se ha eliminado correctamente', () => {
    const mockResponse = { mensaje: 'Usuario eliminado', status: 200 };
    service.eliminarUsuario('1').subscribe(resp => {
      expect(resp).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('/v1/usuarios/eliminar');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual({ id: '1' });
    req.flush(mockResponse);
  });
});
