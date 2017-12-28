import { COMPONENTS, PIPES } from './imports';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    COMPONENTS,
    PIPES
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    COMPONENTS,
    PIPES
  ]
})

export class SharedModule { }