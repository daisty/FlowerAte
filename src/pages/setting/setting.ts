import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  rootPage: any;
  items: Array<{ title: string, page: any }>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootPage = 'SettingPage';
    this.items = [
      {
        title: '修改手机号码',
        page : 'NumberPage'
      },
      {
        title: '修改登录密码',
        page : 'SlidingItemPage'
      }
    ];
  }
  // itemTapped(event, item) {
  //   this.navCtrl.push(item.page);
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

}
