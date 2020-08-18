import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoenteHistMovimentos } from 'app/shared/model/doente-hist-movimentos.model';

@Component({
  selector: 'jhi-doente-hist-movimentos-detail',
  templateUrl: './doente-hist-movimentos-detail.component.html'
})
export class DoenteHistMovimentosDetailComponent implements OnInit {
  doenteHistMovimentos: IDoenteHistMovimentos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doenteHistMovimentos }) => (this.doenteHistMovimentos = doenteHistMovimentos));
  }

  previousState(): void {
    window.history.back();
  }
}
