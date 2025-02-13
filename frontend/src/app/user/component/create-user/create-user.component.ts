import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-create-user',
  imports: [
    Button,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  public submitted: boolean = false;
  public createUserMode: boolean = true;
  createUserForm: FormGroup = new FormGroup({});
  savedUserData: any = null;
  @Output() cancelCreateUserDialogEmitter = new EventEmitter<boolean>();
  @Output() afterCreateCallbackEmitter = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.setUpForm();
  }

  ngOnDestroy() {
    this.setUpForm();
  }

  setUpForm() {
    this.createUserForm = this.fb.group({
      firstName: [ {value: null, disabled: false}, [Validators.required] ],
      lastName: [ {value: null, disabled: false}, [Validators.required] ],
      email: [ {value: null, disabled: false}, [Validators.required, Validators.email] ],
      password: [ {value: null, disabled: true}, [Validators.required] ],
      username: [ {value: null, disabled: false}, [Validators.required] ]
    })
  }

  getFormControl(name: string) {
    return this.createUserForm.get(name)
  }

  generatePassword(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'+
      '0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    const length = 12;
    const array = new Uint8Array(length);
    const randomValues = window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      password += chars[randomValues[i] % chars.length];
    }
    console.log({ password })
    this.createUserForm.get('password')?.setValue(password)
  }

  onSubmit() {
    this.submitted = true;
    if (this.createUserForm.valid) {
      this.createUserForm.get('password')?.enable();
      this.authService.createAccount(this.createUserForm.value)
        .subscribe(
          (response) => {
            // this.afterCreateCallbackEmitter.emit();
            this.createUserMode = false;
            this.createUserForm.get('password')?.enable();
            this.savedUserData = this.createUserForm.value;
          },
          (error) => { console.error('Error:', error); }
        )
    }
  }

  onCancel() {
    this.cancelCreateUserDialogEmitter.emit(false);
  }

  addAnother() {
    this.setUpForm();
    this.savedUserData = null;
    this.createUserMode = true;
  }
}
