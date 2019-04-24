import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeChannelConfigComponent } from './change-channel-config.component';

describe('ChangeChannelConfigComponent', () => {
  let component: ChangeChannelConfigComponent;
  let fixture: ComponentFixture<ChangeChannelConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeChannelConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeChannelConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
