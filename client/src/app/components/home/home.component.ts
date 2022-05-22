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
  api_data: string = ''
  constructor(private apiService: ApiService, private snackbar: MatSnackBar, private router: Router) {}

  ngOnInit() {

    this.token = localStorage.getItem('token')
    if(this.token && this.token!=='') {
       this.apiService.getData({url: this.apiService.core + 'home/', data:{} }).subscribe(
        result => {
          console.log(result)
          this.api_data = result
        }
       );
    } else {
      this.router.navigate(['/login'])
    }
  }


  logout_() {
    console.log("logout clicked ")

    this.apiService.postData({url: this.apiService.auth + this.apiService.token + this.apiService.logout, data:{} }).subscribe(
      result => {
        console.log(result);
        localStorage.clear();
        this.ngOnInit();
      }
    )
  }
}