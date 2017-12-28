import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { TASK, USER_URL } from '../../../config/config';
import { ToastService } from '../../../providers/util/toast.service';

@IonicPage()
@Component({
  selector: 'page-assign-detail',
  templateUrl: 'assign-detail.html',
})
export class AssignDetailPage {
  id: any;
  stau: string;//获取传入的审核状态
  taskDetails: any = {};
  ischarge: any;//是否是审核人
  // getId: any = '';
  planNum: number = 1;
  execute: string = 'admin';
  taskType: string = 'ENGINEERING';
  taskName: any = "app";
  content: string = 'hahahaha';
  actualNum: number = 1;
  needTime: number = 8;
  needType: string = 'HOUR';
  startTime: string = '2017-11-11 00:00:00';
  endTime: string = '2017-11-19 00:00:00';
  actualTime: number = 8;
  actualType: string = 'HOUR';
  reimbursement: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: ToastService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

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
        this.http.presentToast(res.msg);
      });
  }

  ionViewDidLoad() {
  
  }

  //确认任务完成
  getFinished() {
    let confirm = this.alertCtrl.create({
      title: '温馨提示',
      message: '确定要完成该任务么?',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.http.put(TASK + `tasknode/v1/phone/finish`, {
              id: this.id, planNum: this.planNum, execute: this.execute, taskType: this.taskType, taskName: this.taskName,
              content: this.content, actualNum: this.actualNum, needTime: this.needTime, needType: this.needType,
              startTime: this.startTime, endTime: this.endTime, actualTime: this.actualTime, actualType: this.actualType, reimbursement: this.reimbursement
            })
              .then(res => {
                if(res.msg){
                  this.http.presentToast(res.msg);
                }
                if (!res.code) {
                  this.navCtrl.push('TaskAssignmentPage', { tab: true });
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

  //确认任务未完成
  unFinished() {
    let confirm = this.alertCtrl.create({
      title: '温馨提示',
      message: '确定要未完成该任务么?',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.http.put(TASK + `tasknode/v1/unFinish`, {
              id: this.id, planNum: this.planNum, execute: this.execute, taskType: this.taskType, taskName: this.taskName,
              content: this.content, actualNum: this.actualNum, needTime: this.needTime, needType: this.needType,
              startTime: this.startTime, endTime: this.endTime, actualTime: this.actualTime, actualType: this.actualType, reimbursement: this.reimbursement
            })
              .then(res => {
                if(res.msg){
                  this.http.presentToast(res.msg);
                }
                if (!res.code) {
                  this.navCtrl.push('TaskAssignmentPage', { tab: true });
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

  // 审核
  gotoCheck(id,page){
    this.navCtrl.push('TaskCheckPage',{page:page,id:id});
  }
}
