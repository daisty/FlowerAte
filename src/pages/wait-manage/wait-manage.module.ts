import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitManagePage } from './wait-manage';

@NgModule({
  declarations: [
    WaitManagePage,
  ],
  imports: [
    IonicPageModule.forChild(WaitManagePage),
  ],
  exports: [
    WaitManagePage
  ]
})
export class WaitManagePageModule {}
