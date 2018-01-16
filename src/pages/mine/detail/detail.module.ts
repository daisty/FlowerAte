import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { detailPage } from './detail';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    detailPage,
  ],
  imports: [
    IonicPageModule.forChild(detailPage),
    SharedModule
  ],
  exports: [
    detailPage
  ]
})
export class MinePageModule {}
