import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { DoenteComponent } from './doente.component';
import { DoenteDetailComponent } from './doente-detail.component';
import { DoenteUpdateComponent } from './doente-update.component';
import { DoenteDeleteDialogComponent } from './doente-delete-dialog.component';
import { doenteRoute } from './doente.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(doenteRoute)],
  declarations: [DoenteComponent, DoenteDetailComponent, DoenteUpdateComponent, DoenteDeleteDialogComponent],
  entryComponents: [DoenteDeleteDialogComponent]
})
export class Demografia2DoenteModule {}
