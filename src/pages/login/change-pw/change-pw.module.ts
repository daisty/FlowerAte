import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { changePwPage } from './change-pw';

@NgModule({
  declarations: [
    changePwPage,
  ],
  imports: [
    IonicPageModule.forChild(changePwPage),
  ],
  exports: [
    changePwPage
  ]
})
export class changePwPageModule {}
