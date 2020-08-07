import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { OsRoutingModule } from './os-routing.module';
import { OsListComponent } from './os-list/os-list.component';
import { OsFormComponent } from './os-form/os-form.component';


@NgModule({
  declarations: [OsListComponent, OsFormComponent],
  imports: [
    SharedModule,
    OsRoutingModule
  ]
})
export class OsModule { }
