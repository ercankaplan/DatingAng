import { Component, inject, input, output, signal, type OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, type ValidatorFn, type AbstractControl, type ValidationErrors, FormBuilder } from '@angular/forms';
import type { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';
import { TextInput } from "../../../shared/text-input/text-input";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  protected accountService = inject(AccountService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  //membersFromHome = input.required<User[]>();
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  protected credentialsForm: FormGroup;
  protected profileForm: FormGroup;
  //protected registerForm :FormGroup;// = new FormGroup({});
  protected currentStep = signal(1);
  protected validationErrors = signal<string[]>([]);

  /**
   *
   */
  constructor() {
    this.credentialsForm = this.fb.group({
      email: ['ecco@test.com', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });

    this.profileForm = this.fb.group({
      gender: ['male', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.credentialsForm.controls["password"].valueChanges.subscribe(() => {
      this.credentialsForm.controls["confirmPassword"].updateValueAndValidity();
    });

  }

  /* //comment out by form group
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
     this.registerForm = new FormGroup({
      email: new FormControl('ecco@test.com', [Validators.required, Validators.email]),
      displayName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
    });

    this.registerForm.controls["password"].valueChanges.subscribe(() => {
      this.registerForm.controls["confirmPassword"].updateValueAndValidity();
    }); 
  }
*/
  matchValues(matchTo: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { passwordMismatch: true }
    }
  }

  nextStep() {
    if (this.credentialsForm.valid) {
      this.currentStep.update(n => n + 1);
    }
  }

  prevStep() {
    this.currentStep.update(n => n - 1);
  }

  getMaxDate() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }

  register() {

    if (this.credentialsForm.valid && this.profileForm.valid) {
      const formData = { ...this.credentialsForm.value, ...this.profileForm.value };
      console.log('Form data:', formData);

      this.accountService.register(formData).subscribe({
        next: response => {
          console.log(response);
          this.router.navigateByUrl('/members');
        },
        error: error => { 
          console.log(error); 
          this.validationErrors.set(error)
        },
        complete: () => console.log('completed register request')

      });

    }
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
