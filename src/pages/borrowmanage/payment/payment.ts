import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { APP_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class Paymentss { 
  paramObj :any = {id:'1'};
  payList :Array<''>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public http: ToastService
    ) {
    this.paramObj.id = navParams.get('id');
  }

  ionViewDidLoad() {
    this.http.get(APP_URL + 'applylend/v1/listAccountOrigin')
    .then(res => {
      if(res.code == 0){
        this.payList = res.data;
      }
    })
  }

  successAlert(){
    let msg;
    this.http.put(APP_URL+'phoneApplylend/v1/editPay',this.paramObj)
    .then(res => {
      if(res.code == 0){
        msg = '付款成功';
      }else {
        msg = '付款失败';
      }
      let confirm = this.alertCtrl.create({
        title: '消息提示',
        message: msg,
        buttons: [
            {
              text: '确认',
              handler: () => {
                if(!res.msg)this.navCtrl.push('BorrowManagePage',{tab:true});
              }
            }
          ]
        });
        confirm.present();
    })
  }
}
