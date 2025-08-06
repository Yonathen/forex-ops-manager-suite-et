import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BranchItemComponent } from './branch-item.component';


describe('BranchItemComponent', () => {
  let component: BranchItemComponent;
  let fixture: ComponentFixture<BranchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
