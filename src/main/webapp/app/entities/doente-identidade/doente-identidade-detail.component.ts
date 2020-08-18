import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoenteIdentidade } from 'app/shared/model/doente-identidade.model';

@Component({
  selector: 'jhi-doente-identidade-detail',
  templateUrl: './doente-identidade-detail.component.html'
})
export class DoenteIdentidadeDetailComponent implements OnInit {
  doenteIdentidade: IDoenteIdentidade | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doenteIdentidade }) => (this.doenteIdentidade = doenteIdentidade));
  }

  previousState(): void {
    window.history.back();
  }
}
