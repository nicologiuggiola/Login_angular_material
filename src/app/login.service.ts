import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = 'https://6229de55be12fc4538aa6c8e.mockapi.io/users';
  public usernameCheck$ = new BehaviorSubject<any[]>([]);


  constructor(private http: HttpClient) { }

  searchForLogin(username:string, password:string){
    this.http.get<any[]>(this.apiUrl + '?username=' + username).pipe(
      map((users) => users.filter((user:any) => user.password === password))
    ).subscribe((users) => this.usernameCheck$.next(users))
  }
}
