import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoenteRegistosIntervencoes } from 'app/shared/model/doente-registos-intervencoes.model';

@Component({
  selector: 'jhi-doente-registos-intervencoes-detail',
  templateUrl: './doente-registos-intervencoes-detail.component.html'
})
export class DoenteRegistosIntervencoesDetailComponent implements OnInit {
  doenteRegistosIntervencoes: IDoenteRegistosIntervencoes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doenteRegistosIntervencoes }) => (this.doenteRegistosIntervencoes = doenteRegistosIntervencoes));
  }

  previousState(): void {
    window.history.back();
  }
}
