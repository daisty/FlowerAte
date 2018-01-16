import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { USER_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-editPasswordPage',
  templateUrl: 'editPassword.html',
})
export class editPasswordPage {
  tab:boolean;
  msg:string;
  showmsg:boolean;
  editsuccess: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http : ToastService,
    public loadingCtrl: LoadingController) {
      this.tab = navParams.get('tab');
  }
  ionViewDidLoad() {
    this.showmsg = false;
    this.editsuccess = false;
  }
   //关闭返回首页
  closeModal() {
    this.navCtrl.popToRoot();
  }
  comfirm(a:string,b:string) :void {
    if(a && b){
      let loading = this.loadingCtrl.create({
           content:'正在提交...'
       });
       loading.present();
       this.http.get(USER_URL + `v1/checkPassword?password=${a}&repassword=${b}`)
         .then((res)=> {
           loading.dismiss();
           if(res.code == 0){
            this.editsuccess = true;         
            setTimeout(()=>{
             this.navCtrl.popToRoot();
            },1000)    
           }else{
             this.msg = res.msg;
             this.showmsg = true;
           }
         })
    }
   }
}
