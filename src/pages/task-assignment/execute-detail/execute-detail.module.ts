import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExecuteDetailPage } from './execute-detail';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    ExecuteDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExecuteDetailPage),
    SharedModule
  ],
  exports: [
    ExecuteDetailPage
  ]
})
export class AssignDetailPageModule {}
