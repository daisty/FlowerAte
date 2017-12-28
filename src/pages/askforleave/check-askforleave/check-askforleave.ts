import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { ASKFORLEAVE } from '../../../config/config';
import { NativeService } from '../../../providers/NativeService';

@IonicPage()
@Component({
  selector: 'page-check-askforleave',
  templateUrl: 'check-askforleave.html',
})
export class CheckAskforleavePage {
  id: string;
  paramObj: any = { aduitStatus: '通过' };
  text:string;
  page:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: ToastService,public navHttp:NativeService) {
    this.id = navParams.get('id');
    this.page = navParams.get('page');
  }

  ionViewDidLoad() {
  }
  confirm(): void {
    this.paramObj.id=this.id;
    if(this.page){
      if(this.text.trim() == '确认。' || this.text.trim() == '同意。' || this.text.trim() == '通过。'){
        this.paramObj.aduitStatus = 'AGREE';
        this.put();
      }else if(this.text.trim() == '不确认。' || this.text.trim() == '不同意。' || this.text.trim() == '不通过。'){
        this.paramObj.aduitStatus =  'REJECT';
        this.put();
      }else{
        this.navHttp.alert('请检查你的语音内容！！！' + this.text.trim());
      }
    }else{
      this.paramObj.aduitStatus = this.paramObj.aduitStatus?'AGREE':'REJECT';
    }
  }
  //开始语音转换
  startListening() {
    this.navHttp.getPermissions();
    this.navHttp.startListening().subscribe(matches => {
      this.text = matches.join('');
    })
  }
  put() {
    this.http.put(ASKFORLEAVE + 'vacate/v1/audit', this.paramObj)
      .then(res => {
        let msg: string;
        if (res.code == 0) {
          msg = '此次审核成功!';
        } else {
          msg = `审核失败：${res.msg}`;
        }
        let confirm = this.alertCtrl.create({
          title: '消息提示',
          message: msg,
          buttons: [
            {
              text: '确认',
              handler: () => {
                if (!res.code) {
                  this.navCtrl.push('AskforleavePage', { tab: true });
                }
              }
            }
          ]
        });
        confirm.present();
      })
  }
}
