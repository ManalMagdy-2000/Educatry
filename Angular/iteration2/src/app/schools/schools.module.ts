import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SchoolsRoutingModule } from './schools-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { AddRequestComponent } from './add-request.component';
import { AddAdminComponent } from './add-admin.component';
import { AddOfferComponent } from './add-offer.component';
import { AccordionModule, BadgeModule, ButtonModule, FormModule, ModalModule, SharedModule, TableModule, UtilitiesModule } from '@coreui/angular';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SchoolsRoutingModule,
        ModalModule,
        AccordionModule,
        TableModule,
        BadgeModule,
        UtilitiesModule,
        FormModule,
        ButtonModule,
        SharedModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
        AddRequestComponent,
        AddAdminComponent,
        AddOfferComponent
    ]
})
export class SchoolsModule { }