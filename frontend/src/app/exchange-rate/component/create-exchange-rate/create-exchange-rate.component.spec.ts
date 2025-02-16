import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExchangeRateComponent } from './create-exchange-rate.component';

describe('CreateBranchComponent', () => {
  let component: CreateExchangeRateComponent;
  let fixture: ComponentFixture<CreateExchangeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExchangeRateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
