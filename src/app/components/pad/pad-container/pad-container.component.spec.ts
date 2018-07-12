import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadContainerComponent } from './pad-container.component';

describe('PadContainerComponent', () => {
  let component: PadContainerComponent;
  let fixture: ComponentFixture<PadContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
