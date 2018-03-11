import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../../models/car';
import { Observable } from 'rxjs/Observable';

let config = require('../../lib/config.json');

@Injectable()
export class CarServiceProvider {

  constructor(public _http: HttpClient) {
  }

  list(): Observable<Car[]> {
    return this._http.get<Car[]>(config.apiUrl + '/carro/listaTodos');
  }

}
