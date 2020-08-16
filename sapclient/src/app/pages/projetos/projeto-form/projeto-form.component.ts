import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { finalize, tap } from 'rxjs/operators';

import { SelectItem, MessageService } from 'primeng/api';

import { BaseResourceFormComponent } from './../../../shared/components/base-resource-form.component';
import { ClienteService } from './../../../services/cliente.service';
import { LiderService } from './../../../services/lider.service';
import { ProjetoService } from './../../../services/projeto.service';
import { Projeto } from './../../../models/projeto.model';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.css']
})
export class ProjetoFormComponent extends BaseResourceFormComponent<Projeto> implements OnInit {

    clientes: SelectItem[] = [];
    lideres: SelectItem[] = [];

  constructor(
      private clienteService: ClienteService,
      private liderService: LiderService,
      private messageService: MessageService,
      protected projetoService: ProjetoService,
      protected injector: Injector
  ) {
      super(
          injector,
          new Projeto(),
          projetoService,
          Projeto.fromJson
      )
  }

  ngOnInit() {
    this.carregarClientes();
    this.carregarLideres();
    super.ngOnInit();
  }


  protected iniciarForm() {
      this.resourceForm = this.formBuilder.group({
          id: [null],
          idCliente: [null, [Validators.required]],
          nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
          idLider: [null, [Validators.required]],
          testador: [null],
          revisor: [null],
          gerente: [null],
          link: [null]
      })
  }

  protected obterTituloCadastro(): string {
    return 'Cadastrar Projeto';
  }

  protected obterTituloEdicao(): string {
    const nomeProjeto = this.resource.nome || '';
    return `Editando projeto: ${nomeProjeto}`;
  }

  private carregarClientes() {
    this.clienteService.obterTodos().pipe(
        tap(console.log)
    )
    .subscribe(
        clientes => {
            this.clientes = this.converterDropDown(clientes,  'id', 'descricao');
        },
        error => this.messageService.add(
            {severity: 'error', summary: 'Erro ao carregar clientes'}
        )
    );
  }

  private carregarLideres() {
    this.liderService.obterTodos().subscribe(
        lideres => {
            this.lideres = this.converterDropDown(lideres, 'id', 'nome');
        },
        error => this.messageService.add(
            {severity: 'error', summary: 'Erro ao carregar líderes'}
        )
    );
  }

}
