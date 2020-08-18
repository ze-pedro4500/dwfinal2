import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { HorarioDoenteComponent } from './horario-doente.component';
import { HorarioDoenteDetailComponent } from './horario-doente-detail.component';
import { HorarioDoenteUpdateComponent } from './horario-doente-update.component';
import { HorarioDoenteDeleteDialogComponent } from './horario-doente-delete-dialog.component';
import { horarioDoenteRoute } from './horario-doente.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(horarioDoenteRoute)],
  declarations: [HorarioDoenteComponent, HorarioDoenteDetailComponent, HorarioDoenteUpdateComponent, HorarioDoenteDeleteDialogComponent],
  entryComponents: [HorarioDoenteDeleteDialogComponent]
})
export class Demografia2HorarioDoenteModule {}
