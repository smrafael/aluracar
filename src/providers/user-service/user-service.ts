import { Observable } from 'rxjs/Observable';
import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

let config = require('../../lib/config.json');

@Injectable()
export class UserServiceProvider {

  private user: User;

  constructor(public http: HttpClient) {
  }

  public login(email: String, passwd: String): Observable<User> {
    return this.http.post<User>(config.apiUrl + '/login', { email, senha: passwd })
      .do(user => this.user = user);
  }

  public getUser(): User {
    return this.user;
  }

}
