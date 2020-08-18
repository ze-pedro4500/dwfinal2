import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { HospRefComponent } from './hosp-ref.component';
import { HospRefDetailComponent } from './hosp-ref-detail.component';
import { HospRefUpdateComponent } from './hosp-ref-update.component';
import { HospRefDeleteDialogComponent } from './hosp-ref-delete-dialog.component';
import { hospRefRoute } from './hosp-ref.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(hospRefRoute)],
  declarations: [HospRefComponent, HospRefDetailComponent, HospRefUpdateComponent, HospRefDeleteDialogComponent],
  entryComponents: [HospRefDeleteDialogComponent]
})
export class Demografia2HospRefModule {}
