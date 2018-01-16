import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OverTimePage } from './over-time';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    OverTimePage,
  ],
  imports: [
    IonicPageModule.forChild(OverTimePage),
    SharedModule
  ],
  exports: [
    OverTimePage
  ]
})
export class OverTimePagePageModule {}
