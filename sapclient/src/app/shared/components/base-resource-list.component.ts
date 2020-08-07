import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit, Injector } from '@angular/core';

import { BaseResourceModel } from './../models/base-resource.model';
import { BaseResourceService } from './../services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];


  constructor(
    protected resourceService: BaseResourceService<T>,
    protected confirmService: ConfirmationService,
    protected messageService: MessageService
  ) { }

  ngOnInit() {
    this.resourceService.obterTodos()
    .subscribe(
      resources => {
        this.resources = resources;
      },
      error => this.messageService.add({severity:'error', summary: 'Erro ao carregar a lista Text'})
    );
  }

  deletarResource(resource: T) {
    this.confirmService.confirm({
        message: 'Tem certeza de que deseja deletar o registro?',
        accept: () => {
            this.deletar(resource.id)
        }
    })
  }

  private deletar(id: number) {
      this.resourceService.deletar(id).subscribe(
          () => this.resources = this.resources.filter(res => res.id !== id)
      )
  }

}
