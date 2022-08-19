import { PasswordValidatorComponent } from '../password-validator/password-validator.component';
import { Component, } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidationErrors, ValidatorFn,} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    mail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]],
    confirmPassword:['', [Validators.required]]
  })

  get name(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  } 

  get lastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }

  get mail(): FormControl {
    return this.registerForm.get('mail') as FormControl;
  }
  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get confirmPassword(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
 
    constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    //   console.log(this.registerForm);
      
    // this.name.valueChanges.subscribe(firstName => console.log(firstName))
    // this.registerForm.valueChanges.subscribe(registerValue => console.log(registerValue))
  }

  register(): void {
    console.log('submit');
    
    this.http.post<void>('/api/register', {
      firstname: this.name.value,
      lastname: this.lastName.value,
      mail: this.mail.value,
      password: this.password.value,
    }).subscribe();
  }
}

//new
//*mail*
// email = new FormControl('', [Validators.required, Validators.email]);
  
// getErrorMessage() {
//   if (this.email.hasError('required')) {
//     return 'You must enter a value';
//   }

//   return this.email.hasError('email') ? 'Not a valid email' : '';
// }
//*password*
// export class FormFieldPrefixSuffixExample {
//   hide = true;
// }

