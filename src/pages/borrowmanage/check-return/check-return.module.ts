import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckReturnPage } from './check-return';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    CheckReturnPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckReturnPage),
    SharedModule
  ],
  exports: [
    CheckReturnPage
  ]
})
export class CheckReturnPageModule {}
