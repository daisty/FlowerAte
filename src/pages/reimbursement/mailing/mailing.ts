import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { APP_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-mailing',
  templateUrl: 'mailing.html',
})
export class MailingPage {
  paramObj: any = {};
  lenderList: any = [];
  areaList: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: ToastService) {
    this.paramObj.id = navParams.get('id');
  }

  ionViewDidLoad() {
    this.http.get(APP_URL + `applylend/v1/getAllUser`)
      .then(res => {
        this.lenderList = res.data;
      })
    this.http.get(APP_URL + `phoneApplylend/v1/phone/getArea`)
      .then(res => {
        this.areaList = res.data;
      })
  }
  ngOnInit() {

  }
  confirm(): void {
    this.paramObj.ticketCondition = this.navParams.get('isTicket');
    this.http.put(APP_URL + `phoneReimburse/v1/send`, this.paramObj)
      .then(res => {
        let msg: string;
        if (res.code == 0) {
          msg = '此次寄件成功！';
        } else {
          msg = `寄件失败:${res.msg}`;
        }
        let confirm = this.alertCtrl.create({
          title: '消息提示',
          message: msg,
          buttons: [
            {
              text: '确认',
              handler: () => {
                if (!res.msg) {
                  this.navCtrl.push('ReimdetailsPage', { id: this.navParams.get('id'), name: 'WAITAUDIT', value: 'WAITAUDIT' });
                }
              }
            }
          ]
        });
        confirm.present();
      })
  }
}
