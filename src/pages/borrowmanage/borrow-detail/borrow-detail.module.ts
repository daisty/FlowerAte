import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BorrowDetailPage } from './borrow-detail';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    BorrowDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BorrowDetailPage),
    SharedModule
  ],
  exports: [
    BorrowDetailPage
  ]
})
export class BorrowDetailPageModule {}
