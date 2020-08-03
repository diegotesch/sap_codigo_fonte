import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { Lider } from './models/lider.model';

export class InMemoryDatabase implements InMemoryDbService {

  createDb() {
    const lideres: Lider[] = [
      { id: 1, nome: 'Diego', contato: 'diego@basis.com.br' },
      { id: 2, nome: 'Eduardo', contato: 'eduardo@basis.com.br, 27 99912-0022' },
      { id: 3, nome: 'Chrysthian', contato: 'chrysthian@basis.com.br' },
      { id: 4, nome: 'Breno', contato: 'breno@basis.com.br, 61 98776-0899' },
      { id: 5, nome: 'Leonardo', contato: 'leonardo@basis.com.br' }
    ];

    return { lideres }
  }
}
