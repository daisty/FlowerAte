import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController} from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { CONTACT } from '../../../config/config';
import { TabsPage } from '../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-external-address',
  templateUrl: 'external-address.html'
})
export class ExternalAddress {

  id: string;
  exterData: any = {};
  phoneMobile:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public http: ToastService,
    public actionSheetCtrl: ActionSheetController) {
      this.id = navParams.get('id');
      this.http.get(CONTACT + `externalcontacts/v1/mobile/findByID/${this.id}`)
      .then( res =>{
        this.exterData = res.data;
      })
  }

  //关闭返回通讯录
  closeModal() {
    this.navCtrl.push(TabsPage,{page:2});
  }

  //电话
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

  itemOther(id:string){
    this.navCtrl.push('ExternalOther',{id:id});
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad ExternalAddress');
  }

}
