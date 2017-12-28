import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReimAnalisisPage } from './reim-analisis';
import { SharedModule } from '../../../app/shared.module'

@NgModule({
  declarations: [
    ReimAnalisisPage,
  ],
  imports: [
    IonicPageModule.forChild(ReimAnalisisPage),
    SharedModule
  ],
  exports: [
    ReimAnalisisPage
  ]
})
export class ReimAnalisisPageModule { }
