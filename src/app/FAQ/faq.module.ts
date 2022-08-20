import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQRoutingModule } from './faq-routing.module';
import { CreateUpdateFAQComponent } from './Components/Create-Update-FAQ/Create-Update-FAQ.component';
import { ViewFAQComponent } from './Components/View-FAQ/View-FAQ.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateUpdateFAQComponent,
    ViewFAQComponent
  ],
  imports: [
    CommonModule,
    FAQRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FAQModule { }
