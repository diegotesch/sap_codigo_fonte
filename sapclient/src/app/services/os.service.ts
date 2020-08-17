import { environment } from './../../environments/environment.prod';
import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from './../shared/services/base-resource.service';
import { Os } from './../models/os.model';

const api: string = `${environment.apiUrl}/ordens-servico`;

@Injectable({
  providedIn: 'root'
})
export class OsService extends BaseResourceService<Os> {

  constructor(
      protected injector: Injector
  ) {
      super(api, injector, Os.fromJson);
  }

}
