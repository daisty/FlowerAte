import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReimbursementInvoice } from './reimbursement-invoice';

@NgModule({
  declarations: [
    ReimbursementInvoice,
  ],
  imports: [
    IonicPageModule.forChild(ReimbursementInvoice),
  ],
  exports: [
    ReimbursementInvoice
  ]
})
export class ReimbursementInvoiceModule {}
