import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KuldComponent } from './kuld.component';

describe('KuldComponent', () => {
  let component: KuldComponent;
  let fixture: ComponentFixture<KuldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KuldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KuldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
