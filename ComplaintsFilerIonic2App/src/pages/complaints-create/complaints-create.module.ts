import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintsCreate } from './complaints-create';

@NgModule({
  declarations: [
    ComplaintsCreate,
  ],
  imports: [
    IonicPageModule.forChild(ComplaintsCreate),
  ],
  exports: [
    ComplaintsCreate
  ]
})
export class ComplaintsCreateModule {}
