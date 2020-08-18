import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISubSistemas, SubSistemas } from 'app/shared/model/sub-sistemas.model';
import { SubSistemasService } from './sub-sistemas.service';
import { ISubSisGrupo } from 'app/shared/model/sub-sis-grupo.model';
import { SubSisGrupoService } from 'app/entities/sub-sis-grupo/sub-sis-grupo.service';

@Component({
  selector: 'jhi-sub-sistemas-update',
  templateUrl: './sub-sistemas-update.component.html'
})
export class SubSistemasUpdateComponent implements OnInit {
  isSaving = false;
  subsisgrupos: ISubSisGrupo[] = [];

  editForm = this.fb.group({
    id: [],
    gidNome: [],
    gidCode: [],
    subSisGrupo: []
  });

  constructor(
    protected subSistemasService: SubSistemasService,
    protected subSisGrupoService: SubSisGrupoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subSistemas }) => {
      this.updateForm(subSistemas);

      this.subSisGrupoService.query().subscribe((res: HttpResponse<ISubSisGrupo[]>) => (this.subsisgrupos = res.body || []));
    });
  }

  updateForm(subSistemas: ISubSistemas): void {
    this.editForm.patchValue({
      id: subSistemas.id,
      gidNome: subSistemas.gidNome,
      gidCode: subSistemas.gidCode,
      subSisGrupo: subSistemas.subSisGrupo
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subSistemas = this.createFromForm();
    if (subSistemas.id !== undefined) {
      this.subscribeToSaveResponse(this.subSistemasService.update(subSistemas));
    } else {
      this.subscribeToSaveResponse(this.subSistemasService.create(subSistemas));
    }
  }

  private createFromForm(): ISubSistemas {
    return {
      ...new SubSistemas(),
      id: this.editForm.get(['id'])!.value,
      gidNome: this.editForm.get(['gidNome'])!.value,
      gidCode: this.editForm.get(['gidCode'])!.value,
      subSisGrupo: this.editForm.get(['subSisGrupo'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubSistemas>>): void {
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

  trackById(index: number, item: ISubSisGrupo): any {
    return item.id;
  }
}
