import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { cityPage } from './city';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    cityPage,
  ],
  imports: [
    IonicPageModule.forChild(cityPage),
    SharedModule
  ],
  exports: [
    cityPage
  ]
})
export class cityPageModule {}
