import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OvertimeApplyPage } from './overtime-apply';
// import { PROVIDERS } from '../../../app/imports';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    OvertimeApplyPage,
  ],
  imports: [
    IonicPageModule.forChild(OvertimeApplyPage),
    SharedModule
  ],
  exports: [
    OvertimeApplyPage
  ],
  providers: []
})
export class OvertimeApplyPageModule {}
