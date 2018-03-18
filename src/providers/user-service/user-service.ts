import { Observable } from 'rxjs/Observable';
import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { normalizeURL } from 'ionic-angular';

const AVATAR_KEY = 'avatar-key';

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

  public setAvatar(avatar: string) {
    localStorage.setItem(AVATAR_KEY, normalizeURL(avatar));
  }

  public getAvatar() {
    let avatar = localStorage.getItem(AVATAR_KEY);
    return avatar ? avatar : 'assets/imgs/logo.png';
  }

}
