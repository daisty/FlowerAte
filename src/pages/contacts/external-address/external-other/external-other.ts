import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../../../providers/util/toast.service';
import { CONTACT } from '../../../../config/config';

@IonicPage()
@Component({
  selector: 'page-external-other',
  templateUrl: 'external-other.html'
})


export class ExternalOther {

  id: string;
  exterData: any = {};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: ToastService
    ) {
      this.id = navParams.get('id');
      this.http.get(CONTACT + `externalcontacts/v1/mobile/findByID/${this.id}`)
      .then( res =>{
        this.exterData = res.data;
      })
  }

  ionViewDidLoad() {
  }

}
