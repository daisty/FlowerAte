import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { verifyPhonePage } from './verifyPhone';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    verifyPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(verifyPhonePage),
    SharedModule
  ],
  exports: [
    verifyPhonePage
  ]
})
export class ForgetPageModule {}
