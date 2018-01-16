import { Component, Attribute } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { ATTEND_URL } from '../../../config/config';
import { MinePage } from '../../mine/mine';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeService } from '../../../providers/NativeService';

declare var LocationPlugin;
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class searchPage{
  private myDate;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: ToastService,
    public actionSheetCtrl: ActionSheetController,
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    public navHttp: NativeService) {
      
  }
    
  //关闭返回首页
  closeModal() {
    this.navCtrl.push(MinePage);
  }


  name:any='王小文';
  team:any='一线实施体系';
  position:any='产品专员';
  images:string='assets/imgs/avatar.png';
  b:number=5;
  icon:string='6';
  nameSs:string='小红文';
  numberSs:number=1;

  addAlert() {
    let alert = this.alertCtrl.create({
      title: '恭喜！添加成功',
      buttons: ['OK']
    });
    alert.present();
  }
}
