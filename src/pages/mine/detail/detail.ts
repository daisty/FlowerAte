import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { USER_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-detailPage',
  templateUrl: 'detail.html'
})
export class detailPage {
  tab:boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http : ToastService,
    public loadingCtrl: LoadingController) {
      this.tab = navParams.get('tab');
  }
  ionViewDidLoad() {
    
  }
  logout() {
    localStorage.setItem('token','');
    this.http.getUser(`v1/sign-out/${localStorage.getItem('token')}`).then((res)=>{
      if(!res.code){
        this.navCtrl.push('LoginPage');
      }else {
        this.http.presentToast(res.msg);
      }
    }).catch(()=>{
      this.http.presentToast('页面找不到,请联系管理员')
    })
    
  }
  //关闭返回首页
  closeModal() {
    this.navCtrl.popToRoot();
  }
}
