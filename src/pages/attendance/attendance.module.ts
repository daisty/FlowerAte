import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Attendance } from './attendance';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    Attendance,
  ],
  imports: [
    IonicPageModule.forChild(Attendance),
    SharedModule
  ],
  exports: [
    Attendance
  ]
})
export class AttendanceModule {}
