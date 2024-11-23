import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarritasysnacksComponent } from './barritasysnacks.component';

describe('BarritasysnacksComponent', () => {
  let component: BarritasysnacksComponent;
  let fixture: ComponentFixture<BarritasysnacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarritasysnacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarritasysnacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
