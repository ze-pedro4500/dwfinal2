import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Demografia2SharedModule } from 'app/shared/shared.module';
import { SubSisGrupoComponent } from './sub-sis-grupo.component';
import { SubSisGrupoDetailComponent } from './sub-sis-grupo-detail.component';
import { SubSisGrupoUpdateComponent } from './sub-sis-grupo-update.component';
import { SubSisGrupoDeleteDialogComponent } from './sub-sis-grupo-delete-dialog.component';
import { subSisGrupoRoute } from './sub-sis-grupo.route';

@NgModule({
  imports: [Demografia2SharedModule, RouterModule.forChild(subSisGrupoRoute)],
  declarations: [SubSisGrupoComponent, SubSisGrupoDetailComponent, SubSisGrupoUpdateComponent, SubSisGrupoDeleteDialogComponent],
  entryComponents: [SubSisGrupoDeleteDialogComponent]
})
export class Demografia2SubSisGrupoModule {}
