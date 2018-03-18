import { SchedulingDaoProvider } from './../providers/scheduling-dao/scheduling-dao';
import { OneSignal, OSNotification } from '@ionic-native/onesignal';
import { UserServiceProvider } from './../providers/user-service/user-service';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SchedulingListPage } from '../pages/scheduling-list/scheduling-list';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { Scheduling } from '../models/scheduling';

@Component({
  selector: 'my-app',
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage:any = LoginPage;

  public pages = [
    { title: 'Scheduling', page: SchedulingListPage.name, icon: 'calendar' },
    { title: 'Profile', page: ProfilePage.name, icon: 'person' }
  ]

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    public userService: UserServiceProvider,
    private oneSignal: OneSignal,
    private schedulingDao: SchedulingDaoProvider) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // OneSignal config
      let iosConfig = {
        kOSSettingsKeyAutoPrompt: true,
        kOSSettingsKeyInAppLaunchURL: false
      }
      this.oneSignal
        .startInit('', '');
      this.oneSignal.iOSSettings(iosConfig);

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.handleNotificationReceived()
        .subscribe(
          (push: OSNotification) => {
            let schedulingId = push.payload.additionalData['agendamento-id'];
            this.schedulingDao.getById(schedulingId)
                .subscribe((scheduling: Scheduling) => {
                  scheduling.confirmed = true;
                  this.schedulingDao.save(scheduling);
                })
          });
      
      this.oneSignal.endInit();
    });
  }

  public go(page): void{
    this.nav.push(page);
  }

  get user(){
    return this.userService.getUser();
  }

  get avatar() {
    return this.userService.getAvatar();
  }

}

