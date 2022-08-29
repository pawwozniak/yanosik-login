import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.scss', './register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passwordsGroup: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        repeatPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          this.passwordValidation.bind(this),
        ]),
      },
      { validators: this.passwordValidation }
    ),
    acceptAll: new FormControl(false),
    termsOfUse: new FormControl(false, Validators.requiredTrue),
    privacyPolicy: new FormControl(false, Validators.requiredTrue),
    marketing: new FormControl(false),
  });

  changeAcceptAll() {
    if (this.registrationForm.get('acceptAll')!.value === false) {
      this.registrationForm.patchValue({
        termsOfUse: true,
        privacyPolicy: true,
        marketing: true,
      });
    } else {
      this.registrationForm.patchValue({
        termsOfUse: false,
        privacyPolicy: false,
        marketing: false,
      });
    }
  }

  passwordValidation(group: FormGroup) {
    let password = group.get('password')?.value;
    let repeatPassword = group.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { notSame: true };
  }

  onSubmit() {
    if (this.registrationForm.valid === true) {
      this.http
        .post(
          'https://jsonplaceholder.typicode.com/posts/',
          this.registrationForm.value
        )
        .subscribe(
          () => {
            this.registrationForm.reset();
          },
          (error) => {
            console.error(error);
            window.alert('Podczas rejestracji wystąpił błąd');
          },
          () => {
            window.alert('Rejestracja przebiegła pomyślnie');
            this.router.navigate(['/']);
          }
        );
    } else {
      window.alert('Formularz rejestracji zawiera błędne dane');
    }
  }
}
