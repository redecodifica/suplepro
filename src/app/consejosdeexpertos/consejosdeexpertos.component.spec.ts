import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejosdeexpertosComponent } from './consejosdeexpertos.component';

describe('ConsejosdeexpertosComponent', () => {
  let component: ConsejosdeexpertosComponent;
  let fixture: ComponentFixture<ConsejosdeexpertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsejosdeexpertosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsejosdeexpertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
