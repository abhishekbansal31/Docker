import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';
import { ApiService        } from 'src/app/services/api.service';
import { MatSnackBar       } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService,
              private router: Router,
              private snackbar: MatSnackBar,
              private fb: FormBuilder) {}
  register: any = {}
  registerFormGroup: FormGroup = null
  ngOnInit() {
    this.registerFormGroup = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', []],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      re_password: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    })
    this.register = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      re_password: '',
      phone: ''
    }
  }

  passwordMatching() {
    return this.registerFormGroup.controls['password'].value === this.registerFormGroup.controls['re_password'].value
  }

  registerUser() {
    this.apiService.postData({url: this.apiService.auth+this.apiService.users, data: this.register}, true).subscribe(
      data => {
        console.log(data);
        if(data) {
          let message = ""
          let action = ""
          if(data && data!='[]') {
            message = "User created successfully"
            action = "Success"
          } else {
            message = "User not created successfully"
            action = "Failed"  
          }
          this.snackbar.open(message, action, {
            duration: 1000
          })
          setTimeout( () => {
            this.router.navigate(['/home', {}])
          }, 1000);
        }
      }
    )
  }
}
