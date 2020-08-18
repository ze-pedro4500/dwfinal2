import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { DoenteContactosComponent } from './doente-contactos.component';
import { DoenteContactosDetailComponent } from './doente-contactos-detail.component';
import { DoenteContactosUpdateComponent } from './doente-contactos-update.component';
import { DoenteContactosDeleteDialogComponent } from './doente-contactos-delete-dialog.component';
import { doenteContactosRoute } from './doente-contactos.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(doenteContactosRoute)],
  declarations: [
    DoenteContactosComponent,
    DoenteContactosDetailComponent,
    DoenteContactosUpdateComponent,
    DoenteContactosDeleteDialogComponent
  ],
  entryComponents: [DoenteContactosDeleteDialogComponent]
})
export class Demografia2DoenteContactosModule {}
