import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { USER_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-verifyPhone',
  templateUrl: 'verifyPhone.html',
})
export class verifyPhonePage {
  tab:boolean;
  nickname:string ;
  hasSend: boolean = false;
  code:string;
  phone:string;//记录手机号码
  err:boolean = false; //检验手机号码报错
  getCode:boolean;
  second:number;
  phoneexist: boolean;
  codeerr: boolean;
  msg: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http : ToastService,
    public loadingCtrl: LoadingController) {
      this.tab = navParams.get('tab');
  }
  ionViewDidLoad() {
    this.codeerr = false;
  }
  phoneverify(){
    this.http.get(USER_URL + `v1/phone/${this.phone}/exists`)
    .then((res)=> {
      if(res.code == 0){
        this.phoneexist = true;
        if(this.phoneexist){
          this.err = false;
         let loading = this.loadingCtrl.create({
             content:'正在发送验证码...'
         });
           loading.present();
           this.http.get(USER_URL + `v2/phone/sendSmsCode/${this.phone}`)
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
      }else{
        this.err = true;
      }
    })
  }
  sendCode() :void {
    this.phoneverify();
    
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
    this.http.post(USER_URL + `v2/verifyCode`,{phoneNumber:this.phone,code:this.code})
      .then((res)=> {
        loading.dismiss();
        // this.navCtrl.push('editPasswordPage',{phone:b,authCode:c})
        if(res.code == 0){
          this.navCtrl.push('editPasswordPage',{phone:b,authCode:c})
        }else{
          this.codeerr = true;
          this.msg = res.msg;
        }
      })
  }
   //关闭返回首页
  closeModal() {
    this.navCtrl.popToRoot();
  }
}
