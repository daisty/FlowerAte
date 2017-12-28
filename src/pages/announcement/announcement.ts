import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../providers/util/toast.service';
import { ANNOUNCEMENT_URL } from '../../config/config';
import { TabsPage } from '../tabs/tabs';
@IonicPage()
@Component({
  selector: 'page-announcement',
  templateUrl: 'announcement.html',
})
export class AnnouncementPage {
  items: any = [];
  url: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: ToastService) {
    
  }
  //关闭返回首页
  closeModal() {
    this.navCtrl.push(TabsPage);
  }
  ionViewDidLoad() {
    this.http.get(ANNOUNCEMENT_URL + `announcement/v1/phone/list`)
      .then((res) => {
        this.items = res.data;
        for (let i = 0, len = this.items.length; i < len; i++) {
          for (let j = 0, len = this.items[i].photos.length; j < len; j++) {
            if (this.items[i].photos[j]) {
              this.items[i].photos[j] = ANNOUNCEMENT_URL + `announcement/v1/downloadFile?path=${encodeURIComponent(this.items[i].photos[j])}`;
            }
          }
        }
      })
  }

  details(event, item) {
    this.navCtrl.push('AnnouncementDetailPage', { id: item.id });
  }

}
