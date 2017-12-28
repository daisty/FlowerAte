import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { APP_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-borrow-detail',
  templateUrl: 'borrow-detail.html',
})
export class BorrowDetailPage {
  status:string;
  statusColor:string;
  isAuditor:boolean = true;//是否为审核人员
  buttonName:string;
  id :string;
  lendStatus: string;
  data:any = {};
  buttonStatus: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public http: ToastService,
    public alertCtrl: AlertController
     ) {
    this.status = navParams.get('value');
    this.buttonStatus = navParams.get('name');
    this.id = navParams.get('id');
    switch(this.status){
          case 'WAITAUDIT':
            this.statusColor = 'orange';
            this.buttonName = '去审核';
            break;
          case 'WAITPAY':
            this.statusColor = 'red';
            this.buttonName = '去付款';
            break;
          case 'WAITRETURN'://待还款
            this.statusColor = 'green';
            break;
          case 'HASRETURN'://已还款
            this.statusColor = 'blue';
            break;
          case 'HASLEND'://已借款
            this.statusColor = 'Gcolor'
            this.buttonName = '确认收款';
            break;
          case 'WAITTHAW'://待解冻
            this.statusColor = 'grey';
            this.buttonName = '重新编辑提交';
            break;
        }
    this.http.get(APP_URL+`phoneApplylend/v1/info/lend/${this.id}/${this.buttonStatus}`)
    .then(res => {
      this.data = res.data;
      if(this.data.receivePay == '是'){//控制显示按钮      
        if(this.data.lendRetunStatus == 'WAITRETURNCHECK'){
          this.buttonName = "去核对";
        }else if(this.data.lendRetunStatus == 'NONE') {
          this.buttonName = '去还款';
        }
      }
    });
}

  ionViewDidLoad() {
    
  }
  buttonFn(status:string,lendStatus: string,page:number):void {
    if(status == 'WAITRETURN'){//待还款
      if(lendStatus == 'WAITRETURNCHECK'){
        this.navCtrl.push('CheckReturnPage',{id:this.id});
      }else{
        this.navCtrl.push('BorrowReturnPage',{id:this.id});
      }
    }else if(status == 'WAITAUDIT') {//待审核
      this.navCtrl.push('BorrowAuditopinonPage',{id:this.id,page:page});
    }else if(status == 'WAITTHAW') {//待解冻
      this.navCtrl.push('ApplyborrowmoneyPage',{id:this.id,name:'EDITERROR'});
    }else if(status == 'WAITPAY') {//去付款
      this.navCtrl.push('Paymentss',{id:this.id});
    }else if(status == 'HASLEND') {//已借款
      let confirm = this.alertCtrl.create({
        title: '消息提示',
        message: '你确认已收款？',
        buttons: [
          {
          text: '取消',
          handler: () => {
              
            }
          },
            {
              text: '确认',
              handler: () => {
                this.http.put(APP_URL + `phoneApplylend/v1/editSureRecieve`,{id:this.id})
                  .then(res => {
                    if(res.code == 0){
                      this.navCtrl.push('BorrowManagePage');
                    }
                  });
              }
            }
          ]
        });
        confirm.present();
    }
  }
  season(id: string) :void {//查看原因
    this.navCtrl.push('AuditReasonPage',{id:id});
  }
}
