import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { APP_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-borrow-send',
  templateUrl: 'borrow-send.html',
})
export class BorrowSendPage implements OnInit{
  paramObj :any= {};
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
  public http :ToastService) {
    this.paramObj.id = navParams.get('id');
  }
  ionViewDidLoad() {
    
  }
  ngOnInit() {
	}
  confirm() :void {
    this.http.put(APP_URL +'phoneApplylend/v1/send/edit',this.paramObj)
    .then(res => {
      let msg:string;
      if(res.code == 0){
        msg = '此次寄件成功!';
      }else {
        msg = `寄件失败：${res.msg}`;
      }
      let confirm = this.alertCtrl.create({
        title: '消息提示',
        message: msg,
        buttons: [
            {
              text: '确认',
              handler: () => {
                if(!res.msg){
                  this.navCtrl.push('BorrowReturnPage',{id:this.navParams.get('id')});
                }
              }
            }
          ]
        });
        confirm.present();
    })
  }
  
}
