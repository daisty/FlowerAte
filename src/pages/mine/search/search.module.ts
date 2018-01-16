import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { searchPage } from './search';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    searchPage,
  ],
  imports: [
    IonicPageModule.forChild(searchPage),
    SharedModule
  ],
  exports: [
    searchPage
  ]
})
export class searchPageModule {}
