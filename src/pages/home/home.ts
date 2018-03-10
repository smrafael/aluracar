import { DetailPage } from './../detail/detail';
import { CarroServiceProvider } from './../../providers/carros-service/carros-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Car } from '../../models/car'
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles {

  public cars: Car[];

  constructor(public navCtrl: NavController,
    public _loadingCrtl: LoadingController,
    public _alertCtrl: AlertController,
    public carrosService: CarroServiceProvider) { }

  ionViewDidLoad(): void {
    let loading = this._loadingCrtl.create({
      content: 'Loading cars...'
    });
    loading.present();
    
    this.carrosService.list()
      .subscribe(
        cars => {
          this.cars = cars;
          loading.dismiss();
        },
        error => {
          loading.dismiss();
          this._alertCtrl.create({
            title: 'Error',
            subTitle: 'Error on load cars.',
            buttons: [
              { text: 'OK' }
            ]
          }).present();
          console.log(error);
        }
      );
  }

  detailCar(car: Car): void {
    this.navCtrl.push(DetailPage.name, {car: car});
  }

}
