import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../../../providers/util/toast.service';
import { CONTACT } from '../../../../config/config';

@IonicPage()
@Component({
  selector: 'page-business-other',
  templateUrl: 'business-other.html'
})


export class BusinessOther {
  id:string;
  businessData: any = {};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: ToastService
    ) {
      
      this.id = navParams.get('id');
      this.http.get(CONTACT + `commercecontacts/v1/mobile/findByID/${this.id}`,{})
        .then( res =>{
          this.businessData = res.data;
        })

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BusinessOther');
  }

}
