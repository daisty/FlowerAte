import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { MailingPage } from '../mailing/mailing';
import { ReviewReason } from '../reviewReason/reviewReason';
import { ToastService } from '../../../providers/util/toast.service';
import { APP_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-reimdetails',
  templateUrl: 'reimdetails.html',
})
export class ReimdetailsPage {
  id: string;
  status: string;
  buttonStatus: string;
  statusColor: string;
  isAuditor: boolean = true;//是否为审核人员
  buttonName: string;
  data: any = {};
  posts: any = [];
  isTicketCondition: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ToastService, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.id = navParams.get('id');
    this.status = navParams.get('value');
    this.buttonStatus = navParams.get('name');
    this.http.get(APP_URL + `phoneReimburse/v1/info/reim/${this.id}/${this.buttonStatus}`)
      .then(res => {
        this.data = res.data;
        switch (this.data.reimPhoneShowStatus) {
          case 'GOSEND':
            this.statusColor = 'orange';
            this.buttonName = '去寄件';
            break;
          case 'GOAUDIT':
            this.statusColor = 'danger';
            this.buttonName = '去审核';
            break;
          case 'GOANALISIS':
            this.statusColor = 'danger';
            this.buttonName = '去分析';
            break;
          case 'WAITTHAWEDIT':
            this.statusColor = 'orange';
            this.buttonName = '重新编辑提交';
            break;
        }
      })
  }

  itemReason() {
    this.navCtrl.push('ReviewReason', { id: this.id });
  }
  ionViewDidLoad() {

  }
  buttonFn(status: string, reimPhoneShowStatus: string, num: number): void {
    if (status == 'WAITAUDIT') {//待审核
      if (reimPhoneShowStatus == 'GOSEND') {
        this.navCtrl.push('MailingPage', { id: this.id, isTicket: this.data.ticketCondition });
      } else if (reimPhoneShowStatus = "GOAUDIT") {
        this.navCtrl.push('ReimAuditopinonPage', { id: this.id });
      } else {
        this.navCtrl.push('ReimdetailsPage', { id: this.id, name: this.buttonStatus, value: this.status });
      }
    } else if (status == 'WAITANALISIS') {//待分析
      if (reimPhoneShowStatus == 'GOANALISIS') {
        this.navCtrl.push('ReimAnalisisPage', { id: this.id });
      }
    } else if (status == 'WAITCHECK') {//待核对
      if (reimPhoneShowStatus == 'GOCHECK') {
        if (num == 1) {
          this.navCtrl.push('Verification', { id: this.id });
        } else {
          this.navCtrl.push('Payment', { id: this.id });
        }
      }
    } else if (status == 'WAITTHAW') {//待解冻
      this.navCtrl.push('ApplyreimbursementPage', { id: this.id, name: 'WAITTHAW' })
    }
  }

}
