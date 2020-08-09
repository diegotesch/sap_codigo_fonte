import { Injectable , Injector} from '@angular/core';

import { BaseResourceService } from './../shared/services/base-resource.service';
import { Lider } from './../models/lider.model';

@Injectable({
  providedIn: 'root'
})
export class LiderService extends BaseResourceService<Lider> {

  constructor(
      protected injector: Injector
  ) {
      super('api/lideres', injector, Lider.fromJson);
  }
}
