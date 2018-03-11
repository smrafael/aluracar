import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

let config = require('../../lib/config.json');

@Injectable()
export class ScheduleServiceProvider {

  constructor(public _http: HttpClient) {
    console.log('Hello ScheduleServiceProvider Provider');
  }

  public schedule(scheduling) {
    return this._http.post(config.apiUrl + '/agendamento/agenda', scheduling);
  }

}
