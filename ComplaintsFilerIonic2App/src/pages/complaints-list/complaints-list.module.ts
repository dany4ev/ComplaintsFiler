import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintsList } from './complaints-list';

@NgModule({
  declarations: [
    ComplaintsList,
  ],
  imports: [
    IonicPageModule.forChild(ComplaintsList),
  ],
  exports: [
    ComplaintsList
  ]
})
export class ComplaintsListModule {}
