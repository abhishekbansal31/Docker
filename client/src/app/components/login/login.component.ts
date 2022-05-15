import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService,
              private snackbar: MatSnackBar,
              private router: Router,
              private fb: FormBuilder) {}
  
  token: string = null
  login: any = {}
  loginFormGroup: FormGroup

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    
    if(this.token && this.token!=='') {
       console.log("token already present, go to home page")
       this.router.navigate(['/home'])
    } else {
      this.loginFormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      })
      this.login = {
        email: '',
        password: ''
      }
    }
  }

  get formControls() {  
    return this.loginFormGroup.controls;  
  }
  get formEmailControl() {
    return this.formControls['email']
  }
  get formPassControl() {
    return this.formControls['password']
  }
  login_form() {
    // this.login.email = this.formEmailControl.value
    // this.login.password = this.formPassControl.value
    this.apiService.postData({url: this.apiService.auth + this.apiService.token + this.apiService.login, data: this.login }, true).subscribe(
      result => {
        console.log(result);
        if(result && result?.auth_token) {
          let message = "User login successfully"
          let action = "Success"
          this.snackbar.open(message, action, {
            duration: 1000
          })
          setTimeout( () => {
            localStorage.setItem('token', result.auth_token);
            this.router.navigate(['/home'])
          }, 1000);
        } else {
          let message = "User login failed"
          let action = "Fail"
          this.snackbar.open(message, action, {
            duration: 1000
          })
        }
      }
    )
  }
}
