import { Car } from './../../models/car';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {

    this.car = this.navParams.get('car');
    this.totalPrice = this.navParams.get('totalPrice');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register() {
    console.log(this.name);
    console.log(this.email);
    console.log(this.address);
    console.log(this.date);
  }

}
