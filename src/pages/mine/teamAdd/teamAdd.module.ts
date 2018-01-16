import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { teamAddPage } from './teamAdd';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    teamAddPage,
  ],
  imports: [
    IonicPageModule.forChild(teamAddPage),
    SharedModule
  ],
  exports: [
    teamAddPage
  ]
})
export class teamAddPageModule {}
