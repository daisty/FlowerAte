import { Component, Attribute } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ModalController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { ATTEND_URL } from '../../../config/config';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeService } from '../../../providers/NativeService';

declare var LocationPlugin;
@IonicPage()
@Component({
  selector: 'page-teamAdd',
  templateUrl: 'teamAdd.html',
})
export class teamAddPage{
  tab:boolean;
  private myDate;
  constructor(public alerCtrl: AlertController, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: ToastService,
    public actionSheetCtrl: ActionSheetController,
    private geolocation: Geolocation,
    public modalCtrl: ModalController,
    public navHttp: NativeService) {
      this.tab = navParams.get('tab');
  }
  //关闭返回首页
  closeModal() {
    this.navCtrl.popToRoot();
  }


  name:any='王小文';
  team:any='一线实施体系';
  position:any='产品专员';
  images:string='assets/imgs/avatar.png';
  b:number=5;
  icon:string='6';
  // 添加成员
  addPeople(){
    let searchModal = this.modalCtrl.create('searchPage',{tab:true});
    searchModal.present();
  }
}
