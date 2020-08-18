import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { DoenteContactosOutrosComponent } from './doente-contactos-outros.component';
import { DoenteContactosOutrosDetailComponent } from './doente-contactos-outros-detail.component';
import { DoenteContactosOutrosUpdateComponent } from './doente-contactos-outros-update.component';
import { DoenteContactosOutrosDeleteDialogComponent } from './doente-contactos-outros-delete-dialog.component';
import { doenteContactosOutrosRoute } from './doente-contactos-outros.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(doenteContactosOutrosRoute)],
  declarations: [
    DoenteContactosOutrosComponent,
    DoenteContactosOutrosDetailComponent,
    DoenteContactosOutrosUpdateComponent,
    DoenteContactosOutrosDeleteDialogComponent
  ],
  entryComponents: [DoenteContactosOutrosDeleteDialogComponent]
})
export class Demografia2DoenteContactosOutrosModule {}
