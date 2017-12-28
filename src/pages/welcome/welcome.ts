import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ToastService } from '../../providers/util/toast.service';
import { Signup } from '../signup/signup';

import { Storage } from '@ionic/storage';
import { HOME } from '../../config/config';
import { NativeService } from '../../providers/NativeService';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class Welcome {
  rootPage: any;
  items: Array<{ title: string, message?: (any), page?: any }>;
  homeName: any = {};
  userName:string="admin";
  empNumer: string;
  temp_userName:string;

  constructor(public navCtrl: NavController,public navParams: NavParams, public http: ToastService, public storage: Storage,public nativeHttp: NativeService,private alertCtrl: AlertController,) {

    this.rootPage = 'Welcome';
    this.items = [
      {
        title:'报销管理',
        page:'ReimbursementPage'
      },
      {
        title:'借款管理',
        page:'BorrowManagePage',
        message:'您有四个待办借款',
      },
      {
        title:'通讯录11',
        page:'ContactsPage'
      },
      {
        title:'公告管理',
        page:'AnnouncementPage'
      },
      {
        title:'设置',
        page:'ContactPage'
      }
    ];
  }

  itemTapped(event, item) {
    this.navCtrl.push(item.page);
  }


  ionViewDidLoad() {
    this.nativeHttp.checkCode().then(code => {
        this.http.get('https://issp.bjike.com/admin/update/versionInfo/getNewVersion?name=ISSP')
          .then(res => {
            if(res.version > code){
              const alert = this.alertCtrl.create({
                title: '是否更新版本',
                message: 'Do you want to buy this book?',
                buttons: [
                  {
                    text: '取消'
                  },
                  {
                    text: '确认更新',
                    handler: () => {
                      this.nativeHttp.openUrlByBrowser(res.url);
                    }
                  }
                ]
              });
              alert.present(); 
            }
          })
      })
    this.storage.get('userName').then(val =>{
  
      this.temp_userName = val ;
      this.temp_userName = 'admin' ;
      if(this.temp_userName){
        
        this.http.get(HOME + 'positiondetailuser/v1/userName/userinfo',{userName: this.temp_userName})
          .then(res => {
              if(res.code == 0){
                this.homeName = res.data;
              }
          
          });
      }
    });            
    
  }

  login(){
   this.navCtrl.push('LoginPage');
  }

  signup(){
   this.navCtrl.push('LoginPage');
  }

}
