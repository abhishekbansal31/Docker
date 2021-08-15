import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private snackbar: MatSnackBar, private router: Router) {}
  
  token: string = null
  login: any = {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    console.log("in login, token = "+this.token)
    
    if(this.token && this.token!=='') {
       console.log("token already present, go to home page")
       this.router.navigate(['/home'])
    }
    this.login = {
      email: '',
      password: ''
    }
  }

  login_() {
    console.log("login clicked ")
    console.log(this.login)

    this.apiService.postData({url: this.apiService.auth + this.apiService.token + this.apiService.login, data: this.login }, true).subscribe(
      result => {
        console.log(result);
        console.log(result?.auth_token);
        console.log(result.auth_token);
        if(result && result?.auth_token && result.auth_token) {
          let message = "User login successfully"
          let action = "Success"
          this.snackbar.open(message, action, {
            duration: 1000
          })
          console.log(result.auth_token);
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
