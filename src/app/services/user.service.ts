import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class UserService { 

  private userUrl = "http://localhost:8080/magic-api/user";

  constructor(private httpClient : HttpClient) { }

  getUsers():Observable<User[]>{
    return this.httpClient.get<GetResponseUser>(this.userUrl)
    .pipe(map(response => response._embedded.booksBuyUsers));
  }

  saveUser(user:User):Observable<User>{
    console.log('in save user');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-origin':'*'
        //,mode :'no-cors'
      })
    };
    return this.httpClient.post<User>(this.userUrl,user,httpOptions);
  }

  updateUser(user:User):Observable<User>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-origin':'*'
        
      })
    };
    return this.httpClient.put<User>(this.userUrl+`/${user.id}`,user,httpOptions);
  }                                               //${user.--name of id from user entity--}

  deleteUser(userId:number):Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.httpClient.delete<User>(`${this.userUrl}/${userId}`,httpOptions);
  }                                                    //${method parameter}

  getUserById(userId: number):Observable<User> {
    const userDetailUrl = `${this.userUrl}/${userId}`;
                                         //${method parameter}
    return this.httpClient.get<User>(userDetailUrl);
  }

}

interface GetResponseUser{
  _embedded:{
    booksBuyUsers:User[]
  }
}
