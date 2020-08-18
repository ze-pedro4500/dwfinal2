import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { AcesComponent } from './aces.component';
import { AcesDetailComponent } from './aces-detail.component';
import { AcesUpdateComponent } from './aces-update.component';
import { AcesDeleteDialogComponent } from './aces-delete-dialog.component';
import { acesRoute } from './aces.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(acesRoute)],
  declarations: [AcesComponent, AcesDetailComponent, AcesUpdateComponent, AcesDeleteDialogComponent],
  entryComponents: [AcesDeleteDialogComponent]
})
export class Demografia2AcesModule {}
