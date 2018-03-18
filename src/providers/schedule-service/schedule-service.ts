import { Observable } from 'rxjs/Observable';
import { Scheduling } from './../../models/scheduling';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

let config = require('../../lib/config.json');

@Injectable()
export class ScheduleServiceProvider {

  constructor(public _http: HttpClient) {
  }

  public schedule(scheduling: Scheduling) {
    return this._http.post(config.apiUrl + '/agendamento/agenda', scheduling)
      .do(() => scheduling.sended = true)
      .catch((err) => Observable.of(new Error('Error on scheduling')));
  }

}
