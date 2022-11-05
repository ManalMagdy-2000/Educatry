import { NgModule } from '@angular/core';
import { AccordionModule, SharedModule } from '@coreui/angular';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RequestComponent } from './request.component';

@NgModule({
  imports: [
    AccordionModule,
    SharedModule,
    NgxMaterialTimepickerModule
  ]
})
export class RequestModule {}