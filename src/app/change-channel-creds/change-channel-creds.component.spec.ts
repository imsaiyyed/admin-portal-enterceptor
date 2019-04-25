import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeChannelCredsComponent } from './change-channel-creds.component';

describe('ChangeChannelCredsComponent', () => {
  let component: ChangeChannelCredsComponent;
  let fixture: ComponentFixture<ChangeChannelCredsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeChannelCredsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeChannelCredsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
