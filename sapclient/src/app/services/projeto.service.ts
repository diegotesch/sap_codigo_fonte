import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from './../shared/services/base-resource.service';
import { Projeto } from './../models/projeto.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService extends BaseResourceService<Projeto> {

  constructor(
      protected injector: Injector
  ) {
      super('api/projetos', injector, Projeto.fromJson);
  }
}
