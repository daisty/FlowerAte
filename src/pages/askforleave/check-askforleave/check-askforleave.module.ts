import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckAskforleavePage } from './check-askforleave';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    CheckAskforleavePage,
  ],
  imports: [
    IonicPageModule.forChild(CheckAskforleavePage),
    SharedModule
  ],
  exports: [
    CheckAskforleavePage
  ]
})
export class CheckAskforleavePageModule { }
