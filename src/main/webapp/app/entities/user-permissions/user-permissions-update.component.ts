import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IUserPermissions, UserPermissions } from 'app/shared/model/user-permissions.model';
import { UserPermissionsService } from './user-permissions.service';

@Component({
  selector: 'jhi-user-permissions-update',
  templateUrl: './user-permissions-update.component.html'
})
export class UserPermissionsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    demograf: [],
    social: [],
    procClin: [],
    dialEnf: [],
    dialStat: [],
    qualiStat: [],
    labLink: [],
    gidLink: [],
    asterixFarma: [],
    asterixGabMed: []
  });

  constructor(
    protected userPermissionsService: UserPermissionsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userPermissions }) => {
      this.updateForm(userPermissions);
    });
  }

  updateForm(userPermissions: IUserPermissions): void {
    this.editForm.patchValue({
      id: userPermissions.id,
      demograf: userPermissions.demograf,
      social: userPermissions.social,
      procClin: userPermissions.procClin,
      dialEnf: userPermissions.dialEnf,
      dialStat: userPermissions.dialStat,
      qualiStat: userPermissions.qualiStat,
      labLink: userPermissions.labLink,
      gidLink: userPermissions.gidLink,
      asterixFarma: userPermissions.asterixFarma,
      asterixGabMed: userPermissions.asterixGabMed
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userPermissions = this.createFromForm();
    if (userPermissions.id !== undefined) {
      this.subscribeToSaveResponse(this.userPermissionsService.update(userPermissions));
    } else {
      this.subscribeToSaveResponse(this.userPermissionsService.create(userPermissions));
    }
  }

  private createFromForm(): IUserPermissions {
    return {
      ...new UserPermissions(),
      id: this.editForm.get(['id'])!.value,
      demograf: this.editForm.get(['demograf'])!.value,
      social: this.editForm.get(['social'])!.value,
      procClin: this.editForm.get(['procClin'])!.value,
      dialEnf: this.editForm.get(['dialEnf'])!.value,
      dialStat: this.editForm.get(['dialStat'])!.value,
      qualiStat: this.editForm.get(['qualiStat'])!.value,
      labLink: this.editForm.get(['labLink'])!.value,
      gidLink: this.editForm.get(['gidLink'])!.value,
      asterixFarma: this.editForm.get(['asterixFarma'])!.value,
      asterixGabMed: this.editForm.get(['asterixGabMed'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserPermissions>>): void {
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
