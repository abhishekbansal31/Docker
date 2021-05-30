import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  login: any = {}
  constructor(private apiService: ApiService, private snackbar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.login = {
      email: '',
      password: ''
    }
  }

  login_() {
    console.log("login clicked ")
    console.log(this.login)

    this.apiService.postData({url: this.apiService.auth + this.apiService.token + this.apiService.login, data: this.login }).subscribe(
      result => {
        console.log(result);
        if(result) {
          let message = "User login successfully"
          let action = "Success"
          this.snackbar.open(message, action, {
            duration: 1000
          })
          console.log(result.auth_token);
          setTimeout( () => {
            localStorage.setItem('token', result.auth_token);
            this.router.navigate(['/login'])
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