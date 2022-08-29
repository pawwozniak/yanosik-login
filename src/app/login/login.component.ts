import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.scss', './login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid === true) {
      this.http
        .post('https://jsonplaceholder.typicode.com/posts/', form.value)
        .subscribe(
          () => {
            form.reset();
          },
          (error) => {
            console.error(error);
            window.alert('Podczas logowania wystąpił błąd');
          },
          () => {
            window.alert('Logowanie przebiegło pomyślnie');
          }
        );
    } else {
      window.alert('Błędny login lub hasło');
    }
  }
}
