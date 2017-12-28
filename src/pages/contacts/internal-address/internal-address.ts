import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ActionSheetController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { CONTACT } from '../../../config/config';
import { CallNumber } from '@ionic-native/call-number';
import { TabsPage } from '../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-internal-address',
  templateUrl: 'internal-address.html',
})
export class InternalAddress {

  id: string;
  detailData: any = {};
  phoneMobile: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public http: ToastService,
    public app: App,
    private callNumber: CallNumber,
    public actionSheetCtrl: ActionSheetController) {
    this.id = navParams.get('id');

    this.http.get(CONTACT + `internalcontacts/v1/mobile/findByID/${this.id}`)
    .then( res =>{
      this.detailData = res.data;
    })
  }

  //关闭返回首页
  closeModal() {
    this.navCtrl.push(TabsPage,{page:2});
  }

  // showPrompt(phone) {
  //   let prompt = this.alertCtrl.create({
  //     title: this.detailData.phone,
  //     buttons: [
  //       {
  //         text: '呼叫',
  //         handler: data => {
  //           this.callNumber.callNumber(this.detailData.phone, true)
  //             .then(() => console.log(123))
  //             .catch(() => console.log('Error launching dialer'));
  //         }
  //       },
  //       {
  //         text: '取消',
  //         handler: data => {
  //           console.log('Saved clicked');
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  showCall(){
    this.http.get(CONTACT + `internalcontacts/v1/mobile/tel`)
     .then(res => {
       this.phoneMobile = res.data;

       let actionSheet = this.actionSheetCtrl.create({
         title: '选择需拨打的号码',
         buttons: [
           {
             text: this.phoneMobile[0].phone,
             handler: () => {
               console.log(0);
             }
           },
           {
             text: this.phoneMobile[0].phoneNumberA,
             handler: () => {
               console.log(1);
             }
           },
           {
             text: this.phoneMobile[0].phoneNumberB,
             handler: () => {
               console.log(2);
             }
           },
           {
             text: this.phoneMobile[0].phoneNumberC,
             handler: () => {
               console.log(3);
             }
           },
           {
             text: this.phoneMobile[0].phoneNumberD,
             handler: () => {
               console.log(4);
             }
           },
           {
             text: '取消',
             role: 'cancel',
             handler: () => {
               console.log('Cancel clicked');
             }
           }
         ]
       })
       actionSheet.present();
     });
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad InternalAddress');
  }

}
