import { NgModule } from '@angular/core';
import { AccordionModule, SharedModule } from '@coreui/angular';
import { OfferComponent } from './offers.component';

@NgModule({
  imports: [
    AccordionModule,
    SharedModule
  ]
})
export class RequestModule {}