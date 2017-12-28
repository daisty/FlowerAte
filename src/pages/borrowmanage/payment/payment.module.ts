import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Paymentss } from './payment';

@NgModule({
  declarations: [
    Paymentss,
  ],
  imports: [
    IonicPageModule.forChild(Paymentss),
  ],
  exports: [
    Paymentss
  ]
})
export class PaymentModule {}
