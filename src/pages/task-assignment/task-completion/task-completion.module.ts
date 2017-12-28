import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskCompletionPage } from './task-completion';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    TaskCompletionPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskCompletionPage),
    SharedModule
  ],
  exports: [
    TaskCompletionPage
  ]
})
export class TaskCompletionPageModule {}
