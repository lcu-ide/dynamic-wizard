import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicWizardComponent } from './dynamic-wizard.component';

describe('DynamicWizardComponent', () => {
  let component: DynamicWizardComponent;
  let fixture: ComponentFixture<DynamicWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
