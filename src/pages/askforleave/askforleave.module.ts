import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AskforleavePage } from './askforleave';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    AskforleavePage,
  ],
  imports: [
    IonicPageModule.forChild(AskforleavePage),
    SharedModule
  ],
  exports: [
    AskforleavePage
  ]
})
export class AskforleavePageModule { }
