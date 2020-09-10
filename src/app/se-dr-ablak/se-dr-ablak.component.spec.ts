import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeDrAblakComponent } from './se-dr-ablak.component';

describe('SeDrAblakComponent', () => {
  let component: SeDrAblakComponent;
  let fixture: ComponentFixture<SeDrAblakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeDrAblakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeDrAblakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
