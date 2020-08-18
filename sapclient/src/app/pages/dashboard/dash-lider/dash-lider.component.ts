import { SituacaoEnum } from './../../../models/enums/situacao.enum.model';
import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

import { Observable, forkJoin } from 'rxjs';
import { tap, finalize, map } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { OsService } from './../../../services/os.service';
import { ProjetoService } from './../../../services/projeto.service';
import { TipoSituacaoService } from './../../../services/tipo-situacao.service';
import { LiderService } from './../../../services/lider.service';
import { ClienteService } from './../../../services/cliente.service';
import { TipoStatusService } from './../../../services/tipo-status.service';

import { TipoSituacao } from './../../../models/tipo-situacao.model';
import { TipoStatus } from './../../../models/tipo-status.model';
import { Projeto } from './../../../models/projeto.model';
import { Os } from './../../../models/os.model';
import { Lider } from './../../../models/lider.model';
import { Cliente } from './../../../models/cliente.model';
import { ListaEnum } from './../../../models/enums/lista.enum.model';


@Component({
  selector: 'app-dash-lider',
  templateUrl: './dash-lider.component.html',
  styleUrls: ['./dash-lider.component.css']
})
export class DashLiderComponent implements OnInit, AfterContentChecked {

    @BlockUI() blockUI: NgBlockUI;

    listaLideres$: Observable<Lider[]>;
    listaLideres: Lider[] = [];
    listaOs$: Observable<Os[]>;
    listaOs: Os[] = [];
    listaProjetos$: Observable<Projeto[]>;
    listaProjetos: Projeto[] = [];
    listaClientes$: Observable<Cliente[]>;
    listaClientes: Cliente[] = [];
    status$: Observable<TipoStatus[]>;
    status: TipoStatus[] = [];
    situacoes$: Observable<TipoSituacao[]>;
    situacoes: TipoSituacao[] = [];
    lista$: Observable<any>;
    lista: any = [];
    listaAgrupada: any;
    osSelecionada: number = null;
    listaEnum = ListaEnum;

    colunas: any[] = [
        { header: '' },
        { header: 'OS' },
        { header: 'Status da OS' },
        { header: 'PF em execução?', reduzir: true},
        { header: 'Próxima Entrega?'},
        { header: 'A OS/Sprint está no prazo?'},
        { header: 'Defeito de Cliente?', reduzir: true},
        { header: 'Defeitos Internos?', reduzir: true},
        { header: 'Impedimento?'},
        { header: 'Revisor de Código?'},
        { header: 'Gerente?'},
        { header: 'Testador?'},
        { header: 'Ações'},
    ];

  constructor(
      protected osService: OsService,
      protected projetosService: ProjetoService,
      protected situacaoService: TipoSituacaoService,
      protected liderService: LiderService,
      protected clienteService: ClienteService,
      protected statusService: TipoStatusService
  ) { }

  ngOnInit(): void {
      this.obterLitaCompleta();
  }

  ngAfterContentChecked() {
  }

  obterLitaCompleta() {
    this.blockUI.start();

    this.lista$ = forkJoin([
        this.osService.obterTodos(),
        this.projetosService.obterTodos(),
        this.clienteService.obterTodos(),
        this.situacaoService.obterTodos(),
        this.statusService.obterTodos(),
        this.liderService.obterTodos(),
    ]).pipe(
        // tap(console.log),
        map(this.montarListagem),
        finalize(() => this.blockUI.stop())
    );
  }

  montarListagem(array) {
    let retorno = [];
    retorno = array[ListaEnum.OS].map((item, index, full) => {
        item['projeto'] = array[ListaEnum.PROJETO].find(projeto => projeto.id === item.idProjeto);
        item['cliente'] = array[ListaEnum.CLIENTE].find(cliente => cliente.id === item.projeto.idCliente).descricao;
        item['situacao'] = array[ListaEnum.SITUACAO].find(situacao => situacao.id === item.idSituacao).descricao

        if (!full[index-1] || full[index-1].idProjeto !== item.idProjeto) {
            item['rowspan'] = { indice: index, size: array[ListaEnum.OS].filter(os => os.idProjeto === item.idProjeto).length };
        }
        return item
    });
    return retorno;
  }

  checarPrazo(os) {
    return os.sprints.some(sprint => !sprint.prazo) ? 'NÃO' : 'SIM';
  }

  checarImpedimento(os) {
      return os.sprints.some(sprint => !sprint.impedimento) ? 'NÃO' : 'SIM';
  }

  getRowspan(indice, data, array, check = false) {
    const info = this.filtrarOsPorProjeto(data.id, array)
      if (check)
        return info.length > 1 ? true : false;

      return this.filtrarOsPorProjeto(data.id, array).length;
  }

  selecionarOsAndamento(idProjeto: number) {
      return this.listaOs.find(os => os.idProjeto == idProjeto && os.idSituacao == SituacaoEnum["EM CODIFICAÇÃO"])
  }

  filtrarProjetoPorId(idProjeto: number): Projeto {
      return this.listaProjetos.find(projeto => projeto.id == idProjeto);
  }

  filtrarClientePorId(idCliente: number, clientes: Cliente[]): Cliente {
      return clientes.find(cliente => cliente.id == idCliente);
  }

  filtrarOsPorProjeto(idProjeto: number, array) {
      return array.filter(os => os.idProjeto == idProjeto);
  }

  filtrarStatus(idStatus: number) {
      return this.status.find(status => status.id == idStatus).descricao;
  }

  filtrarSituacao(idSituacao: number) {
    return this.situacoes.find(situacao => situacao.id == idSituacao).descricao;
}

  private converterDropDown(jsonData: any, label:string = 'nome', value: string = null) {

    return jsonData.map(data => {
        let valor = data;
      if (value) {
        valor = data[value]
      }
        return {
            label: data[label],
            value: valor
        }
    })
    }

    formatarData(data) {
        let nova = data.split('-');
        return `${nova[2]}/${nova[1]}/${nova[0]}`;
    }
}
