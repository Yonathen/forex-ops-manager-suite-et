import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  imports: [
    Button,
    FloatLabel,
    InputText,
    RouterLink,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy, OnInit {
  public submitted: boolean = false;
  signupForm: FormGroup = new FormGroup({});

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
    this.signupForm = this.fb.group({
      firstName: [ {value: null, disabled: false}, [Validators.required] ],
      lastName: [ {value: null, disabled: false}, [Validators.required] ],
      email: [ {value: null, disabled: false}, [Validators.required, Validators.email] ],
      password: [ {value: null, disabled: false}, [Validators.required] ],
      username: [ {value: null, disabled: false}, [Validators.required] ]
    })
  }

  getFormControl(name: string) {
    return this.signupForm.get(name)
  }

  redirectToSignIn() {
    this.router.navigateByUrl('/sign-in').then(r => r && this.setUpForm());
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.valid) {
      this.authService.createAccount(this.signupForm.value)
        .subscribe(
          (response) => { this.redirectToSignIn(); },
          (error) => { console.error('Error:', error); }
        )
    }
  }

}
