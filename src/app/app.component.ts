import { UserServiceProvider } from './../providers/user-service/user-service';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SchedulingListPage } from '../pages/scheduling-list/scheduling-list';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

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
    public userService: UserServiceProvider) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  public go(page): void{
    this.nav.push(page);
  }

  get user(){
    return this.userService.getUser();
  }

}

