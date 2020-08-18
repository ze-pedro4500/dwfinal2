import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDoenteDiagnosticoSocial, DoenteDiagnosticoSocial } from 'app/shared/model/doente-diagnostico-social.model';
import { DoenteDiagnosticoSocialService } from './doente-diagnostico-social.service';
import { IDoente } from 'app/shared/model/doente.model';
import { DoenteService } from 'app/entities/doente/doente.service';

@Component({
  selector: 'jhi-doente-diagnostico-social-update',
  templateUrl: './doente-diagnostico-social-update.component.html'
})
export class DoenteDiagnosticoSocialUpdateComponent implements OnInit {
  isSaving = false;
  doentes: IDoente[] = [];
  dataDp: any;

  editForm = this.fb.group({
    id: [],
    descr: [],
    data: [],
    doente: []
  });

  constructor(
    protected doenteDiagnosticoSocialService: DoenteDiagnosticoSocialService,
    protected doenteService: DoenteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doenteDiagnosticoSocial }) => {
      this.updateForm(doenteDiagnosticoSocial);

      this.doenteService.query().subscribe((res: HttpResponse<IDoente[]>) => (this.doentes = res.body || []));
    });
  }

  updateForm(doenteDiagnosticoSocial: IDoenteDiagnosticoSocial): void {
    this.editForm.patchValue({
      id: doenteDiagnosticoSocial.id,
      descr: doenteDiagnosticoSocial.descr,
      data: doenteDiagnosticoSocial.data,
      doente: doenteDiagnosticoSocial.doente
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const doenteDiagnosticoSocial = this.createFromForm();
    if (doenteDiagnosticoSocial.id !== undefined) {
      this.subscribeToSaveResponse(this.doenteDiagnosticoSocialService.update(doenteDiagnosticoSocial));
    } else {
      this.subscribeToSaveResponse(this.doenteDiagnosticoSocialService.create(doenteDiagnosticoSocial));
    }
  }

  private createFromForm(): IDoenteDiagnosticoSocial {
    return {
      ...new DoenteDiagnosticoSocial(),
      id: this.editForm.get(['id'])!.value,
      descr: this.editForm.get(['descr'])!.value,
      data: this.editForm.get(['data'])!.value,
      doente: this.editForm.get(['doente'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoenteDiagnosticoSocial>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IDoente): any {
    return item.id;
  }
}
