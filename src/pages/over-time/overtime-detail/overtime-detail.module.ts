import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OvertimeDetailPage } from './overtime-detail';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    OvertimeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OvertimeDetailPage),
    SharedModule
  ],
  exports: [
    OvertimeDetailPage
  ]
})
export class OvertimeDetailPageModule {}
