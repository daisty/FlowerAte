import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExternalOther } from './external-other';
import { SharedModule } from '../../../../app/shared.module';

@NgModule({
  declarations: [
    ExternalOther,
  ],
  imports: [
    IonicPageModule.forChild(ExternalOther),
    SharedModule
  ],
  exports: [
    ExternalOther
  ]
})
export class ExternalOtherModule {}
