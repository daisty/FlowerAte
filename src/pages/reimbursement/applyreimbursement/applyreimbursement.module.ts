import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyreimbursementPage } from './applyreimbursement';
import { SharedModule } from '../../../app/shared.module';
@NgModule({
  declarations: [
    ApplyreimbursementPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyreimbursementPage),
    SharedModule
  ],
  exports: [
    ApplyreimbursementPage
  ]
})
export class ApplyreimbursementPageModule {}
