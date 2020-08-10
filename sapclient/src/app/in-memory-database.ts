import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { Lider } from './models/lider.model';
import { Projeto } from './models/projeto.model';
import { Os } from './models/os.model';
import { Sprint } from './models/sprint.model';

export class InMemoryDatabase implements InMemoryDbService {

  createDb() {
    const lideres: Lider[] = [
      { id: 1, nome: 'Diego', contato: 'diego@basis.com.br' },
      { id: 2, nome: 'Eduardo', contato: 'eduardo@basis.com.br, 27 99912-0022' },
      { id: 3, nome: 'Chrysthian', contato: 'chrysthian@basis.com.br' },
      { id: 4, nome: 'Breno', contato: 'breno@basis.com.br, 61 98776-0899' },
      { id: 5, nome: 'Leonardo', contato: 'leonardo@basis.com.br' }
    ];

    const clientes: any[] = [
        { id: 1, nome: 'EB' },
        { id: 2, nome: 'CADE' },
        { id: 3, nome: 'ANCINE' },
        { id: 4, nome: 'ANVISA' },
        { id: 5, nome: 'IBAMA' }
    ];

    const status: any[] = [
        { id: 1, descricao: 'ativo' },
        { id: 2, descricao: 'inativo' },
        { id: 3, descricao: 'em andamento' },
    ];

    const situacoes: any[] = [
        { id: 1, descricao: 'ativo' },
        { id: 2, descricao: 'inativo' },
        { id: 3, descricao: 'em andamento' },
    ];

    const projetos: Projeto[] =[
        {
            id: 1,
            idCliente: 1,
            nome: 'PROJ1',
            idLider: 1,
            testador: 'Jhon Doe',
            revisor: 'Joseph Doe',
            gerente: 'Mary Doe',
            link: 'https://github.com/diegotesh'
        },
        {
            id: 2,
            idCliente: 3,
            nome: 'PROJ2',
            idLider: 4,
            testador: 'Jhon Doe',
            revisor: 'Joseph Doe',
            gerente: 'Mary Doe',
            link: 'https://github.com/diegotesh'
        },
        {
            id: 3,
            idCliente: 3,
            nome: 'PROJ3',
            idLider: 4,
            testador: 'Jhon Doe',
            revisor: 'Joseph Doe',
            gerente: 'Mary Doe',
            link: 'https://github.com/diegotesh'
        },
        {
            id: 4,
            idCliente: 1,
            nome: 'PROJ4',
            idLider: 1,
            testador: 'Jhon Doe',
            revisor: 'Joseph Doe',
            gerente: 'Mary Doe',
            link: 'https://github.com/diegotesh'
        },
    ];

    const sprints: Sprint[] =[
        {
            id: 1,
            nome: 'SP1',
            idOs: 1,
            impedimento: null,
            prazo: null,
            dataInicio: '2020-06-01',
            dataTermino: '2030-10-30',
            idStatus: 3,
            qtdPontosFuncao: 200
        },
        {
            id: 2,
            nome: 'SP2',
            idOs: 1,
            impedimento: null,
            prazo: null,
            dataInicio: '2020-06-01',
            dataTermino: '2030-10-30',
            idStatus: 2,
            qtdPontosFuncao: 200
        },
        {
            id: 3,
            nome: 'SP3',
            idOs: 1,
            impedimento: null,
            prazo: null,
            dataInicio: '2020-06-01',
            dataTermino: '2030-10-30',
            idStatus: 2,
            qtdPontosFuncao: 200
        },
        {
            id: 4,
            nome: 'SP1',
            idOs: 2,
            impedimento: null,
            prazo: null,
            dataInicio: '2020-06-01',
            dataTermino: '2030-10-30',
            idStatus: 1,
            qtdPontosFuncao: 200
        },
        {
            id: 5,
            nome: 'SP1',
            idOs: 3,
            impedimento: null,
            prazo: null,
            dataInicio: '2020-06-01',
            dataTermino: '2030-10-30',
            idStatus: 1,
            qtdPontosFuncao: 200
        },
        {
            id: 6,
            nome: 'SP1',
            idOs: 4,
            impedimento: null,
            prazo: null,
            dataInicio: '2020-06-01',
            dataTermino: '2030-10-30',
            idStatus: 1,
            qtdPontosFuncao: 200
        }
    ];

    const os: Os[] =[
        {
            id: 1,
            nome: 'OS1',
            idProjeto: 1,
            idSituacao: 1,
            dataProximaEntrega: '2020-10-10',
            qtdDefeitosCliente: null,
            qtdDefeitosInterno: null,
            dataEntrega: '2020-10-10',
            qtdPontosFuncao: 75.4,
            fabricas: 'SRC, COL'
        },
        {
            id: 2,
            nome: 'OS2',
            idProjeto: 1,
            idSituacao: 1,
            dataProximaEntrega: '2020-10-10',
            qtdDefeitosCliente: 3,
            qtdDefeitosInterno: 6,
            dataEntrega: '2020-10-10',
            qtdPontosFuncao: 47.1,
            fabricas: 'SRC, COL'
        },
        {
            id: 3,
            nome: 'OS3',
            idProjeto: 2,
            idSituacao: 1,
            dataProximaEntrega: '2020-10-10',
            qtdDefeitosCliente: null,
            qtdDefeitosInterno: null,
            dataEntrega: '2020-10-10',
            qtdPontosFuncao: 29,
            fabricas: 'SRC, COL'
        },
        {
            id: 4,
            nome: 'OS4',
            idProjeto: 3,
            idSituacao: 1,
            dataProximaEntrega: "2020-10-10",
            qtdDefeitosCliente: 7,
            qtdDefeitosInterno: null,
            dataEntrega: "2020-10-30",
            qtdPontosFuncao: 32.6,
            fabricas: 'SRC, COL'
        },
        {
            id: 5,
            nome: 'OS5',
            idProjeto: 4,
            idSituacao: 1,
            dataProximaEntrega: '2020-10-10',
            qtdDefeitosCliente: null,
            qtdDefeitosInterno: 7,
            dataEntrega: '2020-10-10',
            qtdPontosFuncao: 108.9,
            fabricas: 'SRC, COL'
        }
    ];

    return {
        lideres,
        clientes,
        status,
        situacoes,
        projetos,
        sprints,
        os
    }
  }
}
