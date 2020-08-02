import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LideresRoutingModule } from './lideres-routing.module';
import { LideresListComponent } from './lideres-list/lideres-list.component';
import { LideresFormComponent } from './lideres-form/lideres-form.component';


@NgModule({
  declarations: [LideresListComponent, LideresFormComponent],
  imports: [
    CommonModule,
    LideresRoutingModule
  ]
})
export class LideresModule { }
