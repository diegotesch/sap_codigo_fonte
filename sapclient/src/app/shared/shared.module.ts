import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PRIMENG_IMPORTS } from './primeng-imports';

@NgModule({
    imports: [
        PRIMENG_IMPORTS,
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    providers: [

    ],
    exports: [
        PRIMENG_IMPORTS,
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: []
})
export class SharedModule { }
