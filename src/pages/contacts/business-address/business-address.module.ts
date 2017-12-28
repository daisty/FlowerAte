import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessAddress } from './business-address';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    BusinessAddress,
  ],
  imports: [
    IonicPageModule.forChild(BusinessAddress),
    SharedModule
  ],
  exports: [
    BusinessAddress
  ]
})
export class BusinessAddressModule {}
