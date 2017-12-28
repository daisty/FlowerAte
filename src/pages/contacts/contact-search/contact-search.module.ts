import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactSearchPage } from './contact-search';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    ContactSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactSearchPage),
    SharedModule
  ],
  exports: [
    ContactSearchPage
  ]
})
export class ContactSearchPageModule {}
