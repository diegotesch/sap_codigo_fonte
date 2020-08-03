import { Component } from '@angular/core';

import { Lider } from './../../../models/lider.model';
import { LiderService } from './../../../services/lider.service';
import { BaseResourceListComponent } from './../../../shared/components/base-resource-list.component';

@Component({
  selector: 'app-lideres-list',
  templateUrl: './lideres-list.component.html',
  styleUrls: ['./lideres-list.component.css']
})

export class LideresListComponent extends BaseResourceListComponent<Lider> {

    colunas: any[] = [
        { header: 'Nome' },
        { header: 'Contato(s)' },
        { header: 'Ações' }
    ];

  constructor(
      private liderService: LiderService
  ) {
      super(liderService);
  }

}
