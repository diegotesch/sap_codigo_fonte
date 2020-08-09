import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from './../shared/services/base-resource.service';
import { Os } from './../models/os.model';

@Injectable({
  providedIn: 'root'
})
export class OsService extends BaseResourceService<Os> {

  constructor(
      protected injector: Injector
  ) {
      super('api/os', injector, Os.fromJson);
  }
}
