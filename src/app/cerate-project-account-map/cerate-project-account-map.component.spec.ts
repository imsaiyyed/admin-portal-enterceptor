import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerateProjectAccountMapComponent } from './cerate-project-account-map.component';

describe('CerateProjectAccountMapComponent', () => {
  let component: CerateProjectAccountMapComponent;
  let fixture: ComponentFixture<CerateProjectAccountMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerateProjectAccountMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerateProjectAccountMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
