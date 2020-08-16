import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {ConfirmationService, MessageService} from 'primeng/api';

import { PRIMENG_IMPORTS } from './primeng-imports';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';

@NgModule({
    imports: [
        PRIMENG_IMPORTS,
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    providers: [
        ConfirmationService,
        MessageService
    ],
    exports: [
        PRIMENG_IMPORTS,
        CommonModule,
        ReactiveFormsModule,
        RouterModule,

        // Componentes compartilhados
        FormFieldErrorComponent
    ],
    declarations: [FormFieldErrorComponent]
})
export class SharedModule { }
