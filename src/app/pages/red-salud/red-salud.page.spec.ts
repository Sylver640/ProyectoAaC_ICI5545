import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedSaludPage } from './red-salud.page';

describe('RedSaludPage', () => {
  let component: RedSaludPage;
  let fixture: ComponentFixture<RedSaludPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RedSaludPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
