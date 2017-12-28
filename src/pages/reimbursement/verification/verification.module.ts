import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Verification } from './verification';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    Verification,
  ],
  imports: [
    IonicPageModule.forChild(Verification),
    SharedModule
  ],
  exports: [
    Verification
  ]
})
export class VerificationModule {}
