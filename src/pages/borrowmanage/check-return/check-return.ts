import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { APP_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-check-return',
  templateUrl: 'check-return.html',
})
export class CheckReturnPage {
  paramObj: any ={};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: ToastService,
              public alertCtrl: AlertController
 ) {
      this.paramObj.id = navParams.get('id');
    }

  ionViewDidLoad() {
  }
  confirm() :void{
    this.paramObj.documentCondition = this.paramObj.documentCondition?'是':'否';
    this.paramObj.lendRetunStatus = this.paramObj.lendRetunStatus?'PASS':'NOTPASS';
    this.http.put(APP_URL+'phoneApplylend/v1/check/checkReturn',this.paramObj)
    .then(res => {
      let msg:string;
      if(res.code == 0){
        msg = '此次审核成功!';
      }else {
        msg = `审核失败：${res.msg}`;
      }
      let confirm = this.alertCtrl.create({
        title: '消息提示',
        message: msg,
        buttons: [
            {
              text: '确认',
              handler: () => {
                if(!res.msg){
                  this.navCtrl.push('BorrowManagePage');
                }
              }
            }
          ]
        });
        confirm.present();
    })
  }

}
