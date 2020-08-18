import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISitProf, SitProf } from 'app/shared/model/sit-prof.model';
import { SitProfService } from './sit-prof.service';

@Component({
  selector: 'jhi-sit-prof-update',
  templateUrl: './sit-prof-update.component.html'
})
export class SitProfUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: []
  });

  constructor(protected sitProfService: SitProfService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sitProf }) => {
      this.updateForm(sitProf);
    });
  }

  updateForm(sitProf: ISitProf): void {
    this.editForm.patchValue({
      id: sitProf.id,
      nome: sitProf.nome
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sitProf = this.createFromForm();
    if (sitProf.id !== undefined) {
      this.subscribeToSaveResponse(this.sitProfService.update(sitProf));
    } else {
      this.subscribeToSaveResponse(this.sitProfService.create(sitProf));
    }
  }

  private createFromForm(): ISitProf {
    return {
      ...new SitProf(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISitProf>>): void {
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
}
