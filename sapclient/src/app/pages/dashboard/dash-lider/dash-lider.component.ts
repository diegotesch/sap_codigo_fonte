import { SituacaoEnum } from './../../../models/enums/situacao.enum.model';
import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

import { Observable } from 'rxjs';
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

@Component({
  selector: 'app-dash-lider',
  templateUrl: './dash-lider.component.html',
  styleUrls: ['./dash-lider.component.css']
})
export class DashLiderComponent implements OnInit, AfterContentChecked {

    @BlockUI() blockUI: NgBlockUI;

    listaLideres: Lider[] = [];
    listaOs: Os[] = [];
    listaProjetos: Projeto[] = [];
    listaClientes: Cliente[] = [];
    status: TipoStatus[] = [];
    situacoes: TipoSituacao[] = [];
    lista$: Observable<any>;
    lista: any = [];
    osSelecionada: number = null;

    colunas: any[] = [
        { header: '' },
        { header: 'Status da OS' },
        { header: 'Status da Sprint' },
        { header: 'Qtde de OS em execução?'},
        { header: 'PF em execução?'},
        { header: 'Próxima Entrega?'},
        { header: 'A OS/Sprint está no prazo?'},
        { header: 'Defeito de Cliente?'},
        { header: 'Defeitos Internos?'},
        { header: 'Impedimento?'},
        { header: 'Revisor de Código?'},
        { header: 'Gerente?'},
        { header: 'Testador?'},
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
      this.obterLideres();
      this.obterOrdensServico();
      this.obterClientes();
      this.obterSituacoes();
      this.obterStatus();
  }

  ngAfterContentChecked() {
    // this.obterProjetos();
    // this.listar();
  }

//   listar() {
//       this.blockUI.start();
//       this.projetosService.obterDetalhado().pipe(
//           finalize(() => this.blockUI.stop()),
//           tap(console.log)
//       ).subscribe(projetos => this.lista = projetos);
//   }

  montarLista() {
      this.blockUI.start();
      this.lista = this.listaProjetos.map(projeto => {

        //   let projeto =this.filtrarProjetoPorId(os.idProjeto);
          let cliente = this.filtrarClientePorId(projeto.idCliente);
          let os = this.filtrarOsPorProjeto(projeto.id);
          return {
              projeto,
              cliente,
              os,
              selecionada: null
          }
      })
    this.blockUI.stop();
  }

  selecionarOsAndamento(idProjeto: number) {
      return this.listaOs.find(os => os.idProjeto == idProjeto && os.idSituacao == SituacaoEnum["EM CODIFICAÇÃO"])
  }

  filtrarProjetoPorId(idProjeto: number): Projeto {
      return this.listaProjetos.find(projeto => projeto.id == idProjeto);
  }

  filtrarClientePorId(idCliente: number): Cliente {
      return this.listaClientes.find(cliente => cliente.id == idCliente);
  }

  filtrarOsPorProjeto(idProjeto: number) {
      return this.listaOs.filter(os => os.idProjeto == idProjeto);
    //   return retorno.map(os => {
    //       return { label: os.nome, value: os }
    //   })
  }

  filtrarStatus(idStatus: number) {
      return this.status.find(status => status.id == idStatus).descricao;
  }

  filtrarSituacao(idSituacao: number) {
    return this.situacoes.find(situacao => situacao.id == idSituacao).descricao;
}

  filtrarOsAndamento(ordens) {
      let oss = ordens.filter(os => os.idSituacao !== SituacaoEnum.FINALIZADA && os.idSituacao !== SituacaoEnum.AGUARDANDO);
      if (!oss) {
          return '-'
      }
      return oss.reduce((acc, item, index, array) => {
        if (index == 0)
            acc = `${array.length} (`;
        acc += `${item.nome}`
        acc += index == (array.length -1) ? ')' : ' e ';
        return acc;
      }, '')
  }

  // ORDEM DE SERVICO POR LIDER
  obterLideres() {
      this.blockUI.start();
      this.liderService.obterTodos().pipe(
          finalize(() => this.blockUI.stop())
      ).subscribe(
          lideres => this.listaLideres = lideres
      );
  }

  obterOrdensServico() {
      this.blockUI.start();
      this.osService.obterTodos().pipe(
          finalize(() => this.blockUI.stop())
      ).subscribe(os => this.listaOs = os);
  }

  obterProjetos() {
    this.blockUI.start();
    this.lista$ = this.projetosService.obterTodos().pipe(
        finalize(() => this.blockUI.stop()),
        tap(console.log),
        map(projeto => {
            projeto.forEach(i => {
                i['os'] = this.filtrarOsPorProjeto(i.id);
                i['cliente'] = this.filtrarClientePorId(i.idCliente);
            })
            return projeto;
        })
    );
    // .subscribe(projetos => this.listaProjetos = projetos);
  }

  obterClientes() {
      this.blockUI.start();
      this.clienteService.obterTodos().pipe(
          finalize(() => this.blockUI.stop())
      ).subscribe(clientes => this.listaClientes = clientes);
  }

  obterSituacoes() {
    this.blockUI.start();
    this.situacaoService.obterTodos().pipe(
        finalize(() => this.blockUI.stop())
    ).subscribe(situacoes => this.situacoes = situacoes);
  }

  obterStatus() {
    this.blockUI.start();
    this.statusService.obterTodos().pipe(
        finalize(() => this.blockUI.stop())
    ).subscribe(status => this.status = status);
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
}
