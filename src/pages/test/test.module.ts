import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestPage } from './test';
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    TestPage,
  ],
  imports: [
    IonicPageModule.forChild(TestPage),
    SharedModule
  ],
  exports: [
    TestPage
  ],
  providers: [],
})
export class TestPageModule {}
