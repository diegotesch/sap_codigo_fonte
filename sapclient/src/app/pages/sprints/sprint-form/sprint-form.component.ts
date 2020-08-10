import { Component, Injector, OnInit, Output, EventEmitter } from '@angular/core';import { Validators, FormGroup } from '@angular/forms';

import { SelectItem, MessageService } from 'primeng/api';
import { switchMap, finalize } from 'rxjs/operators';

import { BaseResourceFormComponent } from './../../../shared/components/base-resource-form.component';

import { Os } from './../../../models/os.model';
import { Sprint } from './../../../models/sprint.model';
import { SprintService } from './../../../services/sprint.service';
import { OsService } from './../../../services/os.service';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css']
})
export class SprintFormComponent extends BaseResourceFormComponent<Sprint> implements OnInit {

    show: boolean = false;
    sprint: Sprint = new Sprint();
    id: number = null;
    sprintForm: FormGroup;
    @Output() aoCadastrarSprint = new EventEmitter();

  constructor(
      protected sprintService: SprintService,
      private osService: OsService,
      protected injector: Injector
  ) {
      super(
          injector,
          new Sprint(),
          sprintService,
          Sprint.fromJson
      );
  }

  ngOnInit(): void {
    this.iniciarForm();
  }

  openDialog(id: number) {
      this.show = true;
      this.id = id;
      this.carregarResource();
    }

    prepararSalvar() {
        this.submittingForm = true;
        if (!this.sprintForm.invalid) {
            this.aoCadastrarSprint.emit(this.jsonDataToResourceFn(this.sprintForm.value));
            this.fecharModal();
        }

    }

  fecharModal() {
      this.sprint = new Sprint();
      this.show = false;
      this.id = null;
      this.iniciarForm();
  }

  protected iniciarForm() {
    this.sprintForm = this.formBuilder.group({
        id: [null],
        nome: [null, [Validators.required, Validators.minLength(2)]],
        dataInicio: [null, [Validators.required]],
        dataTermino: [null],
        qtdPontosFuncao: [null, [Validators.required]]
    })
  }

  protected carregarResource() {
    if (this.id) {
        this.sprintService.obterPorId(this.id).pipe(
            finalize(() => this.setTitle())
        )
        .subscribe(resource => {
            this.sprint = resource;
            this.sprint.dataInicio = new Date(this.sprint.dataInicio);
            this.sprint.dataTermino = new Date(this.sprint.dataTermino);

            this.sprintForm.patchValue(this.sprint);
          }, error => {
            alert('Ocorreu um erro no servidor, tente novamente mais tarde');
          })
    }
  }

  protected setTitle() {
    this.titulo = this.obterTituloCadastro();
    if (this.id) {
      this.titulo = this.obterTituloEdicao();
    }
  }

  protected obterTituloCadastro(): string {
    return 'Cadastrar Sprint';
  }

  protected obterTituloEdicao(): string {
    const nomeSprint = this.sprint.nome || '';
    return `Editar Sprint: ${nomeSprint}`;
  }


}
