import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'review-reason',
  templateUrl: 'reviewReason.html',
})
export class ReviewReasonComponent {
  @Input() data :any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {
  }

  ionViewDidLoad() {
   
  }


}