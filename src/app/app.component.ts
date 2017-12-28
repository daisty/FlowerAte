import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ToastService } from '../providers/util/toast.service';
import { GlobalData } from '../providers/GlobalData';
import { NativeService } from '../providers/NativeService';
import { APP_URL } from '../config/config';

import{ TaskAssignmentPage } from '../pages/task-assignment/task-assignment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = '';
  public userName =localStorage.getItem("userName");
  public password =localStorage.getItem("password");
  constructor(
    platform: Platform, 
    statusBar: StatusBar,
    public http : ToastService,
    splashScreen: SplashScreen,
    public globalData: GlobalData,
    public nativeHttp: NativeService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.globalData.token = localStorage.getItem('token');
    });
  }
  close() {
      this.rootPage = LoginPage;
      // this.http.get(APP_URL + `phoneApplylend/v1/testToken`)
      // .then( res => {
      //    if(res.code == 401 || res.code == 403){
      //       this.rootPage = LoginPage;
      //    }else if(res.code == 0){
      //      this.rootPage = TabsPage;
      //    }else {
      //      this.rootPage = LoginPage;
      //    }
      // }).catch(err => {
      //   this.rootPage = LoginPage;
      // })
  }
}
