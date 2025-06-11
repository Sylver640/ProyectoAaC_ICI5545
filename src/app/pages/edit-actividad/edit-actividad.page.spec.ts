import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditActividadPage } from './edit-actividad.page';

describe('EditActividadPage', () => {
  let component: EditActividadPage;
  let fixture: ComponentFixture<EditActividadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
