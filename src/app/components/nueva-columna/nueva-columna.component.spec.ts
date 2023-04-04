import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaColumnaComponent } from './nueva-columna.component';

describe('NuevaColumnaComponent', () => {
  let component: NuevaColumnaComponent;
  let fixture: ComponentFixture<NuevaColumnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaColumnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaColumnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
