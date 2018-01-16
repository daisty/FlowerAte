import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { ATTEND_URL } from '../../../config/config';

declare var LocationPlugin;
@IonicPage()
@Component({
  selector: 'page-addEnterprise',
  templateUrl: 'addEnterprise.html',
})
export class addEnterprisePage{
  private tab :boolean;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: ToastService) {
      this.tab = navParams.get('tab');
  }
    
  //关闭返回首页
  closeModal() {
    this.navCtrl.popToRoot();
  }
}
