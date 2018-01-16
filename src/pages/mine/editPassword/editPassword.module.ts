import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { editPasswordPage } from './editPassword';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    editPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(editPasswordPage),
    SharedModule
  ],
  exports: [
    editPasswordPage
  ]
})
export class editPasswordPageModule {}
