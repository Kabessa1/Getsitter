import { HttpClient } from '@angular/common/http';
import { Component, } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  hide = true;
  loginForm = this.formBuilder.group({
    mail: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  get mail(): FormControl {
    return this.loginForm.get('mail') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private storageService: StorageService) {
    console.log(this.loginForm);
    this.loginForm.controls['mail'].valueChanges.subscribe(mail => console.log(mail))
    this.loginForm.valueChanges.subscribe(loginValue => console.log(loginValue))
  }

  login(): void {
    console.log('submit');
    this.http.post<void>('/api/login', {
      mail: this.mail.value,
      password: this.password.value,
    }).subscribe(logindata => {
      this.storageService.saveUser(logindata)
    });
    
  }
}

