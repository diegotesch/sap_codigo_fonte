import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashLiderComponent } from './dash-lider/dash-lider.component';


@NgModule({
  declarations: [DashLiderComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
