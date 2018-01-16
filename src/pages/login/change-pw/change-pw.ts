import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { USER_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-changePw',
  templateUrl: 'change-pw.html',
})
export class changePwPage {
  msg:string;
  showmsg:boolean;
  phone:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http : ToastService,
    public loadingCtrl: LoadingController) {
    this.phone = navParams.get('phone');
  }
  ionViewDidLoad() {
    this.showmsg = false;
  }
  comfirm(a:string,b:string) :void {
    if(a && b && a == b){
      let loading = this.loadingCtrl.create({
           content:'正在提交...'
       });
       loading.present();
       this.http.post(USER_URL + `v1/update/pwds`,{password:a,phone:this.phone})
         .then((res)=> {
           loading.dismiss();
           if(res.code == 0){
             this.navCtrl.push('LoginPage');
           }else{
             this.msg = res.msg;
             this.showmsg = true;
           }
         })
    }else if(a && b && a != b){
      this.http.presentToast('请检查两次输入密码是否一致');
    }
   }
}
