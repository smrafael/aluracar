import { Scheduling } from './../../models/scheduling';
import { HomePage } from './../home/home';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ScheduleServiceProvider } from './../../providers/schedule-service/schedule-service';
import { Car } from './../../models/car';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public car: Car;
  public totalPrice: number;
  public name: string;
  public email: string;
  public address: string;
  public date: string = new Date().toISOString();

  private alert: Alert;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private scheduleService: ScheduleServiceProvider,
    private alertCtrl: AlertController) {

    this.car = this.navParams.get('car');
    this.totalPrice = this.navParams.get('totalPrice');
  }

  ionViewDidLoad() { }

  public register() {

    if (!this.name || !this.address || !this.email) {
      this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Required fields not filled',
        buttons: [
          { text: 'OK' }
        ]
      }).present();
      return;
    }

    let scheduling: Scheduling = {
      nomeCliente: this.name,
      enderecoCliente: this.address,
      emailCliente: this.email,
      modeloCarro: this.car.nome,
      precoTotal: this.totalPrice,
      data: '27/06/2018'
    }

    this.alert = this.alertCtrl.create({
      title: 'Alert',
      buttons: [
        { 
          text: 'OK',
          handler: () => { this.navCtrl.setRoot(HomePage); }
        }
      ]
    });
    
    let msg = '';
    this.scheduleService.schedule(scheduling)
      .finally(
        () => {
          this.alert.setSubTitle(msg);
          this.alert.present();
        }
      )
      .subscribe(
        () => {
          msg = 'Scheduling registered';
        },
        () => {
          msg = 'Error on scheduling';
        }
      );
  }

}
