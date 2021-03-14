import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDoente } from '../../shared/model/doente.model';
import { FormBuilder } from '@angular/forms';
import { DoenteService } from '../../entities/doente/doente.service';
import { IDoenteDiagnosticoSocial, DoenteDiagnosticoSocial } from 'app/shared/model/doente-diagnostico-social.model';
import { JhiAlertService } from 'ng-jhipster';
import { DoenteDiagnosticoSocialService } from '../doente-diagnostico-social/doente-diagnostico-social.service';
import { DataService } from '../../data.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { DoenteRegistosIntervencoesService } from '../doente-registos-intervencoes/doente-registos-intervencoes.service';
import { DoenteRegistosIntervencoesDeleteDialogComponent } from '../doente-registos-intervencoes/doente-registos-intervencoes-delete-dialog.component';
import { IDoenteRegistosIntervencoes, DoenteRegistosIntervencoes } from '../../shared/model/doente-registos-intervencoes.model';
import * as moment from 'moment';

@Component({
  selector: 'jhi-processosocial',
  templateUrl: './processosocial.component.html',
  styleUrls: ['./processosocial.component.scss']
})
export class ProcessosocialComponent implements OnInit, OnDestroy {
  doenteRegistosIntervencoes: IDoenteRegistosIntervencoes[];
  eventSubscriber: Subscription;
  doenteId: number;
  perfilSocial: boolean;
  new = true;
  registoHoje: IDoenteDiagnosticoSocial;
  isSaving: boolean;
  doentes: IDoente[];
  histRegistos: IDoenteDiagnosticoSocial[];
  histRegistos2: IDoenteDiagnosticoSocial[]=[];
  newRegisto = false;
  isSaving2: boolean;
  doente: IDoente;
  hoje=true;

  editForm = this.fb.group({
    id: [],
    data: [],
    descr: [],
    doente: []
  });

  editForm2 = this.fb.group({
    id: [],
    descr: [],
    doente: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected doenteRegistosIntervencoesService: DoenteRegistosIntervencoesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected doenteDiagnosticoSocialService: DoenteDiagnosticoSocialService,
    protected doenteService: DoenteService,
    private fb: FormBuilder,
    private data: DataService
  ) {}

  save2() {
    this.isSaving = true;
    const doenteRegistosIntervencoes = this.createFromForm2();
    this.subscribeToSaveResponse2(this.doenteRegistosIntervencoesService.create(doenteRegistosIntervencoes));
    this.newRegisto = false;
    this.loadAll();
    this.delay(2000);
    this.loadAll();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  private createFromForm2(): IDoenteRegistosIntervencoes {
    return {
      ...new DoenteRegistosIntervencoes(),
      descr: this.editForm2.get(['descr']).value,
      doente: this.doente
    };
  }

  loadAll() {
    this.doenteRegistosIntervencoesService.search(this.doenteId).subscribe((res: HttpResponse<IDoenteRegistosIntervencoes[]>) => {
      this.doenteRegistosIntervencoes = res.body.reverse();
    });
  }

  cancel() {
    this.newRegisto = false;
    this.editForm2.reset();
  }

  addRegisto() {
    this.newRegisto = true;
  }

  ngOnInit() {
    this.isSaving2 = false;
    this.isSaving = false;
    this.data.currentPerfilSocial.subscribe(ps => {
      this.perfilSocial = ps;
    });
    this.data.currentDoente.subscribe(doenteId => {
      this.doenteId = doenteId;
      this.doenteService.find(this.doenteId).subscribe(dt => {
        this.doente = dt.body;
      });
      this.loadAll();
      this.registerChangeInDoenteRegistosIntervencoes();
      this.checkifToday();
    });
    this.doenteService.query().subscribe(
      (res: HttpResponse<IDoente[]>) => (this.doentes = res.body),
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }



verHistorico(d:string){
  if(d===this.registoHoje.descr){
    this.hoje =true
  }else{
    this.hoje=false;
  }
  console.log("VERHISTORICO");
  console.log(d);
  this.editForm.patchValue({

    descr: d
  });
}


  checkifToday() {
    this.doenteDiagnosticoSocialService.searchhist(this.doenteId).subscribe(res => {
      
      const dateObj = new Date();
      const month = dateObj.getUTCMonth() + 1; //months from 1-12
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      let strSec = String(day);
      let strMon = String(month);
      if (day < 10) {
        strSec = '0' + day;
      }
      if (month < 10) {
        strMon = '0' + month;
      }
      const newdate = year + '-' + strMon + '-' + strSec;
      // RECEBER TODOS OS REGISTOS RELATIVOS A ESTE DOENTE DIAGNOSTICO SOCIAL 
      this.histRegistos = res.body;
      // REMOVER O REGISTO CORRESPONDENTE AO DIA DE HOJE (CASO HAJA)
     for(let t = 0; t<this.histRegistos.length;t++){
       if(this.histRegistos[t].data.toString()=== newdate){
         console.log("hoje");
       }else{
         let exists = false
         for(let b = 0; b<this.histRegistos2.length;b++){
           if(this.histRegistos2[b].id===this.histRegistos[t].id){
              exists = true;
              console.log("exists");
             break;
           }
         }
         if(!exists){
           this.histRegistos2.push(this.histRegistos[t]);
         }
       }
     }
     this.histRegistos2.reverse();


     
     console.log(this.histRegistos2);
    
      for (let i = 0; i < res.body.length; i++) {
        if (res.body[i].data != null && res.body[i].data.toString() === newdate) {
          console.log('YES');
          this.new = false;
          this.editForm.setValue({
            id: res.body[i].id,
            data: res.body[i].data,
            descr: res.body[i].descr,
            doente: res.body[i].doente
          });
          this.registoHoje = res.body[i];
        } else {
          this.editForm.setValue({
            id: res.body[i].id,
            data: res.body[i].data,
            descr: '',
            doente: res.body[i].doente
          });
        }

      }
      /*  console.log(res.body);
              this.updateForm(res.body);*/
    });
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  protected subscribeToSaveResponse2(result: Observable<HttpResponse<IDoenteRegistosIntervencoes>>) {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  trackId(index: number, item: IDoenteRegistosIntervencoes) {
    return item.id;
  }

  registerChangeInDoenteRegistosIntervencoes() {
    this.eventSubscriber = this.eventManager.subscribe('doenteRegistosIntervencoesListModification', () => this.loadAll());
  }

  delete(doenteRegistosIntervencoes: IDoenteRegistosIntervencoes) {
    const modalRef = this.modalService.open(DoenteRegistosIntervencoesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.doenteRegistosIntervencoes = doenteRegistosIntervencoes;
  }

  updateForm(doenteDiagnosticoSocial: IDoenteDiagnosticoSocial) {
    this.doenteDiagnosticoSocialService.update;
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    this.checkifToday();
    if (this.new === true) {
      const doenteDiagnosticoSocial = this.createFromForm();

      this.doenteDiagnosticoSocialService.searchhist(this.doenteId).subscribe(res => {
        this.subscribeToSaveResponse(this.doenteDiagnosticoSocialService.create(doenteDiagnosticoSocial));
        this.delay(1000);
        this.checkifToday();

        this.new = false;
      });
    } else {
      const doenteDiagnosticoSocial = this.updatefromForm(this.registoHoje);
      this.subscribeToSaveResponse(this.doenteDiagnosticoSocialService.update(doenteDiagnosticoSocial));
      this.checkifToday();
    }
  }

  private updatefromForm(doenteDiagnosticoSocial: IDoenteDiagnosticoSocial) {
    return {
      ...new DoenteDiagnosticoSocial(),
      id: doenteDiagnosticoSocial.id,
      data: doenteDiagnosticoSocial.data,
      descr: this.editForm.get(['descr']).value,
      doente: this.doente
    };
  }

  private createFromForm(): IDoenteDiagnosticoSocial {
    return {
      ...new DoenteDiagnosticoSocial(),

      data: moment(),
      descr: this.editForm.get(['descr']).value,
      doente: this.doente
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoenteDiagnosticoSocial>>) {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess() {
    this.isSaving = false;
  }

  protected onSaveSuccess2() {
    this.isSaving = false;
  }

  protected onSaveError2() {
    this.isSaving = false;
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
}


