import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { editPhonePage } from './editPhone';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    editPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(editPhonePage),
    SharedModule
  ],
  exports: [
    editPhonePage
  ]
})
export class editPhonePageModule {}
