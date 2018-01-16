import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinePage } from './mine';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    MinePage,
  ],
  imports: [
    IonicPageModule.forChild(MinePage),
    SharedModule
  ],
  exports: [
    MinePage
  ]
})
export class MinePageModule {}
