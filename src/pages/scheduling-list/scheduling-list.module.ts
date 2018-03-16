import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulingListPage } from './scheduling-list';

@NgModule({
  declarations: [
    SchedulingListPage,
  ],
  imports: [
    IonicPageModule.forChild(SchedulingListPage),
  ],
  exports: [
    SchedulingListPage
  ]
})
export class SchedulingListPageModule {}
