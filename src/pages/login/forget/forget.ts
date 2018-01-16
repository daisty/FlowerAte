import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { USER_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {
  nickname:string ;
  hasSend: boolean = false;
  code:string;
  phone:string;//记录手机号码
  err:boolean = false; //检验手机号码报错
  getCode:boolean;
  second:number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http : ToastService,
    public loadingCtrl: LoadingController) {
  }
  ionViewDidLoad() {
    
  }
  sendCode() :void {
    if(/^1[3-9][0-9]\d{8,8}$/.test(this.phone)){
      this.err = false;
     let loading = this.loadingCtrl.create({
         content:'正在发送验证码...'
     });
       loading.present();
       this.http.get(USER_URL + `v2/sendSmsCode/${this.phone}`)
         .then((res)=> {
           loading.dismiss();
           if(res.code == 0){
             this.hasSend = true;
           }
         })
         this.resetCode(); 
     }else {
       this.err = true;
     }
  }
  resetCode(){
    this.getCode = true;
    this.second = 60;//倒计时时间
    var timer = null;
    timer=setInterval(()=>{  
        this.second = this.second-1;
        if(this.second == 0 ){
          clearInterval(timer);
          this.getCode = false;
        }
    },1000);
 }
  next(b:string,c:string) :void {
    let loading = this.loadingCtrl.create({
      content:'正在验证...'
   });
    loading.present();
    this.http.post(USER_URL + `v2/verifyCode`,{phoneNumber:b,code:this.code})
      .then((res)=> {
        loading.dismiss();
        if(res.code == 0){
          this.navCtrl.push('changePwPage',{phone:b})
        }
      })
  }
}
