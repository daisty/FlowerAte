import { Component,ViewChild } from '@angular/core';
import { AlertController,NavParams,Tabs } from 'ionic-angular';

import { ContactPage } from '../contact/contact';
import { ContactsPage } from '../contacts/contacts';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ToastService } from '../../providers/util/toast.service';
import { NativeService } from '../../providers/NativeService';
import { HOME } from '../../config/config';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = '';
  tab3Root = ContactsPage;
  tab4Root = '';
  @ViewChild('myd') tabRef: Tabs;
  constructor(public navParams:NavParams,public http: ToastService,public nativeHttp: NativeService,private alertCtrl: AlertController) {
    
  }
  ionViewDidLoad() {
    if(this.nativeHttp.isMobile()){
      this.http.get(HOME + '/oldissp/v1/phone/version')
        .then(res => {
          var data = res.data;
          if(data.version > 10008){
            const alert = this.alertCtrl.create({
              title: '是否更新版本',
              message: data.description,
              buttons: [
                {
                  text: '取消'
                },
                {
                  text: '确认更新',
                  handler: () => {
                    this.nativeHttp.openUrlByBrowser(data.url);
                  }
                }
              ]
            });
            alert.present(); 
          }
        }) 
    }
    if(this.navParams.get('page')) {
      this.tabRef.select(this.navParams.get('page'));
    }
  }
}
