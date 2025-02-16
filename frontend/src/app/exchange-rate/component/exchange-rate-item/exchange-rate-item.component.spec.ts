import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExchangeRateItemComponent } from './exchange-rate-item.component';


describe('BranchItemComponent', () => {
  let component: ExchangeRateItemComponent;
  let fixture: ComponentFixture<ExchangeRateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeRateItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeRateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
