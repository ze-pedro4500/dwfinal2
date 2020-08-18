import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { SubSistemasComponent } from './sub-sistemas.component';
import { SubSistemasDetailComponent } from './sub-sistemas-detail.component';
import { SubSistemasUpdateComponent } from './sub-sistemas-update.component';
import { SubSistemasDeleteDialogComponent } from './sub-sistemas-delete-dialog.component';
import { subSistemasRoute } from './sub-sistemas.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(subSistemasRoute)],
  declarations: [SubSistemasComponent, SubSistemasDetailComponent, SubSistemasUpdateComponent, SubSistemasDeleteDialogComponent],
  entryComponents: [SubSistemasDeleteDialogComponent]
})
export class Demografia2SubSistemasModule {}
