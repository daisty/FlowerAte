import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { oldPhonePage } from './oldPhone';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    oldPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(oldPhonePage),
    SharedModule
  ],
  exports: [
    oldPhonePage
  ]
})
export class oldPhonePageModule {}
