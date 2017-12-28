import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewReason } from './reviewReason';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    ReviewReason,
  ],
  imports: [
    IonicPageModule.forChild(ReviewReason),
    SharedModule
  ],
  exports: [
    ReviewReason
  ]
})
export class ReviewReasonModule {}