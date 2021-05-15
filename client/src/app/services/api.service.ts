import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  DJANGO_API_URL = 'http://localhost:8000/api';

  usersUrl = '/users/'

  constructor(private http: HttpClient) { }

  private errorHandler<T> (operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  public getData(info): Observable<any> {
    console.log(info)
    if(info.url){
      var url = this.DJANGO_API_URL+ info.url
      if(info.data){
        url = url + this.json2queryparam(info.data)
      }
      console.log(url)
      return this.http.get<any>(url).pipe(
        catchError(this.errorHandler<any>('getData', []))
        );
      return of()
    }
  }

  public postData(info): Observable<any> {
    if(info && info.url && info.data){
      return this.http.post<any>(this.DJANGO_API_URL+ info.url, info.data).pipe(
        catchError(this.errorHandler<any>('postData', []))
        );
      return of()
    }
  }

  public delete(info) {
    if(info && info.url) {
      return this.http.delete(this.DJANGO_API_URL+ info.url).pipe(
        catchError(this.errorHandler<any>('delete', []))
      );
    }
    return of()
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
