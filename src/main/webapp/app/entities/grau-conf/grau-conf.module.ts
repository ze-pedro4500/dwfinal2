import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { GrauConfComponent } from './grau-conf.component';
import { GrauConfDetailComponent } from './grau-conf-detail.component';
import { GrauConfUpdateComponent } from './grau-conf-update.component';
import { GrauConfDeleteDialogComponent } from './grau-conf-delete-dialog.component';
import { grauConfRoute } from './grau-conf.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(grauConfRoute)],
  declarations: [GrauConfComponent, GrauConfDetailComponent, GrauConfUpdateComponent, GrauConfDeleteDialogComponent],
  entryComponents: [GrauConfDeleteDialogComponent]
})
export class Demografia2GrauConfModule {}
