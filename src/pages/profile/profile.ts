import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public user: User;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserServiceProvider) {
    
    this.user = this.userService.getUser();
  }

}
