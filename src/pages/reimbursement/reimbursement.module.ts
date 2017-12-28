import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReimbursementPage } from './reimbursement';

import { ApplyreimbursementPageModule } from './applyreimbursement/applyreimbursement.module';
import { MailingPageModule } from './mailing/mailing.module';
import { PaymentModule } from './payment/payment.module';
import { ReimAnalisisPageModule } from './reim-analisis/reim-analisis.module';
import { ReimAuditopinonPageModule } from './reim-auditopinon/reim-auditopinon.module';
import { ReimbursementInvoiceModule } from './reimbursement-invoice/reimbursement-invoice.module';
import { ReimdetailsPageModule } from './reimdetails/reimdetails.module';
import { ReviewReasonModule } from './reviewReason/reviewReason.module';
import { VerificationModule } from './verification/verification.module';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    ReimbursementPage,
  ],
  imports: [
    IonicPageModule.forChild(ReimbursementPage),
    ReviewReasonModule,
    VerificationModule,
    ReimdetailsPageModule,
    ReimbursementInvoiceModule,
    MailingPageModule,
    PaymentModule,
    ReimAnalisisPageModule,
    ApplyreimbursementPageModule,
    ReimAuditopinonPageModule,
    SharedModule
  ],
  exports: [
    ReimbursementPage,

  ]
})
export class ReimbursementPageModule { }
