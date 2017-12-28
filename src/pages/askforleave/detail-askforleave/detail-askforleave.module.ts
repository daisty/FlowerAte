import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailAskforleavePage } from './detail-askforleave';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    DetailAskforleavePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailAskforleavePage),
    SharedModule
  ],
  exports: [
    DetailAskforleavePage
  ]
})
export class DetailAskforleavePageModule {}
