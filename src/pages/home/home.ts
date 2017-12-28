import { Component } from '@angular/core';
import { NavController, App, ModalController, AlertController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public app: App, public modalCtrl: ModalController, public alertCtrl: AlertController,private photoViewer: PhotoViewer) {

  }

  presentAlert() {
    const alert = this.alertCtrl.create({
      title: '正在努力开发中',
      subTitle: '敬请期待...'
    });
    alert.present();
  }

  // 报销
  account(){
    let accountModal = this.modalCtrl.create('ReimbursementPage',{tab:true});
    accountModal.present();
  }

  // 借款
  loan(){
    let loanModal = this.modalCtrl.create('BorrowManagePage',{tab:true});
    loanModal.present();
   }

   //考勤
  punch(){
    let punchModal = this.modalCtrl.create('Attendance',{tab:true});
    punchModal.present();
  }
  // 公告
  bulletin(){
    let bulletinModal = this.modalCtrl.create('AnnouncementPage');
    bulletinModal.present();
  }
  //请假
  askForLeave() {
    let askforleaveModal = this.modalCtrl.create('AskforleavePage',{tab:true});
    askforleaveModal.present();
  }

  //任务分配
  taskAssign(){
    let taskAssignModal = this.modalCtrl.create('TaskAssignmentPage', {tab:true});
    taskAssignModal.present();
  }
  clickBig() {
    this.photoViewer.show('/assets/imgs/advertising.jpg', '推广展示', {share: false});
  }
}
