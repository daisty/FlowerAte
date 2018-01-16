import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OvertimeAuditopinonPage } from './overtime-auditopinon';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    OvertimeAuditopinonPage,
  ],
  imports: [
    IonicPageModule.forChild(OvertimeAuditopinonPage),
    SharedModule
  ],
  exports: [
    OvertimeAuditopinonPage
  ],
  providers: []
})
export class OvertimeAuditopinonPageModule {}
