import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, IonicPage, App, ModalController, AlertController } from 'ionic-angular';
import { ToastService } from '../../providers/util/toast.service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HOME,USER_URL } from '../../config/config';

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html'
})
export class MinePage {
  teams:any = '成为企业';
  new:any = '';
  images:string=USER_URL+`v1/titlePic/`;
  name:string;
  team:string;
  company:any='北京艾佳天诚信息技术有限公司';
  todo:number=20;
  leave:number=0;
  reimburse:number=10;
  @ViewChild('abc') bool1:ElementRef;
  constructor(public http:ToastService,public navCtrl: NavController, public modalCtrl: ModalController) {

  };
  ionViewDidLoad() {
    this.http.get(HOME+'positiondetailuser/v1/userName/userinfo',{userName:localStorage.getItem('userName')})
      .then((res) => {
        if(res.code==0){
          this.name=res.data.userName;
          this.team=res.data.hierarchyName || '未上传';
        }
      }).catch(res => {
        this.http.presentToast('服务器错误，请联系管理员');
      })
  }
    // 个人详情页
  detail(){
    this.navCtrl.push('detailPage');
    }

  // 成为企业
  addEnterprise(){
    if(this.teams=='我的团队'){
      this.navCtrl.push('teamAddPage');
    }else{
      this.navCtrl.push('addEnterprisePage');
    }
  }
  // 修改手机号码
  editPhone(){
    this.navCtrl.push('oldPhonePage');
   }

   //修改登录号码
  editPhoneD(){
    this.navCtrl.push('verifyPhonePage');
  }

}
