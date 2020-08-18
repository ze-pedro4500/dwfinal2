import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUserExtra, UserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from './user-extra.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IUserPermissions } from 'app/shared/model/user-permissions.model';
import { UserPermissionsService } from 'app/entities/user-permissions/user-permissions.service';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { UserProfileService } from 'app/entities/user-profile/user-profile.service';

type SelectableEntity = IUser | IUserPermissions | IUserProfile;

@Component({
  selector: 'jhi-user-extra-update',
  templateUrl: './user-extra-update.component.html'
})
export class UserExtraUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  userpermissions: IUserPermissions[] = [];
  userprofiles: IUserProfile[] = [];

  editForm = this.fb.group({
    id: [],
    activo: [],
    nome: [],
    morada: [],
    codP: [],
    telef: [],
    permissChange: [],
    nif: [],
    user: [],
    userPermissions: [],
    userProfile: []
  });

  constructor(
    protected userExtraService: UserExtraService,
    protected userService: UserService,
    protected userPermissionsService: UserPermissionsService,
    protected userProfileService: UserProfileService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userExtra }) => {
      this.updateForm(userExtra);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.userPermissionsService
        .query({ filter: 'userextra-is-null' })
        .pipe(
          map((res: HttpResponse<IUserPermissions[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IUserPermissions[]) => {
          if (!userExtra.userPermissions || !userExtra.userPermissions.id) {
            this.userpermissions = resBody;
          } else {
            this.userPermissionsService
              .find(userExtra.userPermissions.id)
              .pipe(
                map((subRes: HttpResponse<IUserPermissions>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IUserPermissions[]) => (this.userpermissions = concatRes));
          }
        });

      this.userProfileService.query().subscribe((res: HttpResponse<IUserProfile[]>) => (this.userprofiles = res.body || []));
    });
  }

  updateForm(userExtra: IUserExtra): void {
    this.editForm.patchValue({
      id: userExtra.id,
      activo: userExtra.activo,
      nome: userExtra.nome,
      morada: userExtra.morada,
      codP: userExtra.codP,
      telef: userExtra.telef,
      permissChange: userExtra.permissChange,
      nif: userExtra.nif,
      user: userExtra.user,
      userPermissions: userExtra.userPermissions,
      userProfile: userExtra.userProfile
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userExtra = this.createFromForm();
    if (userExtra.id !== undefined) {
      this.subscribeToSaveResponse(this.userExtraService.update(userExtra));
    } else {
      this.subscribeToSaveResponse(this.userExtraService.create(userExtra));
    }
  }

  private createFromForm(): IUserExtra {
    return {
      ...new UserExtra(),
      id: this.editForm.get(['id'])!.value,
      activo: this.editForm.get(['activo'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      morada: this.editForm.get(['morada'])!.value,
      codP: this.editForm.get(['codP'])!.value,
      telef: this.editForm.get(['telef'])!.value,
      permissChange: this.editForm.get(['permissChange'])!.value,
      nif: this.editForm.get(['nif'])!.value,
      user: this.editForm.get(['user'])!.value,
      userPermissions: this.editForm.get(['userPermissions'])!.value,
      userProfile: this.editForm.get(['userProfile'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserExtra>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
