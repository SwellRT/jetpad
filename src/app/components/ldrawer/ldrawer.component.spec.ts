import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdrawerComponent } from './ldrawer.component';

describe('LdrawerComponent', () => {
  let component: LdrawerComponent;
  let fixture: ComponentFixture<LdrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
