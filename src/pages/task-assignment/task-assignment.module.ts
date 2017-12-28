import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskAssignmentPage } from './task-assignment';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    TaskAssignmentPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskAssignmentPage),
    SharedModule
  ],
  exports: [
    TaskAssignmentPage
  ]
})
export class TaskAssignmentPageModule {}
