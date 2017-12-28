import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuditReasonPage } from './audit-reason';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    AuditReasonPage,
  ],
  imports: [
    IonicPageModule.forChild(AuditReasonPage),
    SharedModule
  ],
  exports: [
    AuditReasonPage
  ]
})
export class AuditReasonPageModule {}
