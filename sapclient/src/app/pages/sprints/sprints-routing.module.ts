import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SprintFormComponent } from './sprint-form/sprint-form.component';
import { SprintListComponent } from './sprint-list/sprint-list.component';

const routes: Routes = [
    { path: '', component: SprintListComponent },
    { path: 'novo', component: SprintFormComponent },
    { path: ':id', component: SprintFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintsRoutingModule { }
