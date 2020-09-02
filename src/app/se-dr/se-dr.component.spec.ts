import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeDRComponent } from './se-dr.component';

describe('SeDRComponent', () => {
  let component: SeDRComponent;
  let fixture: ComponentFixture<SeDRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeDRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeDRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
