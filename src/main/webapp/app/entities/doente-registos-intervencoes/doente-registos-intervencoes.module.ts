import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { DoenteRegistosIntervencoesComponent } from './doente-registos-intervencoes.component';
import { DoenteRegistosIntervencoesDetailComponent } from './doente-registos-intervencoes-detail.component';
import { DoenteRegistosIntervencoesUpdateComponent } from './doente-registos-intervencoes-update.component';
import { DoenteRegistosIntervencoesDeleteDialogComponent } from './doente-registos-intervencoes-delete-dialog.component';
import { doenteRegistosIntervencoesRoute } from './doente-registos-intervencoes.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(doenteRegistosIntervencoesRoute)],
  declarations: [
    DoenteRegistosIntervencoesComponent,
    DoenteRegistosIntervencoesDetailComponent,
    DoenteRegistosIntervencoesUpdateComponent,
    DoenteRegistosIntervencoesDeleteDialogComponent
  ],
  entryComponents: [DoenteRegistosIntervencoesDeleteDialogComponent]
})
export class Demografia2DoenteRegistosIntervencoesModule {}
