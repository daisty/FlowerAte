import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MailingPage } from './mailing';

@NgModule({
  declarations: [
    MailingPage,
  ],
  imports: [
    IonicPageModule.forChild(MailingPage),
  ],
  exports: [
    MailingPage
  ]
})
export class MailingPageModule {}
