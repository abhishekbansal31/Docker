import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';
import { ApiService        } from 'src/app/services/api.service';
import { MatSnackBar       } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router, private snackbar: MatSnackBar) {}
  register: any = {}
  ngOnInit() {
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

  registerUser() {
    console.log(this.register)
    this.apiService.postData({url: this.apiService.auth+this.apiService.users, data: this.register}).subscribe(
      data => {
        console.log(data);
        let message = "User created successfully"
        let action = "Success"
        this.snackbar.open(message, action, {
          duration: 1000
        })
        setTimeout( () => {
          this.router.navigate(['/home', {}])
        }, 1000);
      }
    )
  }
}
