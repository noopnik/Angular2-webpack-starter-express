import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../shared/services/user/user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit{
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      'login': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]),
      'gender' : 'Female',
      'hiking' : false,
      'running' : false,
    });

    this.form.valueChanges
      .debounceTime(500)
      .subscribe( data => this.onValueChanged( data ) );

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    console.log(this.form.value);
    this.userService.login(this.form.value)
      .subscribe( result => {
        if (result === true) {
          console.log("HERE LOGIN");
          this.router.navigate(['/']);
        } else {
          //error message
          console.log("HERE NO LOGIN ERROR");
        }
      })
  }

  onValueChanged(data?:any) {
    if (!this.form) { return; }
    let form = this.form;

    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      let control = form.get(field);

      if (control && control.dirty && !control.valid) {
        let messages = this.validationMessages[field];

        for (let key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }

    }

  }

  serverErrors = {};

  formErrors = {
    'login': '',
    'password': ''
  };

  validationMessages = {
    'login': {
      'required':  'Login is required.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 6 characters long.',
      'maxlength': 'Password cannot be more than 100 characters long.',
    }
  };

}
