import { NavLifecycles } from './../../utils/ionic/nav/nav-lifecycles';
import { Car } from './../../models/car';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage implements NavLifecycles {

  public car: Car;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.car = this.navParams.get('car');
  }

  ionViewDidLoad() {
  }

}
