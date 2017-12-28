import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskSummaryPage } from './task-summary';

@NgModule({
  declarations: [
    TaskSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskSummaryPage),
  ],
  exports: [
    TaskSummaryPage
  ]
})
export class TaskSummaryPageModule {}
