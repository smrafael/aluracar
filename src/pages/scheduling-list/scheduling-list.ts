import { ScheduleServiceProvider } from './../../providers/schedule-service/schedule-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { SchedulingDaoProvider } from './../../providers/scheduling-dao/scheduling-dao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Scheduling } from '../../models/scheduling';

@IonicPage()
@Component({
  selector: 'page-scheduling-list',
  templateUrl: 'scheduling-list.html',
})
export class SchedulingListPage {

  schedulings: Scheduling[];


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public schedulingDao: SchedulingDaoProvider,
    private alertCtrl: AlertController,
    private scheduleService: ScheduleServiceProvider) {
  }

  ionViewDidLoad() {
    this.schedulingDao.list()
      .subscribe(schedulings => {
        this.schedulings = schedulings;
      });
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.refreshSchedulings();
    }, 5000);
  }

  private refreshSchedulings() {
    this.schedulings.filter((scheduling: Scheduling) => scheduling.confirmed)
      .forEach((scheduling: Scheduling) => {
        scheduling.viewed = true;
        this.schedulingDao.save(scheduling);
      })
  }

  resend(scheduling: Scheduling) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      buttons: [
        { 
          text: 'OK'
        }
      ]
    });
    
    let msg = '';
    this.scheduleService.schedule(scheduling)
      .mergeMap((result) => {
        let observable = this.schedulingDao.save(scheduling);
        if (result instanceof Error) {
          throw result;
        }
        return observable;
      })
      .finally(
        () => {
          alert.setSubTitle(msg);
          alert.present();
        }
      )
      .subscribe(
        () => msg = 'Scheduling resended',
        (err: Error) => msg = err.message
      );
  }

}
