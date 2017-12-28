import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReimbursementPage } from '../../reimbursement/reimbursement';
/**
 * Generated class for the VerificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reimbursement-invoice',
  templateUrl: 'reimbursement-invoice.html',
})
export class ReimbursementInvoice {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReimbursementInvoice');
  }

  complete() {
    this.navCtrl.push(ReimbursementPage);
  }
}
