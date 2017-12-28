import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignDetailPage } from './assign-detail';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    AssignDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AssignDetailPage),
    SharedModule
  ],
  exports: [
    AssignDetailPage
  ]
})
export class AssignDetailPageModule {}
