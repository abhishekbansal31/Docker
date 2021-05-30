import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  token: string = null

  ngOnInit(): void {
     this.token = localStorage.getItem('token')
     console.log("in login, auth_token = "+localStorage.getItem('token'))
  }

}
