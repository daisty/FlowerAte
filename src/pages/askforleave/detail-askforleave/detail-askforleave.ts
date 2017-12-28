import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { ASKFORLEAVE } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-detail-askforleave',
  templateUrl: 'detail-askforleave.html',
})
export class DetailAskforleavePage {
  id: string;
  details: any = {};
  sta: string;//获取传入的审核状态
  isleader: any;//是否是审核人
  sendTo: any = [];//截取抄送人
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ToastService) {
    this.id = navParams.get('id');
    this.sta = navParams.get('value');
    this.http.get(ASKFORLEAVE + `vacate/v1/vacate/phone/${this.id}`)
      .then(res => {
        console.log(res)
        this.details = res.data;
        this.details.advance = this.details.advance ? '是' : '否';
        this.details.conform = this.details.conform ? '是' : '否';
        if (this.details.carbon) {
          this.sendTo = this.details.carbon.split(",");
        }
        for (let i = 0, len = this.details.photos.length; i < len; i++) {
          if (this.details.photos[i]) {
            this.details.photos[i] = ASKFORLEAVE + `vacate/v1/downloadFile?path=${encodeURIComponent(this.details.photos[i])}`;
          }
        }
      })
    this.http.get(ASKFORLEAVE + 'vacate/v1/check/permission')
      .then(res => {
        this.isleader = res.data;
      })
  }

  ionViewDidLoad() {
  }
  gotoCheck(num) {
    if(num){
      this.navCtrl.push('CheckAskforleavePage', { id: this.id,page:1 });
    }else {
      this.navCtrl.push('CheckAskforleavePage', { id: this.id });
    }
  }

}
