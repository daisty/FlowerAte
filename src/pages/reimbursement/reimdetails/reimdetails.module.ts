import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReimdetailsPage } from './reimdetails';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    ReimdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReimdetailsPage),
    SharedModule,
  ],
  exports: [
    ReimdetailsPage
  ]
})
export class ReimdetailsPageModule {}
