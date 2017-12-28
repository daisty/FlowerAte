import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncementPage } from './announcement';
import { SharedModule } from '../../app/shared.module';
@NgModule({
  declarations: [
    AnnouncementPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementPage),
    SharedModule
  ],
  exports: [
    AnnouncementPage
  ]
})
export class AnnouncementPageModule {}
