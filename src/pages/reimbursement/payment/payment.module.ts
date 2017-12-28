import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Payment } from './payment';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    Payment,
  ],
  imports: [
    IonicPageModule.forChild(Payment),
    SharedModule
  ],
  exports: [
    Payment
  ]
})
export class PaymentModule {}
