import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskAgainPage } from './task-again';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    TaskAgainPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskAgainPage),
    SharedModule
  ],
  exports: [
    TaskAgainPage
  ],
  providers: []
})
export class TaskAgainPageModule {}
