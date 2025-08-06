import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateDetailComponent } from './exchange-rate-detail.component';

describe('BranchDetailComponent', () => {
  let component: ExchangeRateDetailComponent;
  let fixture: ComponentFixture<ExchangeRateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeRateDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeRateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
