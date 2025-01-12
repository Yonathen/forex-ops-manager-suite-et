import {Component, OnDestroy, OnInit} from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {NgClass} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-signin',
  imports: [
    FloatLabelModule,
    InputText,
    Button,
    RouterLink,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnDestroy, OnInit {
  public submitted: boolean = false;
  signInForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.setSignInForm();
  }

  ngOnDestroy() {
    this.setSignInForm();
  }

  setSignInForm() {
    this.signInForm = this.fb.group({
      password: [ {value: null, disabled: false}, [Validators.required] ],
      username: [ {value: null, disabled: false}, [Validators.required] ]
    })
  }

  getFormControl(name: string) {
    return this.signInForm.get(name)
  }

  redirectToDashboard() {
    this.router.navigateByUrl('/dashboard').then(r => r && this.setSignInForm());
  }

  onSubmit() {
    this.submitted = true;

    if (this.signInForm.valid) {
      this.authService.accessAccount(this.signInForm.value)
        .subscribe(
          (response) => { this.redirectToDashboard(); },
          (error) => { console.error('Error:', error); }
        )
    }
  }

}
