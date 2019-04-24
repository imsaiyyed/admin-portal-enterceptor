import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCredentialsComponent } from './channel-credentials.component';

describe('ChannelCredentialsComponent', () => {
  let component: ChannelCredentialsComponent;
  let fixture: ComponentFixture<ChannelCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
