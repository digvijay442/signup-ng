import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from './message.service';
import { Message } from './models/message.modal';

@Injectable()
export class UserService {
  registerUrl = 'https://mighty-spire-92685.herokuapp.com/users/register';
  loginUrl = 'https://mighty-spire-92685.herokuapp.com/users/login';
  homeUrl = 'https://mighty-spire-92685.herokuapp.com/users/home';
  logoutUrl = 'https://mighty-spire-92685.herokuapp.com/users/logout';

  isLoggedin: boolean = false;

  constructor(private _http: HttpClient,
              private _messageService: MessageService) { 
                if(localStorage.getItem('tokenKey')){
                  this.isLoggedin = true;
                }
              }

  register(body: any){
    return this._http.post(this.registerUrl, body, {
      observe: 'response',
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body: any){
    console.log(body);
    return this._http.post(this.loginUrl,body, {
      observe: 'body'
    })

  }

  home(){
    return this._http.get(this.homeUrl, {
      observe: 'body',
      params: new HttpParams().append('tokenKey',localStorage.getItem('tokenKey'))
    })
  }

  logout(){
    localStorage.removeItem('tokenKey');
    this._messageService.addMessage(
      new Message('Logged out', 'success')
    );
    this.isLoggedin = false;
  }

}
