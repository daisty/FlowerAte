import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ViewController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { TASK } from '../../../config/config';
import { NativeService } from '../../../providers/NativeService';

@IonicPage()
@Component({
  selector: 'page-task-report',
  templateUrl: 'task-report.html',
})
export class TaskReportPage {
  radio:boolean = true;
  page:number;
  id :string;
  paramObj :any = {};
  delayType: string =  'HOUR';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public http :ToastService,
    public navHttp:NativeService
  ) {
    this.paramObj.id = navParams.get('id');
    this.page = navParams.get('page');

  }
  
  ionViewDidLoad() {
    
  }


  confirm() :void{
    this.paramObj.delay = this.paramObj.delay?'true':'false';
    this.paramObj.delayType = 'HOUR';
    this.putTask();
  }

  putTask() {
    this.http.put(TASK + 'tasknode/v1/phone/report',this.paramObj)
    .then(res => {
      let msg:string;
      if(res.code == 0){
        msg = '此次任务上报成功!';
      }else {
        msg = `任务上报失败：${res.msg}`;
      }
      if(res.msg){
        this.http.presentToast(res.msg);
      }
      let confirm = this.alertCtrl.create({
        title: '消息提示',
        message: msg,
        buttons: [
            {
              text: '确认',
              handler: () => {
                if(!res.msg){
                  this.navCtrl.push('TaskAssignmentPage',{tab:true});
                }
              }
            }
          ]
        });
        confirm.present();
    }).catch(res => {
      this.http.presentToast(res.msg);
    });
  }

}
