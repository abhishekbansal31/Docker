import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users$: Observable<User[]>;
  form: FormGroup;

  constructor(private apiService: ApiService, private form_builder: FormBuilder) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.apiService.getData({url: this.apiService.usersUrl}).subscribe(
      data => {
        console.log(data)
        this.users$ = data
        console.log(this.users$)
    });

    this.form = this.form_builder.group({
      name: '',
      phone: '',
      address: ''
    });
  }

  addUser() {
    this.apiService.postData({url: this.apiService.usersUrl, data: this.form.value}).subscribe(
      data => {
        console.log(data);
        this.getUsers();
      }
    )
  }

  deleteUser(id) {
    console.log(id)
    if(id){
      this.apiService.delete({url: this.apiService.usersUrl+id}).subscribe(
        data => {
          console.log(data)
          this.getUsers();
        }
      )

    }
  }

}