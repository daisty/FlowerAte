import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NumberPage } from './number';

@NgModule({
  declarations: [
    NumberPage,
  ],
  imports: [
    IonicPageModule.forChild(NumberPage),
  ],
  exports: [
    NumberPage
  ]
})
export class NumberPageModule {}
