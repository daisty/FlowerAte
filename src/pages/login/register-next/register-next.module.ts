import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterNextPage } from './register-next';

@NgModule({
  declarations: [
    RegisterNextPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterNextPage),
  ],
  exports: [
    RegisterNextPage
  ]
})
export class RegisterNextPageModule {}
