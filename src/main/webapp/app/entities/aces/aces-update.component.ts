import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAces, Aces } from 'app/shared/model/aces.model';
import { AcesService } from './aces.service';

@Component({
  selector: 'jhi-aces-update',
  templateUrl: './aces-update.component.html'
})
export class AcesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: []
  });

  constructor(protected acesService: AcesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aces }) => {
      this.updateForm(aces);
    });
  }

  updateForm(aces: IAces): void {
    this.editForm.patchValue({
      id: aces.id,
      nome: aces.nome
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const aces = this.createFromForm();
    if (aces.id !== undefined) {
      this.subscribeToSaveResponse(this.acesService.update(aces));
    } else {
      this.subscribeToSaveResponse(this.acesService.create(aces));
    }
  }

  private createFromForm(): IAces {
    return {
      ...new Aces(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAces>>): void {
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
