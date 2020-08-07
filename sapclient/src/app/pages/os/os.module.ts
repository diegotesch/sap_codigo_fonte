import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OsRoutingModule } from './os-routing.module';
import { OsListComponent } from './os-list/os-list.component';
import { OsFormComponent } from './os-form/os-form.component';


@NgModule({
  declarations: [OsListComponent, OsFormComponent],
  imports: [
    CommonModule,
    OsRoutingModule
  ]
})
export class OsModule { }
