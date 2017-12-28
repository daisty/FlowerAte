import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { ANNOUNCEMENT_URL } from '../../../config/config';

@IonicPage()
@Component({
  selector: 'page-announcement-detail',
  templateUrl: 'announcement-detail.html',
})
export class AnnouncementDetailPage {
  detail: any = {};
  id: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ToastService) {
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    if (this.id) {
      this.http.get(ANNOUNCEMENT_URL + `announcement/v1/announcement/${this.id}`)
        .then((res) => {
          this.detail = res.data;
          for (let i = 0, len = this.detail.photos.length; i < len; i++) {
            if (this.detail.photos[i]) {
              this.detail.photos[i] = ANNOUNCEMENT_URL + `announcement/v1/downloadFile?path=${encodeURIComponent(this.detail.photos[i])}`;
            }
          }
        })
    }
  }

}
