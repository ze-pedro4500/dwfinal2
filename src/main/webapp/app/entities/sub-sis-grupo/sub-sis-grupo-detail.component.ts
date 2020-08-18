import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubSisGrupo } from 'app/shared/model/sub-sis-grupo.model';

@Component({
  selector: 'jhi-sub-sis-grupo-detail',
  templateUrl: './sub-sis-grupo-detail.component.html'
})
export class SubSisGrupoDetailComponent implements OnInit {
  subSisGrupo: ISubSisGrupo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subSisGrupo }) => (this.subSisGrupo = subSisGrupo));
  }

  previousState(): void {
    window.history.back();
  }
}
