import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { SprintsRoutingModule } from './sprints-routing.module';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';


@NgModule({
  declarations: [SprintListComponent, SprintFormComponent],
  imports: [
    SprintsRoutingModule,
    SharedModule
  ]
})
export class SprintsModule { }
