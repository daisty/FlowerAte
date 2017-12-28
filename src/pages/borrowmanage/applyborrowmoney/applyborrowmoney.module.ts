import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyborrowmoneyPage } from './applyborrowmoney';
// import { PROVIDERS } from '../../../app/imports';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    ApplyborrowmoneyPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyborrowmoneyPage),
    SharedModule
  ],
  exports: [
    ApplyborrowmoneyPage
  ],
  providers: []
})
export class ApplyborrowmoneyPageModule {}
