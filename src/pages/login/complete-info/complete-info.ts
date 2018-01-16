import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { USER_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-complete-info',
  templateUrl: 'complete-info.html',
})
export class CompleteInfoPage {
  empl:string;
  status: boolean;
  msg: string;
  showmsg: boolean;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http : ToastService,
    public loadingCtrl: LoadingController) {
  }
  ionViewDidLoad() {
    this.showmsg = false;
    if(this.navParams.get('registerType') == "个人"){
      this.status = false;
    }else{
      this.status = true;
    }

  }
  btn(str:string) :void {
    if(str){
      this.http.get(USER_URL + 'v1/autogenerationNum',{startNumber:str})
        .then(res => {
          if(!res.code){
            this.empl = res.data;
          }else{
            this.http.alert(res.msg)
          }
        })
    }
  }
  
  comfirm(name:string,empl:string,enterpriseName:string):void {
    if(enterpriseName){
      if(name && empl&& enterpriseName){
        let loading = this.loadingCtrl.create({
             content:'正在提交...'
         });
         loading.present();
         this.http.post(USER_URL + `v1/registerUser`,{registerType:this.navParams.get('registerType'),phone:this.navParams.get('phone'),
         authCode:this.navParams.get('authCode'),password:this.navParams.get('password'),username:name,employeeNumber:empl,enterpriseName:enterpriseName})
           .then((res)=> {
             loading.dismiss();
             if(res.code == 0){             
                this.navCtrl.push('LoginPage')
             }else{
               this.msg = res.msg;
               this.showmsg = true;
             }
           })
      }
    }else{
      if(name){
        let loading = this.loadingCtrl.create({
             content:'正在提交...'
         });
         loading.present();
         this.http.post(USER_URL + `v1/registerUser`,{registerType:this.navParams.get('registerType'),phone:this.navParams.get('phone'),
         authCode:this.navParams.get('authCode'),password:this.navParams.get('password'),username:name})
           .then((res)=> {
             loading.dismiss();
             if(res.code == 0){          
              this.navCtrl.push('LoginPage')
             }else{
              this.msg = res.msg;
              this.showmsg = true;
            }
           })
      }
    }
   
  }
}
