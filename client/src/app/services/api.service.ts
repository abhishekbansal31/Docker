import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar       } from '@angular/material/snack-bar';
import { HttpStatusCode } from '../interfaces/enums';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  DJANGO_SERVER_URL = 'http://localhost:8001/';

  api = 'api/'
  auth = 'auth/'
  users = 'users/'
  token = 'token/'
  login = 'login/'
  logout = 'logout/'

  BAD_REQUEST = 400

  headers: HttpHeaders = new HttpHeaders()
  
  constructor(private http: HttpClient, private snackbar: MatSnackBar, private router: Router) {
  }

  private errorHandler<T> (operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.error(error);
      if(error?.status==HttpStatusCode.BadRequest) {
        if(error?.error) {
          Object.keys(error.error).forEach(key=> {
            let value = error.error[key]
            if(value!=null && (typeof value == 'object')) {

              Object.keys(value).forEach(key_2=> {
                let value_2 = value[key_2]
                this.snackbar.open(value_2, error?.statusText || 'Bad Request', {
                  duration: 2000
                })
              })
            } else {
              this.snackbar.open(value, error?.statusText || 'Bad Request', {
                duration: 2000
              })
            }
          })
        }
        // return of(error?.error || result as T);
      } else if(error?.status == HttpStatusCode.Unauthorized
                || error?.status == HttpStatusCode.Unknown
                || error?.status == HttpStatusCode.InternalServerError) {
        let action = ''
        switch(error?.status) {
          case HttpStatusCode.Unauthorized:
            action = (error?.error?.detail || 'Unauthorized')
            break;
          case HttpStatusCode.InternalServerError:
            action = (error?.statusText || "Internal Server Error")
            break;
          default:
            action = (error?.statusText || "Unknown")
            break;
        }
        this.snackbar.open(action, error?.status.toString(), {
          duration: 2000
        })
        localStorage.clear();
        this.router.navigate(['/login'])
      } else {
        return of(result as T);
      }
      return of(null)
    };
  }

  public getData(info): Observable<any> {
    console.log(info)
    if(info.url){
      var url = this.DJANGO_SERVER_URL+ info.url
      if(info.data){
        url = url + this.json2queryparam(info.data)
      }
      
      this.refreshHeader()
      console.log(this.headers)
      return this.http.get<any>(url, {headers: this.headers}).pipe(
        catchError(this.errorHandler<any>('getData', []))
        );
    }
  }

  public postData(info, isLoginorRegisterCall=false): Observable<any> {
    console.log(info)
    if(info && info.url && info.data){
      this.refreshHeader(isLoginorRegisterCall)
      console.log(this.headers)
      return this.http.post<any>(this.DJANGO_SERVER_URL+ info.url, info.data, {headers: this.headers}).pipe(
        catchError(this.errorHandler<any>('postData', ['Please contact customer support.']))
        );
    }
  }

  public delete(info) {
    console.log(info)
    if(info && info.url) {
      return this.http.delete(this.DJANGO_SERVER_URL+ info.url).pipe(
        catchError(this.errorHandler<any>('delete', []))
      );
    }
    return of()
  }

  refreshHeader(isLoginorRegisterCall=false) {
    this.headers = new HttpHeaders()
    if(!isLoginorRegisterCall) {
      this.headers = this.headers.set('Authorization', 'Token '+localStorage.getItem('token'));
    }
    this.headers = this.headers.set('Content-Type', 'application/json');
  }

  json2queryparam(data){

    let queryParam='';
    if(data!=null) {
      Object.keys(data).forEach(k=>{

        let v = data[k];
        let param = ''
        let paramKeys = ''

        if(v!=null && (typeof v == 'object')) {
          Object.keys(v).forEach( k1 => {
            let v1 = v[k1];
            param = param + k1

            if(v[k1]!=null && (typeof v[k1] == 'object')) {
              v1 = '';

              Object.keys(v[k1]).forEach(k2=> {
                if(v[k1][k2]==true) {
                  v1 = v1 + (v1!=''?',':'')+k2;
                } else {
                  v1 = v1 + (v1!=''?',':'') + v[k1][k2];
                }
              });

            }
            param = param + '='+v1+'&'
            paramKeys = paramKeys + (paramKeys!=''?',':'')+k1;
          });
        } else {
          param = param + k+'='+v
        }

        if(paramKeys!='') {
          queryParam += k+'Keys='+paramKeys+'&'
        }

        queryParam = queryParam + param + '&'
      });
    }

    return queryParam
  }

}
