import { RegisterPage } from './../register/register';
import { Accessory } from './../../models/accessory';
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

  private total: number;

  public car: Car;
  public accessories: Accessory[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
      this.car = this.navParams.get('car');
      this.total = this.car.preco;
      this.accessories = [
        { name: 'Freio ABS', price: 800 },
        { name: 'Ar condicionado', price: 1000 },
        { name: 'MP3 Player', price: 500 }
      ]
  }

  ionViewDidLoad() { }

  get getTotal(): number {
    return this.total;
  }

  public refreshPrice(checked, accesory: Accessory) {
    checked ? this.total += accesory.price 
      : this.total -= accesory.price;
  }

  public toRegister() {
    this.navCtrl.push(RegisterPage.name, {
      car: this.car,
      totalPrice: this.total
    });
  }

}
