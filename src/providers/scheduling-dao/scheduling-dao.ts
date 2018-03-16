import { Observable } from 'rxjs/Observable';
import { Scheduling } from './../../models/scheduling';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SchedulingDaoProvider {

  constructor(public storage: Storage) {
    console.log('Hello SchedulingDaoProvider Provider');
  }

  private generateKey(scheduling: Scheduling) {
    return scheduling.emailCliente + scheduling.data.substr(0, 10);
  }

  save(scheduling: Scheduling) {
    let key = this.generateKey(scheduling);
    let promise = this.storage.set(key, scheduling);

    return Observable.fromPromise(promise);
  }

  isDuplicated(scheduling: Scheduling) {
    let key = this.generateKey(scheduling);
    let promise = this.storage.get(key).then(data => data ? true : false);

    return Observable.fromPromise(promise);
  }

  list(): Observable<Scheduling[]> {
    let result: Scheduling[] = [];
    let promise = this.storage.forEach(s => {
      result.push(s);
    }).then(() => result);

    return Observable.fromPromise(promise);
  }

}
