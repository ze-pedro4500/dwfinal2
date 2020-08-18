import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { UserPermissionsComponent } from './user-permissions.component';
import { UserPermissionsDetailComponent } from './user-permissions-detail.component';
import { UserPermissionsUpdateComponent } from './user-permissions-update.component';
import { UserPermissionsDeleteDialogComponent } from './user-permissions-delete-dialog.component';
import { userPermissionsRoute } from './user-permissions.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(userPermissionsRoute)],
  declarations: [
    UserPermissionsComponent,
    UserPermissionsDetailComponent,
    UserPermissionsUpdateComponent,
    UserPermissionsDeleteDialogComponent
  ],
  entryComponents: [UserPermissionsDeleteDialogComponent]
})
export class Demografia2UserPermissionsModule {}
