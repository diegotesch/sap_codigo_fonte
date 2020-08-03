import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { BaseResourceModel } from './../models/base-resource.model';
import { BaseResourceService } from './../services/base-resource.service';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  acaoAtual: string;
  resourceForm: FormGroup;
  titulo: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setAcaoAtual();
    this.iniciarForm();
    this.carregarResource();
  }

  //metodo invocado apos checar o carregamento de todo o conteudo
  ngAfterContentChecked() {
    this.setTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.acaoAtual == 'novo') {
      this.cadastrarResource();
      return;
    }
    this.atualizarResource();
  }

  protected setAcaoAtual() {
    this.acaoAtual = this.route.snapshot.url[0].path == "novo" ? "novo" : "editar";
  }

  protected carregarResource() {
    if (this.acaoAtual == "editar") {
      this.route.paramMap.pipe(
        // obtem o valor do id passado como parametro na rota e o usa para obter a categoria
        switchMap(params => this.resourceService.obterPorId(+params.get("id")))
      ).subscribe(resource => {
        this.resource = resource;
        // faz o bind da categoria com o formulario (carrega os dados no formulario)
        this.resourceForm.patchValue(this.resource);
      }, error => {
        alert('Ocorreu um erro no servidor, tente novamente mais tarde');
      })
    }
  }

  protected setTitle() {
    this.titulo = this.obterTituloCadastro();
    if (this.acaoAtual !== 'novo') {
      this.titulo = this.obterTituloEdicao();
    }
  }

  protected obterTituloCadastro(): string {
    return 'Novo';
  }

  protected obterTituloEdicao(): string {
    return 'Edição';
  }

  protected cadastrarResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.cadastrar(resource)
    .subscribe(
      resource => this.actionForSuccess(resource),
      error => this.actionForError(error)
    )
  }

  protected atualizarResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.atualizar(resource)
    .subscribe(
      resource => this.actionForSuccess(resource),
      error => this.actionForError(error)
    )
  }

  protected actionForSuccess(resource: T) {
    // inserir toast

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
      () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
    )
  }

  protected actionForError(error) {
    // inserir toast

    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
      return;
    }

    this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente novamente mais tarde'];
  }

  protected abstract iniciarForm(): void;

}
