import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessOther } from './business-other';
import { SharedModule } from '../../../../app/shared.module';

@NgModule({
  declarations: [
    BusinessOther,
  ],
  imports: [
    IonicPageModule.forChild(BusinessOther),
    SharedModule
  ],
  exports: [
    BusinessOther
  ]
})
export class BusinessOtherModule {}
