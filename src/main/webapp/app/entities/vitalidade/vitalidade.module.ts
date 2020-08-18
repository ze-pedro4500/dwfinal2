import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { VitalidadeComponent } from './vitalidade.component';
import { VitalidadeDetailComponent } from './vitalidade-detail.component';
import { VitalidadeUpdateComponent } from './vitalidade-update.component';
import { VitalidadeDeleteDialogComponent } from './vitalidade-delete-dialog.component';
import { vitalidadeRoute } from './vitalidade.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(vitalidadeRoute)],
  declarations: [VitalidadeComponent, VitalidadeDetailComponent, VitalidadeUpdateComponent, VitalidadeDeleteDialogComponent],
  entryComponents: [VitalidadeDeleteDialogComponent]
})
export class Demografia2VitalidadeModule {}
