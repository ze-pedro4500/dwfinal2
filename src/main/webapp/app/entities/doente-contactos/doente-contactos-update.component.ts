import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDoenteContactos, DoenteContactos } from 'app/shared/model/doente-contactos.model';
import { DoenteContactosService } from './doente-contactos.service';
import { IDoente } from 'app/shared/model/doente.model';
import { DoenteService } from 'app/entities/doente/doente.service';

@Component({
  selector: 'jhi-doente-contactos-update',
  templateUrl: './doente-contactos-update.component.html'
})
export class DoenteContactosUpdateComponent implements OnInit {
  isSaving = false;
  doentes: IDoente[] = [];

  editForm = this.fb.group({
    id: [],
    transportador: [],
    telefTransp: [],
    doente: []
  });

  constructor(
    protected doenteContactosService: DoenteContactosService,
    protected doenteService: DoenteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doenteContactos }) => {
      this.updateForm(doenteContactos);

      this.doenteService
        .query({ filter: 'doentecontactos-is-null' })
        .pipe(
          map((res: HttpResponse<IDoente[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDoente[]) => {
          if (!doenteContactos.doente || !doenteContactos.doente.id) {
            this.doentes = resBody;
          } else {
            this.doenteService
              .find(doenteContactos.doente.id)
              .pipe(
                map((subRes: HttpResponse<IDoente>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDoente[]) => (this.doentes = concatRes));
          }
        });
    });
  }

  updateForm(doenteContactos: IDoenteContactos): void {
    this.editForm.patchValue({
      id: doenteContactos.id,
      transportador: doenteContactos.transportador,
      telefTransp: doenteContactos.telefTransp,
      doente: doenteContactos.doente
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const doenteContactos = this.createFromForm();
    if (doenteContactos.id !== undefined) {
      this.subscribeToSaveResponse(this.doenteContactosService.update(doenteContactos));
    } else {
      this.subscribeToSaveResponse(this.doenteContactosService.create(doenteContactos));
    }
  }

  private createFromForm(): IDoenteContactos {
    return {
      ...new DoenteContactos(),
      id: this.editForm.get(['id'])!.value,
      transportador: this.editForm.get(['transportador'])!.value,
      telefTransp: this.editForm.get(['telefTransp'])!.value,
      doente: this.editForm.get(['doente'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoenteContactos>>): void {
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
