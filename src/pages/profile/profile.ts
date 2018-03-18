import { Camera } from '@ionic-native/camera';
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
    public userService: UserServiceProvider,
    private camera: Camera) {
    
    this.user = this.userService.getUser();
  }

  public takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then(picture => {
      this.userService.setAvatar(picture);
    });
  }

  get avatar() {
    return this.userService.getAvatar();
  }

}
