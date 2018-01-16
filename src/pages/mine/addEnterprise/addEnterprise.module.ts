import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { addEnterprisePage } from './addEnterprise';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    addEnterprisePage,
  ],
  imports: [
    IonicPageModule.forChild(addEnterprisePage),
    SharedModule
  ],
  exports: [
    addEnterprisePage
  ]
})
export class addEnterprisePageModule {}
