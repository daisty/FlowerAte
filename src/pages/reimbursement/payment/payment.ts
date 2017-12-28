import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { APP_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class Payment {
  paramObj: any = { payOrPre: false };
  payList: Array<''>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: ToastService
  ) {
    this.paramObj.id = navParams.get('id');
  }

  ionViewDidLoad() {
    this.http.get(APP_URL + 'reimburserecord/v1/listAccountOrigin', this.paramObj)
      .then(res => {
        if (res.code == 0) {
          this.payList = res.data;
        }
      })
  }

  successAlert() {
    let msg;
    if (this.paramObj.payOrPre == true) {
      this.http.put('phoneReimburse/v1/phone/prepay', this.paramObj)
        .then(res => {
          if (res.code == 0) {
            msg = '付款成功';
          } else {
            msg = `付款失败:${res.msg}`;
          }
          let confirm = this.alertCtrl.create({
            title: '消息提示',
            message: msg,
            buttons: [
              {
                text: '确认',
                handler: () => {
                  if (!res.msg) {
                    this.navCtrl.push('ReimbursementPage', { tab: true });
                  }
                }
              }
            ]
          });
          confirm.present();
        })
    } else {
      this.http.put('phoneReimburse/v1/phone/pay', this.paramObj)
        .then(res => {
          if (res.code == 0) {
            msg = '付款成功';
          } else {
            msg = `付款失败:${res.msg}`;
          }
          let confirm = this.alertCtrl.create({
            title: '消息提示',
            message: msg,
            buttons: [
              {
                text: '确认',
                handler: () => {
                  if (!res.msg) {
                    this.navCtrl.push('ReimbursementPage', { tab: true });
                  }
                }
              }
            ]
          });
          confirm.present();
        })
    }

  }
}
