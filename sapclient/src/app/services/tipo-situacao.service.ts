import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from './../shared/services/base-resource.service';
import { TipoSituacao } from './../models/tipo-situacao.model';
@Injectable({
  providedIn: 'root'
})
export class TipoSituacaoService extends BaseResourceService<TipoSituacao> {

  constructor(
      protected injector: Injector
  ) {
      super('api/situacoes', injector, TipoSituacao.fromJson);
  }
}
