import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MostrarConsejoPage } from './mostrar-consejo.page';

describe('MostrarConsejoPage', () => {
  let component: MostrarConsejoPage;
  let fixture: ComponentFixture<MostrarConsejoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarConsejoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
