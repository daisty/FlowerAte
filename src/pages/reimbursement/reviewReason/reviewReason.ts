import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { APP_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-reviewReason',
  templateUrl: 'reviewReason.html',
})
export class ReviewReason {
  id: string;
  data: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: ToastService
  ) {
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    this.http.get(APP_URL + `phoneReimburse/v1/reimAudit/reason/${this.id}`)
      .then(res => {
        if (JSON.stringify(res.data) !== "{}") {
          this.data = res.data;
        }
      })
  }


}