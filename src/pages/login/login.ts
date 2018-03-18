import { UserServiceProvider } from './../../providers/user-service/user-service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email: String = 'joao@alura.com.br';
  public passwd: String = 'alura123';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private userService: UserServiceProvider,
    private alertCtrl: AlertController) {
  }

  login(): void {
    this.userService.login(this.email, this.passwd)
      .subscribe(
        user => {
          this.navCtrl.setRoot(HomePage);
        },
        () => {
          this.alertCtrl.create({
            title: 'Error on login',
            subTitle: 'Wrong credentials',
            buttons: [
              { text: 'OK' }
            ]
          }).present();
        });
  }
}
