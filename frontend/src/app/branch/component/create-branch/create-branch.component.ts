import { NgClass } from '@angular/common';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { BranchDto } from '../../../../../api';
import { UserState } from '../../../user/state/user.state';
import { createBranchDetail } from '../../state/action/branch.action';
import { selectBranchDetail } from '../../state/selector/branch.selector';

@Component({
  standalone: true,
  selector: 'app-create-branch',
  imports: [
    Button,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './create-branch.component.html',
  styleUrl: './create-branch.component.scss'
})
export class CreateBranchComponent implements OnInit, OnDestroy {
  public submitted: boolean = false;
  public createBranchMode: boolean = true;
  createBranchForm: FormGroup = new FormGroup({});
  savedBranchData: any = null;
  private branchSubscription!: Subscription;

  @Output() cancelCreateBranchDialogEmitter = new EventEmitter<boolean>();
  @Output() afterCreateCallbackEmitter = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<UserState>,
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.setUpForm();

    this.branchSubscription = this.store
      .select(selectBranchDetail)
      .subscribe((branch: BranchDto | null) => {
        if (this.submitted && branch) {
          this.submitted = false;
          this.createBranchMode = false;
          this.savedBranchData = branch;
          this.afterCreateCallbackEmitter.emit();
        }
      });
  }

  ngOnDestroy() {
    this.setUpForm();
    this.branchSubscription?.unsubscribe();
  }

  get createdBranch(): BranchDto {
    return this.createBranchForm.value as BranchDto
  }
  setUpForm() {
    this.createBranchForm = this.fb.group({
      name: [ {value: null, disabled: false}, [Validators.required] ],
      branchCode: [ {value: null, disabled: false}, [Validators.required] ]
    })
  }

  getFormControl(name: string) {
    return this.createBranchForm.get(name)
  }

  onSubmit() {
    this.submitted = true;
    if (this.createBranchForm.valid) {
      this.store.dispatch(createBranchDetail({ createdBranch: this.createdBranch }))
    }
  }

  onCancel() {
    this.cancelCreateBranchDialogEmitter.emit(false);
  }

  addAnother() {
    this.setUpForm();
    this.savedBranchData = null;
    this.createBranchMode = true;
  }
}
