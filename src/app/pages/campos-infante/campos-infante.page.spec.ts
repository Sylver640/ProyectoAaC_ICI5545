import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamposInfantePage } from './campos-infante.page';

describe('CamposInfantePage', () => {
  let component: CamposInfantePage;
  let fixture: ComponentFixture<CamposInfantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CamposInfantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
