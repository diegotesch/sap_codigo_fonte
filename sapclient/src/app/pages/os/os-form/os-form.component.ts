import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { SelectItem, MessageService } from 'primeng/api';

import { BaseResourceFormComponent } from './../../../shared/components/base-resource-form.component';
import { OsService } from './../../../services/os.service';
import { ProjetoService } from './../../../services/projeto.service';
import { TipoSituacaoService } from './../../../services/tipo-situacao.service';
import { TipoSituacao } from './../../../models/tipo-situacao.model';
import { Projeto } from './../../../models/projeto.model';
import { Os } from './../../../models/os.model';

@Component({
  selector: 'app-os-form',
  templateUrl: './os-form.component.html',
  styleUrls: ['./os-form.component.css']
})
export class OsFormComponent extends BaseResourceFormComponent<Os> implements OnInit {

    projetos: SelectItem[] = [];
    situacoes: SelectItem[] = [];

  constructor(
      private projetoService: ProjetoService,
      private situacaoService: TipoSituacaoService,
      private messageService: MessageService,
      protected osService: OsService,
      protected injector: Injector
  ) {
      super(
          injector,
          new Os(),
          osService,
          Os.fromJson
      )
  }

  ngOnInit(): void {
      this.carregarProjetos();
      this.carregarSituacoes();
      super.ngOnInit();
  }

  protected iniciarForm() {
    this.resourceForm = this.formBuilder.group({
        id: [null],
        nome: [null, [Validators.required, Validators.minLength(2)]],
        idProjeto: [null, [Validators.required]],
        idSituacao: [null, [Validators.required]],
        dataEntrega: [new Date(),[Validators.required]],
        qtdPontosFuncao: [null, [Validators.required]],
        fabricas: [null]
    })
  }

  protected obterTituloCadastro(): string {
    return 'Cadastrar Ordem de Serviço';
  }

  protected obterTituloEdicao(): string {
    const nomeOs = this.resource.nome || '';
    return `Editar OS: ${nomeOs}`;
  }

  private carregarProjetos() {
    this.projetoService.obterTodos().subscribe(
        projetos => {
            this.projetos = this.converterDropDown(projetos,  'id', 'nome');
        },
        error => this.messageService.add(
            {severity: 'error', summary: 'Erro ao carregar projetos'}
        )
    );
  }

  private carregarSituacoes() {
    this.situacaoService.obterTodos().subscribe(
        situacoes => {
            this.situacoes = this.converterDropDown(situacoes,  'id', 'descricao');
        },
        error => this.messageService.add(
            {severity: 'error', summary: 'Erro ao carregar situações'}
        )
    );
  }

}
