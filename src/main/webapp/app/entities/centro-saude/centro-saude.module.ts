import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { CentroSaudeComponent } from './centro-saude.component';
import { CentroSaudeDetailComponent } from './centro-saude-detail.component';
import { CentroSaudeUpdateComponent } from './centro-saude-update.component';
import { CentroSaudeDeleteDialogComponent } from './centro-saude-delete-dialog.component';
import { centroSaudeRoute } from './centro-saude.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(centroSaudeRoute)],
  declarations: [CentroSaudeComponent, CentroSaudeDetailComponent, CentroSaudeUpdateComponent, CentroSaudeDeleteDialogComponent],
  entryComponents: [CentroSaudeDeleteDialogComponent]
})
export class Demografia2CentroSaudeModule {}
