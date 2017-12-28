import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoingDetailPage } from './doing-detail';
import { SharedModule } from '../../../../app/shared.module';

@NgModule({
  declarations: [
    DoingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DoingDetailPage),
    SharedModule
  ],
  exports: [
    DoingDetailPage
  ]
})
export class DoingDetailPageModule {}
