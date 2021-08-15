import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: string = ''
  constructor(private apiService: ApiService, private snackbar: MatSnackBar, private router: Router) {}

  ngOnInit() {

    this.token = localStorage.getItem('token')
    console.log(this.token)
    if(this.token && this.token!=='') {
       console.log("toke already present, go to home page")
       this.apiService.getData({url: this.apiService.auth + 'restricted/', data:{} }).subscribe(
        result => {
          console.log(result)
        }
       );
    } else {
      this.router.navigate(['/login'])
    }
  }


  logout_() {
    console.log("logout clicked ")
    console.log(this.token)

    this.apiService.postData({url: this.apiService.auth + this.apiService.token + this.apiService.logout, data:{} }).subscribe(
      result => {
        console.log(result);
        localStorage.clear();
        this.ngOnInit();
        // console.log(result?.auth_token);
        // console.log(result.auth_token);
        // if(result && result?.auth_token && result.auth_token) {
        //   let message = "User login successfully"
        //   let action = "Success"
        //   this.snackbar.open(message, action, {
        //     duration: 1000
        //   })
        //   console.log(result.auth_token);
        //   setTimeout( () => {
        //     localStorage.setItem('token', result.auth_token);
        //     this.router.navigate(['/home'])
        //   }, 1000);
        // } else {
        //   let message = "User login failed"
        //   let action = "Fail"
        //   this.snackbar.open(message, action, {
        //     duration: 1000
        //   })
        // }
      }
    )
  }
}