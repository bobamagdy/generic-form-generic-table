import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './AppLayout/AppLayout.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgDragDropModule } from 'ng-drag-drop';
import { GenericTableComponent } from './Generic-Table/Generic-Table.component';
import { GenericFormComponent } from './generic-form/generic-form.component';

@NgModule({
  declarations: [	
    AppComponent,
    AppLayoutComponent,
      GenericTableComponent,
      GenericFormComponent
   ],
  imports: [
    NgDragDropModule.forRoot(),
    ModalModule.forChild(),
    AccordionModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
