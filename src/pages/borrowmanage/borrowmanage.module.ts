import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BorrowManagePage } from './borrowmanage';
import { BorrowDetailPageModule } from './borrow-detail/borrow-detail.module';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    BorrowManagePage,
  ],
  imports: [
    IonicPageModule.forChild(BorrowManagePage),
    SharedModule
  ],
  exports: [
    BorrowManagePage
  ],
  providers: [],
})
export class BorrowManagePageModule {}
