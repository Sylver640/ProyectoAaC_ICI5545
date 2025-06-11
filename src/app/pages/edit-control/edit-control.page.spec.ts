import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditControlPage } from './edit-control.page';

describe('EditControlPage', () => {
  let component: EditControlPage;
  let fixture: ComponentFixture<EditControlPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
