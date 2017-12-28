import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { APP_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class Verification {
  paramObj: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ToastService, public alertCtrl: AlertController) {
    this.paramObj.id = navParams.get('id');
  }

  ionViewDidLoad() {

  }
  submit(): void {
    this.paramObj.accountCheckPassOr = this.paramObj.accountCheckPassOr ? '是' : '否';
    this.http.put(APP_URL + 'phoneReimburse/v1/acount/recieveTicket', this.paramObj)
      .then(res => {
        let msg: string;
        if (res.code == 0) {
          msg = '此次编辑成功';
        } else {
          msg = `编辑失败：${res.msg}`;
        }
        let confirm = this.alertCtrl.create({
          title: '消息提示',
          message: msg,
          buttons: [
            {
              text: '确认',
              handler: () => {
                if (!res.msg) {
                  this.navCtrl.push('ReimbursementPage', { tab: true })
                }
              }
            }
          ]
        })
        confirm.present();
      })
  }
}
