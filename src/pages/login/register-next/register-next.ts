import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { USER_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-register-next',
  templateUrl: 'register-next.html',
})
export class RegisterNextPage {
  msg:string;
  showmsg:boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http : ToastService,
    public loadingCtrl: LoadingController) {
  }
  ionViewDidLoad() {
    this.showmsg = false;
  }
  
  comfirm(a:string,b:string) :void {
    // this.navCtrl.push('CompleteInfoPage',{registerType:this.navParams.get('registerType'),phone:this.navParams.get('phone'),authCode:this.navParams.get('authCode'),password:a});
    if(a && b){
     let loading = this.loadingCtrl.create({
          content:'正在提交...'
      });
      loading.present();
      this.http.get(USER_URL + `v1/checkPassword?password=${a}&repassword=${b}`)
        .then((res)=> {
          loading.dismiss();
          if(res.code == 0){
            this.navCtrl.push('CompleteInfoPage',{registerType:this.navParams.get('registerType'),phone:this.navParams.get('phone'),authCode:this.navParams.get('authCode'),password:a});
          }else{
            this.msg = res.msg;
            this.showmsg = true;
          }
        })
   }
  }
}
