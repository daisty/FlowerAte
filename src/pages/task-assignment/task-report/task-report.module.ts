import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskReportPage } from './task-report';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    TaskReportPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskReportPage),
    SharedModule
  ],
  exports: [
    TaskReportPage
  ],
  providers: []
})
export class TaskReportPageModule {}
