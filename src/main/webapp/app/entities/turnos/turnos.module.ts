import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { TurnosComponent } from './turnos.component';
import { TurnosDetailComponent } from './turnos-detail.component';
import { TurnosUpdateComponent } from './turnos-update.component';
import { TurnosDeleteDialogComponent } from './turnos-delete-dialog.component';
import { turnosRoute } from './turnos.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(turnosRoute)],
  declarations: [TurnosComponent, TurnosDetailComponent, TurnosUpdateComponent, TurnosDeleteDialogComponent],
  entryComponents: [TurnosDeleteDialogComponent]
})
export class Demografia2TurnosModule {}
