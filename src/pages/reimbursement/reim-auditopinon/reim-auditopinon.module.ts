import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReimAuditopinonPage } from './reim-auditopinon';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    ReimAuditopinonPage,
  ],
  imports: [
    IonicPageModule.forChild(ReimAuditopinonPage),
    SharedModule
  ],
  exports: [
    ReimAuditopinonPage
  ]
})
export class ReimAuditopinonPageModule {}
