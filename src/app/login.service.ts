import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = 'https://6229de55be12fc4538aa6c8e.mockapi.io/users';
  public usernameCheck$ = new BehaviorSubject<any[]>([]);
  public newRegisterCheck$ = new BehaviorSubject<any[]>([]);

  public isLogged = false;


  constructor(private http: HttpClient) { }

  searchForLogin(username:string, password:string){
    this.http.get<any[]>(this.apiUrl + '?username=' + username).pipe(
      map((users) => users.filter((user:any) => user.password === password))
    ).subscribe((users) => this.usernameCheck$.next(users))
  }

  searchBeforeRegister(user:any){
    this.http.get<any[]>(this.apiUrl + '?username=' + user.username).pipe(
      map((users) => users.filter((user:any) => user.password === user.password && user.email === user.email))
    ).subscribe((users) => this.usernameCheck$.next(users))
  }

  registerNewProfile(tempUser:any){
    tempUser.dob = new Date(tempUser.dob).getTime();
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
    return this.http.post<any>(this.apiUrl, tempUser, httpOptions).pipe(
      map((user:any) => {
        console.log(user);
        return user;
      }))
  }
}
