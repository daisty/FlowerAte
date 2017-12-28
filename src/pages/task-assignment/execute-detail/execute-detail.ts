import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TASK, USER_URL  } from '../../../config/config';
import { ToastService } from '../../../providers/util/toast.service';

@IonicPage()
@Component({
  selector: 'page-execute-detail',
  templateUrl: 'execute-detail.html',
})
export class ExecuteDetailPage {
  id: any;
  stau: string;//获取传入的审核状态
  taskDetails: any = {};
  ischarge: boolean = true;//是否是审核人
  day: number = 1;
  split: boolean = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: ToastService,
              public alertCtrl: AlertController) {

    this.id = navParams.get('id');
    this.stau = navParams.get('value');
    this.http.get(TASK + `tasknode/v1/phone/taskNode/${this.id}`)
      .then(res => {
        if(res.msg){ this.http.presentToast(res.msg);}
        this.taskDetails = res.data;
        this.taskDetails.createTime = this.taskDetails.createTime.split(' ')[0];
        this.taskDetails.reimbursement = this.taskDetails.reimbursement ? '有' : '无';
        this.taskDetails.question = this.taskDetails.question ? '有' : '无';
        this.taskDetails.delay = this.taskDetails.delay ? '是' : '否';
        if (this.taskDetails.carbon) {
          this.taskDetails = this.taskDetails.carbon.split(",");
        }
        for (let i = 0, len = this.taskDetails.photos.length; i < len; i++) {
          if (this.taskDetails.photos[i]) {
            this.taskDetails.photos[i] = TASK + `tasknode/v1/downloadFile?path=${encodeURIComponent(this.taskDetails.photos[i])}`;
          }
        }
      }).catch(res => {
        console.log(123);
        this.http.presentToast(res.msg);
      });
  }

  ionViewDidLoad() {
    
  }

  //任务上报
  taskReport(id: string){
    this.navCtrl.push('TaskReportPage', { id:this.id });
  }
  //再次分发
  againIssue(){
    
    if(this.ischarge == true){
      this.navCtrl.push('TaskAgainPage', { id:this.id });
    }else{

    }
    // this.navCtrl.push('TaskAgainPage');
  }
  //完成
  happened(){
    this.navCtrl.push('TaskCompletionPage', { id:this.id });
  }
  //待接收
  alertReacive(msg) {
    let confirm = this.alertCtrl.create({
        title: '您确定接收此任务吗？',
        buttons: [
            {
              text: '确认',
              handler: () => {
                this.http.put(TASK + `tasknode/v1/phone/confirm/${this.id}`)
                  .then(res =>{
                    if(res.msg){
                      this.http.presentToast(res.msg);
                    }
                    if(!res.code){
                      this.navCtrl.push('TaskAssignmentPage',{tab: true});
                    }
                  }).catch(res => {
                    this.http.presentToast(res.msg);
                  });
                  
              }
            },
            {
              text: '取消',
              handler: () => {
                  
              }
            }
          ]
        });
        confirm.present();
  }
}
