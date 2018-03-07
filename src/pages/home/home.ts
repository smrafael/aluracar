import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Carro } from '../../models/carro'
import { HttpClient } from '@angular/common/http';
let config = require('../../lib/config.json');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public cars: Carro[];

  constructor(public navCtrl: NavController,
    public http: HttpClient) {
    
    this.http.get<Carro[]>(config.apiUrl + '/carro/listaTodos')
      .subscribe(cars => this.cars = cars);

  }

}
