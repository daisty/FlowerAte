import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { APP_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-reim-analisis',
  templateUrl: 'reim-analisis.html',
})
export class ReimAnalisisPage {
  paramObj: any = {};
  id: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: ToastService, public viewCtrl: ViewController) {
    this.paramObj.id = navParams.get('id');
  }

  ionViewDidLoad() {
  }
  confirm(): void {
    this.paramObj.chargerAuditStatus = this.paramObj.chargerAuditStatus ? '已分析' : '申请冻结';
    this.http.put(APP_URL + `phoneReimburse/v1/analisys`, this.paramObj)
      .then(res => {
        let msg: string;
        if (res.code == 0) {
          msg = '此次审核成功!';
        } else {
          msg = `审核失败:${res.msg}`;
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
