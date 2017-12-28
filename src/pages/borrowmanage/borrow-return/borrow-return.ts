import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { APP_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-borrow-return',
  templateUrl: 'borrow-return.html',
})
export class BorrowReturnPage {
  Iamges:any = [
    {
      id: 1,
      url: 'assets/imgs/userImage1.png'
    },
    {
      id: 2,
      url: 'assets/imgs/userImage2.png'
    }
  ];
  payList :Array<''>;
  paramObj: any={};
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public http: ToastService,
     public alertCtrl: AlertController
     ) {
       this.paramObj.id = navParams.get('id');
  }

  ionViewDidLoad() {
    //获取来源
    this.http.get(APP_URL+ 'applylend/v1/listAccountOrigin')
    .then(res => {
      if(res.code == 0){
        this.payList = res.data;
      }
    })
  }
  confirm() :void {
    this.http.put(APP_URL+ 'phoneApplylend/v1/return/edit',this.paramObj)
    .then(res => {
      let msg:string;
      if(res.code == 0){
        msg = '此次申请还款成功!';
      }else {
        msg = `借款失败：${res.msg}`;
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
  addImage() {
    let o:any = {id:this.Iamges.length,url:'assets/imgs/userImage2.png'};
    this.Iamges.push(o);
  }
  delImage(val:number) {
    this.Iamges.splice(val,1);
  }
  send() :void {
    this.navCtrl.push('BorrowSendPage',{id:this.navParams.get('id')});
  }
}
