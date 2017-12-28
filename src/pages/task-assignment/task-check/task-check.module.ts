import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskCheckPage } from './task-check';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    TaskCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskCheckPage),
    SharedModule
  ],
  exports: [
    TaskCheckPage
  ],
  providers: []
})
export class TaskCheckPageModule {}
