import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExternalAddress } from './external-address';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    ExternalAddress,
  ],
  imports: [
    IonicPageModule.forChild(ExternalAddress),
    SharedModule
  ],
  exports: [
    ExternalAddress
  ]
})
export class ExternalAddressModule {}
