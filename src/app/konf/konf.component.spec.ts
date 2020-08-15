import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonfComponent } from './konf.component';

describe('KonfComponent', () => {
  let component: KonfComponent;
  let fixture: ComponentFixture<KonfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
