import { Scheduling } from './../../models/scheduling';
import { HomePage } from './../home/home';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ScheduleServiceProvider } from './../../providers/schedule-service/schedule-service';
import { Car } from './../../models/car';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { SchedulingDaoProvider } from '../../providers/scheduling-dao/scheduling-dao';

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
    private alertCtrl: AlertController,
    private schedulingDao: SchedulingDaoProvider) {

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
      data: this.date,
      sended: false,
      confirmed: false
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

    this.schedulingDao.isDuplicated(scheduling)
      .mergeMap(isDuplicated => {
        if (isDuplicated) {
          throw Error('Scheduling duplicated');
        }
        return this.scheduleService.schedule(scheduling)
      })
      .mergeMap((result) => {
        let observable = this.schedulingDao.save(scheduling);
        if (result instanceof Error) {
          throw result;
        }
        return observable;
      })
      .finally(
        () => {
          this.alert.setSubTitle(msg);
          this.alert.present();
        }
      )
      .subscribe(
        () => msg = 'Scheduling registered',
        (err: Error) => msg = err.message
      );
  }

}
