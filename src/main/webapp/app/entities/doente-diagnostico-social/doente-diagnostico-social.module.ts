import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { DoenteDiagnosticoSocialComponent } from './doente-diagnostico-social.component';
import { DoenteDiagnosticoSocialDetailComponent } from './doente-diagnostico-social-detail.component';
import { DoenteDiagnosticoSocialUpdateComponent } from './doente-diagnostico-social-update.component';
import { DoenteDiagnosticoSocialDeleteDialogComponent } from './doente-diagnostico-social-delete-dialog.component';
import { doenteDiagnosticoSocialRoute } from './doente-diagnostico-social.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(doenteDiagnosticoSocialRoute)],
  declarations: [
    DoenteDiagnosticoSocialComponent,
    DoenteDiagnosticoSocialDetailComponent,
    DoenteDiagnosticoSocialUpdateComponent,
    DoenteDiagnosticoSocialDeleteDialogComponent
  ],
  entryComponents: [DoenteDiagnosticoSocialDeleteDialogComponent]
})
export class Demografia2DoenteDiagnosticoSocialModule {}
