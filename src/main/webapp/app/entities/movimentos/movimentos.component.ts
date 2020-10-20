import { Component, OnInit, OnDestroy, ViewChild, Inject, ElementRef } from '@angular/core';
import { DataService } from '../../data.service';
import { DoenteHistMovimentosService } from '../doente-hist-movimentos/doente-hist-movimentos.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { DoenteHistMovimentosDeleteDialogComponent } from '../doente-hist-movimentos/doente-hist-movimentos-delete-dialog.component';
import { IDoente } from 'app/shared/model/doente.model';
import { FormBuilder, Validators } from '@angular/forms';
import { DoenteService } from 'app/entities/doente/doente.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IDoenteHistMovimentos, DoenteHistMovimentos } from 'app/shared/model/doente-hist-movimentos.model';
import { JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-movimentos',
  templateUrl: './movimentos.component.html',
  styleUrls: ['./movimentos.component.scss']
})
export class MovimentosComponent implements OnInit, OnDestroy {
  element: HTMLElement;
  doenteId: number;
  doenteHistMovimentos: IDoenteHistMovimentos[];
  eventSubscriber: Subscription;
  historico: boolean;
  newMovimento = false;
  vivo = true;
  isSaving: boolean;
  doente: IDoente;
  dataDp: any;
  doentes: IDoente[];
  statusPrevio: any;
  statusPrevioPrevio: any;
  statusIndeterminado = false;
  statusPRHD = false;
  statusTransplantado = false;
  statusRecupFunc = false;
  statusTransferido = false;
  statusDP = false;
  statusInternado = false;
  statusEmTransito = false;
  statusFerias = false;
  statusAlta = false;

  editForm = this.fb.group({
    id: [],
    data: [],
    situacao: [],
    statusprevio: [],
    obs: [],
    causaMorte: [],
    doente: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected doenteService: DoenteService,
    protected doenteHistMovimentosService: DoenteHistMovimentosService,
    private fb: FormBuilder,
    private data: DataService
  ) {}

  print() {
    window.print();
  }

  save() {
    this.isSaving = true;
    const doenteHistMovimentos = this.createFromForm();
    if (doenteHistMovimentos.data === null || doenteHistMovimentos.data === undefined) {
      this.cancel();
      this.isSaving = false;
      return;
    }
    if (this.statusPrevio === 'StatusInternado') {
      doenteHistMovimentos.situacao = this.statusPrevioPrevio;
    }
    this.subscribeToSaveResponse(this.doenteHistMovimentosService.create(doenteHistMovimentos));
    this.newMovimento = false;
    this.loadAll();
    this.delay(2000);
    this.loadAll();
    this.delay(2000);
    this.loadAll();
    this.loadAll();
    this.loadAll();
  }

  cancel() {
    this.newMovimento = false;
    this.editForm.reset();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => this.nada());
  }

  nada() {
    return;
  }

  addMovimento() {
    this.newMovimento = true;
  }

  private createFromForm(): IDoenteHistMovimentos {
    return {
      ...new DoenteHistMovimentos(),
      data: this.editForm.get(['data']).value,
      situacao: this.editForm.get(['situacao']).value,
      statusprevio: this.statusPrevio,
      obs: this.editForm.get(['obs']).value,
      causaMorte: this.editForm.get(['causaMorte']).value,
      doente: this.doente
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoenteHistMovimentos>>) {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.editForm.reset();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDoenteById(index: number, item: IDoente) {
    return item.id;
  }

  ngOnInit() {
    this.isSaving = false;
    this.data.currentHistorico.subscribe(hi => {
      this.historico = hi;
    });
    this.data.currentDoente.subscribe(doenteId => {
      this.doenteId = doenteId;
      this.doenteService.find(this.doenteId).subscribe(dt => [(this.doente = dt.body)]);
      this.loadAll();
      this.registerChangeInDoenteHistMovimentos();
    });
    this.doenteService.query().subscribe(
      (res: HttpResponse<IDoente[]>) => (this.doentes = res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  loadAll() {
    this.doenteService.find(this.doenteId).subscribe(dt => [(this.doente = dt.body)]);
    this.doenteHistMovimentosService.search(this.doenteId).subscribe((res: HttpResponse<IDoenteHistMovimentos[]>) => {
      this.doenteHistMovimentos = res.body.sort((a: IDoenteHistMovimentos, b: IDoenteHistMovimentos) => (a.data > b.data ? 1 : -1));
      this.doenteHistMovimentos.forEach(element => {
        if (element.situacao === null || element.situacao === undefined) {
          this.delete(element);
        }
      });
      console.log(this.doenteHistMovimentos);
      if (this.doenteHistMovimentos.length === 0) {
        this.statusIndeterminado = true;
      }
      if (this.doenteHistMovimentos.length > 0) {
        this.statusPrevio = this.doenteHistMovimentos[this.doenteHistMovimentos.length - 1].situacao;
        if (this.doenteHistMovimentos.length > 1) {
          this.statusPrevioPrevio = this.doenteHistMovimentos[this.doenteHistMovimentos.length - 2].situacao;
        }
      }
      console.log(this.statusPrevio);
      console.log(this.statusPrevioPrevio);
      if (this.statusPrevio === 'StatusFalecido') {
        this.vivo = false;
      } else {
        this.vivo = true;
      }

      this.changeStatus(this.statusPrevio);
    });
  }

  changeStatus(statusPrevio: any) {
    switch (statusPrevio) {
      case null:
        this.statusIndeterminado = true;
        this.statusPRHD = false;
        this.statusTransplantado = false;
        this.statusRecupFunc = false;
        this.statusTransferido = false;
        this.statusDP = false;
        this.statusInternado = false;
        this.statusEmTransito = false;
        this.statusFerias = false;
        this.statusAlta = false;
        break;
      case 'StatusPRHD':
        this.statusIndeterminado = false;
        this.statusPRHD = true;
        this.statusTransplantado = false;
        this.statusRecupFunc = false;
        this.statusTransferido = false;
        this.statusDP = false;
        this.statusInternado = false;
        this.statusEmTransito = false;
        this.statusFerias = false;
        this.statusAlta = false;
        break;
      case 'StatusTranspl':
        this.statusIndeterminado = false;
        this.statusPRHD = false;
        this.statusTransplantado = true;
        this.statusRecupFunc = false;
        this.statusTransferido = false;
        this.statusDP = false;
        this.statusInternado = false;
        this.statusEmTransito = false;
        this.statusFerias = false;
        this.statusAlta = false;
        break;
      case 'StatusRecFam':
        this.statusIndeterminado = false;
        this.statusPRHD = false;
        this.statusTransplantado = false;
        this.statusRecupFunc = true;
        this.statusTransferido = false;
        this.statusDP = false;
        this.statusInternado = false;
        this.statusEmTransito = false;
        this.statusFerias = false;
        this.statusAlta = false;
        break;
      case 'StatusTransfer':
        this.statusIndeterminado = false;
        this.statusPRHD = false;
        this.statusTransplantado = false;
        this.statusRecupFunc = false;
        this.statusTransferido = true;
        this.statusDP = false;
        this.statusInternado = false;
        this.statusEmTransito = false;
        this.statusFerias = false;
        this.statusAlta = false;
        break;
      case 'StatusDP':
        this.statusIndeterminado = false;
        this.statusPRHD = false;
        this.statusTransplantado = false;
        this.statusRecupFunc = false;
        this.statusTransferido = false;
        this.statusDP = true;
        this.statusInternado = false;
        this.statusEmTransito = false;
        this.statusFerias = false;
        this.statusAlta = false;
        break;
      case 'StatusInternado':
        this.statusIndeterminado = false;
        this.statusPRHD = false;
        this.statusTransplantado = false;
        this.statusRecupFunc = false;
        this.statusTransferido = false;
        this.statusDP = false;
        this.statusInternado = true;
        this.statusEmTransito = false;
        this.statusFerias = false;
        this.statusAlta = false;
        break;
      case 'StatusemTransito':
        this.statusIndeterminado = false;
        this.statusPRHD = false;
        this.statusTransplantado = false;
        this.statusRecupFunc = false;
        this.statusTransferido = false;
        this.statusDP = false;
        this.statusInternado = false;
        this.statusEmTransito = true;
        this.statusFerias = false;
        this.statusAlta = false;
        break;
      case 'StatusEmFerias':
        this.statusIndeterminado = false;
        this.statusPRHD = false;
        this.statusTransplantado = false;
        this.statusRecupFunc = false;
        this.statusTransferido = false;
        this.statusDP = false;
        this.statusInternado = false;
        this.statusEmTransito = false;
        this.statusFerias = true;
        this.statusAlta = false;
        break;
      case 'StatusAlta':
        this.statusIndeterminado = false;
        this.statusPRHD = false;
        this.statusTransplantado = false;
        this.statusRecupFunc = false;
        this.statusTransferido = false;
        this.statusDP = false;
        this.statusInternado = false;
        this.statusEmTransito = false;
        this.statusFerias = false;
        this.statusAlta = true;
        break;
    }
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDoenteHistMovimentos) {
    return item.id;
  }

  registerChangeInDoenteHistMovimentos() {
    this.eventSubscriber = this.eventManager.subscribe('doenteHistMovimentosListModification', () => this.loadAll());
  }

  delete(doenteHistMovimentos: IDoenteHistMovimentos) {
    this.doenteHistMovimentosService.delete(doenteHistMovimentos.id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'doenteHistMovimentosListModification',
        content: 'Deleted an doenteHistMovimentos'
      });
    });
  }
}
