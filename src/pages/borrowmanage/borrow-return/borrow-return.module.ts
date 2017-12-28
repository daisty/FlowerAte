import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BorrowReturnPage } from './borrow-return';

@NgModule({
  declarations: [
    BorrowReturnPage,
  ],
  imports: [
    IonicPageModule.forChild(BorrowReturnPage),
  ],
  exports: [
    BorrowReturnPage
  ]
})
export class BorrowReturnPageModule {}
