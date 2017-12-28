import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAskforleavePage } from './add-askforleave';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    AddAskforleavePage,
  ],
  imports: [
    IonicPageModule.forChild(AddAskforleavePage),
    SharedModule
  ],
  exports: [
    AddAskforleavePage
  ]
})
export class AddAskforleavePageModule {}
