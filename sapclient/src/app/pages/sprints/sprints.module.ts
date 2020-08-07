import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintsRoutingModule } from './sprints-routing.module';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';


@NgModule({
  declarations: [SprintListComponent, SprintFormComponent],
  imports: [
    CommonModule,
    SprintsRoutingModule
  ]
})
export class SprintsModule { }
