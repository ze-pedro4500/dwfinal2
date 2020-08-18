import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileDetailComponent } from './user-profile-detail.component';
import { UserProfileUpdateComponent } from './user-profile-update.component';
import { UserProfileDeleteDialogComponent } from './user-profile-delete-dialog.component';
import { userProfileRoute } from './user-profile.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(userProfileRoute)],
  declarations: [UserProfileComponent, UserProfileDetailComponent, UserProfileUpdateComponent, UserProfileDeleteDialogComponent],
  entryComponents: [UserProfileDeleteDialogComponent]
})
export class Demografia2UserProfileModule {}
