import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InternalAddress } from './internal-address';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    InternalAddress,
  ],
  imports: [
    IonicPageModule.forChild(InternalAddress),
    SharedModule
  ],
  exports: [
    InternalAddress
  ]
})
export class InternalAddressModule {}
