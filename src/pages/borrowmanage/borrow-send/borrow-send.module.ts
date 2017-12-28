import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BorrowSendPage } from './borrow-send';

@NgModule({
  declarations: [
    BorrowSendPage,
  ],
  imports: [
    IonicPageModule.forChild(BorrowSendPage)
  ],
  exports: [
    BorrowSendPage
  ]
})
export class BorrowSendPageModule {}
